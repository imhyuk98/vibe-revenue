import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "실업급여 계산기 - 예상 실업급여 자동 계산",
  description: "나이, 근속연수, 평균 월급을 입력하면 실업급여 일액과 수급 기간을 자동으로 계산합니다.",
  keywords: ["실업급여 계산기", "실업급여 계산", "고용보험 실업급여", "구직급여 계산"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
