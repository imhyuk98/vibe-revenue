"use client";

import { useState, useMemo } from "react";
import RelatedTools from "@/components/RelatedTools";

const 띠목록 = [
  { name: "쥐띠", emoji: "\uD83D\uDC2D", branch: "자" },
  { name: "소띠", emoji: "\uD83D\uDC2E", branch: "축" },
  { name: "호랑이띠", emoji: "\uD83D\uDC2F", branch: "인" },
  { name: "토끼띠", emoji: "\uD83D\uDC30", branch: "묘" },
  { name: "용띠", emoji: "\uD83D\uDC32", branch: "진" },
  { name: "뱀띠", emoji: "\uD83D\uDC0D", branch: "사" },
  { name: "말띠", emoji: "\uD83D\uDC34", branch: "오" },
  { name: "양띠", emoji: "\uD83D\uDC11", branch: "미" },
  { name: "원숭이띠", emoji: "\uD83D\uDC35", branch: "신" },
  { name: "닭띠", emoji: "\uD83D\uDC14", branch: "유" },
  { name: "개띠", emoji: "\uD83D\uDC36", branch: "술" },
  { name: "돼지띠", emoji: "\uD83D\uDC37", branch: "해" },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function getSeed(zodiacIdx: number): number {
  const now = new Date();
  const dateNum = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return ((dateNum * 31 + zodiacIdx * 7) * 2654435761) >>> 0;
}

const 총운코멘트 = [
  ["오늘은 모든 일이 순조롭게 풀리는 날입니다. 자신감을 가지고 도전하세요.", "행운이 가득한 하루입니다. 새로운 기회가 찾아올 수 있습니다.", "최고의 컨디션으로 무엇이든 해낼 수 있는 날이에요.", "하늘이 돕는 날! 중요한 결정을 내리기에 좋은 시기입니다.", "에너지가 넘치는 하루, 적극적으로 행동하면 좋은 결과가 있을 거예요.", "운이 따르는 날입니다. 평소 미루던 일을 시작해 보세요.", "밝은 기운이 가득합니다. 주변 사람들에게도 좋은 영향을 줄 수 있어요.", "오늘은 특별한 날이 될 수 있습니다. 열린 마음으로 하루를 보내세요.", "긍정적인 에너지가 넘칩니다. 좋은 소식이 들려올 수 있어요.", "만사형통! 무엇을 해도 잘 풀리는 기운이 있습니다."],
  ["평범하지만 안정적인 하루가 예상됩니다. 꾸준히 노력하면 성과가 있을 거예요.", "큰 변화는 없지만 소소한 기쁨이 있는 날입니다.", "무난한 하루, 급한 결정보다는 차분하게 계획을 세워보세요.", "보통의 하루이지만, 작은 배려가 큰 행운을 불러올 수 있습니다.", "특별할 것 없는 날이지만, 그래서 더 편안한 하루가 될 수 있어요.", "오늘은 쉬어가는 날로 삼아도 좋겠습니다. 재충전의 시간을 가지세요.", "평온한 하루가 예상됩니다. 주변을 돌아보며 감사하는 시간을 가져보세요.", "무리하지 않으면 순탄한 하루가 될 것입니다.", "일상의 소중함을 느끼는 하루, 가까운 사람에게 연락해 보세요.", "차분하게 하루를 보내면 뜻밖의 좋은 일이 생길 수 있습니다."],
  ["오늘은 조금 주의가 필요한 날입니다. 중요한 결정은 미루는 것이 좋겠습니다.", "컨디션이 좋지 않을 수 있으니 무리하지 마세요.", "예상치 못한 변수가 생길 수 있습니다. 여유를 가지고 대처하세요.", "오늘은 한 발 물러서서 관망하는 것이 유리합니다.", "작은 실수에 주의하세요. 꼼꼼하게 확인하는 습관이 도움이 됩니다.", "감정 조절에 신경 쓰는 것이 좋겠습니다. 깊은 호흡으로 마음을 다스리세요.", "약간의 어려움이 있을 수 있지만, 내일은 더 나아질 거예요.", "급하게 서두르지 마세요. 천천히 하면 오히려 좋은 결과가 나올 수 있습니다.", "오늘은 새로운 시작보다는 마무리에 집중하는 것이 좋겠습니다.", "인내가 필요한 하루입니다. 조금만 참으면 좋은 결과가 올 거예요."],
];

const 애정운코멘트 = [
  ["사랑하는 사람과 달콤한 시간을 보낼 수 있는 날이에요.", "새로운 만남의 기회가 있을 수 있습니다. 마음을 열어보세요.", "연인과 깊은 대화를 나누기 좋은 날입니다.", "로맨틱한 분위기가 가득합니다. 사랑을 표현해 보세요.", "인연의 기운이 강한 날! 주변을 잘 살펴보세요.", "따뜻한 감정이 오가는 하루가 될 것입니다.", "사랑의 운이 상승하고 있어요. 용기를 내어보세요.", "오늘 만나는 사람이 특별한 인연이 될 수 있습니다.", "연인에게 작은 선물을 하면 큰 감동을 줄 수 있어요.", "사랑이 꽃피는 시기입니다. 적극적으로 다가가 보세요."],
  ["편안한 관계가 유지되는 하루입니다.", "특별한 변화는 없지만 안정적인 애정 관계가 이어집니다.", "친구나 가족과의 유대가 깊어지는 날입니다.", "조용하지만 따뜻한 사랑을 느낄 수 있어요.", "평소처럼 자연스럽게 지내는 것이 좋겠습니다.", "작은 관심이 관계를 더 깊게 만들어줄 수 있어요.", "마음의 여유를 가지면 좋은 인연을 만날 수 있습니다.", "오늘은 혼자만의 시간도 소중합니다.", "감사하는 마음을 표현하면 관계가 더 좋아질 거예요.", "무리한 고백보다는 자연스러운 만남을 추구하세요."],
  ["연인과 사소한 의견 차이가 있을 수 있으니 이해하는 마음을 가져보세요.", "오늘은 감정 표현에 주의가 필요합니다.", "오해가 생기기 쉬운 날, 명확하게 소통하세요.", "조금 외로움을 느낄 수 있지만 곧 좋아질 거예요.", "섣불리 감정적 결정을 내리지 않는 것이 좋겠습니다.", "연인과의 대화에서 경청이 중요한 날입니다.", "기대보다는 현실에 집중하면 관계가 편해질 거예요.", "작은 다툼에 크게 반응하지 마세요. 금방 풀릴 일입니다.", "오늘은 한 발짝 물러서서 상대를 바라보는 것이 좋겠습니다.", "인내가 필요한 시기, 조금만 기다리면 좋은 변화가 올 거예요."],
];

const 재물운코멘트 = [
  ["예상치 못한 수입이 생길 수 있는 행운의 날!", "투자나 저축을 시작하기 좋은 시기입니다.", "금전적으로 풍요로운 하루가 예상됩니다.", "돈이 들어오는 기운이 강합니다. 감사하는 마음을 잊지 마세요.", "재물운이 상승하고 있어요. 기회를 놓치지 마세요.", "뜻밖의 보너스나 선물이 있을 수 있습니다.", "재테크에 관심을 가져볼 좋은 시기입니다.", "경제적으로 안정되는 기운이 있습니다.", "오랫동안 기다리던 금전적 성과가 나타날 수 있어요.", "지출보다 수입이 많은 풍요로운 하루입니다."],
  ["큰 변동 없이 안정적인 재정 상태가 유지됩니다.", "계획적인 소비가 도움이 되는 날입니다.", "무리한 투자보다는 안전한 저축이 좋겠습니다.", "소소한 만족을 주는 구매가 있을 수 있어요.", "현재 상태를 유지하는 것이 현명합니다.", "특별한 지출은 없지만, 절약하는 습관을 들여보세요.", "재정 계획을 세우기에 좋은 날입니다.", "불필요한 지출을 줄이면 여유가 생길 거예요.", "알뜰하게 보내면 나중에 큰 기쁨이 될 수 있습니다.", "돈보다 경험에 투자하면 만족도가 높을 거예요."],
  ["충동구매에 주의하세요. 필요한 것만 사는 것이 좋겠습니다.", "예상치 못한 지출이 있을 수 있으니 여유 자금을 확보해두세요.", "오늘은 큰 금액의 거래는 피하는 것이 좋겠습니다.", "재물에 대한 욕심을 줄이면 마음이 편해질 거예요.", "지갑 관리에 신경 쓰는 것이 좋겠습니다.", "투자 결정은 다음으로 미루는 것이 현명합니다.", "돈을 빌려주거나 빌리는 것은 자제해 주세요.", "절약이 최선의 재테크인 날입니다.", "사소한 금전 문제에 스트레스 받지 마세요.", "오늘 아끼면 내일 여유가 생길 거예요."],
];

const 건강운코멘트 = [
  ["활력이 넘치는 하루! 운동을 시작하기에 좋은 날이에요.", "체력이 최고조입니다. 새로운 운동에 도전해 보세요.", "건강 상태가 매우 좋습니다. 에너지를 적극 활용하세요.", "심신이 안정되어 있어 무엇이든 집중할 수 있는 날입니다.", "면역력이 좋은 날, 야외 활동을 즐겨보세요.", "잠이 잘 오고 컨디션이 좋은 하루입니다.", "에너지가 넘치니 생산적으로 시간을 보내세요.", "건강한 기운이 가득합니다. 감사한 마음으로 하루를 시작하세요.", "체력적으로 여유가 있으니 운동량을 조금 늘려보세요.", "마음도 몸도 건강한 최고의 날입니다."],
  ["보통의 컨디션이지만 무리하지 않으면 괜찮습니다.", "규칙적인 생활이 건강 유지에 도움이 됩니다.", "충분한 수분 섭취를 잊지 마세요.", "가벼운 스트레칭으로 하루를 시작해 보세요.", "무리하지 않는 선에서 적당한 활동이 좋겠습니다.", "식사를 거르지 않는 것이 중요합니다.", "자세에 신경 쓰면 피로감이 줄어들 거예요.", "과식보다는 적당한 양의 식사가 좋겠습니다.", "잠을 충분히 자면 내일 컨디션이 좋아질 거예요.", "비타민 섭취를 챙기는 것이 좋겠습니다."],
  ["피로감이 쌓여 있을 수 있으니 충분한 휴식이 필요합니다.", "과로에 주의하세요. 쉬는 것도 일의 일부입니다.", "면역력이 떨어질 수 있으니 따뜻하게 지내세요.", "소화 기능이 약해질 수 있으니 음식을 조심하세요.", "무리한 운동은 삼가고 가벼운 산책 정도가 좋겠습니다.", "스트레스 관리에 신경 쓰는 것이 좋겠습니다.", "두통이나 어깨 결림에 주의하세요.", "수면 패턴이 불규칙해지지 않도록 조심하세요.", "찬 음식이나 음료는 자제하는 것이 좋겠습니다.", "오늘은 일찍 잠자리에 드는 것을 추천합니다."],
];

const 직장운코멘트 = [
  ["업무에서 뛰어난 성과를 낼 수 있는 날입니다.", "상사나 동료로부터 인정받을 수 있는 기회가 있습니다.", "중요한 프로젝트가 좋은 방향으로 진행될 거예요.", "창의적인 아이디어가 떠오르는 날! 적극적으로 제안하세요.", "업무 효율이 높은 날, 집중해서 일하면 큰 성과가 있을 거예요.", "승진이나 좋은 소식이 있을 수 있습니다.", "팀워크가 빛나는 날, 동료와의 협업이 잘 풀립니다.", "새로운 기회가 찾아올 수 있으니 준비하세요.", "리더십을 발휘하기 좋은 날입니다.", "오랫동안 준비한 일이 결실을 맺을 수 있어요."],
  ["평소처럼 꾸준히 일하면 무난한 하루가 될 것입니다.", "급하지 않은 업무를 처리하기에 좋은 날입니다.", "동료와의 관계가 원만하게 유지됩니다.", "서류 작업이나 정리에 집중하면 효율적입니다.", "특별한 변화는 없지만 안정적인 업무 진행이 가능합니다.", "하던 일을 꾸준히 하면 조만간 좋은 결과가 있을 거예요.", "회의나 미팅에서 경청하는 자세가 도움이 됩니다.", "업무 계획을 재정비하기 좋은 시간입니다.", "무리한 야근보다는 효율적인 퇴근이 좋겠습니다.", "작은 목표를 세우고 하나씩 달성해 나가세요."],
  ["직장에서 스트레스를 받을 수 있는 날, 마음의 여유를 가지세요.", "업무 실수에 주의하세요. 꼼꼼하게 확인하는 것이 중요합니다.", "동료와의 의견 충돌이 있을 수 있으니 유연하게 대처하세요.", "오늘은 중요한 발표나 결정은 피하는 것이 좋겠습니다.", "과도한 업무에 지칠 수 있으니 휴식 시간을 확보하세요.", "감정을 드러내기보다 냉정하게 판단하는 것이 유리합니다.", "예상치 못한 업무가 들어올 수 있으니 여유를 남겨두세요.", "완벽을 추구하기보다 적당한 수준에서 마무리하세요.", "상사의 지적에 감정적으로 반응하지 마세요.", "오늘의 어려움이 내일의 성장 밑거름이 될 거예요."],
];

const 행운색상 = [
  { name: "빨간색", color: "bg-red-500" },
  { name: "주황색", color: "bg-orange-500" },
  { name: "노란색", color: "bg-yellow-400" },
  { name: "초록색", color: "bg-green-500" },
  { name: "파란색", color: "bg-blue-500" },
  { name: "남색", color: "bg-indigo-600" },
  { name: "보라색", color: "bg-purple-500" },
  { name: "분홍색", color: "bg-pink-400" },
  { name: "하늘색", color: "bg-sky-400" },
  { name: "금색", color: "bg-amber-400" },
];

const 방위 = ["동", "서", "남", "북", "동남", "동북", "서남", "서북"];

interface FortuneResult {
  총운: { score: number; comment: string };
  애정운: { score: number; comment: string };
  재물운: { score: number; comment: string };
  건강운: { score: number; comment: string };
  직장운: { score: number; comment: string };
  행운숫자: number[];
  행운색: { name: string; color: string };
  행운방위: string;
}

function generateFortune(zodiacIdx: number): FortuneResult {
  const rng = seededRandom(getSeed(zodiacIdx));

  const getScore = () => Math.floor(rng() * 5) + 1;
  const getComment = (pool: string[][], score: number) => {
    const tier = score >= 4 ? 0 : score >= 2 ? 1 : 2;
    const idx = Math.floor(rng() * pool[tier].length);
    return pool[tier][idx];
  };

  const 총운score = getScore();
  const 애정score = getScore();
  const 재물score = getScore();
  const 건강score = getScore();
  const 직장score = getScore();

  const nums = new Set<number>();
  while (nums.size < 3) {
    nums.add(Math.floor(rng() * 99) + 1);
  }

  return {
    총운: { score: 총운score, comment: getComment(총운코멘트, 총운score) },
    애정운: { score: 애정score, comment: getComment(애정운코멘트, 애정score) },
    재물운: { score: 재물score, comment: getComment(재물운코멘트, 재물score) },
    건강운: { score: 건강score, comment: getComment(건강운코멘트, 건강score) },
    직장운: { score: 직장score, comment: getComment(직장운코멘트, 직장score) },
    행운숫자: Array.from(nums),
    행운색: 행운색상[Math.floor(rng() * 행운색상.length)],
    행운방위: 방위[Math.floor(rng() * 방위.length)],
  };
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-lg ${i <= score ? "text-yellow-400" : "text-gray-200"}`}>
          &#x2605;
        </span>
      ))}
    </div>
  );
}

export default function DailyFortune() {
  const [mode, setMode] = useState<"select" | "year">("select");
  const [selectedZodiac, setSelectedZodiac] = useState<number | null>(null);
  const [birthYear, setBirthYear] = useState("");
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [activeZodiac, setActiveZodiac] = useState<number | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }, []);

  const handleSelectZodiac = (idx: number) => {
    setSelectedZodiac(idx);
    setActiveZodiac(idx);
    setResult(generateFortune(idx));
  };

  const handleYearSubmit = () => {
    const y = parseInt(birthYear);
    if (!y || y < 1900 || y > 2100) return;
    const idx = (y - 4) % 12;
    setSelectedZodiac(idx);
    setActiveZodiac(idx);
    setResult(generateFortune(idx));
  };

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">오늘의 운세</h1>
      <p className="text-gray-500 mb-2">
        나의 띠로 오늘의 운세를 확인하세요. 매일 새로운 운세가 제공됩니다.
      </p>
      <p className="text-sm text-gray-400 mb-6">{today}</p>

      {/* 입력 모드 선택 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("select")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            mode === "select" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          띠 직접 선택
        </button>
        <button
          onClick={() => setMode("year")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            mode === "year" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          생년으로 자동 계산
        </button>
      </div>

      {/* 띠 선택 */}
      {mode === "select" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">나의 띠를 선택하세요</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {띠목록.map((z, i) => (
              <button
                key={z.name}
                onClick={() => handleSelectZodiac(i)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  activeZodiac === i
                    ? "border-orange-400 bg-orange-50 ring-2 ring-orange-300"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <div className="text-2xl">{z.emoji}</div>
                <div className="text-xs text-gray-600 mt-1">{z.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "year" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">출생년도를 입력하세요</h2>
          <div className="flex gap-3 max-w-sm">
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="예: 1990"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleYearSubmit}
              className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              확인
            </button>
          </div>
          {selectedZodiac !== null && mode === "year" && (
            <p className="text-sm text-gray-500 mt-2">
              {띠목록[selectedZodiac].emoji} {띠목록[selectedZodiac].name}
            </p>
          )}
        </div>
      )}

      {/* 결과 */}
      {result && selectedZodiac !== null && (
        <div className="space-y-4">
          {/* 띠 + 총운 헤더 */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white text-center">
            <div className="text-5xl mb-2">{띠목록[selectedZodiac].emoji}</div>
            <h2 className="text-xl font-bold mb-1">
              {띠목록[selectedZodiac].name} 오늘의 운세
            </h2>
            <div className="flex justify-center mb-2">
              <Stars score={result.총운.score} />
            </div>
            <p className="text-orange-100 text-sm">{result.총운.comment}</p>
          </div>

          {/* 각 운세 카드 */}
          {([
            { label: "애정운", emoji: "\u2764\uFE0F", data: result.애정운 },
            { label: "재물운", emoji: "\uD83D\uDCB0", data: result.재물운 },
            { label: "건강운", emoji: "\uD83D\uDCAA", data: result.건강운 },
            { label: "직장운", emoji: "\uD83D\uDCBC", data: result.직장운 },
          ] as const).map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">
                  {item.emoji} {item.label}
                </h3>
                <Stars score={item.data.score} />
              </div>
              <p className="text-gray-600 text-sm">{item.data.comment}</p>
            </div>
          ))}

          {/* 행운 정보 */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">&#x1F340; 오늘의 행운 정보</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-500 mb-1">행운의 숫자</div>
                <div className="font-bold text-lg text-amber-700">
                  {result.행운숫자.join(", ")}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">행운의 색상</div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`inline-block w-4 h-4 rounded-full ${result.행운색.color}`} />
                  <span className="font-bold text-amber-700">{result.행운색.name}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">행운의 방위</div>
                <div className="font-bold text-lg text-amber-700">{result.행운방위}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-500">
              운세는 재미를 위한 것으로, 하루의 작은 즐거움이 되길 바랍니다.
            </p>
          </div>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">오늘의 운세란?</h2>
          <p className="text-gray-600 leading-relaxed">
            오늘의 운세는 12가지 띠(자축인묘진사오미신유술해)를 기반으로
            매일 달라지는 운세를 제공하는 서비스입니다. 총운, 애정운, 재물운,
            건강운, 직장운의 5가지 항목으로 오늘 하루의 기운을 확인할 수 있습니다.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">띠(12지)란?</h2>
          <p className="text-gray-600 leading-relaxed">
            12지는 자(쥐), 축(소), 인(호랑이), 묘(토끼), 진(용), 사(뱀),
            오(말), 미(양), 신(원숭이), 유(닭), 술(개), 해(돼지)의 12가지 동물로,
            출생년도에 따라 정해집니다. 한국에서는 나이를 물을 때 "무슨 띠세요?"라고
            묻는 문화가 있으며, 각 띠별로 고유한 성격과 특성이 있다고 전해집니다.
          </p>
        </div>
      </section>

      <RelatedTools current="daily-fortune" />
    </div>
  );
}
