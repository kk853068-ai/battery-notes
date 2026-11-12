# CellNotes｜電池壽命研究筆記

以 AGENTS.md 規範內容與開發流程的繁體中文個人知識庫。含 4 篇筆記、搜尋、分類、文章閱讀、線性容量與 RUL 互動示範，以及專案介紹。

## 快速使用
直接以瀏覽器開啟 docs/index.html，不需安裝套件，也不需 API key。所有程式與樣式均位於專案內，不依賴 CDN。
如有 Python，可在專案根目錄執行 python3 -m http.server 8000，再開啟 http://localhost:8000/docs/。

## 檔案說明
| 檔案 | 用途 |
| --- | --- |
| AGENTS.md | AI 延續開發時必讀的規則 |
| docs/index.html | 網頁外殼 |
| docs/assets/style.css | 全站樣式與手機版 |
| docs/assets/notes.js | 筆記資料的唯一來源 |
| docs/assets/app.js | 搜尋、分類、路由與計算 |
| templates/note-template.js | 新增筆記的物件範本 |
| scripts/check.py | 資料與路徑驗證 |
| scripts/build.py | 同步規則副本並產生其他代管平台用的 dist |
| SUBMISSION.md | 繳交文字草稿 |
| GITHUB_GUIDE.md | GitHub 上傳及公開網站步驟 |

## 新增一篇筆記
1. 先讀 AGENTS.md，複製 templates/note-template.js 的物件。
2. 填寫唯一 id、標題、分類、摘要、閱讀時間、日期、五段正文及來源。
3. 將物件加入 docs/assets/notes.js 的 window.NOTES 陣列；注意物件間的逗號。
4. 首頁數量、搜尋、分類及 #note/id 閱讀頁會自動使用新資料。
5. 執行 python3 scripts/build.py，再執行 python3 scripts/check.py。
6. 檢查文章與手機排版，再提交變更。

可向 AI 下指令：「先閱讀 AGENTS.md，新增『溫度對容量量測的影響』，沿用固定格式，完成資料與介面檢查。」

## 教學示範
容量模型：C(k) = C0 − r × k。達到門檻的 cycle 向上取整；RUL 不小於 0。
預設 C0=2 Ah、r=0.002 Ah/cycle、目前第 100 cycle、門檻 80%，結果為第 200 cycle 到達門檻，RUL=100 cycles。
數據為假設。未訓練 CNN-GRU，未執行粒子濾波，不是電池壽命的實際預測服務。

## 發布
GitHub Pages：main 分支的 /docs 目錄。詳見 GITHUB_GUIDE.md。
其他靜態代管平台：python3 scripts/build.py 後使用 dist。
請勿將代管平台私有設定、token 或不必要個人資料加入公開 Repository。
