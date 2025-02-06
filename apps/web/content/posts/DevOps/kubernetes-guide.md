---
title: "Kubernetes 容器编排入门指南"
date: "2024-02-06"
category: "DevOps"
---

Kubernetes (K8s) 是目前最流行的容器编排平台。本文将介绍 K8s 的核心概念和基本使用。

## 核心概念

- **Pod**: 最小部署单元
- **Service**: 服务发现和负载均衡
- **Deployment**: 无状态应用部署
- **StatefulSet**: 有状态应用部署
- **ConfigMap/Secret**: 配置管理

## 基本操作

### Pod 管理

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

```bash
# 创建 Pod
kubectl apply -f pod.yaml

# 查看 Pod
kubectl get pods

# 查看 Pod 详情
kubectl describe pod nginx-pod
```

### Deployment 部署

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

### Service 配置

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## 常用命令

```bash
# 查看所有资源
kubectl get all

# 查看日志
kubectl logs <pod-name>

# 进入容器
kubectl exec -it <pod-name> -- /bin/bash

# 扩缩容
kubectl scale deployment nginx-deployment --replicas=5
```

## 最佳实践

1. 使用声明式配置
2. 实施健康检查
3. 合理设置资源限制
4. 使用命名空间隔离环境
5. 定期备份 etcd

掌握这些基础知识将帮助你开始使用 Kubernetes 进行容器编排。 