const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname.startsWith("/api/")) {
    res.writeHead(501, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(JSON.stringify({ error: "本機伺服器未啟用雲端 API，請部署到 Vercel 後使用雲端同步或 AI 影片分析。" }));
    return;
  }
  let filePath = path.join(root, url.pathname === "/" ? "index.html" : url.pathname);
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, "index.html"), (fallbackErr, fallback) => {
        if (fallbackErr) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": types[".html"] });
        res.end(fallback);
      });
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Content engine running at http://${host}:${port}`);
});
