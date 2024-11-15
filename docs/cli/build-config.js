import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 源目录和目标目录
const targetDir = path.resolve("./docs/");

const dirs = ["components", "guide", "rules"];

// 创建目标目录
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

dirs.forEach(dir => {
  console.log(`🔵build ${dir} json start...`);
  const configs = [];
  const targetPath = path.join(targetDir, dir);
  fs.readdirSync(targetPath).forEach(file => {
    const targetFile = path.join(targetPath, file);
    const stat = fs.statSync(targetFile);
    if (!stat.isDirectory()) {
      if (path.extname(file).toLowerCase() === ".md") {
        const filename = path.parse(file).name;
        console.log(`🟡resolve file: ${dir}/${filename}`);
        // 读取Markdown文件内容
        const markdownContent = fs.readFileSync(targetFile, "utf8");
        // 解析Markdown文件的frontmatter
        const { data } = matter(markdownContent);
        configs.push({
          text: data.title || filename,
          link: `/${dir}/${filename}`
        });
      }
    }
  });

  fs.writeFileSync(
    path.join(targetPath, "config.json"),
    JSON.stringify(configs, null, 2)
  );

  console.log(`🟢build ${dir} json start...`);
});
