"use client";

import {ProductsTypes} from "@/types";
import axios from "axios";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Loading from "../ui/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";

function ProductsList() {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Get dynamic route parameters
  const {slug} = useParams();
  const {category} = useParams();

  // Fetch products based on search slug or category
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);

        // Build API URL depending on the route
        const url = slug
          ? `https://dummyjson.com/products/search?q=${slug}`
          : category
          ? `https://dummyjson.com/products/category/${category}`
          : "https://dummyjson.com/products";

        const response = await axios.get(url);

        // Save fetched products into state
        setProducts(response.data.products);
      } catch {
        // Silently ignore errors, but loading will still complete
      } finally {
        setLoading(true);
      }
    };

    fetchData();
  }, [slug, category]);

  // Loading screen
  if (!loading) {
    return <Loading />;
  }

  // When no products found
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-50 text-gray-500 capitalize">
        <span>search : {decodeURIComponent(slug as string)}</span>
        <span>product not found</span>
      </div>
    );
  }

  // Clone product list before sorting
  const filteredProducts = [...products];

  // Apply sorting based on selected filter
  if (filterType === "cheapest") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (filterType === "most expensive") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  if (filterType === "lowest rating") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  }
  if (filterType === "highest rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // List of available filter options
  const filterData = [
    {id: 1, value: "cheapest"},
    {id: 2, value: "most expensive"},
    {id: 3, value: "lowest rating"},
    {id: 4, value: "highest rating"},
  ];

  return (
    <div className="container mx-auto px-2 sm:px-0 py-5">
      {/* Filter dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-3">
            Filter Products
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 capitalize">
          {/* Render each filter option */}
          {filterData.map((item) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={item.id}
              onClick={() => setFilterType(item.value)}
            >
              {item.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Product grid */}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
          {filteredProducts.map((item) => (
            <div
              onClick={() => router.push(`/shop/${item.id}`)}
              className="flex flex-col border border-gray-300 rounded-sm p-0.5 shadow-sm cursor-pointer"
              key={item.id}
            >
              {/* Product Image Section */}
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

              {/* Product details */}
              <div className="flex flex-col gap-0.5">
                <span className="line-clamp-1 text-[14px]">{item.title}</span>
                <span className="text-[12px]">{item.category}</span>
                <span className="text-[12px]">
                  $ {item.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
