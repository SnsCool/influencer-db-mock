'use client';

import { useState, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

// 検索例
const searchExamples = [
  '料理系の最近伸びているアカウント',
  'サウナに行っている若い男性インフルエンサー',
  '美容系でストーリーもちゃんと使ってるPR向きの人',
  '20代女性に強いファッション系',
  'キャンプ好きのアウトドア系',
  'ラーメン巡りしている人',
];

export default function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query);
    },
    [query, onSearch]
  );

  const handleExampleClick = useCallback(
    (example: string) => {
      setQuery(example);
      onSearch(example);
    },
    [onSearch]
  );

  return (
    <div className="w-full">
      {/* 検索フォーム */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* 検索アイコン */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* 入力フィールド */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="自然な言葉でインフルエンサーを探す..."
            className="w-full pl-12 pr-24 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-lg"
          />

          {/* 検索ボタン */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-xl hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
          >
            検索
          </button>
        </div>
      </form>

      {/* 検索例 */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">検索例：</p>
        <div className="flex flex-wrap gap-2">
          {searchExamples.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
