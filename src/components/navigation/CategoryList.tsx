"use client";

import {category} from "@/constants/menu";
import {useRouter} from "next/navigation";
import React from "react";

function CategoryList() {
  const router = useRouter(); // Router instance for navigation

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-2 py-5">
      {/* Render each category item */}
      {category.map((item) => (
        <li
          key={item.id}
          // Interactive styling for hover, click, and mobile tap animation
          className="border hover:bg-hover2 transition-all duration-300 ease-in-out active:scale-[0.9] border-gray-300 p-5 cursor-pointer text-center capitalize rounded-md"
          // Navigate to category detail page when clicked
          onClick={() => router.push(`/category/${item.title}`)}
        >
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
