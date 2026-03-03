import { mockInfluencers } from '@/data/mockInfluencers';
import {
  Influencer,
  SearchResult,
  MatchReason,
  SearchFilters,
  SortOption,
  MainGenre,
  GrowthStatus,
  AccountScale,
} from '@/types/influencer';

// キーワードマッピング（自然言語 → 検索条件）
const keywordMappings: Record<string, { genres?: MainGenre[]; topics?: string[]; attributes?: string[] }> = {
  // ジャンル系
  料理: { genres: ['料理'], topics: ['料理', '時短料理', 'レシピ'] },
  美容: { genres: ['美容'], topics: ['スキンケア', 'コスメ', 'メイク'] },
  ファッション: { genres: ['ファッション'], topics: ['コーディネート', 'UNIQLO', 'ストリート'] },
  グルメ: { genres: ['グルメ'], topics: ['ラーメン', 'カフェ', '食べ歩き'] },
  フィットネス: { genres: ['フィットネス'], topics: ['筋トレ', 'ヨガ', 'ワークアウト'] },
  ライフスタイル: { genres: ['ライフスタイル'], topics: ['暮らし', '収納', 'インテリア'] },
  ガジェット: { genres: ['ガジェット'], topics: ['Apple', 'スマホ', 'PC'] },
  旅行: { genres: ['旅行'], topics: ['温泉', 'ホテル', '国内旅行'] },

  // トピック系（ストーリー由来を重視）
  サウナ: { topics: ['サウナ', '整う', 'テントサウナ', '銭湯'] },
  カフェ: { topics: ['カフェ', 'コーヒー'] },
  筋トレ: { topics: ['筋トレ', 'ワークアウト', 'プロテイン'] },
  ラーメン: { topics: ['ラーメン', '二郎系'] },
  温泉: { topics: ['温泉', 'サウナ'] },
  ヨガ: { topics: ['ヨガ', '瞑想', 'ウェルネス'] },
  キャンプ: { topics: ['キャンプ', '焚き火', 'アウトドア'] },
  スニーカー: { topics: ['スニーカー', 'Nike'] },
  ネイル: { topics: ['ネイル', 'セルフネイル', 'ジェルネイル'] },
  コスメ: { topics: ['韓国コスメ', 'スキンケア', 'メイク'] },
  育児: { topics: ['育児', 'ワーママ', '時短'] },

  // 成長状態系
  伸びている: { attributes: ['急成長', '伸び始め'] },
  急成長: { attributes: ['急成長'] },
  最近伸びている: { attributes: ['急成長', '伸び始め'] },
  人気: { attributes: ['急成長', '安定成長'] },

  // ターゲット層系
  '20代': { attributes: ['20代'] },
  '30代': { attributes: ['30代'] },
  女性: { attributes: ['女性'] },
  男性: { attributes: ['男性'] },
  若い: { attributes: ['18-24', '25-34'] },

  // PR適性系
  PR向き: { attributes: ['PR向き'] },
  タイアップ: { attributes: ['PR向き'] },
};

// クエリからキーワードを抽出
function extractKeywords(query: string): {
  genres: MainGenre[];
  topics: string[];
  attributes: string[];
} {
  const genres: MainGenre[] = [];
  const topics: string[] = [];
  const attributes: string[] = [];

  // キーワードマッピングを使用して抽出
  Object.entries(keywordMappings).forEach(([keyword, mapping]) => {
    if (query.includes(keyword)) {
      if (mapping.genres) {
        genres.push(...mapping.genres);
      }
      if (mapping.topics) {
        topics.push(...mapping.topics);
      }
      if (mapping.attributes) {
        attributes.push(...mapping.attributes);
      }
    }
  });

  // 重複を除去
  return {
    genres: [...new Set(genres)],
    topics: [...new Set(topics)],
    attributes: [...new Set(attributes)],
  };
}

// マッチ理由を生成
function generateMatchReasons(
  influencer: Influencer,
  keywords: { genres: MainGenre[]; topics: string[]; attributes: string[] }
): MatchReason[] {
  const reasons: MatchReason[] = [];

  // ジャンルマッチ
  if (keywords.genres.includes(influencer.mainGenre)) {
    reasons.push({
      type: 'genre',
      description: `メインジャンル: ${influencer.mainGenre}`,
    });
  }

  // トピックマッチ（ストーリー由来を重視）
  influencer.topicTags.forEach((tag) => {
    const matchedTopic = keywords.topics.find(
      (topic) => tag.name.includes(topic) || topic.includes(tag.name)
    );
    if (matchedTopic) {
      reasons.push({
        type: 'topic',
        description:
          tag.source === 'story'
            ? `ストーリーで「${tag.name}」言及が多い`
            : tag.source === 'both'
              ? `投稿・ストーリー両方で「${tag.name}」を発信`
              : `投稿で「${tag.name}」を発信`,
        source: tag.source,
        frequency: tag.frequency,
        lastMentionedDaysAgo: tag.lastMentionedDaysAgo,
      });
    }
  });

  // 成長状態マッチ
  if (
    keywords.attributes.includes('急成長') &&
    influencer.growthStatus === '急成長'
  ) {
    reasons.push({
      type: 'growth',
      description: `急成長中（+${influencer.followerGrowthRate30d}%/30日）`,
    });
  }
  if (
    keywords.attributes.includes('伸び始め') &&
    influencer.accountPhase === '伸び始め'
  ) {
    reasons.push({
      type: 'growth',
      description: '伸び始めフェーズ',
    });
  }

  // オーディエンス属性マッチ
  if (keywords.attributes.includes('女性') && influencer.audienceGenderRatio.female > 70) {
    reasons.push({
      type: 'audience',
      description: `女性フォロワー ${influencer.audienceGenderRatio.female}%`,
    });
  }
  if (keywords.attributes.includes('男性') && influencer.audienceGenderRatio.male > 70) {
    reasons.push({
      type: 'audience',
      description: `男性フォロワー ${influencer.audienceGenderRatio.male}%`,
    });
  }

  // 年代マッチ
  const youngAudience = influencer.audienceAgeGroups.filter(
    (g) => g.range === '18-24' || g.range === '25-34'
  );
  const youngPercentage = youngAudience.reduce((sum, g) => sum + g.percentage, 0);
  if (
    (keywords.attributes.includes('若い') ||
      keywords.attributes.includes('20代') ||
      keywords.attributes.includes('18-24') ||
      keywords.attributes.includes('25-34')) &&
    youngPercentage > 60
  ) {
    reasons.push({
      type: 'audience',
      description: `18-34歳が${youngPercentage}%`,
    });
  }

  // PR適性マッチ
  if (keywords.attributes.includes('PR向き') && influencer.prSuitabilityScore >= 80) {
    reasons.push({
      type: 'brand',
      description: `PR適性スコア: ${influencer.prSuitabilityScore}/100`,
    });
  }

  return reasons;
}

// 関連度スコアを計算
function calculateRelevanceScore(
  influencer: Influencer,
  keywords: { genres: MainGenre[]; topics: string[]; attributes: string[] },
  matchReasons: MatchReason[]
): number {
  let score = 0;

  // ベーススコア
  score += matchReasons.length * 10;

  // ジャンル一致ボーナス
  if (keywords.genres.includes(influencer.mainGenre)) {
    score += 30;
  }

  // トピック一致ボーナス（ストーリー由来は高得点）
  matchReasons
    .filter((r) => r.type === 'topic')
    .forEach((r) => {
      if (r.source === 'story') {
        score += 25; // ストーリー由来は高得点
      } else if (r.source === 'both') {
        score += 30; // 両方あるとさらに高得点
      } else {
        score += 15;
      }

      // 頻度ボーナス
      if (r.frequency && r.frequency >= 10) {
        score += 10;
      }

      // 直近性ボーナス
      if (r.lastMentionedDaysAgo !== undefined && r.lastMentionedDaysAgo <= 3) {
        score += 10;
      }
    });

  // 成長状態ボーナス
  if (influencer.growthStatus === '急成長') {
    score += 15;
  }

  // エンゲージメント率ボーナス
  if (influencer.engagementRate >= 7) {
    score += 10;
  } else if (influencer.engagementRate >= 5) {
    score += 5;
  }

  // 認証済みボーナス
  if (influencer.isVerified) {
    score += 5;
  }

  return Math.min(score, 100); // 最大100
}

// メイン検索関数
export function searchInfluencers(
  query: string,
  filters?: SearchFilters,
  sortBy: SortOption = 'relevance'
): SearchResult[] {
  // キーワード抽出
  const keywords = extractKeywords(query);

  // 全インフルエンサーをスコアリング
  let results: SearchResult[] = mockInfluencers.map((influencer) => {
    const matchReasons = generateMatchReasons(influencer, keywords);
    const relevanceScore = calculateRelevanceScore(influencer, keywords, matchReasons);

    return {
      ...influencer,
      relevanceScore,
      matchReasons,
    };
  });

  // フィルター適用
  if (filters) {
    results = results.filter((r) => {
      if (filters.genres && filters.genres.length > 0) {
        if (!filters.genres.includes(r.mainGenre)) return false;
      }
      if (filters.scales && filters.scales.length > 0) {
        if (!filters.scales.includes(r.accountScale)) return false;
      }
      if (filters.growthStatuses && filters.growthStatuses.length > 0) {
        if (!filters.growthStatuses.includes(r.growthStatus)) return false;
      }
      if (filters.minFollowers !== undefined) {
        if (r.followers < filters.minFollowers) return false;
      }
      if (filters.maxFollowers !== undefined) {
        if (r.followers > filters.maxFollowers) return false;
      }
      if (filters.minEngagementRate !== undefined) {
        if (r.engagementRate < filters.minEngagementRate) return false;
      }
      if (filters.isVerifiedOnly) {
        if (!r.isVerified) return false;
      }
      return true;
    });
  }

  // クエリが空の場合はマッチ理由がなくてもOK、クエリがある場合はマッチ理由が必要
  if (query.trim()) {
    results = results.filter((r) => r.matchReasons.length > 0 || r.relevanceScore > 0);
  }

  // ソート
  switch (sortBy) {
    case 'relevance':
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);
      break;
    case 'followers':
      results.sort((a, b) => b.followers - a.followers);
      break;
    case 'engagementRate':
      results.sort((a, b) => b.engagementRate - a.engagementRate);
      break;
    case 'growthRate':
      results.sort((a, b) => b.followerGrowthRate30d - a.followerGrowthRate30d);
      break;
    case 'storyViewRate':
      results.sort((a, b) => (b.storyViewRate || 0) - (a.storyViewRate || 0));
      break;
  }

  return results;
}

// IDでインフルエンサーを取得
export function getInfluencerById(id: string): Influencer | undefined {
  return mockInfluencers.find((i) => i.id === id);
}

// 全インフルエンサーを取得
export function getAllInfluencers(): Influencer[] {
  return mockInfluencers;
}

// フォーマットヘルパー
export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// 規模からラベルを取得
export function getScaleLabel(scale: AccountScale): string {
  const labels: Record<AccountScale, string> = {
    ナノ: '〜1万',
    マイクロ: '1万〜10万',
    ミドル: '10万〜50万',
    メガ: '50万〜',
  };
  return labels[scale];
}

// 成長状態からカラーを取得
export function getGrowthStatusColor(status: GrowthStatus): string {
  const colors: Record<GrowthStatus, string> = {
    急成長: 'text-green-500',
    安定成長: 'text-blue-500',
    停滞: 'text-gray-500',
  };
  return colors[status];
}

// 成長状態からバッジカラーを取得
export function getGrowthStatusBadgeColor(status: GrowthStatus): string {
  const colors: Record<GrowthStatus, string> = {
    急成長: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    安定成長: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    停滞: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };
  return colors[status];
}
