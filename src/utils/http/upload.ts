import { isEmpty, isNull, isObject, isUndefined } from "lodash-es";
import type { UploadConfig } from "./types";

const FILE_PARAM_NAME = "file";

export function uploadFiles(
  url: string,
  files: FileList,
  cfg: UploadConfig
): Promise<any> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    if (files.length > 1) {
      for (let i = 0; i < files.length; i++) {
        formData.append(`${FILE_PARAM_NAME}${i}`, files[i]);
      }
    } else {
      formData.append(`${FILE_PARAM_NAME}`, files[0]);
    }

    if (cfg.params && !isEmpty(cfg.params)) {
      for (const key of Object.keys(cfg.params)) {
        if (
          isUndefined(cfg.params[key]) ||
          isNull(cfg.params[key]) ||
          isNaN(cfg.params[key])
        )
          continue;
        if (isObject(cfg.params[key])) {
          formData.append(key, JSON.stringify(cfg.params[key]));
        } else {
          formData.append(key, cfg.params[key].toString());
        }
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", url, true);

    // 设置自定义头部
    if (cfg.headers) {
      Object.keys(cfg.headers).forEach(key => {
        xhr.setRequestHeader(key, cfg.headers[key]);
      });
    }

    xhr.onprogress = function (e: any) {
      const precent = parseFloat(((e.loaded / e.total) * 100).toFixed(2));
      cfg?.onProcess?.(precent, e.loaded, e.total);
    };

    xhr.onload = function () {
      if (this.status === 200) {
        cfg?.onSuccess?.(xhr.response);
        resolve(xhr.response);
      } else {
        cfg?.onError?.(xhr.response);
        reject(xhr.response);
      }
    };

    xhr.onerror = function (e) {
      cfg?.onError?.(e);
      reject(e);
    };

    xhr.send(formData);
  });
}
