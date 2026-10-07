import fs from "fs";
import path from "path";

// .env.local を読み込む
const env = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
for (const line of env.split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const KEY = process.env.NOTION_API_KEY;
const DB = process.env.NOTION_DATABASE_ID;
const headers = {
  Authorization: `Bearer ${KEY}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

// notes.ts から配列を取り出す（簡易: TSをJSとして評価）
const src = fs.readFileSync(path.join(process.cwd(), "data/notes.ts"), "utf-8");
const start = src.indexOf("export const notes");
const arrStart = src.indexOf("[", src.indexOf("=", start));
const arrEnd = src.lastIndexOf("]");
const notes = new Function(`return ${src.slice(arrStart, arrEnd + 1)}`)();

// 1. データベースが見えるか確認
const check = await fetch(`https://api.notion.com/v1/databases/${DB}`, { headers });
if (!check.ok) {
  console.error("❌ データベースが見つかりません:", await check.text());
  console.error("→ IDが違うか、Connections に travel-notes が追加されていません");
  process.exit(1);
}
const db = await check.json();
const titleProp = Object.entries(db.properties).find(([, v]) => v.type === "title")[0];
console.log(`✓ データベース確認OK (タイトル列: ${titleProp})`);

// 2. 17件を登録
for (const note of notes) {
  const children = note.body.map((text) => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: text ? [{ type: "text", text: { content: text.slice(0, 2000) } }] : [],
    },
  }));

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      parent: { database_id: DB },
      properties: {
        [titleProp]: { title: [{ text: { content: note.title } }] },
        Date: { date: { start: note.date } },
        Published: { checkbox: true },
      },
      children: children.slice(0, 100),
    }),
  });

  console.log(res.ok ? `✓ ${note.date} ${note.title}` : `❌ ${note.title}: ${await res.text()}`);
  await new Promise((r) => setTimeout(r, 400));
}
console.log("完了");