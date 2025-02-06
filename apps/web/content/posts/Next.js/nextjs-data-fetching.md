---
title: "Next.js 数据获取策略详解"
date: "2024-02-06"
category: "Next.js"
---

Next.js 提供了多种数据获取方式，本文将详细介绍各种方法的使用场景和最佳实践。

## Server Components 数据获取

在服务器组件中，我们可以直接使用 async/await：

```typescript
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* 使用数据 */}</main>;
}
```

## 静态数据获取

使用 generateStaticParams 进行静态生成：

```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

## 客户端数据获取

使用 SWR 进行客户端数据获取：

```typescript
'use client';

import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>Hello {data.name}!</div>;
}
```

## 增量静态再生成 (ISR)

使用 next.revalidate 进行数据重新验证：

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 每小时重新验证一次
  });
  return res.json();
}
```

选择合适的数据获取策略对于构建高性能的 Next.js 应用至关重要。 