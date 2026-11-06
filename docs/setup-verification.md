# 初步配置验证

初始验证日期：2026-11-06（Asia/Shanghai）。下方初始记录按当时状态保留，最新进展以本节续记为准。

## 2026-11-07 续记

- 用户确认 post、note、tag 均通过使用测试；已有真实文章、短记与自定义标签介绍。
- 已更新个人简介、GitHub、中文语言配置、Z 图标及默认分享图；思源黑体自动分享图已完成 check/build 与中文输出验证（代码提交 `785e016`）。
- 已切换本地开发模式，新增短记可自动更新；此前生产预览的“新增内容不可见”问题已解决。
- 初始记录中的“中文样稿待提供”“原始图标待换”“模板关于页和社交链接未改”“中文分享图字体待验证”均已过时。
- 正文中文字体、手机布局、键盘操作与中文搜索交互仍待专项验收；两条上游 Biome 警告等非阻断项未统一处理。
- 当前待讨论事项见工程 README。未部署，未自动迁移旧站；用户现有未提交内容保持原样。

## 已完成

- 采用 Astro Cactus 上游 `a6f7485cf89de38cea647a1809691fd23c4dfb5c`。
- 固定 Node 24.15.0、pnpm 11.1.1，锁文件安装成功；CI 同步使用 `.nvmrc`、锁定依赖与完整 `check`。
- 工程名 `blog-ctz-v4`、包标记为 private；站名与署名暂用 Blog CTZ／CTZ，URL 为本地地址，日期显式使用上海时区。
- 保留全部英文模板页面、示例文章、样式、图标与社交入口，原版 README 移至 `docs/upstream-readme.md`。
- 修复原版三个格式检查错误，未改动业务逻辑。
- `pnpm check` 成功：Astro 50 个文件零错误、零警告；Biome 有两条上游警告，见下文。
- `pnpm build` 成功，生成 22 个 HTML 页面；Pagefind 索引覆盖 9 个页面。
- 核对 11 项关键产物存在，RSS 与 sitemap XML 可解析；文章草稿详情未生成；首页标题和 RSS 使用本地站点配置。
- 浏览器验证：首页正常；搜索 Markdown 返回 3 条结果，结果链接可进入文章；明暗主题切换有效，返回首页后状态保留。
- 生产预览运行于 `http://127.0.0.1:4321/`，仅监听本机。
- 上游远程改名为 `upstream`，未添加个人远程，未推送或部署。

## 已知限制

- 原版两条 Biome 警告：`src/plugins/satteri.ts` 的非空断言，以及 `src/styles/components/github-card.css` 的选择器优先级。此次保留模板行为，未压制警告。
- 构建提示缺少可选的 `src/icons/` 自定义图标目录，现有 Iconify 图标仍正常；原始 `public/icon.svg` 非正方形，生成器已输出正方形图标，品牌素材后续再换。
- Webmentions 未配置，示例文章构建提示未设置 token；不需要为本地预览添加凭据。
- 模板 GitHub 卡片示例出现 NaN 计数，属于样例扩展功能待处理项，未计入基础功能验收。
- 尚未验证中文检索、中文字体与分享图缺字、手机布局及最终内容；待用户提供文案和样稿后进行。
- 当前包含模板作者关于页与社交链接，且 canonical 为本地地址，不能直接当作正式上线版本。

## 复现

```sh
nvm use
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm preview
```

当前 Astro CLI 会启动后台预览，可用 `pnpm exec astro preview status` 查看状态，`pnpm exec astro preview stop` 停止；开发预览与生产预览不要同时占用 4321 端口。
