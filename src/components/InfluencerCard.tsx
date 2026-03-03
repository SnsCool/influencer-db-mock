'use client';

import Link from 'next/link';
import { SearchResult, MatchReason } from '@/types/influencer';
import { formatFollowers, getGrowthStatusBadgeColor } from '@/lib/search';

interface InfluencerCardProps {
  influencer: SearchResult;
}

// マッチ理由のアイコンを取得
function getMatchReasonIcon(type: MatchReason['type']): string {
  switch (type) {
    case 'genre':
      return '🏷️';
    case 'topic':
      return '💬';
    case 'growth':
      return '📈';
    case 'audience':
      return '👥';
    case 'brand':
      return '🤝';
    default:
      return '✓';
  }
}

// 関連度のレベルとスタイルを取得
function getRelevanceInfo(score: number): {
  label: string;
  color: string;
  bgColor: string;
  barColor: string;
} {
  if (score >= 80) {
    return {
      label: '非常に高い',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
      barColor: 'bg-gradient-to-r from-emerald-500 to-green-400',
    };
  } else if (score >= 60) {
    return {
      label: '高い',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      barColor: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    };
  } else if (score >= 40) {
    return {
      label: '中程度',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      barColor: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    };
  } else {
    return {
      label: '低い',
      color: 'text-gray-500 dark:text-gray-400',
      bgColor: 'bg-gray-50 dark:bg-gray-800',
      barColor: 'bg-gray-300 dark:bg-gray-600',
    };
  }
}

export default function InfluencerCard({ influencer }: InfluencerCardProps) {
  // トップ3のマッチ理由のみ表示
  const topReasons = influencer.matchReasons.slice(0, 3);
  const relevanceInfo = getRelevanceInfo(influencer.relevanceScore);

  return (
    <Link href={`/influencer/${influencer.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 group">
        {/* 関連度バー（検索結果の場合のみ表示） */}
        {influencer.relevanceScore > 0 && (
          <div className={`px-4 py-3 ${relevanceInfo.bgColor} border-b border-gray-100 dark:border-gray-700`}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <svg className={`w-4 h-4 ${relevanceInfo.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`text-sm font-semibold ${relevanceInfo.color}`}>
                  関連度: {relevanceInfo.label}
                </span>
              </div>
              <span className={`text-lg font-bold ${relevanceInfo.color}`}>
                {influencer.relevanceScore}
                <span className="text-xs font-normal ml-0.5">/100</span>
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${relevanceInfo.barColor}`}
                style={{ width: `${influencer.relevanceScore}%` }}
              />
            </div>
          </div>
        )}

        {/* ヘッダー部分 */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* プロフィール画像 */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[2px]">
                <img
                  src={influencer.profileImage}
                  alt={influencer.displayName}
                  className="w-full h-full rounded-full object-cover bg-white dark:bg-gray-800"
                />
              </div>
              {/* 認証バッジ */}
              {influencer.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* 基本情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {influencer.displayName}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{influencer.username}</p>

              {/* バッジ類 */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-2 py-0.5 text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 rounded-full">
                  {influencer.mainGenre}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${getGrowthStatusBadgeColor(influencer.growthStatus)}`}
                >
                  {influencer.growthStatus}
                </span>
              </div>
            </div>
          </div>

          {/* 指標 */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatFollowers(influencer.followers)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">フォロワー</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {influencer.engagementRate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">エンゲージメント</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                +{influencer.followerGrowthRate30d.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">30日成長率</p>
            </div>
          </div>

          {/* AI要約 */}
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {influencer.postSummary.slice(0, 100)}...
          </p>
        </div>

        {/* マッチ理由（検索結果の場合のみ表示） */}
        {topReasons.length > 0 && (
          <div className="px-5 pb-5">
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                ヒット理由
              </p>
              <div className="space-y-1.5">
                {topReasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span>{getMatchReasonIcon(reason.type)}</span>
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300">{reason.description}</span>
                      {reason.type === 'topic' && (
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {reason.frequency !== undefined && (
                            <span>直近30日 {reason.frequency}回</span>
                          )}
                          {reason.lastMentionedDaysAgo !== undefined && (
                            <span>
                              最後の言及{' '}
                              {reason.lastMentionedDaysAgo === 0
                                ? '今日'
                                : `${reason.lastMentionedDaysAgo}日前`}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
