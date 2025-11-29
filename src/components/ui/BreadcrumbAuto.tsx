"use client";

import {House} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function BreadcrumbAuto() {
  // Get the current pathname from the Next.js router (example: "/shop/clothes/preview")
  const pathname = usePathname();

  // Split the pathname into segments and filter out empty strings
  // Example: "/shop/clothes/preview" → ["shop", "clothes", "preview"]
  const segments = pathname.split("/").filter((seg) => seg !== "");

  // Format each segment for display: capitalize the first letter
  const formatLabel = (label: string) =>
    label.charAt(0).toUpperCase() + label.slice(1);

  // Build dynamic href for each segment based on its index
  // Example for segment index 1: "/shop/clothes"
  const buildHref = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 border-b-2 border-b-gray-300">
      {/* Breadcrumb navigation wrapper */}
      <nav className="text-sm text-gray-600 flex items-center gap-1 py-2">
        
        {/* Home link */}
        <Link href="/" className="hover:underline flex items-center gap-2">
          <House size={17} />
          <span className="capitalize">home</span>
        </Link>

        {/* Loop through each formatted segment to build breadcrumb */}
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1">
            {/* Separator icon */}
            <span>{">"}</span>

            {/* If last segment: render plain text, else render a clickable link */}
            {i === segments.length - 1 ? (
              <span className="font-medium">
                {decodeURIComponent(formatLabel(seg))}
              </span>
            ) : (
              <Link href={buildHref(i)} className="hover:underline">
                {formatLabel(seg)}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
