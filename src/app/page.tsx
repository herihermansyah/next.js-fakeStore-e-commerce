import ProductSelect from "@/components/sections/ProductSelect";
import React from "react";

function page() {
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <ProductSelect data="smartphones" highlightTitle="smartphones"/>
      <ProductSelect data="mobile-accessories" highlightTitle="mobile-accessories"/>
      <ProductSelect data="mens-shirts" highlightTitle="mens-shirts"/>
      <ProductSelect data="furniture" highlightTitle="furniture"/>
    </div>
  );
}

export default page;
