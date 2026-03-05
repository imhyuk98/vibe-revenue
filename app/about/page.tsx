import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: "계산기나라는 연봉 계산기, 대출이자, 환율, 부동산 세금, MBTI 궁합 등 60가지 이상의 무료 온라인 계산기와 도구를 제공하는 사이트입니다.",
  keywords: ["계산기나라", "사이트 소개", "무료 계산기", "온라인 도구"],
  openGraph: {
    title: "사이트 소개 | 계산기나라",
    description: "계산기나라는 연봉 계산기, 대출이자, 환율, 부동산 세금, MBTI 궁합 등 60가지 이상의 무료 온라인 계산기와 도구를 제공하는 사이트입니다.",
    url: "https://vibe-revenue.pages.dev/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">사이트 소개</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            계산기나라란?
          </h2>
          <p>
            계산기나라는 연봉 실수령액, 대출이자, BMI, 퇴직금, 연차 등 일상
            생활에서 자주 필요한 계산을 빠르고 정확하게 도와주는 무료 온라인
            계산기 서비스입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">특징</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>회원가입 없이 무료로 이용 가능</li>
            <li>최신 세율 및 요율 반영</li>
            <li>모바일에서도 편리하게 사용 가능</li>
            <li>개인정보 수집 없이 안전하게 이용</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">면책 조항</h2>
          <p>
            본 사이트에서 제공하는 계산 결과는 참고용이며, 실제 금액은 개인의
            상황에 따라 다를 수 있습니다. 정확한 금액은 관련 기관에 문의하시기
            바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">문의</h2>
          <p>
            사이트 이용 중 문의사항이 있으시면 아래 이메일로 연락 주세요.
          </p>
          <p className="font-medium text-gray-900">
            이메일: contact@example.com
          </p>
        </section>
      </div>
    </div>
  );
}
