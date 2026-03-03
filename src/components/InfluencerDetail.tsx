'use client';

import { Influencer } from '@/types/influencer';
import { formatFollowers, getGrowthStatusBadgeColor, getScaleLabel } from '@/lib/search';

interface InfluencerDetailProps {
  influencer: Influencer;
}

export default function InfluencerDetail({ influencer }: InfluencerDetailProps) {
  // トピックタグを頻度順にソート
  const sortedTopicTags = [...influencer.topicTags].sort((a, b) => b.frequency - a.frequency);

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-6">
          {/* プロフィール画像 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-[3px]">
                <img
                  src={influencer.profileImage}
                  alt={influencer.displayName}
                  className="w-full h-full rounded-full object-cover bg-white dark:bg-gray-800"
                />
              </div>
              {influencer.isVerified && (
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 基本情報 */}
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {influencer.displayName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">@{influencer.username}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{influencer.bio}</p>
              </div>

              {/* バッジ類 */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 rounded-full">
                  {influencer.mainGenre}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getGrowthStatusBadgeColor(influencer.growthStatus)}`}
                >
                  {influencer.growthStatus}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                  {influencer.accountScale}（{getScaleLabel(influencer.accountScale)}）
                </span>
                {influencer.isVerified && (
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                    認証済み
                  </span>
                )}
              </div>
            </div>

            {/* サブジャンル */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">サブジャンル:</p>
              <div className="flex flex-wrap gap-2">
                {influencer.subGenres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 定量指標 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">定量指標</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatFollowers(influencer.followers)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">フォロワー</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {influencer.engagementRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">エンゲージメント率</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              +{influencer.followerGrowthRate30d.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">30日成長率</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {influencer.prSuitabilityScore}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">PR適性スコア</p>
          </div>
        </div>

        {/* 追加指標 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {influencer.postFrequencyPerWeek}回/週
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">投稿頻度</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {influencer.storyFrequencyPerWeek}回/週
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">ストーリー頻度</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatFollowers(influencer.avgLikes)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">平均いいね</p>
          </div>
          {influencer.storyViewRate !== undefined ? (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {influencer.storyViewRate}%
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">ストーリー閲覧率</p>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">認証済み限定データ</p>
            </div>
          ) : (
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl opacity-50">
              <p className="text-xl font-bold text-gray-400">-</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">ストーリー閲覧率</p>
              <p className="text-xs text-gray-400 mt-1">認証が必要</p>
            </div>
          )}
        </div>
      </div>

      {/* トピック頻度（ストーリー由来） */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          トピック頻度（ストーリー由来）
        </h2>
        <div className="space-y-4">
          {sortedTopicTags.map((tag) => {
            const maxFrequency = sortedTopicTags[0]?.frequency || 1;
            const widthPercentage = (tag.frequency / maxFrequency) * 100;

            return (
              <div key={tag.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{tag.name}</span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        tag.source === 'story'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                          : tag.source === 'both'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {tag.source === 'story' ? 'ストーリー' : tag.source === 'both' ? '両方' : '投稿'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>直近30日: {tag.frequency}回</span>
                    <span>
                      最後の言及:{' '}
                      {tag.lastMentionedDaysAgo === 0 ? '今日' : `${tag.lastMentionedDaysAgo}日前`}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-orange-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 普段の発信内容（投稿） */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          普段の発信内容（投稿）
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{influencer.postSummary}</p>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">コンテンツスタイル:</p>
          <div className="flex flex-wrap gap-2">
            {influencer.contentStyle.map((style) => (
              <span
                key={style}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ストーリーでの発信内容 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          ストーリーでの発信内容
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {influencer.storySummary}
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">ストーリーの役割:</p>
          <span className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
            {influencer.storyRole}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            ストーリー内容の分類:
          </p>
          <div className="flex flex-wrap gap-2">
            {influencer.storyContentTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 愛用しているもの・趣味 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          愛用しているもの・趣味
        </h2>

        {/* 趣味 */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">趣味・関心:</p>
          <div className="flex flex-wrap gap-2">
            {influencer.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30 text-pink-800 dark:text-pink-300 rounded-full"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* 愛用アイテム */}
        <div className="space-y-4">
          {influencer.favoriteItems.map((item) => (
            <div key={item.category}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {item.category}:
              </p>
              <div className="flex flex-wrap gap-2">
                {item.items.map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用商品・ブランド */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          使用商品・ブランド
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">商品カテゴリ:</p>
            <div className="flex flex-wrap gap-2">
              {influencer.usedProductCategories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">使用ブランド:</p>
            <div className="flex flex-wrap gap-2">
              {influencer.usedBrands.map((brand) => (
                <span
                  key={brand}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* フォロワー属性 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">フォロワー属性</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 年齢層 */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">年齢層:</p>
            <div className="space-y-2">
              {influencer.audienceAgeGroups.map((group) => (
                <div key={group.range} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600 dark:text-gray-300">{group.range}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-gray-600 dark:text-gray-300 text-right">
                    {group.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 性別比 */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">性別比:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div
                    className="bg-blue-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${influencer.audienceGenderRatio.male}%` }}
                  >
                    {influencer.audienceGenderRatio.male}%
                  </div>
                  <div
                    className="bg-pink-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${influencer.audienceGenderRatio.female}%` }}
                  >
                    {influencer.audienceGenderRatio.female}%
                  </div>
                  {influencer.audienceGenderRatio.other > 0 && (
                    <div
                      className="bg-purple-500 flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${influencer.audienceGenderRatio.other}%` }}
                    >
                      {influencer.audienceGenderRatio.other}%
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>男性</span>
                  <span>女性</span>
                  {influencer.audienceGenderRatio.other > 0 && <span>その他</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 地域・関心 */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">トップ地域:</p>
            <div className="flex flex-wrap gap-2">
              {influencer.audienceTopRegions.map((region) => (
                <span
                  key={region}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">フォロワーの関心:</p>
            <div className="flex flex-wrap gap-2">
              {influencer.audienceInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 認証/非認証の注釈 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {influencer.isVerified ? (
              <>
                <span className="font-medium text-blue-600 dark:text-blue-400">認証済みアカウント:</span>{' '}
                フォロワー属性は実データに基づいています。
              </>
            ) : (
              <>
                <span className="font-medium text-gray-600 dark:text-gray-300">非認証アカウント:</span>{' '}
                フォロワー属性はAIによる推定値です。実際のデータとは異なる場合があります。
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
