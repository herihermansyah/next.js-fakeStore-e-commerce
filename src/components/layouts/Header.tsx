"use client";
import React, { useState } from "react";
import Logo from "../ui/Logo";
import ToggleButton from "../ui/ToggleButton";
import { Menu, ShoppingCart, X } from "lucide-react";
import MenuNav from "../navigation/MenuNav";
import SearchBar from "../ui/SearchBar";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalQty } = useCart();

  // Router used to navigate programmatically
  const router = useRouter();

  // Toggles the mobile navigation menu
  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-header">
      <div className="container flex flex-col gap-5 mx-auto px-2 sm:px-0 py-3 sm:py-5">
        <div className="flex flex-col gap-2">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center justify-between">
              {/* Website Logo */}
              <Logo />

              {/* Mobile menu toggle button */}
              <div className="sm:hidden">
                <ToggleButton
                  onClick={handleToggleMenu}
                  click={isOpen}
                  iconOn={<Menu />}
                  iconOf={<X />}
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Navigation Menu Component */}
              <MenuNav
                onItemClick={handleToggleMenu} // Close menu on item click
                className={`capitalize z-50 fixed flex flex-col gap-5 text-white bg-header w-full translate-x-1/2 right-1/2 text-center py-5
                transition-all duration-300 ease-in-out
                ${isOpen ? "translate-y-18" : "-translate-y-65"}
                sm:static sm:flex-row sm:translate-y-0 sm:py-0 sm:translate-x-0 sm:right-0 sm:bg-none
                `}
              >
                {/* Cart button inside the navigation */}
                <div
                  onClick={() => router.push("/cart")}
                  className="flex flex-col text-[14px] items-center cursor-pointer hover:text-hover2 transition-all duration-300 ease-in-out"
                >
                  <div className="relative">
                    <ShoppingCart size={18} />

                    {/* Shows cart quantity badge if items are present */}
                    {totalQty > 0 && (
                      <span className="absolute -top-4 right-2 border border-hover2 rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
                        {totalQty}
                      </span>
                    )}
                  </div>
                </div>
              </MenuNav>
            </div>
          </div>
        </div>

        {/* Search bar under header */}
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
