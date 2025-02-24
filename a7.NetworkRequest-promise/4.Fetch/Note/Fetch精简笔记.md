Fetch 知识点

1. 基本概念
Fetch 是现代浏览器和 Node.js 提供的原生 HTTP 请求 API，用于替代传统的 XMLHttpRequest。
基于 Promise，支持异步操作，无需额外安装。

2. 特点
基于 Promise：返回值为 Promise，支持链式调用和错误处理。
多种 HTTP 方法：支持 GET、POST、PUT、DELETE 等。
灵活性高：可自定义请求头、请求体等。
支持流式数据：适合动态加载和流式响应。
异步处理：支持 async/await，代码更简洁。

3. 请求生命周期
发起请求：通过 fetch(url, options)，其中 url 是请求地址，options 是可选配置。
处理响应：返回 Response 对象，可通过 .json()、.text()、.blob() 等方法解析响应体。
错误处理：仅在网络错误时触发 reject，需手动处理状态码（如 400、500）。
流式处理：通过 ReadableStream 逐步读取流式数据。

4. 配置选项       一般直接写在 fetch()的opthin中，因为fetch原生不支持全局配置与创建实例，要间接自定义函数才能实现
method：请求方法（如 GET、POST）。
headers：请求头（如内容类型、认证信息）。
body：请求体（如 JSON、表单数据）。
credentials：是否携带 Cookie（如 include、same-origin）。
mode：请求模式（如 cors、no-cors）。
signal：用于取消请求的 AbortController 信号。

5. 响应处理        对返回的响应报文处理
Response 对象：包含状态码、头信息和响应体。
解析响应体：通过 .json()、.text()、.blob() 等方法。
流式响应：通过 ReadableStream 处理流式数据。

Fetch 基础知识点
1. 发送请求
发起 GET 请求
从服务器获取数据，用于加载页面内容或资源。
发起 POST 请求
向服务器发送数据，用于提交表单或创建资源，需设置请求方法和请求体。

取消请求
使用 AbortController 取消正在进行的请求，适用于用户取消操作或页面切换。
并发请求
使用 Promise.all() 或 Promise.allSettled() 同时发送多个请求并统一处理。

2. 处理响应
解析响应
检查响应状态码（如 response.ok），通过 .json()、.text() 等方法解析响应体。
错误处理
网络错误触发 reject，状态码错误需手动处理。
流式数据处理
通过 ReadableStream 逐步读取流式数据，适合动态加载。




Fetch 环境依赖与注意事项
1. 环境依赖
Fetch 是现代浏览器和 Node.js（17.5+）的内置 API。
旧版本浏览器需引入 isomorphic-fetch 或 whatwg-fetch。
2. 使用注意事项
跨域问题：需后端设置 CORS 或前端使用代理。
Cookie：需设置 credentials: 'include' 才能携带 Cookie。
错误处理：状态码错误（如 400、500）需手动处理。
流式数据：需正确解析分块数据，避免拼接错误。



其他：
选择 fetch 的场景：现代浏览器和 Node.js 环境、对原生 API 有偏好、需要流式处理数据、项目对性能和体积有严格要求。
选择 axios 的场景：需要全局配置创建实例，需要丰富功能（如拦截器、超时控制）、统一错误处理、跨浏览器兼容性、复杂的数据处理需求。