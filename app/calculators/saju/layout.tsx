import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사주팔자 계산기 - 생년월일 사주 오행 분석 무료",
  description:
    "생년월일과 태어난 시간으로 사주팔자(년주, 월주, 일주, 시주)를 계산하고 오행 분석, 일간 성격 분석을 무료로 제공합니다.",
  keywords: [
    "사주팔자",
    "사주 계산기",
    "사주풀이",
    "오행 분석",
    "천간 지지",
    "생년월일 사주",
    "무료 사주",
    "팔자 계산",
  ],
  openGraph: {
    title: "사주팔자 계산기 - 생년월일 사주 오행 분석 무료",
    description:
      "생년월일과 태어난 시간으로 사주팔자를 계산하고 오행 분석, 일간 성격 분석을 무료로 제공합니다.",
    url: "https://vibe-revenue.pages.dev/calculators/saju",
  },
};

export default function SajuLayout({
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
            name: "사주팔자 계산기",
            description:
              "생년월일과 태어난 시간으로 사주팔자를 계산하고 오행 분석, 일간 성격 분석을 무료로 제공합니다.",
            url: "https://vibe-revenue.pages.dev/calculators/saju",
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
