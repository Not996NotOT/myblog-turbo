# MyBlog Turbo

一个基于 Turborepo 和 Next.js 构建的现代化博客系统。

## 特性

- 📝 Markdown 支持
  - 支持 frontmatter 元数据
  - 代码语法高亮
  - 文章摘要
- 🏷️ 分类系统
  - 文章分类筛选
  - 分类标签展示
- 🎨 现代化 UI
  - 响应式设计
  - 深色模式支持
  - 动画效果
- 🛠️ 技术栈
  - Next.js 14 App Router
  - Turborepo
  - TypeScript
  - Tailwind CSS
  - HeadlessUI

## 快速开始

```bash
# 克隆项目
git clone https://github.com/Not996NotOT/myblog-turbo.git
cd myblog-turbo

# 安装依赖
bun install

# 启动开发服务器
bun dev
```

## 项目结构

```
myblog-turbo/
├── apps/
│   └── web/                # Next.js 博客应用
│       ├── app/            # App Router 页面
│       ├── content/        # Markdown 文章
│       └── lib/           # 工具函数
├── packages/
│   ├── ui/                # 共享 UI 组件
│   ├── eslint-config/     # 共享 ESLint 配置
│   └── typescript-config/ # 共享 TypeScript 配置
```

## 写作指南

1. 在 `apps/web/content/posts` 目录下创建 `.md` 文件
2. 添加 frontmatter 元数据:
   ```markdown
   ---
   title: "文章标题"
   date: "2024-02-06"
   category: "分类"
   ---
   ```
3. 使用 Markdown 语法编写文章内容

## 开发指南

- `bun dev`: 启动开发服务器
- `bun build`: 构建生产版本
- `bun lint`: 运行代码检查
- `bun type-check`: 运行类型检查

## 贡献

欢迎提交 Pull Request 和 Issue！

## 许可

MIT License
