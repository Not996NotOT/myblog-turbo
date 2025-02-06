'use client';

import { useState, useMemo } from 'react';
import { BlogPostCard, CategoryFilter } from '@repo/ui';
import type { Post } from '../../lib/posts';

interface PostListProps {
  initialPosts: Post[];
  categories: string[];
}

export function PostList({ initialPosts, categories }: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 确保分类列表包含"全部"选项
  const allCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(['全部', ...categories]));
    return uniqueCategories;
  }, [categories]);

  // 根据选择的分类筛选文章
  const filteredPosts = useMemo(() => {
    console.log('Selected category:', selectedCategory);
    console.log('Available posts:', initialPosts);
    
    if (selectedCategory === '全部') {
      return initialPosts;
    }
    
    return initialPosts.filter(post => {
      const match = post.category === selectedCategory;
      console.log(`Post ${post.title} category: ${post.category}, match: ${match}`);
      return match;
    });
  }, [selectedCategory, initialPosts]);

  return (
    <>
      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            category={post.category}
            slug={post.slug}
          />
        ))}
      </div>
    </>
  );
} 