module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "不支援的請求方法。" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return send(res, 500, { error: "缺少 OPENAI_API_KEY，請先在 Vercel 環境變數設定。" });
  }

  try {
    const body = await readJson(req);
    const video = parseDataUrl(body.video_data_url || "");
    if (!video) return send(res, 400, { error: "請上傳影片檔。" });
    if (video.buffer.length > 25 * 1024 * 1024) {
      return send(res, 413, { error: "影片檔超過 25MB。請先裁短或壓縮後再上傳。" });
    }

    const transcript = await transcribeVideo(apiKey, video, body.file_name || "competitor-video.mp4");
    const analysis = await analyzeFramesAndRewrite(apiKey, {
      ...body,
      transcript,
      frames: Array.isArray(body.frames) ? body.frames.slice(0, 8) : []
    });

    return send(res, 200, {
      transcript,
      analysis
    });
  } catch (error) {
    return send(res, 500, { error: error.message || "影片分析失敗。" });
  }
};

async function transcribeVideo(apiKey, video, fileName) {
  const form = new FormData();
  form.append("model", "gpt-4o-mini-transcribe");
  form.append("language", "zh");
  form.append("response_format", "json");
  form.append("file", new Blob([video.buffer], { type: video.mimeType || "video/mp4" }), fileName);

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || "逐字稿轉換失敗。");
  return data.text || "";
}

async function analyzeFramesAndRewrite(apiKey, body) {
  const prompt = `你是可樂吉健康研究所的短影音內容策略顧問。請分析一支同業短影音，萃取可借鑑結構，但不要抄襲句子、案例、畫面或品牌元素。

品牌：可樂吉健康研究所
作者：崇銘老師
語氣：專業、自然、有對話感、不恐嚇、不誇大、不醫療診斷、不身材羞辱
目標受眾：${body.audience || "30 歲以上、常外食、沒時間運動、容易復胖的上班族"}
改寫主題：${body.topic || "壓力與減脂"}
CTA：${body.cta || "留言「測驗」"}
原影片連結：${body.source_url || "未提供"}
原影片 Hook：${body.hook || "請根據逐字稿與畫面判斷"}
原影片逐字稿：
${body.transcript || "無逐字稿"}

請輸出繁體中文 Markdown，包含：
1. 逐字稿摘要
2. 分鏡節奏分析
3. 為什麼可能有流量
4. Hook 類型與腳本公式
5. 可借鑑元素
6. 不可照抄或需避開的風險
7. 可樂吉改寫版 3 個 Hook
8. 可樂吉短影音腳本，依 60 秒格式分段
9. 可樂吉分鏡表，欄位：時間、畫面描述、口播、字卡、B-roll、圖像生成提示詞
10. IG 文案
11. Threads 文案
12. 優化建議

安全規則：
- 不承諾一定瘦幾公斤
- 不使用醫療診斷語氣
- 不說保證有效
- 不貶低其他減重方式
- 不製造身材羞辱
- 不鼓勵極端節食
- 疾病、懷孕、用藥、飲食疾患請建議尋求專業醫療人員協助`;

  const content = [{ type: "input_text", text: prompt }];
  for (const frame of body.frames || []) {
    content.push({ type: "input_image", image_url: frame });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [{ role: "user", content }],
      temperature: 0.4
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error?.message || "AI 分析失敗。");
  return extractOutputText(data);
}

function extractOutputText(data) {
  if (data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseDataUrl(dataUrl) {
  const matched = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!matched) return null;
  return {
    mimeType: matched[1],
    buffer: Buffer.from(matched[2], "base64")
  };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 38_000_000) {
        reject(new Error("影片資料太大，請改上傳 25MB 以下影片。"));
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
