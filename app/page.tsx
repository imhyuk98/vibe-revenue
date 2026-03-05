"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Item {
  title: string;
  href: string;
  emoji: string;
}

const financeCalcs: Item[] = [
  { title: "환율 계산기", href: "/calculators/exchange-rate", emoji: "\uD83D\uDCB1" },
  { title: "연봉 실수령액", href: "/calculators/salary", emoji: "\uD83D\uDCB0" },
  { title: "대출이자 계산기", href: "/calculators/loan", emoji: "\uD83C\uDFE6" },
  { title: "예금이자 계산기", href: "/calculators/deposit", emoji: "\uD83C\uDFE6" },
  { title: "적금 이자 계산기", href: "/calculators/savings", emoji: "\uD83D\uDCB3" },
  { title: "퇴직금 계산기", href: "/calculators/retirement", emoji: "\uD83D\uDCBC" },
  { title: "실업급여 계산기", href: "/calculators/unemployment", emoji: "\uD83D\uDCCB" },
  { title: "주식 수익률", href: "/calculators/stock-return", emoji: "\uD83D\uDCC8" },
  { title: "물타기 계산기", href: "/calculators/average-price", emoji: "\uD83D\uDCB9" },
  { title: "인플레이션", href: "/calculators/inflation", emoji: "\uD83D\uDCB8" },
  { title: "자동차세", href: "/calculators/car-tax", emoji: "\uD83D\uDE97" },
  { title: "전기요금", href: "/calculators/electricity", emoji: "\u26A1" },
  { title: "부가세 계산기", href: "/calculators/vat", emoji: "\uD83E\uDDFE" },
  { title: "로또 세금", href: "/calculators/lotto-tax", emoji: "\uD83C\uDFB0" },
];

const realEstateCalcs: Item[] = [
  { title: "중개수수료", href: "/calculators/brokerage-fee", emoji: "\uD83C\uDFE2" },
  { title: "취득세 계산기", href: "/calculators/acquisition-tax", emoji: "\uD83C\uDFE0" },
  { title: "양도소득세", href: "/calculators/capital-gains-tax", emoji: "\uD83D\uDCB0" },
  { title: "증여세 계산기", href: "/calculators/gift-tax", emoji: "\uD83C\uDF81" },
  { title: "상속세 계산기", href: "/calculators/inheritance-tax", emoji: "\uD83D\uDCDC" },
  { title: "전월세 전환", href: "/calculators/rent-conversion", emoji: "\uD83C\uDFE0" },
];

const lifeCalcs: Item[] = [
  { title: "퍼센트 계산기", href: "/calculators/percent", emoji: "\uD83D\uDCCA" },
  { title: "글자수 세기", href: "/calculators/character-count", emoji: "\uD83D\uDCDD" },
  { title: "나이 계산기", href: "/calculators/age", emoji: "\uD83C\uDF82" },
  { title: "날짜 계산기", href: "/calculators/dday", emoji: "\uD83D\uDCC5" },
  { title: "평수 계산기", href: "/calculators/pyeong", emoji: "\uD83C\uDFE2" },
  { title: "단위 변환기", href: "/calculators/unit-converter", emoji: "\uD83D\uDD04" },
  { title: "비율 계산기", href: "/calculators/ratio", emoji: "\uD83D\uDCCF" },
  { title: "BMI 계산기", href: "/calculators/bmi", emoji: "\u2696\uFE0F" },
  { title: "음주 측정기", href: "/calculators/alcohol", emoji: "\uD83C\uDF7A" },
  { title: "연차 계산기", href: "/calculators/annual-leave", emoji: "\uD83C\uDFD6\uFE0F" },
  { title: "학점 계산기", href: "/calculators/gpa", emoji: "\uD83C\uDF93" },
  { title: "공학용 계산기", href: "/calculators/scientific", emoji: "\uD83D\uDD2C" },
];

const funCalcs: Item[] = [
  { title: "MBTI 궁합", href: "/calculators/mbti-compatibility", emoji: "\uD83D\uDC95" },
  { title: "이름 궁합", href: "/calculators/name-compatibility", emoji: "\uD83D\uDC98" },
  { title: "별자리 계산기", href: "/calculators/constellation", emoji: "\u2B50" },
  { title: "띠 계산기", href: "/calculators/zodiac", emoji: "\uD83D\uDC09" },
  { title: "혈액형 계산기", href: "/calculators/blood-type", emoji: "\uD83E\uDE78" },
  { title: "사주팔자", href: "/calculators/saju", emoji: "\u262F\uFE0F" },
  { title: "전생 테스트", href: "/calculators/past-life", emoji: "\uD83D\uDD2E" },
  { title: "오늘의 운세", href: "/calculators/daily-fortune", emoji: "\uD83C\uDF1F" },
  { title: "커플 D-day", href: "/calculators/couple-dday", emoji: "\uD83D\uDC91" },
  { title: "심리테스트", href: "/tools/psychology-test", emoji: "\uD83E\uDDE0" },
  { title: "MBTI 검사", href: "/tools/mbti-test", emoji: "\uD83E\uDDE9" },
];

const drinkingGames: Item[] = [
  { title: "라이어 게임", href: "/tools/liar-game", emoji: "\uD83E\uDD25" },
  { title: "진실 or 도전", href: "/tools/truth-or-dare", emoji: "\uD83C\uDFAF" },
  { title: "폭탄 돌리기", href: "/tools/bomb-game", emoji: "\uD83D\uDCA3" },
  { title: "업다운 게임", href: "/tools/updown-game", emoji: "\uD83D\uDD22" },
  { title: "랜덤 지목", href: "/tools/random-pick", emoji: "\uD83C\uDFB0" },
  { title: "베스킨라빈스 31", href: "/tools/baskin-robbins-31", emoji: "\uD83C\uDF66" },
  { title: "초성 퀴즈", href: "/tools/chosung-quiz", emoji: "\uD83D\uDD24" },
  { title: "이미지 게임", href: "/tools/image-game", emoji: "\uD83D\uDDBC\uFE0F" },
  { title: "손병호 게임", href: "/tools/never-have-i-ever", emoji: "\uD83D\uDD90\uFE0F" },
  { title: "눈치 게임", href: "/tools/nunchi-game", emoji: "\uD83D\uDC40" },
  { title: "텔레파시 게임", href: "/tools/telepathy-game", emoji: "\uD83E\uDDE0" },
  { title: "사다리 타기", href: "/tools/ladder-game", emoji: "\uD83E\uDDEA" },
];

const games: Item[] = [
  { title: "반응속도 테스트", href: "/tools/reaction-test", emoji: "\u26A1" },
  { title: "기억력 테스트", href: "/tools/memory-game", emoji: "\uD83C\uDFAE" },
  { title: "색맹 테스트", href: "/tools/color-blind-test", emoji: "\uD83C\uDFA8" },
  { title: "2048", href: "/tools/game-2048", emoji: "\uD83C\uDFAE" },
  { title: "스도쿠", href: "/tools/sudoku", emoji: "\uD83E\uDDE9" },
  { title: "블록 탈출", href: "/tools/block-escape", emoji: "\uD83D\uDE97" },
  { title: "지뢰찾기", href: "/tools/minesweeper", emoji: "\uD83D\uDCA3" },
  { title: "스네이크", href: "/tools/snake-game", emoji: "\uD83D\uDC0D" },
  { title: "오목", href: "/tools/omok", emoji: "\u26AB" },
];

const tools: Item[] = [
  { title: "타이머 & 스톱워치", href: "/tools/timer", emoji: "\u23F1\uFE0F" },
  { title: "JSON 포매터", href: "/tools/json-formatter", emoji: "\uD83D\uDCDD" },
  { title: "Base64 인코더", href: "/tools/base64", emoji: "\uD83D\uDD10" },
  { title: "QR 코드 생성기", href: "/tools/qr-code", emoji: "\uD83D\uDCF1" },
  { title: "색상 변환기", href: "/tools/color-converter", emoji: "\uD83C\uDFA8" },
  { title: "이미지 변환기", href: "/tools/image-converter", emoji: "\uD83D\uDDBC\uFE0F" },
  { title: "CSV JSON 변환기", href: "/tools/csv-json", emoji: "\uD83D\uDCC4" },
  { title: "닉네임 생성기", href: "/tools/nickname-generator", emoji: "\uD83C\uDFAD" },
  { title: "Markdown HTML", href: "/tools/markdown-html", emoji: "\uD83D\uDCE8" },
  { title: "랜덤 숫자 생성기", href: "/tools/random-number", emoji: "\uD83C\uDFB2" },
  { title: "타자 속도 측정", href: "/tools/typing-test", emoji: "\u2328\uFE0F" },
  { title: "랜덤 룰렛", href: "/tools/random-roulette", emoji: "\uD83C\uDFB0" },
];

const sections = [
  { key: "finance", label: "금융", items: financeCalcs },
  { key: "realestate", label: "부동산", items: realEstateCalcs },
  { key: "life", label: "생활", items: lifeCalcs },
  { key: "fun", label: "재미/운세", items: funCalcs },
  { key: "drinking", label: "술게임", items: drinkingGames },
  { key: "games", label: "게임", items: games },
  { key: "tools", label: "도구", items: tools },
];

const allItems = sections.flatMap((s) => s.items);

const FAVORITES_KEY = "calc_favorites";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch { return []; }
}

function toggleFavorite(href: string): string[] {
  const favs = getFavorites();
  const next = favs.includes(href) ? favs.filter((f) => f !== href) : [...favs, href];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

function CompactCard({ item, isFav, onToggleFav }: {
  item: Item;
  isFav: boolean;
  onToggleFav: (href: string) => void;
}) {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5"
      >
        <span className="text-xl flex-shrink-0">{item.emoji}</span>
        <span className="text-sm font-medium text-gray-800 truncate">{item.title}</span>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(item.href); }}
        className={`absolute top-1 right-1 w-7 h-7 flex items-center justify-center rounded-full transition-all ${
          isFav
            ? "text-yellow-500 bg-yellow-50 border border-yellow-200"
            : "text-gray-300 bg-white/80 border border-gray-100 opacity-0 group-hover:opacity-100"
        }`}
        aria-label={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        <span className="text-xs">{isFav ? "\u2605" : "\u2606"}</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFav = (href: string) => {
    setFavorites(toggleFavorite(href));
  };

  const favItems = allItems.filter((i) => favorites.includes(i.href));

  // Filter items by search
  const filterBySearch = (items: Item[]) =>
    search ? items.filter((i) => i.title.includes(search)) : items;

  // Determine visible sections
  const visibleSections = activeTab === "all"
    ? sections
    : sections.filter((s) => s.key === activeTab);

  const hasSearchResults = search
    ? sections.some((s) => s.items.some((i) => i.title.includes(search)))
    : true;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          생활 계산기 & 온라인 도구 모음
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-5">
          계산기, 변환기, 게임까지 — 무료로 바로 사용하세요.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="계산기 또는 도구 검색..."
            className="w-full pl-11 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="검색 지우기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Category Tabs — sticky */}
      <div className="sticky top-12 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 px-4 py-2.5 mb-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전체
          </button>
          {sections.map((s) => {
            const count = search ? filterBySearch(s.items).length : s.items.length;
            return (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === s.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.label}
                <span className={`ml-1 text-xs ${activeTab === s.key ? "text-blue-200" : "text-gray-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorites (only in "all" tab, no search) */}
      {!search && activeTab === "all" && favItems.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
            <span className="text-yellow-500">&#9733;</span> 즐겨찾기
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {favItems.map((item) => (
              <CompactCard key={item.href} item={item} isFav={true} onToggleFav={handleToggleFav} />
            ))}
          </div>
        </section>
      )}

      {/* Search: no results */}
      {search && !hasSearchResults && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-2">&quot;{search}&quot;에 대한 검색 결과가 없습니다.</p>
          <button onClick={() => setSearch("")} className="text-blue-600 hover:underline text-sm">
            검색 초기화
          </button>
        </div>
      )}

      {/* Content Grid */}
      {visibleSections.map((section) => {
        const filtered = filterBySearch(section.items);
        if (filtered.length === 0) return null;

        return (
          <section key={section.key} className="mb-8">
            {/* Section header (shown in "all" tab or search mode) */}
            {(activeTab === "all" || search) && (
              <h2 className="text-base font-bold text-gray-900 mb-3">{section.label}</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filtered.map((item) => (
                <CompactCard
                  key={item.href}
                  item={item}
                  isFav={favorites.includes(item.href)}
                  onToggleFav={handleToggleFav}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
