---
title: "Redis 缓存设计与实践"
date: "2024-02-06"
category: "Database"
---

Redis 是一个高性能的键值存储系统，常用于缓存和实时数据处理。本文将介绍 Redis 的最佳实践。

## 缓存策略

### 缓存模式

```typescript
async function getUser(id: string) {
  // 先查缓存
  const cached = await redis.get(`user:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 缓存未命中，查数据库
  const user = await db.users.findById(id);
  if (user) {
    // 设置缓存，1小时过期
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  }
  
  return user;
}
```

## 数据结构使用

### 字符串操作

```typescript
// 计数器
await redis.incr('page_views');

// 限流器
const key = `rate_limit:${userId}`;
const count = await redis.incr(key);
await redis.expire(key, 60); // 60秒过期
```

### 哈希表

```typescript
// 存储用户信息
await redis.hset('user:123', {
  name: 'John',
  email: 'john@example.com',
  age: '30'
});

// 获取特定字段
const email = await redis.hget('user:123', 'email');
```

### 有序集合

```typescript
// 排行榜
await redis.zadd('leaderboard', {
  'player1': 100,
  'player2': 85,
  'player3': 95
});

// 获取前三名
const top3 = await redis.zrevrange('leaderboard', 0, 2);
```

## 性能优化

### 管道操作

```typescript
const pipeline = redis.pipeline();
pipeline.set('key1', 'value1');
pipeline.incr('counter');
pipeline.expire('key1', 3600);
await pipeline.exec();
```

### 事务处理

```typescript
const multi = redis.multi();
multi.set('key1', 'value1');
multi.set('key2', 'value2');
await multi.exec();
```

## 缓存设计原则

1. 合理设置过期时间
2. 使用合适的淘汰策略
3. 避免缓存穿透和雪崩
4. 定期清理无用数据

这些实践可以帮助你更好地使用 Redis 进行缓存设计。 