# 一方科技官网

一方科技 · 企业 AI 应用与系统服务。

- [访问官网](https://wwwlove3921-tech.github.io/yifang-tech/)
- [品牌与数字视觉规范](https://wwwlove3921-tech.github.io/yifang-tech/yifang-brand.html)

围绕 AI 应用开发、工作流实施和企业系统集成，展示账目合规辅助分析、财务数据可视化、高企与研发项目管理等应用场景。

## 目录

- `docs/index.html`：官网单文件版本，图片、样式和脚本已内嵌。
- `docs/yifang-brand.html`：品牌与数字视觉规范单文件版本。
- `src/`：可编辑 HTML、CSS、JavaScript 和 SVG 设计素材。
- `scripts/build.mjs`：构建 GitHub Pages 发布文件。

## 更新

编辑 `src/`，运行 `node scripts/build.mjs`，提交更新后的源码和 `docs/`，推送到 `main`。GitHub Pages 发布源为 `main` 分支的 `/docs` 目录。构建只使用 Node.js 内置模块，无需安装依赖。

应用场景片段已合入 `src/index.html`，修改 `src/showcase.html` 后也应同步首页的 `section#scenarios`。

## 页面说明

图表、账目和项目数据为合成示例，用于介绍服务方案。页面未连接真实 AI 分析、发票查验、税务申报或高企认定系统。需求单在访客浏览器本地生成 TXT，不会自动发送。

联系电话：13274734329

地址：鄂尔多斯市达拉特旗维多利广场一方科技

标志与原创视觉素材用于一方科技品牌展示。参考资料见 `src/references.txt`。
