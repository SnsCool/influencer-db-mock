'use client';

import { useState, useCallback } from 'react';
import {
  SearchFilters,
  SortOption,
  MainGenre,
  AccountScale,
  GrowthStatus,
} from '@/types/influencer';

interface FilterPanelProps {
  filters: SearchFilters;
  sortBy: SortOption;
  onFiltersChange: (filters: SearchFilters) => void;
  onSortChange: (sort: SortOption) => void;
}

const genres: MainGenre[] = [
  '料理',
  '美容',
  'ファッション',
  'グルメ',
  'フィットネス',
  'ライフスタイル',
  'ガジェット',
  '旅行',
  'エンタメ',
  '教育',
];

const scales: AccountScale[] = ['ナノ', 'マイクロ', 'ミドル', 'メガ'];

const growthStatuses: GrowthStatus[] = ['急成長', '安定成長', '停滞'];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: '関連度順' },
  { value: 'followers', label: 'フォロワー数順' },
  { value: 'engagementRate', label: 'エンゲージメント率順' },
  { value: 'growthRate', label: '成長率順' },
  { value: 'storyViewRate', label: 'ストーリー閲覧率順' },
];

export default function FilterPanel({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // ジャンルの切り替え
  const toggleGenre = useCallback(
    (genre: MainGenre) => {
      const currentGenres = filters.genres || [];
      const newGenres = currentGenres.includes(genre)
        ? currentGenres.filter((g) => g !== genre)
        : [...currentGenres, genre];
      onFiltersChange({ ...filters, genres: newGenres.length > 0 ? newGenres : undefined });
    },
    [filters, onFiltersChange]
  );

  // 規模の切り替え
  const toggleScale = useCallback(
    (scale: AccountScale) => {
      const currentScales = filters.scales || [];
      const newScales = currentScales.includes(scale)
        ? currentScales.filter((s) => s !== scale)
        : [...currentScales, scale];
      onFiltersChange({ ...filters, scales: newScales.length > 0 ? newScales : undefined });
    },
    [filters, onFiltersChange]
  );

  // 成長状態の切り替え
  const toggleGrowthStatus = useCallback(
    (status: GrowthStatus) => {
      const currentStatuses = filters.growthStatuses || [];
      const newStatuses = currentStatuses.includes(status)
        ? currentStatuses.filter((s) => s !== status)
        : [...currentStatuses, status];
      onFiltersChange({
        ...filters,
        growthStatuses: newStatuses.length > 0 ? newStatuses : undefined,
      });
    },
    [filters, onFiltersChange]
  );

  // 認証済みのみの切り替え
  const toggleVerifiedOnly = useCallback(() => {
    onFiltersChange({ ...filters, isVerifiedOnly: !filters.isVerifiedOnly });
  }, [filters, onFiltersChange]);

  // フィルターをクリア
  const clearFilters = useCallback(() => {
    onFiltersChange({});
  }, [onFiltersChange]);

  // アクティブなフィルター数を計算
  const activeFilterCount =
    (filters.genres?.length || 0) +
    (filters.scales?.length || 0) +
    (filters.growthStatuses?.length || 0) +
    (filters.isVerifiedOnly ? 1 : 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      {/* ヘッダー */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* ソート */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">並び替え:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* フィルター展開ボタン */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>フィルター</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-pink-500 text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* クリアボタン */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-pink-600 dark:text-pink-400 hover:underline"
          >
            フィルターをクリア
          </button>
        )}
      </div>

      {/* 展開されたフィルター */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* ジャンル */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ジャンル</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    filters.genres?.includes(genre)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* アカウント規模 */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              アカウント規模
            </p>
            <div className="flex flex-wrap gap-2">
              {scales.map((scale) => (
                <button
                  key={scale}
                  onClick={() => toggleScale(scale)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    filters.scales?.includes(scale)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>

          {/* 成長状態 */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">成長状態</p>
            <div className="flex flex-wrap gap-2">
              {growthStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => toggleGrowthStatus(status)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    filters.growthStatuses?.includes(status)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* 認証済みのみ */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verifiedOnly"
              checked={filters.isVerifiedOnly || false}
              onChange={toggleVerifiedOnly}
              className="w-4 h-4 text-pink-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-pink-500"
            />
            <label
              htmlFor="verifiedOnly"
              className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              認証済みアカウントのみ
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
