---
title: "PostgreSQL 数据库优化技巧"
date: "2024-02-06"
category: "Database"
---

PostgreSQL 是一个功能强大的开源数据库系统。本文将分享一些实用的优化技巧。

## 索引优化

### 创建合适的索引

```sql
-- 创建 B-tree 索引
CREATE INDEX idx_users_email ON users(email);

-- 创建复合索引
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- 创建部分索引
CREATE INDEX idx_active_users ON users(email) 
WHERE status = 'active';
```

## 查询优化

### 使用 EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
```

### 常见优化技巧

```sql
-- 使用 EXISTS 代替 IN
SELECT * FROM orders o
WHERE EXISTS (
  SELECT 1 FROM users u
  WHERE u.id = o.user_id
  AND u.status = 'active'
);

-- 使用 LIMIT 和 OFFSET 进行分页
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
```

## 性能监控

### 查看慢查询

```sql
SELECT pid, query, query_start, state
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start DESC;
```

### 查看表大小

```sql
SELECT 
  relname as table_name,
  pg_size_pretty(pg_total_relation_size(relid)) as total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

## 维护命令

```sql
-- 清理死元组
VACUUM ANALYZE table_name;

-- 重建索引
REINDEX TABLE table_name;

-- 更新统计信息
ANALYZE table_name;
```

这些技巧可以帮助你优化 PostgreSQL 数据库的性能。 