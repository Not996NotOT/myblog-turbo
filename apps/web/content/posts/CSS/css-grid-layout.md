---
title: "CSS Grid 布局完全指南"
date: "2024-02-06"
category: "CSS"
---

CSS Grid 是一个强大的二维布局系统，让我们可以更轻松地创建复杂的网页布局。

## 基础网格布局

### 创建网格容器

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

### 网格项目定位

```css
.item {
  grid-column: 1 / 3; /* 跨越第1到第3列 */
  grid-row: 1 / 2;    /* 占据第1行 */
}
```

## 响应式网格

使用 minmax 和 auto-fit/auto-fill：

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## 网格区域命名

使用 grid-template-areas 创建布局：

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 对齐和分布

控制网格内容的对齐：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 水平对齐 */
  justify-items: center;
  /* 垂直对齐 */
  align-items: center;
  /* 网格轨道分布 */
  justify-content: space-between;
  align-content: space-around;
}
```

CSS Grid 让复杂的布局变得简单直观，是现代网页布局的必备工具。 