import { Layout } from '@repo/ui';
import { getAllPosts } from '../lib/posts';
import { Suspense } from 'react';
import { PostList } from './components/PostList';

async function getPosts() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return { posts, categories };
}

export default async function Home() {
  const { posts, categories } = await getPosts();

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Blog Posts</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList initialPosts={posts} categories={categories} />
        </Suspense>
      </div>
    </Layout>
  );
}
