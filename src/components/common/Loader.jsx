import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-4 border-blue-200 border-t-[#1E40AF] rounded-full animate-spin"></div>

        {/* Inner spinning icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2
            className="w-8 h-8 text-[#F59E0B] animate-spin"
            style={{ animationDirection: "reverse" }}
          />
        </div>
      </div>

      <p className="mt-6 text-lg font-semibold text-[#1E40AF] font-inter animate-pulse">
        {message}
      </p>

      {/* Loading dots animation */}
      <div className="flex gap-2 mt-3">
        <div
          className="w-2 h-2 bg-[#1E40AF] rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
