"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartProvider";
import {useRouter} from "next/navigation";

export default function CartPage() {
  // Access cart state and cart-related actions from Context
  const {cart, removeFromCart, increaseQty, decreaseQty, clearCart} = useCart();

  // Router for navigation
  const router = useRouter();

  // Calculate subtotal for all items
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // If cart is empty, show empty state page
  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-xl font-bold mb-5">Your Cart Is Empty</h2>

        {/* CTA button to go back to the shop */}
        <Button onClick={() => (window.location.href = "/shop")}>
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-10 px-2 sm:px-0">
      {/* LEFT SIDE — LIST OF CART ITEMS */}
      <div className="md:col-span-2 flex flex-col gap-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 border p-4 rounded-lg"
          >
            {/* Product Image */}
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={80}
              loading="eager"
              className="rounded-lg object-cover"
            />

            {/* Product Info & Quantity Controller */}
            <div className="flex flex-col flex-1">
              <span className="font-semibold">{item.title}</span>
              <span className="text-sm">${item.price}</span>

              {/* Quantity Adjustment Button Group */}
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => decreaseQty(item.id as number)}
                >
                  -
                </Button>

                {/* Current quantity */}
                <span className="w-8 text-center">{item.qty}</span>

                <Button
                  size="sm"
                  onClick={() => increaseQty(item.id as number)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Remove item button */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(item.id as number)}
            >
              Remove
            </Button>
          </div>
        ))}

        {/* Clear entire cart */}
        <Button variant="outline" onClick={clearCart} className="w-fit mt-5">
          Clear All
        </Button>
      </div>

      {/* RIGHT SIDE — SUMMARY BOX */}
      <div className="border p-5 rounded-lg h-fit sticky top-20">
        <h3 className="text-lg font-semibold mb-5">Order Summary</h3>

        {/* Subtotal Section */}
        <div className="flex justify-between mb-3">
          <span>Subtotal:</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={() => router.push("/checkout")}
          className="w-full mt-5"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
