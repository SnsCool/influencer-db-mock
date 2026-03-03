// インフルエンサーデータベースの型定義

// メインジャンル
export type MainGenre =
  | '料理'
  | '美容'
  | 'ファッション'
  | 'グルメ'
  | 'フィットネス'
  | 'ライフスタイル'
  | 'ガジェット'
  | '旅行'
  | 'エンタメ'
  | '教育';

// 成長状態
export type GrowthStatus = '急成長' | '安定成長' | '停滞';

// アカウント規模
export type AccountScale = 'ナノ' | 'マイクロ' | 'ミドル' | 'メガ';

// アカウントフェーズ
export type AccountPhase = '新興' | '伸び始め' | '成熟';

// ストーリー内容分類
export type StoryContentType = '日常' | '本音' | '裏側' | '商品関連' | '交流' | '購買導線';

// トピックタグ（ストーリー由来）
export interface TopicTag {
  name: string;
  frequency: number; // 直近30日の言及回数
  lastMentionedDaysAgo: number; // 最後の言及からの日数
  continuity: number; // 継続性スコア (0-100)
  source: 'post' | 'story' | 'both';
}

// フォロワー属性
export interface AudienceAgeGroup {
  range: string;
  percentage: number;
}

export interface AudienceGenderRatio {
  male: number;
  female: number;
  other: number;
}

// 愛用アイテム
export interface FavoriteItem {
  category: string;
  items: string[];
}

// インフルエンサー型
export interface Influencer {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  bio: string;
  isVerified: boolean; // 認証済みアカウントか

  // 基本指標
  followers: number;
  following: number;
  posts: number;

  // コンテンツ・ジャンルメタ
  mainGenre: MainGenre;
  subGenres: string[];
  contentStyle: string[];

  // 成長・トレンドメタ
  growthStatus: GrowthStatus;
  followerGrowthRate30d: number; // %
  engagementRateChange30d: number; // %

  // アカウント規模・フェーズ
  accountScale: AccountScale;
  accountPhase: AccountPhase;

  // フォロワー属性
  audienceAgeGroups: AudienceAgeGroup[];
  audienceGenderRatio: AudienceGenderRatio;
  audienceTopRegions: string[];
  audienceInterests: string[];

  // 投稿・ストーリー活用
  postFrequencyPerWeek: number;
  storyFrequencyPerWeek: number;
  storyContentTypes: StoryContentType[];

  // 商材・ブランド親和性
  usedProductCategories: string[];
  usedBrands: string[];
  prSuitabilityScore: number; // 0-100

  // ストーリー由来のトピックタグ（重要）
  topicTags: TopicTag[];

  // 愛用アイテム・趣味
  hobbies: string[];
  favoriteItems: FavoriteItem[];

  // AI生成要約
  postSummary: string; // 投稿の要約
  storySummary: string; // ストーリーの要約
  storyRole: string; // ストーリーの役割

  // エンゲージメント
  engagementRate: number; // %
  avgLikes: number;
  avgComments: number;
  storyViewRate?: number; // 認証済みのみ
}

// 検索結果
export interface SearchResult extends Influencer {
  relevanceScore: number;
  matchReasons: MatchReason[];
}

// マッチ理由
export interface MatchReason {
  type: 'genre' | 'topic' | 'growth' | 'audience' | 'brand';
  description: string;
  source?: 'post' | 'story' | 'both';
  frequency?: number;
  lastMentionedDaysAgo?: number;
}

// フィルター
export interface SearchFilters {
  genres?: MainGenre[];
  scales?: AccountScale[];
  growthStatuses?: GrowthStatus[];
  minFollowers?: number;
  maxFollowers?: number;
  minEngagementRate?: number;
  isVerifiedOnly?: boolean;
}

// ソート
export type SortOption =
  | 'relevance'
  | 'followers'
  | 'engagementRate'
  | 'growthRate'
  | 'storyViewRate';
