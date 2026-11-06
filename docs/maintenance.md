# 维护指南

## 日常预览与内容

- 本地写作使用 `pnpm dev`，生产验收先 `pnpm build`，再 `pnpm preview`。
- 同一时间只运行一种 4321 端口预览。停止命令为 `pnpm exec astro dev stop` 或 `pnpm exec astro preview stop`。
- post、note、tag 的最小写法见根目录 README；字段以 `src/content.config.ts` 为准。
- 网页保持中英混合。手机端专项优化暂缓；评论、Webmentions、统计和 Notes 草稿功能尚未接入。

## 部署路径

`SITE_URL` 是根域名，`SITE_BASE` 是首尾带 `/` 的子目录，例如 `/blog-ctz-v4/`；根目录部署使用 `/`。两项均通过构建进程环境变量传入。

新增组件中的根路径链接使用 `withBase()`，不要写死仓库名前缀。Markdown 的根路径链接和图片自动补前缀，同目录 `./photo.png` 不变。分页已包含前缀时不会重复添加。

改变参数后重新构建，再运行 `python scripts/check-deployment.py BASE ORIGIN`。实际发布路径以目标仓库、域名和 Actions 配置为准，不将示例地址当作已部署站点。

测试其他部署配置前先停止开发服务；测试结束后用默认参数重新构建并重启开发预览，避免长驻进程保留旧内容。

## 已删除文章仍出现在开发预览

先重启开发服务。若仍有旧路由或已删除图片引用，停止服务后备份并清除 `.astro/data-store.json`、`.astro/content-assets.mjs`、`.astro/content-modules.mjs`，再执行 `pnpm dev`；它们都是可再生成的缓存，不要删除源文章来修复缓存问题。

## 分享图更新

自动分享图使用工程内的思源黑体 400／700。修改字体或排版后递增 `src/pages/og-image/_cacheUtil.ts` 的 `CACHE_VERSION`，防止复用旧缓存。文章显式设置 `ogImage` 时不会生成自动图片。

默认分享图的可编辑源文件为 `public/social-card.svg`，网页实际引用 `public/social-card.png`；更改 SVG 后需重新导出 PNG。

## 上游与第三方许可

基础模板：[Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus)，初始基线 `a6f7485cf89de38cea647a1809691fd23c4dfb5c`。本地 `upstream` 用于比较更新；先审阅差异、在分支验证，避免覆盖个人配置、文章和许可证。

模板示例已移除，功能问题直接查上游文档。根目录 MIT 适用于代码与开发文档，原创内容与图片等范围见 `CONTENT-LICENSE.md`。具体复核和实施历史见 `setup-verification.md`。
