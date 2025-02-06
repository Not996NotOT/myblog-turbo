# Changelog

## [0.1.0] - 2024-02-06

### Added
- 使用 Turborepo 和 Next.js 搭建了博客基础框架
- 实现了本地 Markdown 文件解析功能
  - 支持 frontmatter 元数据
  - 支持代码语法高亮
  - 支持文章摘要
- 添加了基于文件夹的博客分类系统
  - 支持文章分类筛选
  - 支持分类标签展示
- 创建了共享 UI 组件库（@repo/ui）
  - Layout 组件：支持响应式布局和导航菜单
  - BlogPostCard 组件：带有动画效果的文章卡片
  - CategoryFilter 组件：支持文章分类筛选
- 集成了 Tailwind CSS 和 Typography 插件
  - 自定义了类似 VS Code 的代码块样式
  - 支持响应式设计
  - 支持深色模式
- 创建了示例博客文章
  - JavaScript 技巧分类
  - React Hooks 最佳实践
  - Tailwind CSS 使用技巧

### Technical Details
- 使用 HeadlessUI 构建了现代化的 UI 组件
- 实现了 Markdown 文件的前置元数据解析
- 使用 remark 和 rehype 处理 Markdown
- 使用 highlight.js 实现代码高亮
- 添加了响应式设计和深色模式支持
- 优化了代码块的显示效果和样式
- 配置了 TypeScript 支持

### Infrastructure
- 设置了 Turborepo 的工作空间配置
- 配置了共享的 TypeScript 和 ESLint 规则
- 建立了模块化的项目结构
  - apps/web：主要的博客应用
  - packages/ui：共享 UI 组件库
  - packages/typescript-config：共享 TypeScript 配置
  - packages/eslint-config：共享 ESLint 配置 