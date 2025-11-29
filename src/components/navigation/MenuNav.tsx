import { mainMenu } from "@/constants/menu";
import Link from "next/link";
import React from "react";

interface MenuNavProps {
  className?: string;          // Optional custom CSS classes for styling the <ul>
  onItemClick?: () => void;    // Optional callback when a menu item is clicked
  children?: React.ReactNode;  // Additional elements that can be injected into the menu list (e.g., login button)
}

function MenuNav({ className, onItemClick, children }: MenuNavProps) {
  return (
    <nav>
      <ul className={className}>
        {/* Render main navigation menu items */}
        {mainMenu.map((item) => (
          <li key={item.id}>
            <Link
              className="hover:text-hover2 hover:border-b-4 hover:border-b-hover2 transition-all duration-200 ease-in-out"
              onClick={onItemClick}      // Trigger callback if parent wants to close menu (mobile nav etc.)
              href={item.path || "/"}   // Default fallback path if missing
            >
              <span>{item.title}</span>
            </Link>
          </li>
        ))}

        {/* Additional items injected from parent (e.g., user avatar, cart icon) */}
        <li>{children}</li>
      </ul>
    </nav>
  );
}

export default MenuNav;
