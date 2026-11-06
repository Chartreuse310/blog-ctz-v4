# 初步配置验证

日期：2026-11-06（Asia/Shanghai）。范围为本地基础配置，中文文案和样稿待用户提供。

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
