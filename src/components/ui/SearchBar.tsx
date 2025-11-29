"use client";

import React, {useState} from "react";
import {Input} from "./input";
import {useRouter} from "next/navigation";

function SearchBar() {
  // State to store the current search text
  const [query, setQuery] = useState("");

  // Next.js router for navigation
  const router = useRouter();

  // Trigger search when user presses the Enter key
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only run search when "Enter" is pressed and the query is not empty
    if (e.key === "Enter" && query.trim()) {
      // Navigate to the search results page with encoded query text
      router.push(`/search/${encodeURIComponent(query)}`);

      // Clear the input field after navigating
      setQuery("");
    }
  };

  return (
    <div>
      {/* Search input field */}
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        onKeyDown={handleSearch} // Detect Enter key
        placeholder="search....."
      />
    </div>
  );
}

export default SearchBar;
