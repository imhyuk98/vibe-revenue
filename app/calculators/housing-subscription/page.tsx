"use client";

import { useState, useMemo } from "react";
import RelatedTools from "@/components/RelatedTools";

const HOMELESS_OPTIONS = [
  { label: "만 30세 미만 미혼", score: 0 },
  { label: "1년 미만", score: 2 },
  { label: "1년 ~ 2년 미만", score: 4 },
  { label: "2년 ~ 3년 미만", score: 6 },
  { label: "3년 ~ 4년 미만", score: 8 },
  { label: "4년 ~ 5년 미만", score: 10 },
  { label: "5년 ~ 6년 미만", score: 12 },
  { label: "6년 ~ 7년 미만", score: 14 },
  { label: "7년 ~ 8년 미만", score: 16 },
  { label: "8년 ~ 9년 미만", score: 18 },
  { label: "9년 ~ 10년 미만", score: 20 },
  { label: "10년 ~ 11년 미만", score: 22 },
  { label: "11년 ~ 12년 미만", score: 24 },
  { label: "12년 ~ 13년 미만", score: 26 },
  { label: "13년 ~ 14년 미만", score: 28 },
  { label: "14년 ~ 15년 미만", score: 30 },
  { label: "15년 이상", score: 32 },
];

const DEPENDENTS_OPTIONS = [
  { label: "0명", score: 5 },
  { label: "1명", score: 10 },
  { label: "2명", score: 15 },
  { label: "3명", score: 20 },
  { label: "4명", score: 25 },
  { label: "5명", score: 30 },
  { label: "6명 이상", score: 35 },
];

const ACCOUNT_OPTIONS = [
  { label: "6개월 미만", score: 1 },
  { label: "6개월 ~ 1년 미만", score: 2 },
  { label: "1년 ~ 2년 미만", score: 3 },
  { label: "2년 ~ 3년 미만", score: 4 },
  { label: "3년 ~ 4년 미만", score: 5 },
  { label: "4년 ~ 5년 미만", score: 6 },
  { label: "5년 ~ 6년 미만", score: 7 },
  { label: "6년 ~ 7년 미만", score: 8 },
  { label: "7년 ~ 8년 미만", score: 9 },
  { label: "8년 ~ 9년 미만", score: 10 },
  { label: "9년 ~ 10년 미만", score: 11 },
  { label: "10년 ~ 11년 미만", score: 12 },
  { label: "11년 ~ 12년 미만", score: 13 },
  { label: "12년 ~ 13년 미만", score: 14 },
  { label: "13년 ~ 14년 미만", score: 15 },
  { label: "14년 ~ 15년 미만", score: 16 },
  { label: "15년 이상", score: 17 },
];

function getWinProbability(total: number) {
  if (total >= 70) return { label: "높음 (수도권)", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", desc: "수도권 주요 단지에서도 당첨 가능성이 높습니다." };
  if (total >= 65) return { label: "보통 (수도권)", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", desc: "수도권 일부 단지에서 당첨이 가능한 점수대입니다." };
  if (total >= 60) return { label: "높음 (서울 외곽/지방)", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", desc: "서울 외곽이나 지방 광역시에서 당첨 가능성이 높습니다." };
  if (total >= 50) return { label: "보통 (지방)", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", desc: "지방 중소도시에서 당첨 가능성이 있는 점수대입니다." };
  return { label: "낮음", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", desc: "가점이 낮아 당첨이 어려울 수 있습니다. 추첨제 물량을 노려보세요." };
}

export default function HousingSubscriptionCalculator() {
  const [homelessIdx, setHomelessIdx] = useState(0);
  const [dependentsIdx, setDependentsIdx] = useState(0);
  const [accountIdx, setAccountIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const homelessScore = HOMELESS_OPTIONS[homelessIdx].score;
    const dependentsScore = DEPENDENTS_OPTIONS[dependentsIdx].score;
    const accountScore = ACCOUNT_OPTIONS[accountIdx].score;
    const total = homelessScore + dependentsScore + accountScore;
    return { homelessScore, dependentsScore, accountScore, total };
  }, [homelessIdx, dependentsIdx, accountIdx]);

  const probability = useMemo(() => getWinProbability(result.total), [result.total]);

  const handleReset = () => {
    setHomelessIdx(0);
    setDependentsIdx(0);
    setAccountIdx(0);
    setCopied(false);
  };

  const handleCopy = async () => {
    const text = `청약 가점: ${result.total}점/84점\n- 무주택기간: ${result.homelessScore}점 (${HOMELESS_OPTIONS[homelessIdx].label})\n- 부양가족수: ${result.dependentsScore}점 (${DEPENDENTS_OPTIONS[dependentsIdx].label})\n- 청약통장 가입기간: ${result.accountScore}점 (${ACCOUNT_OPTIONS[accountIdx].label})\n- 당첨 가능성: ${probability.label}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const gaugePercent = (result.total / 84) * 100;

  return (
    <div className="py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">청약 점수 계산기</h1>
      <p className="text-gray-500 mb-8">
        무주택기간, 부양가족수, 청약통장 가입기간을 선택하면 청약 가점(최대 84점)을 자동으로 계산합니다.
      </p>

      {/* 입력 폼 */}
      <div className="calc-card p-6 mb-6 space-y-5">
        {/* 무주택기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            무주택기간 <span className="text-gray-400">(최대 32점)</span>
          </label>
          <select
            value={homelessIdx}
            onChange={(e) => setHomelessIdx(Number(e.target.value))}
            className="calc-input"
          >
            {HOMELESS_OPTIONS.map((opt, i) => (
              <option key={i} value={i}>
                {opt.label} ({opt.score}점)
              </option>
            ))}
          </select>
        </div>

        {/* 부양가족수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            부양가족수 <span className="text-gray-400">(최대 35점)</span>
          </label>
          <select
            value={dependentsIdx}
            onChange={(e) => setDependentsIdx(Number(e.target.value))}
            className="calc-input"
          >
            {DEPENDENTS_OPTIONS.map((opt, i) => (
              <option key={i} value={i}>
                {opt.label} ({opt.score}점)
              </option>
            ))}
          </select>
        </div>

        {/* 청약통장 가입기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            청약통장 가입기간 <span className="text-gray-400">(최대 17점)</span>
          </label>
          <select
            value={accountIdx}
            onChange={(e) => setAccountIdx(Number(e.target.value))}
            className="calc-input"
          >
            {ACCOUNT_OPTIONS.map((opt, i) => (
              <option key={i} value={i}>
                {opt.label} ({opt.score}점)
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset} className="calc-btn-secondary">
            초기화
          </button>
        </div>
      </div>

      {/* 결과 - 총점 히어로 카드 */}
      <div className="calc-card overflow-hidden mb-6">
        <div className="bg-blue-600 text-white p-6 text-center">
          <p className="text-blue-100 text-sm mb-1">나의 청약 가점</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-5xl font-bold">{result.total}</p>
            <p className="text-2xl text-blue-200">/ 84점</p>
          </div>
          <div className={`mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${probability.bg} ${probability.color}`}>
            당첨 가능성: {probability.label}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 게이지 미터 */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0점</span>
              <span>84점</span>
            </div>
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${gaugePercent}%`,
                  background: gaugePercent >= 83 ? "#16a34a" : gaugePercent >= 70 ? "#2563eb" : gaugePercent >= 60 ? "#ca8a04" : gaugePercent >= 50 ? "#ea580c" : "#dc2626",
                }}
              />
              <div
                className="absolute top-0 h-full flex items-center transition-all duration-500 ease-out"
                style={{ left: `${Math.min(gaugePercent, 95)}%` }}
              >
                <span className="text-xs font-bold text-gray-700 ml-2">{result.total}점</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>낮음</span>
              <span>60점</span>
              <span>65점</span>
              <span>70점</span>
              <span>만점</span>
            </div>
          </div>

          {/* 점수 항목별 바 차트 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">항목별 점수</h3>

            {/* 무주택기간 */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">무주택기간</span>
                <span className="font-semibold text-gray-900">{result.homelessScore}점 / 32점</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(result.homelessScore / 32) * 100}%` }}
                />
              </div>
            </div>

            {/* 부양가족수 */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">부양가족수</span>
                <span className="font-semibold text-gray-900">{result.dependentsScore}점 / 35점</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(result.dependentsScore / 35) * 100}%` }}
                />
              </div>
            </div>

            {/* 청약통장 가입기간 */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">청약통장 가입기간</span>
                <span className="font-semibold text-gray-900">{result.accountScore}점 / 17점</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(result.accountScore / 17) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 당첨 가능성 평가 */}
          <div className={`p-4 rounded-lg border ${probability.bg} ${probability.border}`}>
            <p className={`font-semibold ${probability.color} mb-1`}>당첨 가능성: {probability.label}</p>
            <p className="text-sm text-gray-600">{probability.desc}</p>
          </div>
        </div>
      </div>

      {/* 점수 올리기 팁 */}
      <div className="calc-card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">청약 가점 올리기 팁</h3>
        <ul className="text-gray-600 space-y-3 text-sm">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">1.</span>
            <span>
              <strong>청약통장 일찍 가입하기</strong> - 만 17세부터 가입 가능하며, 가입 기간이 길수록 가점이 높습니다.
              미성년자도 가입 가능하니 일찍 가입하세요.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">2.</span>
            <span>
              <strong>무주택 기간 유지하기</strong> - 만 30세부터 무주택기간이 산정됩니다.
              기혼자는 혼인신고일부터 계산되며, 배우자도 무주택이어야 합니다.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">3.</span>
            <span>
              <strong>부양가족 등록 확인</strong> - 배우자, 직계존속(3년 이상 동일 주민등록), 직계비속이 부양가족으로 인정됩니다.
              주민등록등본상 세대 구성을 미리 확인하세요.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">4.</span>
            <span>
              <strong>추첨제 병행 전략</strong> - 가점이 낮다면 추첨제 물량(전용 85m² 초과)도 함께 노려보세요.
              추첨제는 가점과 무관하게 당첨 가능합니다.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold shrink-0">5.</span>
            <span>
              <strong>특별공급 확인</strong> - 신혼부부, 생애최초, 다자녀 등 특별공급 자격이 되는지 먼저 확인하세요.
              가점제보다 당첨 가능성이 높을 수 있습니다.
            </span>
          </li>
        </ul>
      </div>

      {/* 가점 기준표 */}
      <div className="calc-card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">청약 가점 기준표</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 border border-gray-200">항목</th>
                <th className="text-center py-2 px-3 border border-gray-200">배점</th>
                <th className="text-center py-2 px-3 border border-gray-200">최고점</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="py-2 px-3 border border-gray-200 font-medium">무주택기간</td>
                <td className="text-center py-2 px-3 border border-gray-200">0 ~ 32점</td>
                <td className="text-center py-2 px-3 border border-gray-200 font-semibold">32점</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-200 font-medium">부양가족수</td>
                <td className="text-center py-2 px-3 border border-gray-200">5 ~ 35점</td>
                <td className="text-center py-2 px-3 border border-gray-200 font-semibold">35점</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-200 font-medium">청약통장 가입기간</td>
                <td className="text-center py-2 px-3 border border-gray-200">1 ~ 17점</td>
                <td className="text-center py-2 px-3 border border-gray-200 font-semibold">17점</td>
              </tr>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 border border-gray-200">합계</td>
                <td className="text-center py-2 px-3 border border-gray-200">6 ~ 84점</td>
                <td className="text-center py-2 px-3 border border-gray-200 text-blue-600">84점</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 복사/초기화 버튼 고정 바 (모바일) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[var(--card-bg)] border-t border-[var(--card-border)] px-4 py-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[var(--muted)]">청약 가점</p>
            <p className="text-lg font-extrabold text-blue-600">{result.total}점 / 84점</p>
          </div>
          <button onClick={handleCopy} className="calc-btn-primary text-xs px-3 py-2">
            {copied ? "복사됨!" : "복사"}
          </button>
        </div>
      </div>

      {/* 데스크톱 복사 버튼 */}
      <div className="hidden sm:flex gap-3 mb-6">
        <button onClick={handleCopy} className="calc-btn-primary">
          {copied ? "복사됨!" : "결과 복사"}
        </button>
        <button onClick={handleReset} className="calc-btn-secondary">
          초기화
        </button>
      </div>

      {/* SEO 콘텐츠 */}
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">청약 가점제란?</h2>
          <p className="text-gray-600 leading-relaxed">
            청약 가점제는 무주택기간, 부양가족수, 청약통장 가입기간 3가지 항목의 점수를 합산하여
            높은 점수 순서대로 당첨자를 선정하는 제도입니다. 최대 84점 만점이며,
            전용면적 85m² 이하 주택의 일반공급에 적용됩니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">무주택기간 산정 기준</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li><strong>산정 시작일</strong> - 만 30세가 되는 날부터 산정됩니다. 단, 만 30세 이전에 혼인한 경우 혼인신고일부터 산정합니다.</li>
            <li><strong>배우자 포함</strong> - 본인뿐 아니라 배우자도 무주택이어야 합니다. 배우자가 주택을 소유하면 0점입니다.</li>
            <li><strong>주택 소유 이력</strong> - 과거에 주택을 소유한 적이 있다면, 해당 주택을 처분한 날부터 무주택기간이 다시 산정됩니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">부양가족수 인정 기준</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li><strong>배우자</strong> - 주민등록 분리 여부와 관계없이 부양가족으로 인정됩니다.</li>
            <li><strong>직계존속</strong> - 신청자 또는 배우자의 부모/조부모로, 3년 이상 같은 주민등록등본에 등재되어야 합니다.</li>
            <li><strong>직계비속</strong> - 만 30세 미만의 미혼 자녀가 해당됩니다. 주민등록등본상 세대 분리 시 인정되지 않습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">가점제 vs 추첨제</h2>
          <p className="text-gray-600 leading-relaxed">
            전용면적 85m² 이하 주택은 가점제 75% + 추첨제 25%로 배정됩니다(수도권 과밀억제권역 기준).
            가점이 낮은 경우 85m² 초과 주택의 추첨제(100% 추첨)를 노리거나,
            특별공급(신혼부부, 생애최초, 다자녀 등)에 지원하는 것이 유리합니다.
          </p>
        </div>
      </section>

      <RelatedTools current="housing-subscription" />
    </div>
  );
}
