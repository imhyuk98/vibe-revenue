"use client";

import AdBanner from "./AdBanner";

export default function ContentAdBanner() {
  return (
    <div className="xl:hidden my-6">
      <AdBanner slot="content-mid" format="horizontal" />
    </div>
  );
}
