"use client";

import {useCart} from "@/context/CartProvider";
import {useRouter} from "next/navigation";

export default function CheckoutPage() {
  const {cart, clearCart} = useCart();
  const router = useRouter();

  // Calculate subtotal by summing item price × quantity
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Handle order confirmation: clear cart and redirect to success page
  const handleConfirm = () => {
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 my-5">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-5">Checkout</h1>

      {/* If cart is empty, show empty state */}
      {cart.length === 0 ? (
        <div className="flex items-center justify-center">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {/* List of cart items */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-30 border p-2"
              >
                {/* Product Title */}
                <span>{item.title}</span>

                {/* Price Breakdown */}
                <div className="flex gap-4">
                  <span>{item.qty} Qty</span>
                  <span>x</span>
                  <span>$ {item.price}</span>
                  <span>=</span>

                  {/* Final result for item total price */}
                  <span>$ {(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Display */}
          <div className="mt-5 text-xl font-semibold">
            Total: ${subtotal.toLocaleString()}
          </div>

          {/* Confirm Order Button */}
          <button
            onClick={handleConfirm}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}
