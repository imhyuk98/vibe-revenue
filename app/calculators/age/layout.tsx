import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나이 계산기 - 만나이 한국나이 계산",
  description: "생년월일을 입력하면 만 나이와 한국 나이를 계산하고 다음 생일까지 남은 일수를 알려줍니다.",
  keywords: ["나이 계산기", "만나이 계산", "한국나이 계산", "만 나이", "생일 계산기"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
