import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// "added" = フォルダに入れた順（追加日時）
// "name"  = ファイル名順
const ORDER: "added" | "name" = "added";

const imagesDir = path.join(process.cwd(), "public/images");
const isPhoto = (f: string) => /\.(jpe?g|png|heic)$/i.test(f);

// フォルダに追加された日時
function addedAt(file: string): number {
  try {
    const out = execSync(
      `mdls -name kMDItemDateAdded -raw "${file}"`
    ).toString();
    const t = Date.parse(out.replace(" +0000", "Z").replace(" ", "T"));
    if (!isNaN(t)) return t;
  } catch {}
  return fs.statSync(file).birthtimeMs;
}

function sortFiles(files: string[]): string[] {
  if (ORDER === "added") {
    return files.sort((a, b) => addedAt(a) - addedAt(b));
  }
  return files.sort((a, b) =>
    path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true })
  );
}

for (const city of fs.readdirSync(imagesDir)) {
  const dir = path.join(imagesDir, city);
  if (!fs.statSync(dir).isDirectory() || city === "about") continue;

  const files = fs.readdirSync(dir).filter(isPhoto);

  // すでに cover.jpeg や 1.jpeg がある都市は触らない
  const alreadyNamed = files.some((f) => /^(cover|\d+)\.jpe?g$/i.test(f));
  if (files.length === 0 || alreadyNamed) continue;

  const sorted = sortFiles(files.map((f) => path.join(dir, f)));

  // 名前の衝突を避けるため、一旦仮の名前にしてから本番の名前へ
  const tmp = sorted.map((f, i) => {
    const t = path.join(dir, `__tmp_${i}.jpeg`);
    fs.renameSync(f, t);
    return t;
  });

  tmp.forEach((t, i) => {
    const name = i === 0 ? "cover.jpeg" : `${i}.jpeg`;
    fs.renameSync(t, path.join(dir, name));
  });

  console.log(`✓ ${city}: cover + ${tmp.length - 1} photos`);
}