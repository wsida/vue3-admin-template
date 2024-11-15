import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { exec } from "child_process";

// 源目录和目标目录
const sourceDir = path.resolve("./src/components/");
const targetDir = path.resolve("./docs/components/");

const configs = [];

// 创建目标目录
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

console.log("🔵build components start...");

const deepReaddirSync = parentPath => {
  // 读取源目录中的所有文件
  fs.readdirSync(parentPath).forEach(file => {
    const sourcePath = path.join(parentPath, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      deepReaddirSync(sourcePath);
    } else {
      if (path.extname(file).toLowerCase() === ".md") {
        const filename = path.parse(file).name;
        const targetPath = path.join(targetDir, file); // 读取文件

        // 复制文件
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`🟡copy component: ${filename}`);
        // 读取Markdown文件内容
        const markdownContent = fs.readFileSync(targetPath, "utf8");
        // 解析Markdown文件的frontmatter
        const { data } = matter(markdownContent);
        configs.push({
          text: data.title || filename,
          link: `/components/${filename}`
        });
        /* const onFileChange = (eventType, filename) => {
          // curr 是当前的状态
          // prev 是之前的状态
          // 检查文件内容是否有变化
          console.log(eventType);
          if (eventType === "change") {
            console.log(`🟣component change: ${filename}`);
            fs.copyFileSync(sourcePath, targetPath);
          }
        };
        // 监听文件变化
        fs.watch(sourcePath, onFileChange); */
        // 当需要停止监听时，可以调用unwatchFile
        /* process.on("SIGINT", () => {
          // console.log('\n程序被用户中断, 正在关闭监听器...');
          watcher.close(); // 取消监听
          process.exit(); // 结束进程
        }); */
      }
    }
  });
};

deepReaddirSync(sourceDir);

fs.writeFileSync(
  path.join(targetDir, "config.json"),
  JSON.stringify(configs, null, 2)
);

console.log("🟢build components end...");
