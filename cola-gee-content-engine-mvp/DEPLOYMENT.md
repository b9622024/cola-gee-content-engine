# 雲端部署：手機和電腦共用資料

這個版本可以部署到 Vercel，並使用 Supabase 儲存資料。完成後，你可以用手機瀏覽器打開同一個網址使用，手機與電腦會透過「雲端同步」共用同一份內容資料。

## 1. 建立 Supabase 專案

1. 到 Supabase 建立新專案。
2. 打開 SQL Editor。
3. 貼上 `supabase.sql` 的內容並執行。
4. 到 Project Settings → API，複製：
   - Project URL
   - service_role key

注意：`service_role key` 只能放在 Vercel 環境變數，不要放在前端畫面或公開文件。

## 2. 部署到 Vercel

把這個資料夾部署到 Vercel。環境變數請設定：

```text
SUPABASE_URL=你的 Supabase Project URL
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service_role key
APP_SYNC_TOKEN=自己設定一組長密碼
```

`APP_SYNC_TOKEN` 是你在手機和電腦同步時要輸入的同步金鑰，建議至少 20 個字元。

## 3. 第一次同步

1. 用電腦打開 Vercel 網址。
2. 到「設定 → 雲端同步」。
3. 工作區 ID 可先用預設值：`cola-gee-main`。
4. 同步金鑰填入你在 Vercel 設定的 `APP_SYNC_TOKEN`。
5. 點「儲存同步設定」。
6. 點「上傳到雲端」。

## 4. 手機使用

1. 手機打開同一個 Vercel 網址。
2. 到「設定 → 雲端同步」。
3. 輸入同一個工作區 ID 和同步金鑰。
4. 點「從雲端下載」。

之後你可以在任何裝置手動上傳或下載，讓資料保持一致。

## 5. 目前同步方式

MVP 採用手動同步：

- 電腦改完內容後，點「上傳到雲端」。
- 手機要取得最新內容，點「從雲端下載」。
- 手機改完資料後，也可以點「上傳到雲端」。

這樣比自動同步更不容易覆蓋掉你正在編輯的內容。未來可以再升級成自動同步、登入帳號、多工作區或多人協作。
