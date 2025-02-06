---
title: "React Hooks 最佳实践"
date: "2024-02-06"
category: "React"
---

React Hooks 是 React 16.8 引入的革命性特性，让函数组件也能使用状态和其他 React 特性。让我们来看看一些常用的 Hooks 和最佳实践。

## useState 的使用

useState 是最基础的 Hook，用于在函数组件中管理状态：

```typescript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect 的正确使用

useEffect 用于处理副作用，比如数据获取、订阅或手动修改 DOM：

```typescript
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // 只在 userId 改变时重新获取

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
    </div>
  );
}
```

## 自定义 Hook

创建自定义 Hook 可以复用状态逻辑：

```typescript
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // 状态初始化
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 监听变化并更新 localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
```

使用自定义 Hook 的好处是可以将复杂的状态逻辑抽象出来，使组件代码更加清晰和可维护。在下一篇文章中，我们将探讨更多高级的 Hook 用法。 