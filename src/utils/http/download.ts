import { isNull, isObject, isUndefined } from "lodash-es";

const iframTarget = "download_iframe"; // iframe id
/**
 * 基于formdata表单数据提交下载 - 需要提供一个iframe
 */
export function downloadByData(
  method = "GET",
  url: string,
  data: Record<string, any>
) {
  let form = document.createElement("form");
  form.id = "downloadForm";
  // form.name = "downloadForm";
  form.style.display = "none";
  form.setAttribute("target", iframTarget);
  document.body.appendChild(form);

  for (let key in data) {
    if (isUndefined(data[key]) || isNull(data[key]) || isNaN(data[key]))
      continue;
    let input = document.createElement("input"); //创建 input 标签并传入 form 中，作为 form 的表单的发送参数
    input.type = "text";
    input.name = key;
    input.value = isObject(data[key])
      ? JSON.stringify(data[key])
      : data[key].toString();
    form.appendChild(input);
  }
  form.method = method;
  form.action = url; // form 表单发送的地址
  form.submit();
  document.body.removeChild(form);
}

/**
 * 基于a标签对url内容进行下载 - a标签下载具有同源策略/浏览器批量限制
 * @param url 下载资源url
 * @param filename 文件名
 */
export function downloadByUrl(url: string, filename: string): void {
  let a = document.createElement("a");
  // @ts-ignore
  a.style = "display: none";
  a.download = filename;
  a.href = url;
  document.body.appendChild(a);
  a.click(); // 触发a标签的click事件
  document.body.removeChild(a);
}

/**
 * 基于数据流下载
 * @param url 数据流请求url
 * @param filename 文件名
 */
export function downloadByBlob(url: string, filename: string) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    if (xhr.status === 200) {
      // 将视频Blob对象创建一个临时URL
      let videoBlob = xhr.response;
      let url = window.URL.createObjectURL(videoBlob);

      // 设置a标签的属性，并触发点击事件进行下载
      let a = document.createElement("a");
      // @ts-ignore
      a.style = "display: none";
      a.download = filename;
      a.href = url;
      a.click();

      // 释放URL对象
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  };
  xhr.send();
}
