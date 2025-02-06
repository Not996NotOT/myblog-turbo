---
title: "Next.js 开发最佳实践指南"
date: "2024-02-06"
category: "Next.js"
---

Next.js 是一个强大的 React 框架，本文将分享使用 Next.js 开发的最佳实践和技巧。

## 项目结构

```
my-nextjs-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [...slug]/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── features/
│       ├── auth/
│       └── dashboard/
├── lib/
│   ├── utils.ts
│   └── constants.ts
└── public/
    ├── images/
    └── fonts/
```

## 路由和布局

### App Router 示例

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

## 数据获取

### Server Components

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // 1小时重新验证
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 客户端数据获取

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## 性能优化

### 图片优化

```tsx
import Image from 'next/image';

export function Avatar({ user }) {
  return (
    <Image
      src={user.avatar}
      alt={`${user.name}'s avatar`}
      width={40}
      height={40}
      className="rounded-full"
      priority={false}
      loading="lazy"
    />
  );
}
```

### 动态导入

```tsx
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // 禁用服务端渲染
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <DynamicChart data={chartData} />
    </div>
  );
}
```

## API 路由

### API 处理程序

```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = postSchema.parse(json);

    const post = await prisma.post.create({
      data: body,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

## 状态管理

### 使用 Zustand

```tsx
import create from 'zustand';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// 在组件中使用
function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) return <LoginButton />;

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 测试

### Jest 配置

```typescript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
});
```

### 组件测试

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

## 部署

### 环境变量配置

```env
# .env.local
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

## 最佳实践总结

1. 使用 App Router 和服务器组件
2. 实施适当的数据获取策略
3. 优化性能和加载时间
4. 实现适当的错误处理
5. 编写全面的测试
6. 使用类型安全的 API

遵循这些最佳实践，将帮助你构建高质量的 Next.js 应用。 