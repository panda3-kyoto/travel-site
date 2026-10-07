import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const imagesDir = path.join(process.cwd(), "public/images");
const postsFile = path.join(process.cwd(), "data/posts.ts");

// フォルダ名と slug が違う都市だけここに書く
const FOLDER_TO_SLUG: Record<string, string> = {
  hochiminhcity: "hochiminh",
};

const SIZE = "medium";

// 実際の縦横を判定（EXIFの回転も考慮）
function getOrientation(file: string): "portrait" | "landscape" {
  try {
    const out = execSync(
      `sips -g pixelWidth -g pixelHeight -g orientation "${file}"`
    ).toString();
    const w = parseInt(out.match(/pixelWidth:\s*(\d+)/)?.[1] ?? "0");
    const h = parseInt(out.match(/pixelHeight:\s*(\d+)/)?.[1] ?? "0");
    const o = parseInt(out.match(/orientation:\s*(\d+)/)?.[1] ?? "1");
    const rotated = o >= 5 && o <= 8;
    const width = rotated ? h : w;
    const height = rotated ? w : h;
    return height > width ? "portrait" : "landscape";
  } catch {
    return "landscape";
  }
}

// 文字列リテラルを飛ばしながら、対応する閉じ括弧の位置を探す
function findClosingBracket(text: string, openIndex: number): number {
  let depth = 0;
  let inStr: string | null = null;
  for (let i = openIndex; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

let content = fs.readFileSync(postsFile, "utf-8");
let totalAdded = 0;

for (const folder of fs.readdirSync(imagesDir)) {
  const dir = path.join(imagesDir, folder);
  if (!fs.statSync(dir).isDirectory() || folder === "about") continue;

  const slug = FOLDER_TO_SLUG[folder] ?? folder;

  const files = fs
    .readdirSync(dir)
    .filter((f) => /^\d+\.(jpeg|jpg)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));
  if (files.length === 0) continue;

  // その都市のブロックの位置を探す
  const slugMatch = new RegExp(`slug:\\s*"${slug}",\\s*\\n\\s*title:`).exec(content);
  if (!slugMatch) {
    console.log(`⚠ ${folder}: posts.ts に slug "${slug}" がありません（先に都市を追加してください）`);
    continue;
  }

  const photosKey = content.indexOf("photos:", slugMatch.index);
  const open = content.indexOf("[", photosKey);
  const close = findClosingBracket(content, open);
  if (photosKey === -1 || open === -1 || close === -1) continue;

  const inner = content.slice(open + 1, close);

  // すでに載っている写真は飛ばす
  const newFiles = files.filter((f) => !inner.includes(`/images/${folder}/${f}"`));
  if (newFiles.length === 0) continue;

  const entries = newFiles
    .map((f) => {
      const num = parseInt(f);
      const orientation = getOrientation(path.join(dir, f));
      return `      { slug: "p${num}", image: "/images/${folder}/${f}", alt: "${capitalize(slug)} photo ${num}", orientation: "${orientation}", size: "${SIZE}", note: ["test"] },`;
    })
    .join("\n");

  let head = inner.replace(/\s+$/, "");
  if (head !== "" && !head.endsWith(",")) head += ",";
  const newInner = (head === "" ? "" : head) + "\n" + entries + "\n    ";

  content = content.slice(0, open + 1) + newInner + content.slice(close);
  totalAdded += newFiles.length;
  console.log(`✓ ${folder}: +${newFiles.length} photos`);
}

fs.writeFileSync(postsFile, content, "utf-8");
console.log(`✅ posts.ts updated (${totalAdded} photos added)`);