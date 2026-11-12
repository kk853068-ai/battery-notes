# CellNotes — AI 專案協作規則

## 1. 專案目的與範圍
建立繁體中文的「電池壽命研究筆記網站」，協助初學者理解容量、SOH、RUL 與預測方法。網站是教學知識庫，不是實驗結果發表平台；不可把示意數據描述成真實電池測試結果。
修改前先讀本檔、README.md、docs/assets/notes.js，再依既有格式新增內容。

## 2. 技術與檔案結構
- 純 HTML、CSS、JavaScript；不需要 npm、API key、資料庫或外部 CDN。
- docs/index.html：首頁、筆記閱讀區與互動示範的共用外殼。
- docs/assets/style.css：全站唯一主要樣式；沿用 CSS 變數。
- docs/assets/notes.js：所有筆記的單一資料來源，定義 window.NOTES 陣列。
- docs/assets/app.js：搜尋、分類、文章路由、示範計算與 DOM 更新。
- templates/note-template.js：新增筆記的欄位範本，不直接載入網站。
- scripts/check.py：檢查必要檔案、相對資源路徑與公開檔案。
- scripts/build.py：把 docs 複製成 dist；dist 是產物，不手動修改。
- README.md：本機使用、GitHub Pages 發布與新增筆記說明。
- SUBMISSION.md：繳交內容草稿；學號與連結需填寫實際值。
- 檔名使用小寫英文與連字號；資源用相對路徑，不可使用 /assets 之類根目錄路徑，避免 GitHub 專案子路徑失效。

## 3. 視覺與可用性
繁體中文為主，首次使用縮寫需說明。維持奶白背景、深綠文字、薄荷綠重點色；沿用 --paper、--ink、--accent、--line 變數。桌面使用側欄與內容區，窄螢幕改為上方導覽。主要區塊最大寬度 1100px，正文至少 16px、行高至少 1.7。
所有功能必須可用鍵盤操作；保留 :focus-visible；表單有 label；互動使用 button，不以 div 模擬按鈕。不得只以顏色區分狀態。無圖片時不加入無關裝飾圖片。

## 4. 筆記固定格式
每篇是 window.NOTES 陣列內的一個物件，欄位不可省略：
- id：唯一 kebab-case 英文字串，也是網址 #note/id 的識別碼。
- title：繁體中文標題，建議 8–24 字。
- category：只用「基礎觀念」、「預測方法」、「實驗設計」之一；要新增分類必須同時更新此規則與介面。
- summary：一至兩句導讀，不含 HTML。
- minutes：正整數，估計閱讀分鐘。
- updated：YYYY-MM-DD，使用實際修改日期。
- sections：陣列，依序包含「學習目標」、「核心觀念」、「範例說明」、「常見誤解」、「重點整理」；每項有 heading 與 body，body 為純文字段落陣列。
- references：陣列，每項有 label 與 url。沒有引用特定外部來源時可用空陣列，介面標示「本站教學整理」；引用論文、特定資料集規格或研究結果必須附可核對的原始來源，不能捏造。
正文不放 HTML，使用 textContent 輸出。公式用可讀的純文字並說明變數、單位及條件。示意數字必須明確註記。

## 5. 新增內容工作流程
1. 讀取既有 notes.js，確認 id 不重複。
2. 複製 templates/note-template.js 的物件，填完整欄位。
3. 加入 docs/assets/notes.js 的 window.NOTES 陣列。不要另外複製一份首頁或文章版型。
4. 確認搜尋能以標題、摘要、分類找到新筆記；首頁數量由資料自動計算。
5. 開啟 #note/新-id，確認五段內容、返回按鈕、來源標示正常。
6. 執行 python3 scripts/check.py 與 python3 scripts/build.py；若有 Node.js，執行 node --check docs/assets/app.js 與 node --check docs/assets/notes.js。
7. 檢查桌面與手機版、搜尋無結果、文章不存在的情況。
8. 在完成回報中列出改動檔案、驗證結果、尚未完成的項目；不可宣稱尚未執行的測試成功。

## 6. 內容與示範規則
SOH 以目前容量除以參考容量表示，但需交代量測條件。RUL 的定義需指定當前 cycle、失效門檻及預測到達門檻的 cycle。不得把常用的 80% 說成所有電池的必然失效標準。
互動工具只示範線性容量模型 C(k)=C0-r×k；必須標示「教學假設，非真實預測」，不得暗示已執行 CNN-GRU 或粒子濾波。更改公式時同步修改畫面解釋與驗證案例。
不能虛構個人成績、研究精度、論文結論或引用來源。

## 7. 修改限制與發布
保留既有功能與文章 id，避免舊連結失效。避免無需求的大改、加入追蹤碼或額外依賴。不提交密碼、token、API key、個人學號等不必要資料。新增依賴需說明理由。
GitHub Pages 的來源為 main 分支 /docs。網站檔案的唯一編輯來源是 docs；若有其他代管平台，先執行 build.py 同步 dist。只有實際發布成功才能回報公開網址。

## 8. 可直接使用的擴充指令
「請先閱讀 AGENTS.md，依 templates/note-template.js 新增一篇『溫度對容量量測的影響』筆記，分類為實驗設計，保留五段固定結構，區分暫時容量變化與長期老化；新增至 notes.js，確認搜尋、分類、文章路由及手機版正常，最後回報驗證結果。」
