"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { calculateBMI } from "@/lib/calculations";

const HEIGHTS = [150, 155, 160, 163, 165, 168, 170, 173, 175, 178, 180, 183, 185, 190];
const WEIGHTS = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

const BMI_RANGES = [
  { category: "저체중", range: "18.5 미만", color: "text-blue-500", bg: "bg-blue-50" },
  { category: "정상", range: "18.5 ~ 22.9", color: "text-green-500", bg: "bg-green-50" },
  { category: "과체중", range: "23.0 ~ 24.9", color: "text-yellow-500", bg: "bg-yellow-50" },
  { category: "비만", range: "25.0 ~ 29.9", color: "text-orange-500", bg: "bg-orange-50" },
  { category: "고도비만", range: "30.0 이상", color: "text-red-500", bg: "bg-red-50" },
];

function getStandardWeight(heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round(heightM * heightM * 22 * 10) / 10;
}

export default function BMIParamsPage() {
  const { params } = useParams<{ params: string }>();
  const [heightStr, weightStr] = params.split("-");
  const height = parseInt(heightStr);
  const weight = parseInt(weightStr);
  const result = calculateBMI(height, weight);
  const standardWeight = getStandardWeight(height);
  const weightDiff = Math.round((weight - standardWeight) * 10) / 10;

  // Related: same height, different weights (±5kg)
  const relatedByHeight = WEIGHTS.filter(
    (w) => w !== weight && Math.abs(w - weight) <= 15
  ).slice(0, 6);

  // Related: same weight, different heights (±5cm)
  const relatedByWeight = HEIGHTS.filter(
    (h) => h !== height && Math.abs(h - height) <= 15
  ).slice(0, 6);

  // Hero card background color based on category
  const heroBgMap: Record<string, string> = {
    저체중: "bg-blue-50",
    정상: "bg-green-50",
    과체중: "bg-yellow-50",
    비만: "bg-orange-50",
    고도비만: "bg-red-50",
  };
  const heroBg = heroBgMap[result.category] || "bg-gray-50";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* 브레드크럼 */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-500">
          홈
        </Link>
        {" > "}
        <Link href="/" className="hover:text-blue-500">
          생활 계산기
        </Link>
        {" > "}
        <Link href="/calculators/bmi" className="hover:text-blue-500">
          BMI 계산기
        </Link>
        {" > "}
        <span className="text-gray-700">
          키 {height}cm 몸무게 {weight}kg
        </span>
      </nav>

      {/* H1 */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        키 {height}cm 몸무게 {weight}kg BMI 계산 결과
      </h1>
      <p className="text-gray-500 mb-8">
        대한비만학회 기준 체질량지수(BMI) 분석 결과입니다.
      </p>

      {/* 핵심 결과 카드 */}
      <div className={`${heroBg} rounded-2xl p-6 mb-8 text-center`}>
        <p className="text-gray-600 text-sm mb-1">BMI (체질량지수)</p>
        <p className={`text-4xl font-extrabold ${result.color}`}>
          {result.bmi}
        </p>
        <p className={`text-lg font-bold ${result.color} mt-1`}>
          {result.category}
        </p>
        <p className="text-gray-500 text-sm mt-3">{result.description}</p>
      </div>

      {/* BMI 범위 테이블 */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <h2 className="text-lg font-bold text-gray-800 px-4 pt-4 pb-2">
          BMI 범위 기준표
        </h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                분류
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">
                BMI 범위
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {BMI_RANGES.map((row) => {
              const isActive = row.category === result.category;
              return (
                <tr
                  key={row.category}
                  className={isActive ? `${row.bg} font-bold` : ""}
                >
                  <td className="px-4 py-3">
                    <span className={isActive ? row.color : "text-gray-700"}>
                      {row.category}
                      {isActive && " ◀"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${isActive ? row.color : "text-gray-900"}`}
                  >
                    {row.range}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 표준 체중 참고 */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          키 {height}cm 표준 체중
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">
              표준 체중 (BMI 22 기준)
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {standardWeight}kg
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">현재 체중과의 차이</p>
            <p
              className={`text-2xl font-bold ${
                weightDiff > 0
                  ? "text-orange-500"
                  : weightDiff < 0
                    ? "text-blue-500"
                    : "text-green-500"
              }`}
            >
              {weightDiff > 0 ? "+" : ""}
              {weightDiff}kg
            </p>
          </div>
        </div>
      </div>

      {/* 직접 계산 버튼 */}
      <div className="text-center mb-10">
        <Link
          href="/calculators/bmi"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          직접 계산해보기
        </Link>
      </div>

      {/* 같은 키, 다른 몸무게 */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          키 {height}cm 다른 몸무게 BMI
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {relatedByHeight.map((w) => {
            const r = calculateBMI(height, w);
            return (
              <Link
                key={w}
                href={`/calculators/bmi/${height}-${w}`}
                className="block bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
              >
                <p className="text-sm font-medium text-gray-900">{w}kg</p>
                <p className={`text-xs ${r.color}`}>
                  BMI {r.bmi} ({r.category})
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 같은 몸무게, 다른 키 */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          몸무게 {weight}kg 다른 키 BMI
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {relatedByWeight.map((h) => {
            const r = calculateBMI(h, weight);
            return (
              <Link
                key={h}
                href={`/calculators/bmi/${h}-${weight}`}
                className="block bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
              >
                <p className="text-sm font-medium text-gray-900">{h}cm</p>
                <p className={`text-xs ${r.color}`}>
                  BMI {r.bmi} ({r.category})
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 주요 BMI 조회 테이블 */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          주요 키·몸무게 BMI 한눈에 보기
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left font-medium text-gray-600 border border-gray-200">
                  키 \ 몸무게
                </th>
                {[50, 60, 70, 80, 90].map((w) => (
                  <th
                    key={w}
                    className="px-2 py-2 text-center font-medium text-gray-600 border border-gray-200"
                  >
                    {w}kg
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[155, 160, 165, 170, 175, 180, 185].map((h) => (
                <tr key={h}>
                  <td className="px-2 py-2 font-medium text-gray-700 border border-gray-200">
                    {h}cm
                  </td>
                  {[50, 60, 70, 80, 90].map((w) => {
                    const r = calculateBMI(h, w);
                    const isCurrentCell = h === height && w === weight;
                    return (
                      <td
                        key={w}
                        className={`px-2 py-2 text-center border border-gray-200 ${
                          isCurrentCell ? "bg-blue-100 font-bold" : ""
                        }`}
                      >
                        <Link
                          href={`/calculators/bmi/${h}-${w}`}
                          className={`${r.color} hover:underline`}
                        >
                          {r.bmi}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
