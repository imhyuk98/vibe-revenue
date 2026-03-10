import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 모두의도구. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              사이트 소개
            </Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">
              자주 묻는 질문
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
