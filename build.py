from pathlib import Path
import shutil
root = Path(__file__).resolve().parents[1]
shutil.copy2(root / "AGENTS.md", root / "docs/AGENTS.md")
shutil.copytree(root / "docs", root / "dist", dirs_exist_ok=True)
print("Built dist from docs; synchronized AGENTS.md.")
