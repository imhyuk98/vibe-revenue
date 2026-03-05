import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "눈치 게임 온라인 - 계산기나라",
  description:
    "눈치 게임을 온라인으로! 참가자들이 동시에 숫자를 외치고 겹치면 벌칙. 타이밍과 눈치가 중요한 술자리 필수 게임!",
  keywords: [
    "눈치게임",
    "눈치 게임",
    "술게임",
    "숫자 게임",
    "파티 게임",
    "술자리 게임",
  ],
  openGraph: {
    title: "눈치 게임 온라인 - 계산기나라",
    description:
      "참가자들이 동시에 숫자를 외치고 겹치면 벌칙. 타이밍과 눈치가 중요한 게임!",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
