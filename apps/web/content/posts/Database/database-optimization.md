---
title: "数据库优化和性能调优指南"
date: "2024-02-06"
category: "Database"
---

数据库性能对应用的整体表现至关重要。本文将介绍数据库优化的关键策略和最佳实践。

## 索引优化

### 创建合适的索引

```sql
-- 创建单列索引
CREATE INDEX idx_user_email ON users(email);

-- 创建复合索引
CREATE INDEX idx_user_name_email ON users(name, email);

-- 创建部分索引
CREATE INDEX idx_active_users ON users(created_at)
WHERE status = 'active';
```

### 索引使用分析

```sql
-- PostgreSQL 执行计划分析
EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'test@example.com'
  AND status = 'active';

-- MySQL 索引使用情况
SHOW INDEX FROM users;
```

## 查询优化

### 避免全表扫描

```sql
-- ❌ 避免使用
SELECT * FROM orders
WHERE YEAR(created_at) = 2024;

-- ✅ 优化后
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01';
```

### 使用适当的 JOIN

```sql
-- 使用 INNER JOIN
SELECT u.name, o.order_number
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';

-- 使用子查询
SELECT name, (
  SELECT COUNT(*)
  FROM orders
  WHERE user_id = users.id
) as order_count
FROM users;
```

## 数据库设计

### 规范化示例

```sql
-- 第三范式（3NF）设计
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  price DECIMAL(10,2) NOT NULL
);
```

### 分区表

```sql
-- PostgreSQL 范围分区
CREATE TABLE orders (
  id SERIAL,
  created_at TIMESTAMP NOT NULL,
  amount DECIMAL(10,2)
) PARTITION BY RANGE (created_at);

-- 创建分区
CREATE TABLE orders_2024_q1 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
```

## 性能监控

### 慢查询分析

```sql
-- MySQL 慢查询日志配置
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- PostgreSQL 查询统计
SELECT query, calls, total_time, rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

### 连接池配置

```javascript
// Node.js PostgreSQL 连接池
const { Pool } = require('pg');

const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: '******',
  port: 5432,
  max: 20, // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## 备份和恢复

### 自动备份脚本

```bash
#!/bin/bash

# PostgreSQL 备份
pg_dump -U username -d dbname -F c -b -v -f backup.sql

# 压缩备份文件
gzip backup.sql

# 上传到远程存储
aws s3 cp backup.sql.gz s3://my-backup-bucket/
```

### 时间点恢复

```sql
-- 启用 WAL 归档
ALTER SYSTEM SET wal_level = replica;
ALTER SYSTEM SET archive_mode = on;
ALTER SYSTEM SET archive_command = 'cp %p /archive/%f';

-- 恢复到特定时间点
SELECT pg_start_backup('hot_backup');
-- 复制数据文件
SELECT pg_stop_backup();
```

## 性能优化清单

1. 定期分析和更新统计信息
2. 优化索引使用
3. 定期清理无用数据
4. 配置适当的内存参数
5. 监控并优化慢查询
6. 实施合适的分区策略

## 常见性能问题解决

### 内存配置优化

```ini
# PostgreSQL 配置
shared_buffers = 4GB
work_mem = 16MB
maintenance_work_mem = 256MB
effective_cache_size = 12GB

# MySQL 配置
innodb_buffer_pool_size = 4G
innodb_log_file_size = 512M
innodb_log_buffer_size = 16M
```

### 死锁处理

```sql
-- 查看当前锁
SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.usename AS blocked_user,
       blocking_activity.usename AS blocking_user
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_locks blocking_locks
    ON blocking_locks.locktype = blocked_locks.locktype;

-- 终止阻塞进程
SELECT pg_terminate_backend(pid);
```

遵循这些最佳实践和优化策略，将帮助你构建高性能、可靠的数据库系统。 