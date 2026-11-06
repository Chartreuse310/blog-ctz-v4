# Blog CTZ V4

基于 [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) 的本地博客工程。

## 当前状态

本地内容与品牌配置已可使用。用户已确认 post、note、tag 通过测试；首页介绍、关于页基础内容、GitHub 链接、中文语言声明、Z 图标与默认分享图已更新，自动文章分享图已接入思源黑体。尚未部署，未批量迁移旧博客，未接入 Webmentions 或统计服务。

- 上游基线：`a6f7485cf89de38cea647a1809691fd23c4dfb5c`
- Node：`24.15.0`（`.nvmrc`）；pnpm：`11.1.1`（`packageManager`）
- 站点名称为 `Blog CTZ`，署名为 `CTZ`。
- 站点 URL 暂用 `http://localhost:4321/`，正式域名确定后需替换并重新构建。
- 模板问题直接参考 [上游原始仓库](https://github.com/chrismwilliams/astro-theme-cactus)，原版权与许可证保留在 [LICENSE](LICENSE)。内容目录以当前 schema 为准。

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

## 待讨论与收尾（2026-11-07）

已完成：post、note、tag 使用测试（用户确认），真实图文文章与两条短记、标签介绍、标题／标签／日期／摘要校验、品牌图标、默认分享图与思源黑体自动分享图。无需继续等待这些样稿或重复进行类型使用测试。

1. **已确定**：站点描述为 `Blog CTZ - 沙楚子的新新新新博客`，界面保持中英混合，不再安排统一汉化。
2. **已确定**：手机端优化与验收延后，不计入当前阶段的待办；需要推进时再单独检查。
3. **已完成模板清理**：示例文章和配图、welcome 短记、test 标签介绍、无引用的 Roboto Mono 字体、本地上游 README、上游赞助及陈旧 issue 自动关闭配置已移除。未来参考上游原始仓库；个人内容与许可证保留。
4. **预计部署到 GitHub**：暂按 GitHub Pages 方向准备；目标仓库、站点 URL／是否自定义域名及发布范围仍未指定，尚未配置部署或推送。
5. **仍待决定**：是否迁移旧博客、迁移哪些内容；是否扩写关于页或增加社交入口，后两项可选。
6. **可选专项与后续功能**：桌面正文排版、键盘与中文搜索交互复核；Notes 草稿过滤、评论、Webmentions、统计。目前不新增这些功能。

目前使用 `pnpm dev` 自动更新本地内容；`pnpm preview` 仅展示上次构建结果，新增内容后需先 `pnpm build`。如切换服务器，先停止占用 4321 端口的上一种预览。

个人页面与新增内容已完成本地提交。正式发布前复核 Git 状态与发布范围，部署目标确定前不自动推送。

## 验证与维护

验证结果见 [docs/setup-verification.md](docs/setup-verification.md)。后续更新先比较上游差异，不直接覆盖个人配置与内容；远程 `upstream` 仅用于获取模板更新，目前未配置自己的远程仓库。
