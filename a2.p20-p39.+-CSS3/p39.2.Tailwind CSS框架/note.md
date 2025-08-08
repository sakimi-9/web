### 基本使用：
Tailwind CSS 官网URL:https://tailwindcss.com/docs/installation/using-vite

快速了解 Tailwind :https://kimi.moonshot.cn/chat/cvgavpun3mk13vjkdj9g   （安装方式使用下面的）
        UnoCSS :https://lxblog.com/qianwen/share?shareId=a2d39ed7-b107-4e5a-af90-45396d90d9e7

安装使用:         
非vite构建的项目（react也可以使用vite） 可以使用Tailwind CLI:https://tailwindcss.com/docs/installation/tailwind-cli，此时需要创建tailwind.config.js文件






### 在vite构建的Vue中使用tailwindcss:
1. 安装依赖和插件 
   `bun install tailwindcss @tailwindcss/vite`

2. vite.confing中配置其插件
   `import tailwindcss from '@tailwindcss/vite'   plugins: [  tailwindcss(),  ],`,看这个 <a href="./Vite构建Vue中使用/vite-project/vite.config.ts">示例</a> 

3. 引入其资源
   `@import 'tailwindcss'`,看这个<a href="./Vite构建Vue中使用/vite-project/src/style.css">示例</a>

4. 组件中使用tailwindcss的类





### ps：主题切换
在组件中想使用dark类选择器来切换主题(也就是点击按钮切换主题)，
则必须要在 app.css（这里是style.css）处添加：
`@custom-variant dark (&:where(.dark, .dark *));`





### ps: SVG 图标在 `<button>` 内部不显示

**现象**：  
SVG 图标在 `<button>` 外部正常显示，放入 `<button>` 后消失。

**原因**：  
`<button>` 的 `flex` 布局中，SVG 作为子元素可能被压缩（`flex-shrink`）或受尺寸继承影响，导致不可见。

**解决方案**：  
为 SVG 添加以下类：
```html
<svg class="icon flex-shrink-0">
```

- `flex-shrink-0`：防止在 flex 容器中被压缩,**最关键**

**结论**：  
在 `flex` 容器中的 SVG 应始终设置 `flex-shrink-0` 以避免意外压缩。
