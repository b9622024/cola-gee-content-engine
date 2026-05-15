module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (req.method === "GET") {
    return send(res, 200, {
      ok: true,
      service: "upload-video",
      blob_token_configured: Boolean(blobToken),
      message: blobToken ? "Blob 上傳 API 已部署，BLOB_READ_WRITE_TOKEN 已設定。" : "Blob 上傳 API 已部署，但缺少 BLOB_READ_WRITE_TOKEN。"
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "不支援的請求方法。" });
  }

  if (!blobToken) {
    return send(res, 500, { error: "缺少 BLOB_READ_WRITE_TOKEN。請先在 Vercel 建立 Blob Storage 並連到這個專案。" });
  }

  try {
    const { handleUpload } = await import("@vercel/blob/client");
    const body = await getRequestBody(req);
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const cleanName = String(pathname || "competitor-video.mp4").replace(/[^\w.\-]/g, "-");
        return {
          allowedContentTypes: [
            "video/mp4",
            "video/mpeg",
            "video/quicktime",
            "video/webm",
            "video/x-m4v"
          ],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            source: "cola-gee-competitor-analysis",
            fileName: cleanName,
            createdAt: new Date().toISOString()
          })
        };
      }
    });

    return send(res, 200, jsonResponse);
  } catch (error) {
    return send(res, 400, { error: error.message || "Blob 上傳初始化失敗。" });
  }
};

async function getRequestBody(req) {
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(req.body)) {
    try {
      return req.body.length ? JSON.parse(req.body.toString("utf8")) : {};
    } catch (error) {
      throw new Error("上傳授權資料格式錯誤。");
    }
  }
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return req.body ? JSON.parse(req.body) : {};
    } catch (error) {
      throw new Error("上傳授權資料格式錯誤。");
    }
  }
  return readJson(req);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    const timer = setTimeout(() => {
      reject(new Error("讀取上傳授權資料逾時，請重新整理後再試一次。"));
    }, 12000);
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        clearTimeout(timer);
        reject(new Error("上傳設定資料太大。"));
        req.destroy();
      }
    });
    req.on("end", () => {
      clearTimeout(timer);
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

function send(res, status, data) {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}
