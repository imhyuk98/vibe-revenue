"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const calculatorCategories = [
  {
    label: "금융",
    items: [
      { title: "환율 계산기", href: "/calculators/exchange-rate" },
      { title: "연봉 실수령액", href: "/calculators/salary" },
      { title: "대출이자 계산기", href: "/calculators/loan" },
      { title: "퇴직금 계산기", href: "/calculators/retirement" },
      { title: "실업급여 계산기", href: "/calculators/unemployment" },
      { title: "적금 이자 계산기", href: "/calculators/savings" },
      { title: "전월세 전환", href: "/calculators/rent-conversion" },
    ],
  },
  {
    label: "생활",
    items: [
      { title: "퍼센트 계산기", href: "/calculators/percent" },
      { title: "글자수 세기", href: "/calculators/character-count" },
      { title: "나이 계산기", href: "/calculators/age" },
      { title: "날짜 계산기 (D-day)", href: "/calculators/dday" },
      { title: "평수 계산기", href: "/calculators/pyeong" },
      { title: "단위 변환기", href: "/calculators/unit-converter" },
      { title: "비율 계산기", href: "/calculators/ratio" },
      { title: "BMI 계산기", href: "/calculators/bmi" },
      { title: "음주 측정기", href: "/calculators/alcohol" },
    ],
  },
  {
    label: "세금/요금",
    items: [
      { title: "자동차세 계산기", href: "/calculators/car-tax" },
      { title: "전기요금 계산기", href: "/calculators/electricity" },
      { title: "연차 계산기", href: "/calculators/annual-leave" },
      { title: "학점 계산기", href: "/calculators/gpa" },
    ],
  },
];

const toolItems = [
  { title: "타이머 & 스톱워치", href: "/tools/timer" },
  { title: "JSON 포매터", href: "/tools/json-formatter" },
  { title: "Base64 인코더", href: "/tools/base64" },
  { title: "QR 코드 생성기", href: "/tools/qr-code" },
  { title: "색상 변환기", href: "/tools/color-converter" },
  { title: "이미지 변환기", href: "/tools/image-converter" },
  { title: "CSV JSON 변환기", href: "/tools/csv-json" },
  { title: "Markdown HTML", href: "/tools/markdown-html" },
];

function DropdownMenu({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[200px] z-50">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          계산기나라
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            홈
          </Link>

          <DropdownMenu label="계산기">
            {calculatorCategories.map((cat) => (
              <div key={cat.label}>
                <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {cat.label}
                </p>
                {cat.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </DropdownMenu>

          <DropdownMenu label="온라인 도구">
            {toolItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </DropdownMenu>

          <Link href="/about" className="hover:text-blue-600 transition-colors">
            소개
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <Link
            href="/"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            홈
          </Link>

          {/* Calculator categories */}
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileExpanded(mobileExpanded === "calc" ? null : "calc")}
          >
            <span>계산기</span>
            <svg
              className={`w-4 h-4 transition-transform ${mobileExpanded === "calc" ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileExpanded === "calc" && (
            <div className="bg-gray-50">
              {calculatorCategories.map((cat) => (
                <div key={cat.label}>
                  <p className="px-6 py-2 text-xs font-semibold text-gray-400 tracking-wider">
                    {cat.label}
                  </p>
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileExpanded(mobileExpanded === "tools" ? null : "tools")}
          >
            <span>온라인 도구</span>
            <svg
              className={`w-4 h-4 transition-transform ${mobileExpanded === "tools" ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileExpanded === "tools" && (
            <div className="bg-gray-50">
              {toolItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/about"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            소개
          </Link>
        </div>
      )}
    </header>
  );
}
