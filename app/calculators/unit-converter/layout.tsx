import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "단위 변환기 - 길이 무게 온도 단위 변환",
  description: "길이(cm, inch, ft), 무게(kg, lb, oz), 온도(℃, ℉) 등 다양한 단위를 간편하게 변환합니다.",
  keywords: ["단위 변환기", "cm inch 변환", "kg lb 변환", "섭씨 화씨 변환", "단위 계산기"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
