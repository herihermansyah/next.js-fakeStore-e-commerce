import Header from "@/components/layouts/Header";
import React from "react";

function SiteLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
      {/* Sticky header so it stays visible while scrolling */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {/* Main content rendered below the header */}
      <main>{children}</main>
    </div>
  );
}

export default SiteLayout;
