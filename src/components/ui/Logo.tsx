import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <h1 className="font-bold uppercase text-white whitespace-nowrap">
          fakestore-ecommerce
        </h1>
      </Link>
    </div>
  );
}

export default Logo;
