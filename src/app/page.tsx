'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import InfluencerCard from '@/components/InfluencerCard';
import FilterPanel from '@/components/FilterPanel';
import { searchInfluencers, getAllInfluencers } from '@/lib/search';
import { SearchResult, SearchFilters, SortOption } from '@/types/influencer';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [hasSearched, setHasSearched] = useState(false);

  // 検索実行
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setHasSearched(true);

      if (searchQuery.trim()) {
        const searchResults = searchInfluencers(searchQuery, filters, sortBy);
        setResults(searchResults);
      } else {
        // クエリが空の場合は全件表示
        const allInfluencers = getAllInfluencers().map((inf) => ({
          ...inf,
          relevanceScore: 0,
          matchReasons: [],
        }));
        setResults(allInfluencers);
      }
    },
    [filters, sortBy]
  );

  // フィルター変更
  const handleFiltersChange = useCallback(
    (newFilters: SearchFilters) => {
      setFilters(newFilters);
      if (hasSearched) {
        const searchResults = searchInfluencers(query, newFilters, sortBy);
        setResults(searchResults);
      }
    },
    [query, sortBy, hasSearched]
  );

  // ソート変更
  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      setSortBy(newSort);
      if (hasSearched) {
        const searchResults = searchInfluencers(query, filters, newSort);
        setResults(searchResults);
      }
    },
    [query, filters, hasSearched]
  );

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      {!hasSearched && (
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          {/* 背景デコレーション */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300/30 dark:bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute top-40 -left-40 w-80 h-80 bg-orange-300/30 dark:bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-yellow-300/30 dark:bg-yellow-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  AI検索
                </span>
                で最適な
                <br />
                インフルエンサーを発見
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                自然な言葉で検索するだけ。ストーリー由来の文脈データを活用して、
                あなたのニーズに最適なインフルエンサーをAIがレコメンドします。
              </p>

              {/* 検索バー */}
              <div className="max-w-2xl mx-auto">
                <SearchBar onSearch={handleSearch} initialQuery={query} />
              </div>

              {/* 特徴 */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-pink-600 dark:text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">自然言語検索</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    条件を細かく指定せず、普通の言葉で検索
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-orange-600 dark:text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    ストーリー文脈
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    投稿だけでなく日常の言及も考慮
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    マッチ理由表示
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    なぜヒットしたか、根拠を明示
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 検索結果セクション */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 検索バー（コンパクト版） */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} initialQuery={query} />
          </div>

          {/* フィルターパネル */}
          <div className="mb-6">
            <FilterPanel
              filters={filters}
              sortBy={sortBy}
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* 検索結果数と関連度の説明 */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {results.length}件のインフルエンサーが見つかりました
                {query && (
                  <span className="ml-2">
                    - 「<span className="font-medium text-gray-900 dark:text-white">{query}</span>
                    」で検索
                  </span>
                )}
              </p>
              {query && sortBy === 'relevance' && (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>関連度が高い順に表示しています</span>
                </div>
              )}
            </div>

            {/* 関連度の凡例 */}
            {query && results.length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">関連度の目安:</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-400" />
                    <span className="text-gray-600 dark:text-gray-300">80-100: 非常に高い</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <span className="text-gray-600 dark:text-gray-300">60-79: 高い</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400" />
                    <span className="text-gray-600 dark:text-gray-300">40-59: 中程度</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-gray-600 dark:text-gray-300">0-39: 低い</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 結果一覧 */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((influencer) => (
                <div key={influencer.id} className="animate-fade-in">
                  <InfluencerCard influencer={influencer} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                該当するインフルエンサーが見つかりませんでした
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                別のキーワードで検索するか、フィルターを調整してください
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
