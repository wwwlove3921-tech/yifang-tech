一方科技官网可编辑源码 V3

双击 index.html 打开源码版官网，brand.html 打开品牌规范；请保留相对目录。
运行 node scripts/build.mjs 可构建 dist/yifang.html 和 dist/yifang-brand.html 两个单文件离线版，无需安装依赖。

index.html / styles.css / app.js：官网整体结构、样式、导航、弹窗、图片放大、需求单本地下载。
showcase.html / showcase.css / showcase.js：可复用应用场景片段、局部样式与交互；index.html 已含片段以便直接打开。修改片段后需同步 index.html 中 section#scenarios。
brand.html / brand.css / brand.js：品牌规范、素材下载与色值复制。
assets/：45 SVG，包括品牌基础、本次科技系统图及前版场景补充资产。
design-tokens.json：基础品牌变量。references.txt：内容与视觉参考。
scripts/build.mjs：Node.js 内置模块构建脚本。

数据位于 showcase.js 的 YFShowcaseModel；所有金额均为示例，单位万元。费用构成与对应汇总相等，研发费用示例不是认定或税收优惠可用金额。
页面不持久化、不联网处理数据；输入不自动发送。
修改联系信息需同步 index.html、app.js 及名片 SVG。

本次已通过源码静态、纯模型及打包检查，未完成新的浏览器实测。V3 定位为科技服务公司官网，非生产财务业务系统。
