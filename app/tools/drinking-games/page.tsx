"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RelatedTools from "@/components/RelatedTools";

/* ───────────────────────── DATA ───────────────────────── */

const LIAR_CATEGORIES: Record<string, string[]> = {
  "음식": [
    "김치찌개", "떡볶이", "치킨", "피자", "삼겹살", "비빔밥", "라면", "초밥",
    "파스타", "햄버거", "갈비탕", "냉면", "짜장면", "짬뽕", "돈까스",
    "김밥", "족발", "보쌈", "떡갈비", "불고기",
  ],
  "동물": [
    "강아지", "고양이", "사자", "호랑이", "코끼리", "기린", "펭귄", "돌고래",
    "토끼", "곰", "여우", "늑대", "독수리", "앵무새", "거북이",
    "코알라", "판다", "원숭이", "하마", "악어",
  ],
  "직업": [
    "의사", "변호사", "소방관", "경찰관", "교사", "요리사", "배우", "가수",
    "프로그래머", "디자이너", "간호사", "약사", "건축가", "기자", "파일럿",
    "수의사", "작가", "사진작가", "운동선수", "유튜버",
  ],
  "장소": [
    "학교", "병원", "공항", "놀이공원", "해변", "도서관", "카페", "영화관",
    "마트", "공원", "지하철", "백화점", "동물원", "수영장", "미술관",
    "경기장", "캠핑장", "온천", "볼링장", "노래방",
  ],
  "영화": [
    "기생충", "아바타", "어벤져스", "해리포터", "겨울왕국", "타이타닉", "인셉션",
    "인터스텔라", "매트릭스", "반지의 제왕", "부산행", "올드보이", "극한직업",
    "어바웃타임", "라라랜드", "조커", "범죄도시", "광해", "신과함께", "명량",
  ],
};

const TRUTH_QUESTIONS = [
  "가장 부끄러웠던 순간은?",
  "첫사랑은 언제였나요?",
  "가장 큰 거짓말은?",
  "SNS에서 누군가를 몰래 스토킹한 적 있나요?",
  "가장 후회되는 일은?",
  "지금까지 받은 최고의 선물은?",
  "이 자리에서 가장 호감인 사람은?",
  "가장 최근에 운 적은 언제인가요?",
  "부모님께 숨기고 있는 비밀은?",
  "가장 창피했던 실수는?",
  "첫 키스는 언제였나요?",
  "가장 무서웠던 경험은?",
  "지금 핸드폰에서 가장 부끄러운 사진은?",
  "가장 좋아하는 신체 부위는?",
  "가장 이상한 습관은?",
  "전 연인에게 하고 싶은 말은?",
  "가장 최근 검색 기록은?",
  "가장 많이 먹었던 때는?",
  "인생에서 가장 행복했던 순간은?",
  "몰래 좋아했던 사람이 있나요?",
  "가장 창피한 닉네임은?",
  "술 마시고 가장 큰 실수는?",
  "연락처에서 삭제하고 싶은 사람은?",
  "가장 비싼 충동구매는?",
  "꿈에서 가장 이상한 꿈은?",
  "가장 많이 본 영화나 드라마는?",
  "이성에게 가장 끌리는 포인트는?",
  "지금 통장 잔액은?",
  "가장 오래된 카톡 대화방은?",
  "이 자리에서 가장 관심 없는 사람은?",
  "SNS 프로필 사진이 아닌 실제 사진 공개!",
  "가장 최근 좋아요 누른 게시물은?",
  "부모님 몰래 한 가장 나쁜 짓은?",
  "술자리에서 가장 민망했던 순간은?",
  "가장 오래 사귄 연인과의 기간은?",
  "가장 최근 거짓말은?",
  "이상형의 조건 3가지는?",
  "가장 많이 질투했던 적은?",
  "인생 최악의 데이트는?",
  "가장 좋아하는 칭찬은?",
  "10년 후 나는 뭘 하고 있을까?",
  "가장 자신 없는 부분은?",
  "전생에 나는 무엇이었을까?",
  "가장 최근 저장한 짤은?",
  "지금 가장 하고 싶은 것은?",
  "인생 버킷리스트 1위는?",
  "가장 아끼는 물건은?",
  "살면서 가장 감동받은 순간은?",
  "가장 싫어하는 음식과 이유는?",
  "지금 이 순간 고백하고 싶은 사람은?",
];

const DARE_MISSIONS = [
  "옆 사람에게 눈 안 마주치고 칭찬하기",
  "방금 먹은 거 표정으로 표현하기",
  "가장 최근 통화기록 공개",
  "10초간 섹시한 표정 짓기",
  "옆 사람 손잡고 10초 눈 마주치기",
  "지금 바로 셀카 찍어서 SNS 올리기",
  "개구리 소리로 노래 한 소절 부르기",
  "3분 동안 반말 금지",
  "옆 사람에게 프러포즈하기",
  "현재 잠금화면 공개하기",
  "10초간 복근 자랑하기",
  "가장 좋아하는 사람 이름 소리쳐 부르기",
  "일어나서 댄스 한 곡 추기",
  "옆 사람과 셀카 찍기",
  "사투리로 고백하기",
  "10초간 아기 흉내 내기",
  "맨날 하는 표정 보여주기",
  "가장 잘하는 성대모사 보여주기",
  "지금 갤러리 세 번째 사진 공개",
  "옆 사람 어깨 마사지 30초",
  "방귀 소리 내기",
  "10초간 원숭이 흉내 내기",
  "카톡 프로필 사진 변경하기",
  "랩으로 자기소개하기",
  "코로 음식 먹는 시늉하기",
  "3바퀴 돌고 한 발로 5초 서기",
  "옆 사람에게 하트 보내기",
  "윙크 10번 하기",
  "가장 웃긴 표정 짓기 대결",
  "10초간 무표정 유지하기",
  "포즈 3개 연속으로 잡기",
  "가장 최근 이모티콘 보여주기",
  "목소리 한 톤 높여서 1분간 대화하기",
  "옆 사람 칭찬 릴레이 3개",
  "30초간 고양이 흉내 내기",
  "벌떡 일어나서 만세 세 번",
  "지금 기분을 몸으로 표현하기",
  "아이유 노래 한 소절 부르기",
  "한 손으로 박수 소리 내기 도전",
  "옆 사람과 하이파이브 10번",
  "혀 말기 도전",
  "양쪽 눈썹 따로 움직이기 도전",
  "30초간 웃음 참기 (다른 사람이 웃기기)",
  "가위바위보 져서 벌칙 대신 받기",
  "인생 좌우명을 외치기",
  "지금 머릿속에 떠오르는 노래 부르기",
  "옆 사람 흉내 내기",
  "드라마 명대사 재현하기",
  "가장 못하는 것 도전하기",
  "지금 바로 스쿼트 10개 하기",
];

const BOMB_PENALTIES = [
  "소주 한 잔!", "맥주 원샷!", "셀카 찍어서 올리기!", "애교 부리기!",
  "노래 한 소절!", "춤 한 곡!", "옆 사람에게 고백하기!", "10초간 무표정!",
  "사투리로 1분 대화!", "개인기 보여주기!", "건배사 하기!", "방귀 소리 내기!",
  "아기 흉내 내기!", "윙크 10번!", "스쿼트 5개!", "옆 사람 칭찬 3개!",
  "랩으로 자기소개!", "원숭이 흉내!", "잠금화면 공개!", "성대모사 하기!",
];

const RANDOM_MISSIONS = [
  "건배사 하기", "노래 한 소절 부르기", "물구나무서기 도전", "방귀 소리 내기",
  "애교 부리기", "춤 한 곡 추기", "성대모사 하기", "사투리로 고백하기",
  "윙크 10번 하기", "옆 사람 칭찬 3개", "스쿼트 10개", "개인기 보여주기",
  "셀카 찍어서 단톡방에 올리기", "10초간 섹시한 표정", "아기 흉내 내기",
  "옆 사람에게 프러포즈", "가장 웃긴 표정 짓기", "드라마 명대사 재현",
  "랩으로 자기소개", "30초간 고양이 흉내", "가장 잘하는 개그 보여주기",
  "한 발로 10초 서기", "10초간 무표정 유지", "옆 사람 어깨 마사지 30초",
  "코끼리 코 돌고 한 줄로 걷기", "인생 좌우명 외치기",
  "옆 사람과 팔짱 끼고 셀카", "눈 감고 옆 사람 얼굴 만지기",
  "가장 최근 갤러리 사진 공개", "30초간 웃음 참기",
];

type GameType = "liar" | "truth" | "bomb" | "updown" | "random";

const GAMES: { id: GameType; name: string; icon: string; desc: string }[] = [
  { id: "liar", name: "라이어 게임", icon: "🤥", desc: "라이어를 찾아라!" },
  { id: "truth", name: "진실 or 도전", icon: "🎯", desc: "진실? 도전?" },
  { id: "bomb", name: "폭탄 돌리기", icon: "💣", desc: "폭탄을 피해라!" },
  { id: "updown", name: "업다운 게임", icon: "🔢", desc: "숫자를 맞춰라!" },
  { id: "random", name: "랜덤 지목", icon: "🎰", desc: "누가 걸릴까?" },
];

/* ───────────────────────── UTILS ───────────────────────── */

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ───────────────────────── LIAR GAME ───────────────────────── */

function LiarGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [category, setCategory] = useState<string>("음식");
  const [started, setStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [liarIndex, setLiarIndex] = useState(-1);
  const [word, setWord] = useState("");
  const [showWord, setShowWord] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  const [timer, setTimer] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGame = () => {
    const words = LIAR_CATEGORIES[category];
    setWord(pickRandom(words));
    setLiarIndex(Math.floor(Math.random() * playerCount));
    setCurrentPlayer(0);
    setShowWord(false);
    setAllRevealed(false);
    setTimer(180);
    setTimerRunning(false);
    setStarted(true);
  };

  const revealWord = () => setShowWord(true);

  const nextPlayer = () => {
    setShowWord(false);
    if (currentPlayer + 1 >= playerCount) {
      setAllRevealed(true);
      setTimerRunning(true);
    } else {
      setCurrentPlayer((p) => p + 1);
    }
  };

  useEffect(() => {
    if (timerRunning && timer > 0) {
      timerRef.current = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, timer]);

  useEffect(() => {
    if (timer <= 0) {
      setTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [timer]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const reset = () => {
    setStarted(false);
    setShowWord(false);
    setAllRevealed(false);
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            참가자 수
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlayerCount((c) => Math.max(3, c - 1))}
              className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg text-xl font-bold transition-colors"
            >
              -
            </button>
            <span className="text-2xl font-bold w-12 text-center">{playerCount}명</span>
            <button
              onClick={() => setPlayerCount((c) => Math.min(10, c + 1))}
              className="w-10 h-10 bg-purple-700 hover:bg-purple-600 rounded-lg text-xl font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            카테고리
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(LIAR_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-pink-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={startGame}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
        >
          게임 시작!
        </button>
      </div>
    );
  }

  if (allRevealed) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-2">🕵️</div>
        <h3 className="text-xl font-bold text-pink-300">토론을 시작하세요!</h3>
        <p className="text-purple-200">
          라이어가 누구인지 찾아내세요. 제시어에 대해 이야기하되, 라이어가 알아채지 못하게 조심하세요!
        </p>
        <div
          className={`text-5xl font-mono font-bold ${
            timer <= 30 ? "text-red-400 animate-pulse" : "text-green-400"
          }`}
        >
          {formatTime(timer)}
        </div>
        {timer <= 0 && (
          <div className="bg-pink-500/20 border border-pink-500 rounded-xl p-4">
            <p className="text-pink-300 font-bold text-lg">시간 종료! 투표하세요!</p>
            <p className="text-purple-200 mt-2">
              라이어는 <span className="text-yellow-300 font-bold">{liarIndex + 1}번 플레이어</span>였습니다!
            </p>
            <p className="text-purple-200 mt-1">
              제시어: <span className="text-green-300 font-bold">{word}</span>
            </p>
          </div>
        )}
        <div className="flex gap-3">
          {timerRunning ? (
            <button
              onClick={() => setTimerRunning(false)}
              className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold transition-colors"
            >
              일시정지
            </button>
          ) : timer > 0 ? (
            <button
              onClick={() => setTimerRunning(true)}
              className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition-colors"
            >
              계속
            </button>
          ) : null}
          <button
            onClick={reset}
            className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded-xl font-bold transition-colors"
          >
            새 게임
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="text-purple-300 text-sm">
        {currentPlayer + 1} / {playerCount} 번째 플레이어
      </div>
      {!showWord ? (
        <>
          <div className="text-6xl mb-4">🙈</div>
          <p className="text-lg text-purple-200">
            <span className="text-yellow-300 font-bold">{currentPlayer + 1}번 플레이어</span>만 화면을 보세요!
          </p>
          <button
            onClick={revealWord}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
          >
            제시어 확인
          </button>
        </>
      ) : (
        <>
          {currentPlayer === liarIndex ? (
            <>
              <div className="text-6xl mb-4">🤥</div>
              <div className="bg-red-500/20 border-2 border-red-500 rounded-2xl p-6">
                <p className="text-2xl font-bold text-red-400">
                  당신은 라이어입니다!
                </p>
                <p className="text-purple-300 mt-2 text-sm">
                  카테고리: {category}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">📝</div>
              <div className="bg-green-500/20 border-2 border-green-500 rounded-2xl p-6">
                <p className="text-sm text-green-300 mb-1">제시어</p>
                <p className="text-3xl font-bold text-green-400">{word}</p>
              </div>
            </>
          )}
          <button
            onClick={nextPlayer}
            className="w-full py-4 bg-gray-600 hover:bg-gray-500 rounded-xl text-lg font-bold transition-colors"
          >
            확인 완료 (숨기기)
          </button>
        </>
      )}
      <button
        onClick={reset}
        className="w-full py-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
      >
        처음으로
      </button>
    </div>
  );
}

/* ───────────────────────── TRUTH OR DARE ───────────────────────── */

function TruthOrDare() {
  const [mode, setMode] = useState<"select" | "truth" | "dare">("select");
  const [current, setCurrent] = useState("");
  const [usedTruth, setUsedTruth] = useState<Set<number>>(new Set());
  const [usedDare, setUsedDare] = useState<Set<number>>(new Set());

  const pickTruth = useCallback(() => {
    const available = TRUTH_QUESTIONS.map((_, i) => i).filter((i) => !usedTruth.has(i));
    if (available.length === 0) {
      setUsedTruth(new Set());
      setCurrent(pickRandom(TRUTH_QUESTIONS));
    } else {
      const idx = pickRandom(available);
      setUsedTruth((s) => new Set(s).add(idx));
      setCurrent(TRUTH_QUESTIONS[idx]);
    }
    setMode("truth");
  }, [usedTruth]);

  const pickDare = useCallback(() => {
    const available = DARE_MISSIONS.map((_, i) => i).filter((i) => !usedDare.has(i));
    if (available.length === 0) {
      setUsedDare(new Set());
      setCurrent(pickRandom(DARE_MISSIONS));
    } else {
      const idx = pickRandom(available);
      setUsedDare((s) => new Set(s).add(idx));
      setCurrent(DARE_MISSIONS[idx]);
    }
    setMode("dare");
  }, [usedDare]);

  if (mode === "select") {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎯</div>
        <p className="text-lg text-purple-200">무엇을 선택하시겠습니까?</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={pickTruth}
            className="py-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-2xl text-lg font-bold hover:from-blue-400 hover:to-blue-600 transition-all"
          >
            <span className="text-3xl block mb-2">💬</span>
            진실
          </button>
          <button
            onClick={pickDare}
            className="py-6 bg-gradient-to-b from-red-500 to-red-700 rounded-2xl text-lg font-bold hover:from-red-400 hover:to-red-600 transition-all"
          >
            <span className="text-3xl block mb-2">🔥</span>
            도전
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="text-5xl mb-2">{mode === "truth" ? "💬" : "🔥"}</div>
      <div
        className={`rounded-2xl p-6 border-2 ${
          mode === "truth"
            ? "bg-blue-500/20 border-blue-500"
            : "bg-red-500/20 border-red-500"
        }`}
      >
        <p
          className={`text-sm font-medium mb-2 ${
            mode === "truth" ? "text-blue-300" : "text-red-300"
          }`}
        >
          {mode === "truth" ? "진실" : "도전"}
        </p>
        <p className="text-xl font-bold leading-relaxed">{current}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={pickTruth}
          className="py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
        >
          💬 진실
        </button>
        <button
          onClick={pickDare}
          className="py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors"
        >
          🔥 도전
        </button>
      </div>
      <button
        onClick={() => setMode("select")}
        className="w-full py-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
      >
        처음으로
      </button>
    </div>
  );
}

/* ───────────────────────── BOMB GAME ───────────────────────── */

function BombGame() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [penalty, setPenalty] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [shaking, setShaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef(0);

  const addName = () => {
    const n = input.trim();
    if (n && !names.includes(n)) {
      setNames([...names, n]);
      setInput("");
    }
  };

  const removeName = (idx: number) => {
    setNames(names.filter((_, i) => i !== idx));
  };

  const startGame = () => {
    if (names.length < 2) return;
    const duration = Math.floor(Math.random() * 26) + 5; // 5~30 seconds
    endTimeRef.current = Date.now() + duration * 1000;
    setTimeLeft(duration);
    setCurrentIdx(0);
    setExploded(false);
    setStarted(true);
    setShaking(false);
  };

  useEffect(() => {
    if (started && !exploded) {
      timerRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
        setTimeLeft(remaining);
        // Start shaking when less than 5 seconds
        if (remaining <= 5 && remaining > 0) {
          setShaking(true);
        }
        if (remaining <= 0) {
          setExploded(true);
          setPenalty(pickRandom(BOMB_PENALTIES));
          setShaking(false);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, exploded]);

  const passNext = () => {
    if (!exploded) {
      setCurrentIdx((i) => (i + 1) % names.length);
    }
  };

  const reset = () => {
    setStarted(false);
    setExploded(false);
    setShaking(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            참가자 추가
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addName()}
              placeholder="이름 입력"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
            <button
              onClick={addName}
              className="px-4 py-3 bg-pink-500 hover:bg-pink-400 rounded-lg font-bold transition-colors"
            >
              추가
            </button>
          </div>
        </div>
        {names.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {names.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-700 rounded-full text-sm"
              >
                {name}
                <button
                  onClick={() => removeName(i)}
                  className="text-gray-400 hover:text-red-400 ml-1"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
        <button
          onClick={startGame}
          disabled={names.length < 2}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {names.length < 2 ? "최소 2명 필요" : "게임 시작!"}
        </button>
      </div>
    );
  }

  if (exploded) {
    return (
      <div className="text-center space-y-6">
        <div className="text-7xl animate-bounce">💥</div>
        <h3 className="text-2xl font-bold text-red-400">펑!</h3>
        <div className="bg-red-500/20 border-2 border-red-500 rounded-2xl p-6">
          <p className="text-lg text-purple-200 mb-1">
            <span className="text-yellow-300 font-bold text-2xl">{names[currentIdx]}</span>님 벌칙!
          </p>
          <p className="text-xl font-bold text-red-300 mt-3">{penalty}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startGame}
            className="flex-1 py-3 bg-pink-500 hover:bg-pink-400 rounded-xl font-bold transition-colors"
          >
            다시 하기
          </button>
          <button
            onClick={reset}
            className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded-xl font-bold transition-colors"
          >
            설정으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className={`text-7xl ${shaking ? "animate-[shake_0.1s_infinite]" : "animate-pulse"}`}>
        💣
      </div>
      <div className="bg-gray-800 rounded-2xl p-6">
        <p className="text-sm text-purple-300 mb-1">현재 차례</p>
        <p className="text-3xl font-bold text-yellow-300">{names[currentIdx]}</p>
      </div>
      <button
        onClick={passNext}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-lg font-bold hover:from-orange-400 hover:to-red-400 transition-all animate-pulse"
      >
        다음 사람에게 넘기기!
      </button>
      <button
        onClick={reset}
        className="w-full py-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
      >
        처음으로
      </button>
    </div>
  );
}

/* ───────────────────────── UP-DOWN GAME ───────────────────────── */

function UpDownGame() {
  const [answer, setAnswer] = useState(0);
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(100);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [found, setFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [started, setStarted] = useState(false);

  const startGame = () => {
    setAnswer(Math.floor(Math.random() * 100) + 1);
    setLow(1);
    setHigh(100);
    setGuess("");
    setMessage("");
    setFound(false);
    setAttempts(0);
    setStarted(true);
  };

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < low || num > high) {
      setMessage(`${low}~${high} 사이의 숫자를 입력하세요!`);
      return;
    }
    setAttempts((a) => a + 1);
    if (num === answer) {
      setFound(true);
      setMessage("");
    } else if (num < answer) {
      setLow(num + 1);
      setMessage("UP! ⬆️");
    } else {
      setHigh(num - 1);
      setMessage("DOWN! ⬇️");
    }
    setGuess("");
  };

  if (!started) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🔢</div>
        <p className="text-lg text-purple-200">
          1~100 사이의 숫자를 맞춰보세요!<br />
          맞추는 사람이 벌칙!
        </p>
        <button
          onClick={startGame}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
        >
          게임 시작!
        </button>
      </div>
    );
  }

  if (found) {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-yellow-300">정답!</h3>
        <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-2xl p-6">
          <p className="text-4xl font-bold text-yellow-300">{answer}</p>
          <p className="text-purple-200 mt-2">{attempts}번 만에 맞췄습니다!</p>
          <p className="text-lg font-bold text-red-400 mt-3">벌칙 당첨! 🍺</p>
        </div>
        <button
          onClick={startGame}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all"
        >
          다시 하기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gray-800 rounded-2xl p-6 mb-4">
          <p className="text-sm text-purple-300 mb-2">범위</p>
          <p className="text-3xl font-bold">
            <span className="text-blue-400">{low}</span>
            <span className="text-gray-500 mx-3">~</span>
            <span className="text-red-400">{high}</span>
          </p>
        </div>
        {message && (
          <div
            className={`text-3xl font-bold mb-4 animate-bounce ${
              message.includes("UP") ? "text-blue-400" : message.includes("DOWN") ? "text-red-400" : "text-yellow-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          placeholder="숫자 입력"
          min={low}
          max={high}
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl placeholder-gray-500 focus:outline-none focus:border-pink-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={handleGuess}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-400 rounded-lg font-bold transition-colors"
        >
          확인
        </button>
      </div>
      <p className="text-center text-gray-400 text-sm">시도 횟수: {attempts}</p>
      <button
        onClick={startGame}
        className="w-full py-2 text-gray-400 hover:text-gray-200 text-sm transition-colors"
      >
        새 게임
      </button>
    </div>
  );
}

/* ───────────────────────── RANDOM PICK ───────────────────────── */

function RandomPick() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState("");
  const [mission, setMission] = useState("");
  const [displayName, setDisplayName] = useState("");
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addName = () => {
    const n = input.trim();
    if (n && !names.includes(n)) {
      setNames([...names, n]);
      setInput("");
    }
  };

  const removeName = (idx: number) => {
    setNames(names.filter((_, i) => i !== idx));
  };

  const spin = () => {
    if (names.length < 2 || spinning) return;
    setSpinning(true);
    setSelected("");
    setMission("");

    let count = 0;
    const total = 20 + Math.floor(Math.random() * 10);
    spinRef.current = setInterval(() => {
      setDisplayName(names[count % names.length]);
      count++;
      if (count >= total) {
        if (spinRef.current) clearInterval(spinRef.current);
        const winner = pickRandom(names);
        setDisplayName(winner);
        setSelected(winner);
        setMission(pickRandom(RANDOM_MISSIONS));
        setSpinning(false);
      }
    }, 80 + count * 5);
  };

  useEffect(() => {
    return () => {
      if (spinRef.current) clearInterval(spinRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {!spinning && !selected && (
        <>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              참가자 추가
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addName()}
                placeholder="이름 입력"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={addName}
                className="px-4 py-3 bg-pink-500 hover:bg-pink-400 rounded-lg font-bold transition-colors"
              >
                추가
              </button>
            </div>
          </div>
          {names.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {names.map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-700 rounded-full text-sm"
                >
                  {name}
                  <button
                    onClick={() => removeName(i)}
                    className="text-gray-400 hover:text-red-400 ml-1"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
        </>
      )}

      {(spinning || selected) && (
        <div className="text-center">
          <div
            className={`text-4xl font-bold py-8 ${
              spinning ? "text-purple-300 animate-pulse" : "text-yellow-300"
            }`}
          >
            {displayName}
          </div>
        </div>
      )}

      {selected && (
        <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-2xl p-6 text-center">
          <p className="text-sm text-yellow-300 mb-1">미션</p>
          <p className="text-xl font-bold">{mission}</p>
        </div>
      )}

      <button
        onClick={selected ? () => { setSelected(""); setMission(""); setDisplayName(""); } : spin}
        disabled={names.length < 2 || spinning}
        className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-lg font-bold hover:from-pink-400 hover:to-purple-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {spinning ? "돌리는 중..." : selected ? "다시 돌리기" : names.length < 2 ? "최소 2명 필요" : "돌리기!"}
      </button>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function DrinkingGamesPage() {
  const [activeGame, setActiveGame] = useState<GameType>("liar");

  return (
    <div className="py-4 max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">🍻 술게임 모음</h1>
      <p className="text-gray-500 mb-6">
        술자리를 더 재미있게! 5가지 인기 술게임을 즐겨보세요.
      </p>

      {/* Game Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeGame === game.id
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1.5">{game.icon}</span>
            {game.name}
          </button>
        ))}
      </div>

      {/* Game Area */}
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl p-6 text-white min-h-[400px]">
        <div className="text-center mb-6">
          <span className="text-3xl">{GAMES.find((g) => g.id === activeGame)?.icon}</span>
          <h2 className="text-xl font-bold mt-2">
            {GAMES.find((g) => g.id === activeGame)?.name}
          </h2>
          <p className="text-purple-300 text-sm mt-1">
            {GAMES.find((g) => g.id === activeGame)?.desc}
          </p>
        </div>

        {activeGame === "liar" && <LiarGame />}
        {activeGame === "truth" && <TruthOrDare />}
        {activeGame === "bomb" && <BombGame />}
        {activeGame === "updown" && <UpDownGame />}
        {activeGame === "random" && <RandomPick />}
      </div>

      {/* Warning */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
        <p className="text-amber-700 text-sm">
          🍺 음주는 적당히! 건강한 음주 문화를 만들어 갑시다.
        </p>
        <p className="text-amber-500 text-xs mt-1">
          19세 미만 음주는 법으로 금지되어 있습니다.
        </p>
      </div>

      {/* SEO Content */}
      <section className="mt-10 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">술게임 모음 소개</h2>
          <p className="text-gray-600 leading-relaxed">
            술자리를 더욱 재미있게 만들어주는 5가지 인기 술게임을 한 곳에 모았습니다.
            별도의 앱 설치 없이 스마트폰 브라우저에서 바로 즐길 수 있으며,
            회식, 파티, 모임 등 다양한 자리에서 활용할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">게임별 규칙 안내</h2>
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            <div>
              <h3 className="font-medium text-gray-900">🤥 라이어 게임</h3>
              <p className="mt-1">
                참가자 중 한 명이 라이어가 됩니다. 라이어를 제외한 나머지 참가자에게는 같은 제시어가 주어지고,
                라이어에게는 카테고리만 알려줍니다. 대화를 통해 라이어를 찾아내세요!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🎯 진실 or 도전</h3>
              <p className="mt-1">
                진실을 선택하면 질문에 솔직하게 답해야 하고, 도전을 선택하면 주어진 미션을 수행해야 합니다.
                거부하면 벌칙!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">💣 폭탄 돌리기</h3>
              <p className="mt-1">
                랜덤 시간 안에 폭탄이 터집니다. 폭탄을 가지고 있을 때 터지면 벌칙!
                얼마나 남았는지 알 수 없어 더욱 스릴 넘칩니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🔢 업다운 게임</h3>
              <p className="mt-1">
                1부터 100 사이 숨겨진 숫자를 맞추는 게임입니다. 숫자를 입력하면 정답보다 큰지 작은지
                알려줍니다. 정답을 맞추는 사람이 벌칙!
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">🎰 랜덤 지목</h3>
              <p className="mt-1">
                룰렛처럼 참가자 이름이 빠르게 돌아가다가 한 명이 선택됩니다.
                선택된 사람에게는 랜덤 미션이 주어집니다!
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">몇 명부터 할 수 있나요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                라이어 게임은 3명 이상, 폭탄 돌리기와 랜덤 지목은 2명 이상부터 가능합니다.
                진실 or 도전과 업다운 게임은 인원 제한 없이 즐길 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">앱 설치가 필요한가요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                아닙니다! 웹 브라우저에서 바로 사용할 수 있어 별도의 앱 설치가 필요 없습니다.
                스마트폰, 태블릿, PC 모두 지원합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">데이터가 저장되나요?</h3>
              <p className="text-gray-600 text-sm mt-1">
                모든 게임은 브라우저에서만 실행되며, 서버에 어떠한 데이터도 저장하지 않습니다.
                개인정보 걱정 없이 안심하고 사용하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools current="drinking-games" />

      {/* Shake animation keyframes via style tag */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          50% { transform: translateX(5px) rotate(5deg); }
          75% { transform: translateX(-3px) rotate(-3deg); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
