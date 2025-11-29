import {Loader} from "lucide-react";
import React from "react";

function Loading() {
  return (
    <span className="flex flex-col gap-2 text-xl capitalize text-gray-500 items-center mt-50">
      <span>loading</span>
      <Loader className="animate-spin" />
    </span>
  );
}

export default Loading;
