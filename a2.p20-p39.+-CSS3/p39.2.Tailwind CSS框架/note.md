Tailwind CSS 官网URL:https://tailwindcss.com/docs/installation/using-vite

快速了解 Tailwind :https://kimi.moonshot.cn/chat/cvgavpun3mk13vjkdj9g   （安装方式使用下面的）

基本使用：

安装使用:
使用Vite: npm create vite@latest my-vite-project
          
          再安装安装 Tailwind CSS ： https://tailwindcss.com/docs/installation/using-vite
         
使用Tailwind CLI:https://tailwindcss.com/docs/installation/tailwind-cli

2. 配置文件

```js
module.exports = {      
  content: [// 指定要扫描的文件，从而生成其中class的样式文件
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
``` 
