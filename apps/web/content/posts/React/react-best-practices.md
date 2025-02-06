---
title: "React 开发最佳实践指南"
date: "2024-02-06"
category: "React"
---

React 是目前最流行的前端框架之一。本文将分享一些 React 开发中的最佳实践和常见陷阱。

## 组件设计原则

### 函数组件和 Hooks

```tsx
// ✅ 好的实践
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      <h2>{user.name}</h2>
      {isEditing ? (
        <EditForm user={user} />
      ) : (
        <DisplayInfo user={user} />
      )}
    </div>
  );
};

// ❌ 避免的做法
class UserProfile extends React.Component {
  state = { isEditing: false };
  // ...
}
```

## 性能优化

### 使用 useMemo 和 useCallback

```tsx
const MemoizedComponent = React.memo(({ data, onUpdate }) => {
  // 复杂计算
  const processedData = useMemo(() => {
    return data.map(item => complexCalculation(item));
  }, [data]);

  // 事件处理
  const handleUpdate = useCallback(() => {
    onUpdate(processedData);
  }, [onUpdate, processedData]);

  return (
    <div onClick={handleUpdate}>
      {processedData.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
});
```

## 状态管理

### 使用 Context API

```tsx
// 创建 Context
const ThemeContext = React.createContext<Theme>('light');

// Provider 组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用 Context
const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return <button className={`btn-${theme}`}>主题按钮</button>;
};
```

## 自定义 Hooks

```tsx
// 封装通用逻辑
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 使用自定义 Hook
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // 执行搜索
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
```

## 错误处理

```tsx
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('捕获到错误:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <div>出错了！请刷新页面重试。</div>;
  }

  return <>{children}</>;
};
```

## 最佳实践总结

1. 优先使用函数组件和 Hooks
2. 合理拆分组件，保持单一职责
3. 使用 TypeScript 增加类型安全
4. 注意性能优化，避免不必要的渲染
5. 统一的错误处理机制
6. 编写可测试的代码

遵循这些最佳实践，将帮助你构建更加可维护和高性能的 React 应用。 