from pathlib import Path
import json
import re
root = Path(__file__).resolve().parents[1]
for f in ["AGENTS.md", "docs/index.html", "docs/assets/style.css", "docs/assets/app.js", "docs/assets/notes.js", "templates/note-template.js"]:
    assert (root / f).is_file(), f
data = (root / "docs/assets/notes.js").read_text()
notes = json.loads(data.removeprefix("window.NOTES = ").strip().removesuffix(";"))
assert notes and len({n["id"] for n in notes}) == len(notes), "Duplicate or missing notes"
sections = ["學習目標", "核心觀念", "範例說明", "常見誤解", "重點整理"]
for n in notes:
    assert re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", n["id"]), n["id"]
    assert n["category"] in ["基礎觀念", "預測方法", "實驗設計"]
    assert isinstance(n["minutes"], int) and n["minutes"] > 0
    assert [s["heading"] for s in n["sections"]] == sections
    assert all(s["body"] and all(isinstance(p, str) and p.strip() for p in s["body"]) for s in n["sections"])
    assert n["title"] and n["summary"] and re.fullmatch(r"\d{4}-\d{2}-\d{2}", n["updated"])
    assert isinstance(n["references"], list)
    assert all(r["label"] and r["url"].startswith(("http://", "https://")) for r in n["references"])
html = (root / "docs/index.html").read_text()
for path in re.findall(r'(?:src|href)="(\./[^"]+)"', html):
    assert (root / "docs" / path).is_file(), path
assert (root / "docs/AGENTS.md").read_bytes() == (root / "AGENTS.md").read_bytes(), "Run build.py to synchronize AGENTS.md"
print(f"PASS: {len(notes)} notes; schema, resource paths and AGENTS.md verified.")
