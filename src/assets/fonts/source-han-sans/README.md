# Source Han Sans SC

Regular（400）与 Bold（700）用于构建时生成文章分享图，不用于网页正文。

项目：[Adobe Source Han Sans](https://github.com/adobe-fonts/source-han-sans)。字体文件保留原始内容与内嵌元数据，版权声明与许可见同目录 `LICENSE.txt`；字体采用 SIL Open Font License 1.1。

更新字体、字重或分享图排版后，同步递增 `src/pages/og-image/_cacheUtil.ts` 的 `CACHE_VERSION`，避免复用旧图片缓存。字体保存在工程内，构建不依赖系统安装或远程字体服务。
