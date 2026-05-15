module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const apiKey = process.env.OPENAI_API_KEY;
  if (req.method === "GET") {
    return send(res, 200, {
      ok: true,
      service: "generate-script",
      openai_key_configured: Boolean(apiKey),
      message: apiKey ? "API 已部署，OPENAI_API_KEY 已設定。" : "API 已部署，但缺少 OPENAI_API_KEY。"
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "不支援的請求方法。" });
  }

  if (!apiKey) {
    return send(res, 500, { error: "缺少 OPENAI_API_KEY，請先在 Vercel 環境變數設定。" });
  }

  try {
    const body = await readJson(req);
    const markdown = await generateDeepScript(apiKey, body);
    return send(res, 200, {
      markdown,
      hook_options: extractHookOptions(markdown),
      selected_hook: extractSelectedHook(markdown)
    });
  } catch (error) {
    const normalized = normalizeOpenAiError(error);
    return send(res, normalized.status, { error: normalized.message });
  }
};

async function generateDeepScript(apiKey, body) {
  const prompt = `你是「可樂吉健康研究所」的短影音內容策略總監，請用繁體中文協助減重教練產出一支更有思考深度的短影音腳本。

品牌名稱：${body.brand?.name || "可樂吉健康研究所"}
作者署名：${body.brand?.author || "崇銘老師"}
品牌語氣：專業、自然、有對話感、不硬銷、不醫療診斷、不恐嚇、不誇大療效、讓受眾覺得被理解

使用者輸入：
- 主題：${body.topic || "壓力與減脂"}
- 目標受眾：${body.audience || "30 歲以上、常外食、沒時間運動、容易復胖的上班族"}
- 內容目標：${body.goal || "共鳴型"}
- 影片長度：${body.length || "60 秒"}
- 風格：${body.style || "情境共鳴型"}
- CTA：${body.cta || "留言「測驗」"}

目前選用的流量公式：
${JSON.stringify(body.formula || {}, null, 2)}

可參考的市場研究素材：
${JSON.stringify((body.market_research || []).slice(0, 5), null, 2)}

可參考的競品分析紀錄摘要：
${JSON.stringify((body.competitor_notes || []).slice(0, 3), null, 2)}

請不要直接套模板。請先思考，再產出。

請輸出 Markdown，必須包含以下區塊：

# AI 深度短影音腳本

## 1. 策略判斷
- 這支影片真正要解決的受眾痛點
- 受眾為什麼會停下來看
- 這支內容最適合的內容目標
- 這支內容應該避免的角度

## 2. 受眾洞察
- 表層問題
- 深層心理
- 常見誤解
- 最容易引發留言或私訊的切入點

## 3. 三個內容角度
請產出 3 個不同方向：
- 流量版
- 共鳴版
- 轉換版

每個方向都要包含：
- 角度名稱
- 適合原因
- Hook
- 可能風險
- 預期行動

## 4. 最佳角度選擇
請選出最適合目前輸入目標的一個角度，並說明原因。

## 5. Hook 選項
提供 5 個 Hook，每個不超過 24 個中文字。
Hook 要具體、有痛點、不誇大、不醫療恐嚇。

## 6. 完整短影音腳本
依照影片長度輸出完整腳本。
格式固定為：
- 開頭 0-3 秒
- 痛點
- 核心觀念
- 生活例子
- 行動建議
- CTA

每段都要有自然口播，不要像教科書。

## 7. 字幕版腳本
每句不超過 18 個中文字，適合直接放在影片上。

## 8. 分鏡表
用 Markdown 表格輸出，欄位：
| 時間 | 畫面描述 | 口播 | 字卡 | B-roll | 圖像生成提示詞 |

圖像生成提示詞必須包含：
- 9:16
- 場景
- 人物
- 情緒
- 動作
- 構圖
- 光線
- 色調
- 不要出現錯字
- 不要在圖中生成過多文字

## 9. 封面標題
提供 5 個，每個不超過 16 個中文字。

## 10. IG 貼文文案
150 到 250 字，自然、不像廣告。

## 11. 留言引導
提供柔和版、直接版、互動版。

## 12. 自我評分
請用 1 到 10 分評估：
- 停留感
- 共鳴感
- 專業信任
- CTA 自然度
- 手機閱讀友善

## 13. 優化後版本
如果自我評分中任何項目低於 8 分，請重寫 Hook 和 CTA，並說明怎麼改。

安全規則：
- 不承諾一定瘦幾公斤
- 不使用醫療診斷語氣
- 不說保證有效
- 不貶低其他減重方式
- 不製造身材羞辱
- 不鼓勵極端節食
- 不把產品描述成治療疾病的工具
- 遇到疾病、懷孕、用藥、飲食疾患，建議尋求專業醫療人員協助`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [{ role: "user", content: [{ type: "input_text", text: prompt }] }],
      temperature: 0.55
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw createOpenAiError(response, data, "AI 深度腳本產生失敗。");
  return extractOutputText(data);
}

function extractHookOptions(markdown) {
  const hookSection = String(markdown || "").split("## 5. Hook 選項")[1]?.split("## 6.")[0] || "";
  return hookSection
    .split("\n")
    .map((line) => line.replace(/^[-*\d.、\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
}

function extractSelectedHook(markdown) {
  return extractHookOptions(markdown)[0] || "";
}

function createOpenAiError(response, data, fallbackMessage) {
  const error = new Error(data.error?.message || fallbackMessage);
  error.status = response.status;
  error.code = data.error?.code || data.error?.type || "";
  return error;
}

function normalizeOpenAiError(error) {
  const message = error.message || "AI 深度腳本產生失敗。";
  const lower = message.toLowerCase();
  if (lower.includes("exceeded your current quota") || lower.includes("insufficient_quota")) {
    return {
      status: 402,
      message: "OpenAI 額度不足或尚未完成付款設定。請到 OpenAI Platform 的 Billing 檢查是否有可用額度。"
    };
  }
  if (error.status === 401) {
    return {
      status: 401,
      message: "OpenAI API Key 無效或已失效。請重新建立 OPENAI_API_KEY，更新到 Vercel 後重新部署。"
    };
  }
  if (error.status === 429) {
    return {
      status: 429,
      message: "OpenAI 目前請求量或額度受限。請稍後再試，或檢查 OpenAI Platform 的 Usage 和 Billing。"
    };
  }
  return {
    status: error.status && error.status >= 400 ? error.status : 500,
    message
  };
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

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("請求資料太大。"));
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
