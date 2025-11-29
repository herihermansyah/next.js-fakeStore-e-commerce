"use client";

import {ProductsTypes} from "@/types";
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Pagination, Mousewheel} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface ProductSelectProps {
  data: string;
  highlightTitle: string;
}

function ProductSelect({data, highlightTitle}: ProductSelectProps) {
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const router = useRouter();

  // Fetch products when the category changes
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        // Request products from a specific category
        const response = await axios.get(
          `https://dummyjson.com/products/category/${data}`
        );

        // Save results into state
        setProducts(response.data.products);
      } catch {
        // Fail silently to avoid UI breaking
      }
    };

    fetchDataCategory();
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      {/* Section title */}
      <div>
        <span className="capitalize">{highlightTitle}</span>
      </div>

      {/* Slider for product list */}
      <Swiper
        className="w-full"
        modules={[Pagination, Mousewheel]} // Enable pagination and mousewheel scrolling
        mousewheel={{forceToAxis: true}} // Only scroll horizontally
        loop={true} // Infinite looping
        spaceBetween={5} // Gap between slides
        slidesPerView={2} // Default visible slides
        pagination={{clickable: true}} // Allow pagination dots to be clickable
        breakpoints={{
          // Adjust visible slides based on screen width
          520: {slidesPerView: 3},
          1024: {slidesPerView: 5},
          1280: {slidesPerView: 7},
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            {/* Product Card */}
            <div
              onClick={() => router.push(`/shop/${item.id}`)} // Navigate to product detail
              className="flex flex-col border border-gray-300 rounded-sm p-0.5 shadow-sm cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={400}
                  height={400}
                  loading="eager"
                  className="object-cover"
                />

                {/* Discount badge */}
                <span className="absolute bottom-0.5 left-0.5 bg-gray-100 text-[10px] p-1 rounded-[3px]">
                  {item.discountPercentage}% OFF
                </span>

                {/* Rating badge */}
                <span className="absolute top-0.5 left-0.5 bg-gray-100 text-[10px] p-1 rounded-[3px]">
                  ⭐ {item.rating}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-0.5">
                <span className="line-clamp-1 text-[14px]">{item.title}</span>
                <span className="text-[12px]">{item.category}</span>
                <span className="text-[12px]">
                  $ {item.price.toLocaleString()}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSelect;
