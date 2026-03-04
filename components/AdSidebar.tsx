"use client";

import AdBanner from "./AdBanner";

export default function AdSidebar() {
  return (
    <aside className="hidden xl:block w-[160px] flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        <AdBanner slot="sidebar-top" format="vertical" />
        <AdBanner slot="sidebar-bottom" format="vertical" />
      </div>
    </aside>
  );
}
