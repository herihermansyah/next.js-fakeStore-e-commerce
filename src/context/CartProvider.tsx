"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Represents a single item stored in the cart.
export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  thumbnail: string;
  qty: number;
}

// Describes the shape of the Cart Context.
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  totalQty: number;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage when the component first mounts
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Ensure the saved value is an array before restoring it
        if (Array.isArray(parsed)) {
          // Defer state update to avoid hydration mismatch
          Promise.resolve().then(() => setCart(parsed));
        }
      } catch {
        // Fail silently if JSON parsing fails
      }
    }
  }, []);

  // Persist cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a new item or increase its quantity if it already exists
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? {...p, qty: p.qty + 1} : p
        );
      }

      return [...prev, {...item, qty: 1}];
    });
  };

  // Remove an item fully from the cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase item quantity by 1
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? {...item, qty: item.qty + 1} : item
      )
    );
  };

  // Decrease item quantity (but never below 1)
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {...item, qty: item.qty > 1 ? item.qty - 1 : 1}
          : item
      )
    );
  };

  // Clear all items from the cart
  const clearCart = () => setCart([]);

  // Count total quantity of all items in the cart
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQty,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access the cart context safely
export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
};
