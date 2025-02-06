---
title: "Docker 容器化入门指南"
date: "2024-02-06"
category: "DevOps"
---

Docker 已经成为现代应用部署的标准工具。本文将介绍 Docker 的基本概念和常用命令。

## Docker 基本概念

- **镜像（Image）**：应用程序的模板
- **容器（Container）**：运行中的镜像实例
- **Dockerfile**：构建镜像的脚本
- **Docker Compose**：多容器应用的配置工具

## 常用 Docker 命令

### 镜像管理

```bash
# 拉取镜像
docker pull nginx:latest

# 构建镜像
docker build -t myapp:1.0 .

# 查看镜像列表
docker images
```

### 容器管理

```bash
# 运行容器
docker run -d -p 80:80 nginx

# 查看运行中的容器
docker ps

# 停止容器
docker stop <container_id>

# 删除容器
docker rm <container_id>
```

## Dockerfile 示例

```dockerfile
# 使用 Node.js 官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
```

## Docker Compose 示例

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=secret
```

掌握这些基础知识将帮助你开始使用 Docker 进行应用容器化。 