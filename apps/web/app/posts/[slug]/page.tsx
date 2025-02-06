import React from 'react';
import { Layout } from '@repo/ui';
import { getPostBySlug } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: Props) {
  try {
    const post = await getPostBySlug(params.slug);

    return (
      <Layout>
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
              <time className="text-gray-500">{post.date}</time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-gray-500 leading-relaxed">{post.excerpt}</p>
            )}
          </header>
          <div
            className="prose prose-lg max-w-none 
              prose-headings:text-gray-900 
              prose-p:text-gray-600 
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-800 
              prose-strong:text-gray-900 
              prose-ul:list-disc prose-ul:pl-6 
              prose-ol:list-decimal prose-ol:pl-6 
              prose-li:text-gray-600 
              prose-img:rounded-lg 
              prose-hr:border-gray-200
              prose-blockquote:border-l-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:rounded prose-code:px-1
              prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </Layout>
    );
  } catch (error) {
    notFound();
  }
} 