---
alwaysApply: true
scene: git_message
---

根据本次提交的实际差异生成 Git 提交信息。有暂存改动时只依据暂存区；未暂存时以 Trae 传入的待提交文件和差异为准。

- 标题格式为 `type(scope): 中文主题`，使用英文半角括号和冒号，冒号后加一个空格。
- `type` 按主要变化选取。新增功能用 `feat`，修复用 `fix`，文章、短记和文档用 `docs`，重构用 `refactor`，测试用 `test`，部署流程用 `ci`，其余维护用 `chore`。
- `scope` 使用最能代表主要改动的目录或用途，写成英文小写，不能为空。例如 `notes`、`posts`、`layout`、`deploy` 或 `rules`。
- 中文主题用动作开头，概括实际变化，不超过 25 个字，末尾不加句号。只有需要说明背景或取舍时才加正文，与标题空一行。
- 只输出可直接使用的提交信息，不加代码围栏、引号或解释。

示例：

docs(notes): 新增关于知识的短记
fix(layout): 统一页脚版权链接文案
ci(deploy): 添加 GitHub Pages 部署流程

