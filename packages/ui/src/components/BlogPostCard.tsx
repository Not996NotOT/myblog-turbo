'use client';

import React from 'react';
import { Transition } from '@headlessui/react';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

export function BlogPostCard({ title, excerpt, date, category, slug }: BlogPostCardProps) {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-colors hover:bg-blue-200">
              {category}
            </span>
            <time className="text-sm text-gray-500">{date}</time>
          </div>
          <a href={`/posts/${slug}`} className="block group">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-3 mb-4">{excerpt}</p>
          </a>
          <div className="mt-auto">
            <a
              href={`/posts/${slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Read more
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  );
} 