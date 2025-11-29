"use client";

import {ProductsTypes} from "@/types";
import axios from "axios";
import Image from "next/image";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {useCart} from "@/context/CartProvider";
import Loading from "../ui/Loading";

function PreviewProduct() {
  // Stores full product detail data
  const [productDetail, setProductDetail] = useState<ProductsTypes | null>(
    null
  );

  // Currently active image in gallery
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Cart context handler
  const {addToCart} = useCart();

  // Get product ID from URL
  const {id} = useParams();

  const product = productDetail;

  // Fetch product detail when the page loads
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        // Save product data
        setProductDetail(response.data);

        // Set default active gallery image
        setActiveImage(response.data.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Display loader while product is being fetched
  if (!product) return <Loading />;

  return (
    <div className="container mx-auto py-5 px-2 sm:px-0">
      {/* ================= MAIN TOP SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-20">
        {/* ================= LEFT: MAIN IMAGE & GALLERY ================= */}
        <div className="shrink-0 flex flex-col items-center justify-center">
          <div
            className="relative border rounded-2xl overflow-hidden w-[250px] h-[250px] 
            min-[450px]:w-[400px] min-[450px]:h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center"
          >
            {/* Main preview image */}
            <Image
              src={activeImage || "/placeholder.png"}
              alt={product?.title || "/placeholder.png"}
              width={400}
              height={400}
              loading="eager"
              className="object-cover"
            />
          </div>

          {/* Image gallery thumbnails */}
          <div className="flex gap-3 mt-3">
            {product?.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={product.title}
                width={100}
                height={100}
                className={`rounded-md border cursor-pointer 
                ${activeImage === img ? "border-blue-500" : "border-gray-300"}`}
                onClick={() => setActiveImage(img)} // Click: changes main preview image
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT: PRODUCT INFORMATION ================= */}
        <div className="flex flex-col gap-10">
          {/* Product Title + Price + Rating */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{product?.title}</h2>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">
                ${product?.price.toLocaleString()}
              </span>

              <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
                {product?.discountPercentage}% OFF
              </span>
            </div>

            <span className="text-sm text-gray-600">
              ⭐ {product?.rating} / 5 • {product?.stock} stock available
            </span>

            <span className="text-sm capitalize">
              category: <b>{product?.category}</b>
            </span>

            <span className="text-sm">
              brand: <b>{product?.brand}</b>
            </span>

            {/* Product tags */}
            <div className="flex gap-2 flex-wrap mt-2">
              {product?.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-200 rounded-lg capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Add product to cart */}
          <Button
            onClick={() =>
              addToCart({
                id: product?.id,
                title: product?.title,
                price: product?.price,
                thumbnail: product?.thumbnail,
                qty: 1,
              })
            }
            className="capitalize active:scale-[0.9]"
          >
            add to cart
          </Button>
        </div>
      </div>

      {/* ================= PRODUCT DESCRIPTION ================= */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Product Description</h3>
        <p className="text-gray-700">{product?.description}</p>
      </div>

      {/* ================= DIMENSIONS ================= */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Product Dimensions</h3>
        <div className="grid grid-cols-3 gap-5 w-[300px]">
          <div>
            <span className="font-medium">Width:</span>{" "}
            {product?.dimensions.width}
          </div>
          <div>
            <span className="font-medium">Height:</span>{" "}
            {product?.dimensions.height}
          </div>
          <div>
            <span className="font-medium">Depth:</span>{" "}
            {product?.dimensions.depth}
          </div>
        </div>
      </div>

      {/* ================= SHIPPING & WARRANTY ================= */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold mb-2">Shipping Information</h3>
          <p>{product?.shippingInformation}</p>

          <h3 className="font-semibold mt-5 mb-2">Product Warranty</h3>
          <p>{product?.warrantyInformation}</p>

          <h3 className="font-semibold mt-5 mb-2">Return Policy</h3>
          <p>{product?.returnPolicy}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Availability Status</h3>
          <span className="capitalize">{product?.availabilityStatus}</span>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>

        <div className="flex flex-col gap-5">
          {product?.reviews.map((review, i) => (
            <div key={i} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{review.reviewerName}</span>
                <span className="text-yellow-600">⭐ {review.rating}</span>
              </div>

              <p className="text-sm">{review.comment}</p>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= META DATA ================= */}
      <div className="mt-14">
        <h3 className="text-lg font-semibold mb-3">Meta Data</h3>

        <div className="border p-4 rounded-lg">
          <span className="block text-sm">
            Created: {product?.meta.createdAt}
          </span>
          <span className="block text-sm">
            Updated: {product?.meta.updatedAt}
          </span>
          <span className="block text-sm">
            Barcode: {product?.meta.barcode}
          </span>
          <span className="block text-sm">QR Code: {product?.meta.qrCode}</span>
        </div>
      </div>
    </div>
  );
}

export default PreviewProduct;
