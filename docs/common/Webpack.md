# webpack

## 一、学习文档
入门Webpack，看这篇就够了:[https://segmentfault.com/a/1190000006178770](https://segmentfault.com/a/1190000006178770)<br />官网：[webpack](https://webpack.docschina.org/)
## 二、学习记录
### 1、初体验

- 下载webpack包->配置webpack.config.js->运行
- sourceMap，是方便调试的配置。 eval-source-map 只能在开发环境中使用，不能在生产环境中使用
- **webpack-dev-server **可实时检测代码并更新结果，是一个单独的组件
- **Loaders  **决定webpack对谁生效
   - 重要的是要记住，在 webpack 配置中定义 rules 时，要定义在 `module.rules` 而不是 `rules` 中。为了使你便于理解，如果没有按照正确方式去做，webpack 会给出警告
   - 使用正则表达式匹配文件时，你不要为它添加引号
   - 现在webpack可以识别javaScript和json，json不用像文章通过loader识别
- **Plugins   **在构建过程中额外的需求，需要用plugins处理
- **babel  **常用解析Es6的`babel-env-preset`包和解析JSX的`babel-preset-react`包
- **一切皆模块**
   - **CSS模块  **经过简单配置就可以使类名不重复
- **产品阶段的构建 **`package.json`里的脚本配置，另建一个配置文件
   - 用来处理优化，压缩，缓存以及分离CSS和JS
