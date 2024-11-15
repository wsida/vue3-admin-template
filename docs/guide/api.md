---
title: 接口调用说明
---

# 接口调用说明

## 目录

- 📂 api

## 预设响应数据结构

```ts
interface ResponseData {
  code: number; // 接口内置的状态码，0-成功
  data: any; // 接口响应数据
  message: string; // 接口返回信息-异常/成功
}
```

通过axios的响应拦截对响应数据进行解构处理，如根据code返回响应数据，或者跳转页面，或者统一消息提示message字段内容。

## 工具方法

- 📂 utils
  - 📂 http
    - 📄 index.ts

目录基于Axios封装了了Http类，index导出了http类实例：

```ts
export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
  post<T>(
    url: string,
    params?: AxiosRequestConfig["data"],
    config?: PureHttpRequestConfig
  ): Promise<T>;
  get<T>(
    url: string,
    params?: AxiosRequestConfig["params"],
    config?: PureHttpRequestConfig
  ): Promise<T>;
}
```

提供 `request`，`post`，`get` 三种基础接口调用方法。

可以在index.ts修改axios请求拦截，以及接口基础配置。

```ts
  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    ...
  }
  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    ...
  }
```

:::info 小TIP
http实例方法，自动根据请求方式，按照以下规则默认传递参数，如果需要额外参数，可以通过手动配置axios调用配置传递：<br/>

- get: 通过axios.params传参
- 其他: 通过axios.data传参
  :::

## 接口声明

- 根据功能模块创建文件
- 文件中引用 http 实例
  `import {http} from "@/utils/http";`
- 每个接口调用独立声明调用方法，建议配合使用Promisze

  ```ts
  export const getLogin = (data?: object): Promisze<any> => {
    return http.request<UserInfoResponse>("post", "/login", { data });
  };

  export const getUserInfo = (data?: object) => {
    return http.request<UserInfoResponse>("get", "/userinfo", { data });
  };
  ```

- 【可选】http 实例方法支持传 axios 调用配置：request方法传第四个参数，post/get方法传第三个参数
  ```ts
  export const checkAuth = (data?: object) => {
    return http.request<PureHttpResonseData>(
      "post",
      "/sys/heartBeatCheckAuthLogin",
      {
        data
      },
      {
        // axios request config
        hideProgress: true,
        baseURL: uServiceAuthApiUrl,
        beforeRequestCallback: defaultBeforeRequestCallback,
        beforeResponseCallback: defaultbBeforeResponseCallback
      }
    );
  };
  ```

## 引用

在需要调用接口的 `*.vue` 文件或 `*.ts` 文件中import来自 `/api/*.ts` 文件export出的调用方法

```ts
// ...
import { getCaptcha } from "@/api/user";
// ...

function handleGetCaptcha() {
  // ...
  getCaptcha({ mobile: ruleForm.mobile }).then(res => {
    // ...
  });
  // ...
}
```

## 内置 http实例配置（axios 实例配置）

| 字段             | 说明                                                                                                                |  类型   | 默认值 |
| :--------------- | :------------------------------------------------------------------------------------------------------------------ | :-----: | :----: |
| autoNotification | 接口异常自动消息提示，如果需要自定义异常信息，需要设置false以关闭。                                                 | boolean |  true  |
| autoUnpack       | 自动解响应数据： 自动resolve(response.data.data)。目前默认是false，需要的话可以默认设置为true可以快速结构响应数据。 | boolean | false  |
| completeResponse | resolve 完整响应数据：{status、headers、data}，如果请求需要获取响应头部则需要设为 true，才能得到响应头              | boolean | false  |
| encrypt          | data数据加密：request body 完整加密，json对象序列串 -》加密字符串                                                   | boolean | false  |
