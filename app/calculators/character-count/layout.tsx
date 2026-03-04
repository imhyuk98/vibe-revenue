import { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - 문자수, 단어수, 바이트 수 계산",
  description:
    "입력한 텍스트의 글자수, 공백 포함/제외 문자수, 단어수, 바이트 수를 실시간으로 계산하는 무료 온라인 글자수 세기 도구입니다.",
  keywords: [
    "글자수 세기",
    "문자수 세기",
    "글자수 카운터",
    "바이트 수 계산",
    "단어수 세기",
    "character counter",
  ],
  openGraph: {
    title: "글자수 세기 - 문자수, 단어수, 바이트 수 계산",
    description:
      "입력한 텍스트의 글자수, 공백 포함/제외 문자수, 단어수, 바이트 수를 실시간으로 계산하는 무료 온라인 글자수 세기 도구입니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
