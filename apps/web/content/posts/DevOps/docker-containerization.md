---
title: "Docker 和容器化最佳实践指南"
date: "2024-02-06"
category: "DevOps"
---

Docker 已经成为现代应用部署的标准工具。本文将介绍 Docker 和容器化的最佳实践。

## Dockerfile 最佳实践

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

## 镜像优化

### 使用轻量级基础镜像

```dockerfile
# ❌ 避免使用
FROM ubuntu:latest

# ✅ 使用轻量级镜像
FROM alpine:3.14
```

### 合并 RUN 指令

```dockerfile
# ❌ 多个 RUN 指令
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y nginx

# ✅ 合并 RUN 指令
RUN apt-get update && \
    apt-get install -y \
    python3 \
    nginx \
    && rm -rf /var/lib/apt/lists/*
```

## Docker Compose 配置

```yaml
version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:13-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=myapp
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
```

## 安全最佳实践

### 使用非 root 用户

```dockerfile
FROM node:18-alpine

# 创建应用用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# 复制应用文件
COPY --chown=appuser:appgroup . .

# 切换到应用用户
USER appuser

CMD ["npm", "start"]
```

### 扫描安全漏洞

```bash
# 使用 Docker Scan
docker scan myapp:latest

# 使用 Trivy
trivy image myapp:latest
```

## 监控和日志

### 配置日志驱动

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

### 使用 Prometheus 监控

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus
```

## 容器编排

### Kubernetes 部署示例

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "1"
            memory: "512Mi"
          requests:
            cpu: "0.5"
            memory: "256Mi"
```

## 最佳实践总结

1. 使用多阶段构建减小镜像大小
2. 选择合适的基础镜像
3. 优化构建缓存
4. 实施安全最佳实践
5. 合理配置日志和监控
6. 使用容器编排工具管理部署

遵循这些最佳实践，将帮助你构建更加安全、高效的容器化应用。 