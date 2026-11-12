/* 共用渲染器：文章只編輯 notes.js；不把筆記字串當成 HTML 執行。 */
const notes = window.NOTES;
const $ = (s) => document.querySelector(s);
let category = "全部";
function el(tag, text, cls) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function renderCards() {
  const query = $("#search").value.trim().toLocaleLowerCase();
  const filtered = notes.filter(n => (category === "全部" || n.category === category) &&
    [n.title, n.summary, n.category].join(" ").toLocaleLowerCase().includes(query));
  const grid = $("#note-grid");
  grid.replaceChildren();
  $("#note-count").textContent = String(notes.length).padStart(2, "0");
  $("#result-count").textContent = "顯示 " + filtered.length + " 篇筆記";
  filtered.forEach(n => {
    const card = el("a", undefined, "note-card");
    card.href = "#note/" + n.id;
    const top = el("div", undefined, "card-top");
    top.append(el("span", n.category, "tag"), el("span", String(notes.indexOf(n) + 1).padStart(2, "0") + " / NOTE"));
    const bottom = el("div", undefined, "card-bottom");
    bottom.append(el("span", n.minutes + " 分鐘閱讀 · " + n.updated), el("span", "↗"));
    card.append(top, el("h3", n.title), el("p", n.summary), bottom);
    grid.append(card);
  });
  if (!filtered.length) grid.append(el("p", "找不到符合的筆記，試試其他關鍵字或分類。", "empty"));
}
$("#search").addEventListener("input", renderCards);
document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
  category = button.dataset.category;
  document.querySelectorAll("[data-category]").forEach(b => {
    const selected = b === button;
    b.classList.toggle("selected", selected);
    b.setAttribute("aria-pressed", String(selected));
  });
  renderCards();
}));
function renderArticle(id) {
  const target = $("#article-view");
  target.replaceChildren();
  const back = el("a", "← 返回筆記總覽", "article-back");
  back.href = "#home";
  target.append(back);
  const note = notes.find(n => n.id === id);
  if (!note) {
    target.append(el("h1", "找不到這篇筆記"), el("p", "請回到總覽選擇筆記，或確認網址是否正確。"));
    document.title = "找不到筆記｜CellNotes";
    return;
  }
  document.title = note.title + "｜CellNotes";
  const head = el("div", undefined, "article-head");
  head.append(el("span", note.category, "tag"), el("h1", note.title, "page-title"),
    el("p", note.summary, "lead"), el("div", note.minutes + " 分鐘閱讀 · 更新 " + note.updated, "article-meta"));
  const body = el("div", undefined, "article-body");
  note.sections.forEach(s => {
    const section = el("section");
    section.append(el("h2", s.heading));
    s.body.forEach(p => section.append(el("p", p)));
    body.append(section);
  });
  const refs = el("section");
  refs.append(el("h2", "資料來源與註記"));
  if (!note.references.length) refs.append(el("p", "本站教學整理；數值範例為假設，不引用特定研究的實驗結果。"));
  note.references.forEach(ref => {
    const a = el("a", ref.label);
    if (/^https?:\/\//.test(ref.url)) a.href = ref.url;
    const paragraph = el("p");
    paragraph.append(a);
    refs.append(paragraph);
  });
  body.append(refs);
  target.append(head, body);
}
function route() {
  const hash = location.hash.slice(1);
  const type = hash.startsWith("note/") ? "article" : ["lab", "about"].includes(hash) ? hash : "home";
  ["home", "article", "lab", "about"].forEach(v => $("#" + v + "-view").hidden = v !== type);
  document.querySelectorAll("[data-nav]").forEach(a => {
    const active = a.dataset.nav === (type === "article" ? "home" : type);
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (type === "article") renderArticle(hash.slice(5));
  else document.title = ({home:"電池壽命研究筆記",lab:"互動實驗室",about:"關於這個專案"})[type] + "｜CellNotes";
  window.scrollTo(0, 0);
  $("#main").focus({preventScroll:true});
}
function calculate(c0, rate, current, percent) {
  const exactEnd = c0 * (1 - percent / 100) / rate;
  const end = Math.ceil(exactEnd - 1e-9);
  return {end, rul:Math.max(0, end - current), capacity:Math.max(0, c0 - rate * current), threshold:c0 * percent / 100};
}
function renderLab() {
  if (!$("#lab-form").checkValidity()) { $("#lab-form").reportValidity(); return; }
  const c0 = Number($("#initial").value), rate = Number($("#rate").value), current = Number($("#current").value), percent = Number($("#threshold").value);
  const r = calculate(c0, rate, current, percent);
  const output = $("#lab-result");
  output.replaceChildren();
  output.append(el("div", "預估剩餘循環 / 假設模型", "eyebrow"));
  const number = el("div", r.rul.toLocaleString(), "result-number");
  number.append(el("small", "cycles"));
  output.append(number, el("p", "門檻容量 " + r.threshold.toFixed(3) + " Ah · 第 " + r.end.toLocaleString() + " cycle 到達門檻", "muted"));
  if (current >= r.end) output.append(el("p", "目前已達設定失效門檻，RUL 顯示為 0。", "notice"));
  const svg = $("#lab-chart");
  svg.replaceChildren();
  const ns = "http://www.w3.org/2000/svg";
  function draw(tag, attrs, text) { const n = document.createElementNS(ns, tag); Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k, v)); if(text !== undefined) n.textContent=text; svg.append(n); }
  const maxX = Math.max(10, Math.ceil(r.end * 1.3), current);
  const x = k => 55 + 520 * k / maxX, y = c => 220 - 180 * c / c0;
  draw("path", {d:"M55 25V220H580",fill:"none",stroke:"#bbc8b8"});
  [0,.5,1].forEach(v => { draw("line",{x1:55,y1:y(c0*v),x2:580,y2:y(c0*v),stroke:"#e0e6d9"}); draw("text",{x:45,y:y(c0*v)+4,"text-anchor":"end",fill:"#647469","font-size":11},(c0*v).toFixed(1)); });
  draw("line",{x1:55,y1:y(r.threshold),x2:580,y2:y(r.threshold),stroke:"#a57a48","stroke-dasharray":"5 5"});
  draw("text",{x:60,y:y(r.threshold)-8,fill:"#916b43","font-size":12},"失效門檻 " + percent + "%");
  const last = Math.min(maxX,c0/rate);
  draw("path",{d:"M55 " + y(c0) + " L" + x(last) + " " + y(Math.max(0,c0-rate*last)),fill:"none",stroke:"#285a42","stroke-width":3});
  draw("circle",{cx:x(current),cy:y(r.capacity),r:5,fill:"#285a42"});
  draw("text",{x:Math.min(510,x(current)+8),y:Math.max(25,y(r.capacity)-10),fill:"#285a42","font-size":12},"目前 cycle");
  draw("text",{x:55,y:245,fill:"#647469","font-size":11},"0");
  draw("text",{x:575,y:245,"text-anchor":"end",fill:"#647469","font-size":11},maxX + " cycles");
  draw("text",{x:15,y:18,fill:"#647469","font-size":11},"Ah");
}
$("#lab-form").addEventListener("submit", e => { e.preventDefault(); renderLab(); });
window.addEventListener("hashchange", route);
renderCards(); renderLab(); route();
