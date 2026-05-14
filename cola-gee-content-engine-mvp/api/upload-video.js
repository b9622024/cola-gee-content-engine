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
    const body = req.body && typeof req.body === "object" ? req.body : await readJson(req);
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
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            source: "cola-gee-competitor-analysis",
            fileName: cleanName,
            createdAt: new Date().toISOString()
          })
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("competitor video upload completed", blob.url);
      }
    });

    return send(res, 200, jsonResponse);
  } catch (error) {
    return send(res, 400, { error: error.message || "Blob 上傳初始化失敗。" });
  }
};

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("上傳設定資料太大。"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function send(res, status, data) {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}
