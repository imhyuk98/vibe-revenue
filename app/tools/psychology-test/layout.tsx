import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "심리테스트 - 성격 유형, 연애 스타일, 스트레스 지수 테스트",
  description:
    "나의 성격 유형, 연애 스타일, 스트레스 지수를 알아보는 재미있는 심리테스트 모음입니다. 간단한 질문에 답하고 나의 유형을 확인해보세요.",
  keywords: [
    "심리테스트",
    "성격 유형 테스트",
    "연애 스타일 테스트",
    "스트레스 테스트",
    "무료 심리테스트",
    "성격 테스트",
    "재미있는 테스트",
    "자기 분석",
  ],
  openGraph: {
    title: "심리테스트 - 성격 유형, 연애 스타일, 스트레스 지수 테스트",
    description:
      "나의 성격 유형, 연애 스타일, 스트레스 지수를 알아보는 재미있는 심리테스트 모음입니다.",
    url: "https://vibe-revenue.pages.dev/tools/psychology-test",
  },
};

export default function PsychologyTestLayout({
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
            name: "심리테스트",
            description:
              "나의 성격 유형, 연애 스타일, 스트레스 지수를 알아보는 재미있는 심리테스트 모음입니다.",
            url: "https://vibe-revenue.pages.dev/tools/psychology-test",
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
