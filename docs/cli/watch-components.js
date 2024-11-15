import fs from "fs";
import path from "path";

// 源目录和目标目录
const sourceDir = path.resolve("./src/components/");
const targetDir = path.resolve("./docs/components/");

console.log("🟣watch components");

const deepReaddirSync = parentPath => {
  // 读取源目录中的所有文件
  fs.readdirSync(parentPath).forEach(file => {
    const sourcePath = path.join(parentPath, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      deepReaddirSync(sourcePath);
    } else {
      if (path.extname(file).toLowerCase() === ".md") {
        const targetPath = path.join(targetDir, file); // 读取文件
        const onFileChange = (eventType, filename) => {
          // curr 是当前的状态
          // prev 是之前的状态
          // 检查文件内容是否有变化
          if (eventType === "change" || eventType === "update") {
            console.log(`🟣component change: ${filename}`);
            fs.copyFileSync(sourcePath, targetPath);
          }
        };
        // 监听文件变化
        const watcher = fs.watch(sourcePath, onFileChange);
        // 当需要停止监听时，可以调用unwatchFile
        process.on("SIGINT", () => {
          // console.log('\n程序被用户中断, 正在关闭监听器...');
          watcher.close(); // 取消监听
          process.exit(); // 结束进程
        });
      }
    }
  });
};

deepReaddirSync(sourceDir);
