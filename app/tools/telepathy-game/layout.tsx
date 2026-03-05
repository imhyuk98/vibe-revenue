import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텔레파시 게임 온라인 - 계산기나라",
  description:
    "텔레파시 게임을 온라인으로! 주어진 주제에 대해 같은 단어를 맞추는 게임입니다. 친구, 연인과 얼마나 통하는지 확인하세요!",
  keywords: [
    "텔레파시게임",
    "텔레파시 게임",
    "술게임",
    "커플 게임",
    "짝꿍 게임",
    "마음 맞추기",
  ],
  openGraph: {
    title: "텔레파시 게임 온라인 - 계산기나라",
    description:
      "주어진 주제에 대해 같은 단어를 맞추는 게임! 얼마나 통하는지 확인하세요!",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
