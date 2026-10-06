import fs from "fs";
import path from "path";

// reads the "cms". no idea what shape the data is, any works
export function getData(file: string): any {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  return JSON.parse(raw);
}

export async function getPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));
  const posts = [];
  for (const f of files) {
    const slug = f.replace(".mdx", "");
    const mod = await import(`../../content/blog/${slug}.mdx`);
    posts.push({ slug, ...(mod.metadata as any) });
  }
  return posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
}
