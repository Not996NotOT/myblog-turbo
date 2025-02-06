---
title: "Web 应用安全最佳实践"
date: "2024-02-06"
category: "Security"
---

Web 应用的安全性至关重要。本文将介绍常见的安全威胁和防护措施。

## XSS 防护

### 输入过滤

```typescript
function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### CSP 配置

```typescript
// Next.js 中配置 CSP
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
`;

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  next();
});
```

## CSRF 防护

### 使用 CSRF Token

```typescript
import { csrf } from 'csrf-tokens';

// 生成 token
const token = await csrf.create(secret);

// 验证 token
app.post('/api/data', async (req, res) => {
  if (!await csrf.verify(secret, req.body._csrf)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // 处理请求
});
```

## SQL 注入防护

### 使用参数化查询

```typescript
// 不安全的查询
const query = `SELECT * FROM users WHERE username = '${username}'`;

// 安全的参数化查询
const query = 'SELECT * FROM users WHERE username = ?';
const result = await db.query(query, [username]);
```

## 认证与授权

### JWT 实现

```typescript
import jwt from 'jsonwebtoken';

// 生成 token
function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
}

// 验证 token
function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
}
```

## 安全检查清单

1. 使用 HTTPS
2. 实施密码哈希
3. 启用请求限流
4. 定期更新依赖
5. 记录安全日志
6. 实施文件上传限制
7. 配置安全响应头

这些实践可以帮助你构建更安全的 Web 应用。 