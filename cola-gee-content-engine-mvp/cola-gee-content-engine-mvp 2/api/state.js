const TABLE = "content_engine_states";

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const syncToken = process.env.APP_SYNC_TOKEN;
  const workspaceId = String(req.query.workspace_id || "cola-gee-main");
  const requestToken = req.headers["x-sync-token"];

  if (!supabaseUrl || !serviceRoleKey || !syncToken) {
    return send(res, 500, {
      error: "缺少雲端環境變數，請在 Vercel 設定 SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY、APP_SYNC_TOKEN。"
    });
  }

  if (!requestToken || requestToken !== syncToken) {
    return send(res, 401, { error: "同步金鑰不正確。" });
  }

  if (req.method === "GET") {
    const url = `${supabaseUrl}/rest/v1/${TABLE}?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=payload,updated_at&limit=1`;
    const response = await supabaseFetch(url, serviceRoleKey, { method: "GET" });
    const rows = await response.json();
    if (!response.ok) return send(res, response.status, { error: rows.message || "讀取 Supabase 失敗。" });
    return send(res, 200, rows[0] || { payload: null, updated_at: null });
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    if (!body.payload) return send(res, 400, { error: "缺少 payload。" });
    const url = `${supabaseUrl}/rest/v1/${TABLE}?on_conflict=workspace_id`;
    const response = await supabaseFetch(url, serviceRoleKey, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({
        workspace_id: workspaceId,
        payload: body.payload,
        updated_at: new Date().toISOString()
      })
    });
    const data = await response.json();
    if (!response.ok) return send(res, response.status, { error: data.message || "寫入 Supabase 失敗。" });
    return send(res, 200, data[0] || { ok: true });
  }

  res.setHeader("Allow", "GET, POST");
  return send(res, 405, { error: "不支援的請求方法。" });
};

async function supabaseFetch(url, serviceRoleKey, options) {
  return fetch(url, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error("payload too large"));
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
