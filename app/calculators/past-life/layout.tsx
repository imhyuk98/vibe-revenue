import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "전생 테스트 - 생년월일로 알아보는 나의 전생 직업",
  description:
    "생년월일을 입력하면 나의 전생 직업과 시대, 성격, 현생에 미치는 영향을 재미있게 알아볼 수 있는 무료 전생 테스트입니다.",
  keywords: [
    "전생 테스트",
    "전생 직업",
    "전생 알아보기",
    "생년월일 전생",
    "전생 체험",
    "나의 전생",
    "무료 전생 테스트",
  ],
  openGraph: {
    title: "전생 테스트 - 생년월일로 알아보는 나의 전생 직업",
    description:
      "생년월일을 입력하면 나의 전생 직업과 시대, 성격, 현생에 미치는 영향을 재미있게 알아볼 수 있습니다.",
  },
};

export default function PastLifeLayout({
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
            name: "전생 테스트",
            description:
              "생년월일을 입력하면 나의 전생 직업과 시대, 성격, 현생에 미치는 영향을 재미있게 알아볼 수 있는 무료 전생 테스트입니다.",
            url: "https://vibe-revenue.pages.dev/calculators/past-life",
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
