import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Influencer Database | AI検索",
  description: "AIを活用した自然言語検索でインフルエンサーを発見。ストーリー由来の文脈データで、最適なインフルエンサーをレコメンド。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* ヘッダー */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  Influencer DB
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-xs font-medium bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full">
                  DEMO
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Influencer Database - AI-Powered Search Demo</p>
              <p className="mt-1">ダミーデータを使用したモックアプリです</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
