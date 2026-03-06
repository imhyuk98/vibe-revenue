"use client";

import { useState, useMemo } from "react";
import RelatedTools from "@/components/RelatedTools";

type GasType = "heating" | "cooking";

interface TierBreakdown {
  tier: number;
  label: string;
  volume: number;
  unitPrice: number;
  amount: number;
}

interface GasResult {
  usage: number;
  gasType: GasType;
  basicFee: number;
  usageFee: number;
  tierBreakdown: TierBreakdown[];
  subtotal: number;
  vat: number;
  total: number;
}

// 난방용 누진제 단가 (2024 기준 approximate)
const HEATING_TIERS = [
  { limit: 10, label: "1~10m\u00B3", unitPrice: 580 },
  { limit: 20, label: "11~20m\u00B3", unitPrice: 700 },
  { limit: 30, label: "21~30m\u00B3", unitPrice: 820 },
  { limit: 40, label: "31~40m\u00B3", unitPrice: 940 },
  { limit: Infinity, label: "41m\u00B3 이상", unitPrice: 1060 },
];

const HEATING_BASIC_FEE = 1000;
const COOKING_BASIC_FEE = 900;
const COOKING_UNIT_PRICE = 720;
const VAT_RATE = 0.1;

function calculateGasBill(usage: number, gasType: GasType): GasResult {
  const basicFee = gasType === "heating" ? HEATING_BASIC_FEE : COOKING_BASIC_FEE;
  const tierBreakdown: TierBreakdown[] = [];
  let usageFee = 0;

  if (gasType === "heating") {
    let remaining = usage;
    let prevLimit = 0;

    for (let i = 0; i < HEATING_TIERS.length; i++) {
      if (remaining <= 0) break;
      const tier = HEATING_TIERS[i];
      const tierMax = tier.limit === Infinity ? remaining : tier.limit - prevLimit;
      const tierVolume = Math.min(remaining, tierMax);

      if (tierVolume > 0) {
        const amount = Math.round(tierVolume * tier.unitPrice);
        tierBreakdown.push({
          tier: i + 1,
          label: tier.label,
          volume: tierVolume,
          unitPrice: tier.unitPrice,
          amount,
        });
        usageFee += amount;
      }

      remaining -= tierVolume;
      prevLimit = tier.limit === Infinity ? prevLimit : tier.limit;
    }
  } else {
    // 취사용: 단일 단가
    usageFee = Math.round(usage * COOKING_UNIT_PRICE);
    tierBreakdown.push({
      tier: 1,
      label: "전체 사용량",
      volume: usage,
      unitPrice: COOKING_UNIT_PRICE,
      amount: usageFee,
    });
  }

  const subtotal = basicFee + usageFee;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = Math.floor((subtotal + vat) / 10) * 10;

  return {
    usage,
    gasType,
    basicFee,
    usageFee,
    tierBreakdown,
    subtotal,
    vat,
    total,
  };
}

export default function GasBillCalculator() {
  const [usage, setUsage] = useState("30");
  const [gasType, setGasType] = useState<GasType>("heating");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const result = useMemo<GasResult | null>(() => {
    const m3 = parseFloat(usage.replace(/,/g, ""));
    if (!m3 || m3 <= 0) return null;
    return calculateGasBill(m3, gasType);
  }, [usage, gasType]);

  const handleReset = () => {
    setUsage("");
    setGasType("heating");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`${formatNumber(result.total)}원`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setUsage(raw);
  };

  const formatNumber = (num: number) => num.toLocaleString("ko-KR");

  const quickAmounts = [10, 20, 30, 40, 50, 80];

  const faqItems = [
    {
      q: "도시가스 요금은 어떻게 구성되나요?",
      a: "도시가스 요금은 기본요금 + 사용요금 + 부가세(10%)로 구성됩니다. 난방용은 사용량에 따라 누진제가 적용되며, 취사용은 단일 단가로 계산됩니다.",
    },
    {
      q: "난방용과 취사용의 차이는 무엇인가요?",
      a: "난방용은 보일러 등 난방 목적으로 사용하는 가스로, 사용량이 많아질수록 단가가 올라가는 누진제가 적용됩니다. 취사용은 가스레인지 등 요리 목적으로, 단일 단가가 적용되어 상대적으로 저렴합니다.",
    },
    {
      q: "도시가스 사용량은 어떻게 확인하나요?",
      a: "가스 계량기의 숫자를 확인하거나, 도시가스 공급사 홈페이지·앱에서 월별 사용량을 조회할 수 있습니다. 검침표나 고지서에도 사용량(m\u00B3)이 표시되어 있습니다.",
    },
    {
      q: "지역별로 도시가스 요금이 다른가요?",
      a: "네, 도시가스 요금은 공급사(지역)별로 다릅니다. 본 계산기는 일반적인 기준 단가를 사용하므로 참고용으로 활용하시고, 정확한 요금은 해당 지역 도시가스 공급사에 확인하시기 바랍니다.",
    },
  ];

  return (
    <div className="py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
        도시가스 요금 계산기
      </h1>
      <p className="text-gray-500 mb-8">
        도시가스 사용량(m&sup3;)을 입력하면 난방용·취사용 가스요금을 실시간으로
        계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="calc-card p-6 mb-6">
        {/* 용도 선택 */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          용도 선택
        </label>
        <div className="flex gap-3 mb-5">
          {[
            { value: "heating" as GasType, label: "난방용" },
            { value: "cooking" as GasType, label: "취사용" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setGasType(opt.value)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                gasType === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 사용량 입력 */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          월간 가스 사용량
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              inputMode="decimal"
              value={usage}
              onChange={handleInputChange}
              placeholder="예: 30"
              className="calc-input calc-input-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              m&sup3;
            </span>
          </div>
          <button
            onClick={handleReset}
            className="calc-btn-secondary whitespace-nowrap"
          >
            초기화
          </button>
        </div>
        {/* 빠른 선택 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setUsage(String(amount))}
              className="calc-preset"
            >
              {amount}m&sup3;
            </button>
          ))}
        </div>
      </div>

      {/* 결과 영역 */}
      {result && (
        <div className="calc-card overflow-hidden mb-6">
          {/* 합계 하이라이트 */}
          <div className="calc-result-header">
            <p className="text-blue-100 text-sm mb-1 relative z-10">
              예상 가스요금
            </p>
            <div className="flex items-center justify-center gap-2 relative z-10">
              <p className="text-3xl font-bold">
                {formatNumber(result.total)}원
              </p>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-blue-500 hover:bg-blue-400 transition-colors"
                title="결과 복사"
                aria-label="결과 복사"
              >
                {copied ? (
                  <span className="text-xs text-white font-medium px-1">
                    복사됨!
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-2 relative z-10">
              월 {result.usage}m&sup3; 사용 /{" "}
              {gasType === "heating" ? "난방용" : "취사용"} 기준 (10원 미만 절사)
            </p>
          </div>

          {/* 요금 내역 */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">요금 내역</h3>
            <div className="space-y-3">
              <Row label="기본요금" value={result.basicFee} />
              <div className="border-t border-gray-100 pt-3">
                <Row label="사용요금" value={result.usageFee} bold />
                {result.tierBreakdown.map((t) => (
                  <div
                    key={t.tier}
                    className="flex justify-between items-center py-1 pl-4"
                  >
                    <span className="text-xs text-gray-500">
                      {t.label}: {t.volume}m&sup3; x{" "}
                      {formatNumber(t.unitPrice)}원
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatNumber(t.amount)}원
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3">
                <Row label="소계 (세전)" value={result.subtotal} bold />
              </div>
              <div className="border-t border-gray-100 pt-3">
                <Row label="부가가치세 (10%)" value={result.vat} />
              </div>
              <div className="border-t border-gray-200 pt-3">
                <Row label="월 가스요금 합계" value={result.total} bold />
              </div>
            </div>
          </div>

          {/* 구간별 사용량 바 차트 (난방용만) */}
          {gasType === "heating" && result.tierBreakdown.length > 1 && (
            <div className="px-6 pb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                구간별 요금 분포
              </h3>
              <div className="space-y-2">
                {result.tierBreakdown.map((t) => {
                  const pct = Math.round(
                    (t.amount / result.usageFee) * 100
                  );
                  return (
                    <div key={t.tier}>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{t.label}</span>
                        <span>
                          {formatNumber(t.amount)}원 ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${
                            t.tier === 1
                              ? "bg-blue-300"
                              : t.tier === 2
                              ? "bg-blue-400"
                              : t.tier === 3
                              ? "bg-blue-500"
                              : t.tier === 4
                              ? "bg-blue-600"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 모바일 하단 고정 바 */}
      {result && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[var(--card-bg)] border-t border-[var(--card-border)] px-4 py-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[var(--muted)]">예상 가스요금</p>
              <p className="text-lg font-extrabold text-blue-600">
                {formatNumber(result.total)}원
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="calc-btn-primary text-xs px-3 py-2"
            >
              {copied ? "복사됨!" : "복사"}
            </button>
          </div>
        </div>
      )}

      {/* 절약 팁 */}
      <div className="calc-card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-lg">💡</span> 가스요금 절약 팁
        </h3>
        <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">1.</span>
            <p>
              <strong>보일러 온도 조절:</strong> 실내 온도를 1도 낮추면 난방비를
              약 7% 절약할 수 있습니다. 적정 실내 온도는 18~20도입니다.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">2.</span>
            <p>
              <strong>보일러 외출 모드 활용:</strong> 장시간 외출 시 보일러를
              끄는 것보다 외출 모드로 설정하는 것이 재가열 비용을 줄여 더
              경제적입니다.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">3.</span>
            <p>
              <strong>창문 단열:</strong> 뽁뽁이(에어캡)나 단열 커튼을
              설치하면 열 손실을 줄여 난방비를 크게 절감할 수 있습니다.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-600 font-bold shrink-0">4.</span>
            <p>
              <strong>보일러 정기 점검:</strong> 보일러 배관 청소와 정기
              점검을 받으면 열효율이 높아져 가스 사용량을 줄일 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* SEO 콘텐츠 */}
      <section className="mt-12 space-y-8">
        <div className="calc-seo-card">
          <h2 className="calc-seo-title">도시가스 요금 안내</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            도시가스 요금은 기본요금과 사용요금, 부가가치세로 구성됩니다.
            난방용 도시가스는 사용량 구간에 따라 단가가 높아지는 누진제가
            적용되며, 취사용은 단일 단가가 적용됩니다. 도시가스 요금은
            지역별 공급사에 따라 차이가 있을 수 있으므로, 본 계산기의
            결과는 참고용으로 활용하시기 바랍니다. 정확한 요금은 해당 지역
            도시가스 공급사(서울도시가스, 삼천리, 대성에너지 등)에서 확인할
            수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            난방용 도시가스 요금표 (2024 기준)
          </h2>
          <div className="overflow-x-auto">
            <table className="calc-table">
              <thead>
                <tr>
                  <th>구간</th>
                  <th className="text-right">사용량</th>
                  <th className="text-right">단가 (m&sup3;당)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1구간</td>
                  <td className="text-right">1~10m&sup3;</td>
                  <td className="text-right">580원</td>
                </tr>
                <tr>
                  <td>2구간</td>
                  <td className="text-right">11~20m&sup3;</td>
                  <td className="text-right">700원</td>
                </tr>
                <tr>
                  <td>3구간</td>
                  <td className="text-right">21~30m&sup3;</td>
                  <td className="text-right">820원</td>
                </tr>
                <tr>
                  <td>4구간</td>
                  <td className="text-right">31~40m&sup3;</td>
                  <td className="text-right">940원</td>
                </tr>
                <tr>
                  <td>5구간</td>
                  <td className="text-right">41m&sup3; 이상</td>
                  <td className="text-right">1,060원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * 기본요금: 난방용 1,000원/월, 취사용 900원/월 (별도)
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            자주 묻는 질문 (FAQ)
          </h2>
          <div className="calc-faq">
            {faqItems.map((item, idx) => (
              <div key={idx} className="calc-faq-item">
                <button
                  className="calc-faq-q"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>Q. {item.q}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="calc-faq-a">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelatedTools current="gas-bill" />
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <span
        className={`text-sm ${
          bold ? "font-semibold text-gray-900" : "text-gray-600"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm ${
          bold ? "font-semibold text-gray-900" : "text-gray-900"
        }`}
      >
        {value.toLocaleString("ko-KR")}원
      </span>
    </div>
  );
}
