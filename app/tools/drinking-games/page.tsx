"use client";

import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

const GAMES = [
  {
    title: "라이어 게임",
    href: "/tools/liar-game",
    icon: "🤥",
    desc: "참가자 중 라이어를 찾아내는 대화형 추리 게임! 3~10명이 함께 즐길 수 있습니다.",
    players: "3~10명",
  },
  {
    title: "진실 or 도전",
    href: "/tools/truth-or-dare",
    icon: "🎯",
    desc: "진실을 말하거나 도전 미션을 수행하세요! 50개 이상의 질문과 미션이 준비되어 있습니다.",
    players: "2명 이상",
  },
  {
    title: "폭탄 돌리기",
    href: "/tools/bomb-game",
    icon: "💣",
    desc: "랜덤 타이머로 긴장감 넘치는 폭탄 돌리기! 폭탄이 터질 때 가진 사람이 벌칙!",
    players: "2명 이상",
  },
  {
    title: "업다운 게임",
    href: "/tools/updown-game",
    icon: "🔢",
    desc: "1~100 사이 숫자를 맞추는 스릴 넘치는 게임! 숫자를 맞추는 사람이 벌칙!",
    players: "2명 이상",
  },
  {
    title: "랜덤 지목",
    href: "/tools/random-pick",
    icon: "🎰",
    desc: "룰렛처럼 돌려서 한 명을 뽑고 랜덤 미션을 수행! 누가 걸릴지 모르는 스릴!",
    players: "2명 이상",
  },
];

export default function DrinkingGamesPage() {
  return (
    <div className="py-4 max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">🍻 술게임 모음</h1>
      <p className="text-gray-500 mb-6">
        술자리를 더 재미있게! 5가지 인기 술게임을 즐겨보세요.
        앱 설치 없이 스마트폰 브라우저에서 바로 플레이할 수 있습니다.
      </p>

      <div className="grid gap-4">
        {GAMES.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-purple-300 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{game.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {game.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {game.desc}
                </p>
                <span className="inline-block mt-2 text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full font-medium">
                  {game.players}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
        <p className="text-amber-700 text-sm">
          🍺 음주는 적당히! 건강한 음주 문화를 만들어 갑시다.
        </p>
        <p className="text-amber-500 text-xs mt-1">
          19세 미만 음주는 법으로 금지되어 있습니다.
        </p>
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">술게임 모음 소개</h2>
          <p className="text-gray-600 leading-relaxed">
            술자리를 더욱 재미있게 만들어주는 5가지 인기 술게임을 한 곳에 모았습니다.
            별도의 앱 설치 없이 스마트폰 브라우저에서 바로 즐길 수 있으며,
            회식, 파티, 모임 등 다양한 자리에서 활용할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">게임별 소개</h2>
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            <div>
              <h3 className="font-medium text-gray-900">🤥 라이어 게임</h3>
              <p className="mt-1">
                참가자 중 한 명이 라이어가 됩니다. 라이어를 제외한 나머지 참가자에게는 같은 제시어가 주어지고,
                라이어에게는 카테고리만 알려줍니다. 대화를 통해 라이어를 찾아내세요!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🎯 진실 or 도전</h3>
              <p className="mt-1">
                진실을 선택하면 질문에 솔직하게 답해야 하고, 도전을 선택하면 주어진 미션을 수행해야 합니다.
                거부하면 벌칙!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">💣 폭탄 돌리기</h3>
              <p className="mt-1">
                랜덤 시간 안에 폭탄이 터집니다. 폭탄을 가지고 있을 때 터지면 벌칙!
                얼마나 남았는지 알 수 없어 더욱 스릴 넘칩니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🔢 업다운 게임</h3>
              <p className="mt-1">
                1부터 100 사이 숨겨진 숫자를 맞추는 게임입니다. 숫자를 입력하면 정답보다 큰지 작은지
                알려줍니다. 정답을 맞추는 사람이 벌칙!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🎰 랜덤 지목</h3>
              <p className="mt-1">
                룰렛처럼 참가자 이름이 빠르게 돌아가다가 한 명이 선택됩니다.
                선택된 사람에게는 랜덤 미션이 주어집니다!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">몇 명부터 할 수 있나요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                라이어 게임은 3명 이상, 나머지 게임은 2명 이상부터 가능합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">앱 설치가 필요한가요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                아닙니다! 웹 브라우저에서 바로 사용할 수 있어 별도의 앱 설치가 필요 없습니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">데이터가 저장되나요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                모든 게임은 브라우저에서만 실행되며, 서버에 어떠한 데이터도 저장하지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools current="drinking-games" />
    </div>
  );
}
