# GitHub 上傳與公開網站

## 1. 本機先看成果
解壓縮 battery-notes-homework.zip，開啟 docs/index.html。

## 2. 建立 Repository
1. 登入 https://github.com/ ，按右上角 + → New repository。
2. Repository name 填 battery-notes；選 Public；建立儲存庫。
3. 選 uploading an existing file，或 Add file → Upload files。
4. 把解壓縮後的「內容」上傳：AGENTS.md、README.md、docs、templates、scripts 等。不要只上傳 ZIP，也不要讓外面多一層 battery-notes 資料夾。
5. 按 Commit changes。確認 Repository 根目錄能看到 AGENTS.md 與 docs 資料夾。

## 3. 啟用 GitHub Pages
1. 進入 Repository 的 Settings → Pages。
2. Build and deployment 下的 Source 選 Deploy from a branch。
3. Branch 選 main，資料夾選 /docs，按 Save。
4. 等待部署完成，在 Pages 頁面取得實際網站連結。
5. 使用無痕視窗開啟該連結，確認不登入也能瀏覽。

Repo 連結格式：https://github.com/你的帳號/battery-notes
網站連結格式：https://你的帳號.github.io/battery-notes/
上面是格式，不是已建立的真實網址；繳交時用 Pages 頁面顯示的實際連結。

## 4. 繳交前
- 在 SUBMISSION.md 補上學號及兩個實際連結。
- 確認姓名與系級正確；沒有提供的資料不要猜填。
- 搜尋 SOH、切換分類、開啟文章與互動示範。
- AGENTS.md 可附檔，也可附 Repository 中的檔案連結。
- 確認老師能從公開網址瀏覽網站與 Repository。

## 若網站 404
確認 Pages 已部署完成、來源為 main /docs、docs 內有 index.html，且使用的網址大小寫及 repository 名稱正確。

官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
