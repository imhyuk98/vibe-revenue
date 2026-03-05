import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "술게임 모음 - 라이어게임, 진실or거짓, 폭탄돌리기, 업다운, 랜덤지목",
  description:
    "술자리에서 즐길 수 있는 5가지 인기 술게임 모음! 라이어 게임, 진실 or 도전, 폭탄 돌리기, 업다운 게임, 랜덤 지목까지 스마트폰으로 바로 플레이하세요.",
  keywords: [
    "술게임",
    "술게임 모음",
    "라이어 게임",
    "진실 or 거짓",
    "폭탄 돌리기",
    "업다운 게임",
    "랜덤 지목",
    "술자리 게임",
    "회식 게임",
    "파티 게임",
  ],
  openGraph: {
    title: "술게임 모음 - 라이어게임, 진실or거짓, 폭탄돌리기, 업다운, 랜덤지목",
    description:
      "술자리에서 즐길 수 있는 5가지 인기 술게임을 스마트폰으로 바로 플레이하세요!",
  },
};

export default function DrinkingGamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "술게임 모음",
            description:
              "술자리에서 즐길 수 있는 5가지 인기 술게임 모음! 라이어 게임, 진실 or 도전, 폭탄 돌리기, 업다운 게임, 랜덤 지목까지 스마트폰으로 바로 플레이하세요.",
            url: "https://vibe-revenue.pages.dev/tools/drinking-games",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
