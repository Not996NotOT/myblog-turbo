'use client';

import React from 'react';
import { Tab } from '@headlessui/react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory,
  onCategoryChange 
}: CategoryFilterProps) {
  // 找到当前选中分类的索引
  const selectedIndex = categories.indexOf(selectedCategory);

  return (
    <div className="w-full mb-8">
      <Tab.Group 
        selectedIndex={selectedIndex} 
        onChange={(index) => onCategoryChange(categories[index])}
      >
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${
                  selected
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                }
                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400
                focus:outline-none focus:ring-2
                transition-all duration-200`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
} 