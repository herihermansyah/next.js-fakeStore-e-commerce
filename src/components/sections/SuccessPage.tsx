import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-3">Order Successful!</h1>
      <p className="text-gray-600 mb-5">Thank you for your purchase.</p>

      <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded">
        Back to Home
      </Link>
    </div>
  );
}
