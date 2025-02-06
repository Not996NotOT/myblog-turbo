---
title: "Git 工作流和版本控制最佳实践"
date: "2024-02-06"
category: "Git"
---

Git 是现代软件开发中不可或缺的版本控制工具。本文将介绍 Git 工作流程和最佳实践。

## 分支管理

### Git Flow 工作流

```bash
# 创建功能分支
git checkout -b feature/user-authentication develop

# 开发完成后合并到开发分支
git checkout develop
git merge --no-ff feature/user-authentication

# 创建发布分支
git checkout -b release/1.0.0 develop

# 发布完成后合并到主分支和开发分支
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
```

### 分支命名规范

```
feature/   # 新功能分支
bugfix/    # 问题修复分支
hotfix/    # 紧急修复分支
release/   # 发布分支
docs/      # 文档更新分支
```

## 提交规范

### Conventional Commits

```bash
# 功能提交
git commit -m "feat: add user authentication system"

# 修复提交
git commit -m "fix: resolve login page crash"

# 文档更新
git commit -m "docs: update API documentation"

# 性能优化
git commit -m "perf: optimize image loading"
```

### 提交模板

```
# .gitmessage
feat/fix/docs/style/refactor/test/chore: 简短的描述

问题描述：
- 详细说明本次提交解决的问题

解决方案：
- 描述采用的解决方案
- 列出主要的修改内容

相关问题：
- 关联的 Issue 或 PR
```

## 代码审查

### Pull Request 模板

```markdown
## 描述
请描述此次变更的内容和目的

## 变更类型
- [ ] 新功能 (feature)
- [ ] 问题修复 (bugfix)
- [ ] 性能优化 (performance)
- [ ] 代码重构 (refactor)
- [ ] 样式更新 (style)
- [ ] 文档更新 (documentation)
- [ ] 其他

## 测试
- [ ] 单元测试已通过
- [ ] 集成测试已通过
- [ ] 手动测试已完成

## 检查清单
- [ ] 代码符合编码规范
- [ ] 所有测试都已通过
- [ ] 文档已更新
```

## 工作流自动化

### Git Hooks

```bash
#!/bin/sh
# .git/hooks/pre-commit

# 运行代码格式化
npm run format

# 运行 lint 检查
npm run lint

# 运行测试
npm test

# 如果以上命令有任何一个失败，阻止提交
if [ $? -ne 0 ]; then
  echo "代码检查未通过，提交已被阻止"
  exit 1
fi
```

### GitHub Actions

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Run lint
      run: npm run lint
```

## 常用操作

### 撤销操作

```bash
# 撤销未暂存的修改
git checkout -- <file>

# 撤销暂存的修改
git reset HEAD <file>

# 撤销最后一次提交
git reset --soft HEAD^

# 完全撤销最后一次提交
git reset --hard HEAD^
```

### 解决冲突

```bash
# 更新分支
git fetch origin
git rebase origin/main

# 解决冲突后
git add <resolved-files>
git rebase --continue

# 如果需要放弃 rebase
git rebase --abort
```

## 高级技巧

### Git Bisect

```bash
# 开始二分查找
git bisect start

# 标记当前版本为有问题的版本
git bisect bad

# 标记最后一个正常的版本
git bisect good v1.0.0

# Git 会自动检出中间的提交
# 测试后标记为 good 或 bad
git bisect good  # 或
git bisect bad

# 找到问题后结束查找
git bisect reset
```

### 子模块管理

```bash
# 添加子模块
git submodule add https://github.com/example/lib libs/example

# 更新子模块
git submodule update --init --recursive

# 更新所有子模块到最新版本
git submodule foreach git pull origin main
```

## 最佳实践总结

1. 使用规范的分支管理策略
2. 遵循提交信息规范
3. 实施代码审查流程
4. 自动化工作流程
5. 定期同步和更新代码
6. 保持清晰的项目历史

遵循这些最佳实践，将帮助团队更好地协作和管理代码。 