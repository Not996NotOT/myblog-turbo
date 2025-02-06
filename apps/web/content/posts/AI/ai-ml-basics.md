---
title: "AI 和机器学习入门指南"
date: "2024-02-06"
category: "AI"
---

人工智能和机器学习正在改变各个行业。本文将介绍 AI/ML 的基础概念和实践应用。

## 机器学习基础

### 线性回归示例

```python
import numpy as np
from sklearn.linear_model import LinearRegression

# 准备数据
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# 创建模型
model = LinearRegression()
model.fit(X, y)

# 预测
prediction = model.predict([[6]])
print(f"预测值: {prediction[0]}")
```

## 深度学习入门

### 使用 TensorFlow 构建神经网络

```python
import tensorflow as tf

# 构建简单的神经网络
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# 编译模型
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)
```

## 自然语言处理

### 使用 Transformers 进行文本分类

```python
from transformers import pipeline

# 加载情感分析模型
classifier = pipeline('sentiment-analysis')

# 分析文本
text = "这是一个很棒的产品！"
result = classifier(text)
print(f"情感: {result[0]['label']}")
print(f"置信度: {result[0]['score']:.2f}")
```

## 计算机视觉

### 使用 OpenCV 进行图像处理

```python
import cv2
import numpy as np

# 读取图像
image = cv2.imread('image.jpg')

# 转换为灰度图
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 边缘检测
edges = cv2.Canny(gray, 100, 200)

# 显示结果
cv2.imshow('Edges', edges)
cv2.waitKey(0)
```

## 模型评估

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score

def evaluate_model(y_true, y_pred):
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    
    print(f"准确率: {accuracy:.2f}")
    print(f"精确率: {precision:.2f}")
    print(f"召回率: {recall:.2f}")
```

## 实践建议

1. 从小数据集开始
2. 注意数据质量
3. 选择合适的模型
4. 避免过拟合
5. 定期评估模型
6. 持续学习新技术

这些基础知识将帮助你开始 AI/ML 的学习之旅。 