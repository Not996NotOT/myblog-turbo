---
title: "React 应用性能优化指南"
date: "2024-02-06"
category: "React"
---

React 应用的性能优化是一个持续的过程。本文将介绍一些实用的性能优化技巧。

## 使用 React.memo 避免不必要的重渲染

```typescript
import { memo } from 'react';

interface Props {
  title: string;
  content: string;
}

const ExpensiveComponent = memo(function ExpensiveComponent({ 
  title, 
  content 
}: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
});
```

## 使用 useMemo 缓存计算结果

```typescript
import { useMemo } from 'react';

function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## 使用 useCallback 缓存函数

```typescript
import { useCallback } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((event: FormEvent) => {
    event.preventDefault();
    // 执行搜索逻辑
  }, [query]);

  return (
    <form onSubmit={handleSearch}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}
```

## 代码分割和懒加载

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 虚拟列表优化

使用 react-window 处理长列表：

```typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

这些优化技巧可以显著提升 React 应用的性能。 