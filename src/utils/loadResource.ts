export function loadScript(url: string, callback?: Function) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  // 当脚本加载完成并执行后触发回调函数
  if (script.readyState) {
    // 仅限IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback && callback();
      }
    };
  } else {
    // 其他浏览器
    script.onload = function () {
      callback && callback();
    };
  }

  // 设置脚本URL开始加载
  script.src = url;
  document.getElementsByTagName("body")[0].appendChild(script);
}
