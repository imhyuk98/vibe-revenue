import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "손병호 게임 (나는 ~한 적 있다) 온라인 - 모두의도구",
  description:
    "손병호 게임을 온라인으로! '나는 ~한 적 있다/없다' 문장 카드를 랜덤으로 제공합니다. 술자리에서 서로를 알아가는 재미있는 게임!",
  keywords: [
    "손병호게임",
    "손병호 게임",
    "나는 한적있다",
    "술게임",
    "never have i ever",
    "파티 게임",
  ],
  openGraph: {
    title: "손병호 게임 (나는 ~한 적 있다) 온라인 - 모두의도구",
    description:
      "'나는 ~한 적 있다/없다' 문장 카드를 랜덤으로 제공합니다.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
