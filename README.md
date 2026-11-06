# Blog CTZ v4

基于 [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) 的本地博客工程。

## 当前状态

基础配置阶段。英文导航、首页、关于页、图标、社交链接和示例文章暂时沿用模板，供检查功能；它们不代表最终个人信息。中文文案与样稿由用户后续提供。尚未部署，未迁移旧博客，未接入 Webmentions 或统计服务。

- 上游基线：`a6f7485cf89de38cea647a1809691fd23c4dfb5c`
- Node：`24.15.0`（`.nvmrc`）；pnpm：`11.1.1`（`packageManager`）
- 站点名称暂用 `Blog CTZ`，署名暂用 `CTZ`。
- 站点 URL 暂用 `http://localhost:4321/`，正式域名确定后需替换并重新构建。
- 原始模板说明保存在 [docs/upstream-readme.md](docs/upstream-readme.md)，许可证保留在 [LICENSE](LICENSE)。上游说明中的旧内容路径以当前 schema 为准。

## 本地启动

```sh
nvm use
pnpm install --frozen-lockfile
pnpm dev
```

打开 `http://localhost:4321/`。如未加载 nvm，先按本机配置加载 nvm；不要使用系统默认 Node 26 代替已锁定的 Node 24。

生产预览（先停止开发服务器，避免端口冲突）：

```sh
pnpm check
pnpm build
pnpm preview
```

`build` 后自动运行 Pagefind，输出在 `dist/`，搜索请在生产预览验证。`pnpm lint` 和 `pnpm format` 会修改文件；只读检查使用 `pnpm check`。

## 后续修改入口

| 内容 | 位置 |
| --- | --- |
| 站名、作者、语言、日期、菜单、站点 URL | `src/site.config.ts` |
| 首页与关于页 | `src/pages/index.astro`、`src/pages/about.astro` |
| 社交链接 | `src/components/SocialList.astro` |
| 正文基础布局与样式 | `src/layouts/Base.astro`、`src/styles/global.css` |
| 文章、短记、标签 | `content/posts/`、`content/notes/`、`content/tags/` |
| 内容字段规则 | `src/content.config.ts` |
| 图标与默认分享图 | `public/icon.svg`、`public/social-card.png` |
| 中文分享图字体 | `src/pages/og-image/[...slug].png.ts` 及对应字体资源 |

新增文章请参考现有 frontmatter：`title`、`description`、`publishDate` 为必需字段，`draft: true` 用于文章草稿。短记的 `publishDate` 需要带时区，例如 `2026-11-06T12:00:00+08:00`；Notes 当前没有草稿过滤，未发布短记放在集合目录外。

## 待用户提供后讨论

1. 中文导航、首页、关于页、署名与简介，以及要公开的社交链接。
2. 真实文章与短记样稿，用于验证中文字体、行宽、行距和分享图。
3. 正式域名／部署平台，以及是否迁移旧博客。

当前英文样例用于功能检查，后续清理前先核对文件清单。页面仍包含上游社交链接和关于页信息，不可把当前状态当作正式发布版本。

## 验证与维护

验证结果见 [docs/setup-verification.md](docs/setup-verification.md)。后续更新先比较上游差异，不直接覆盖个人配置与内容；远程 `upstream` 仅用于获取模板更新，目前未配置自己的远程仓库。
