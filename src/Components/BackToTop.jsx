"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Function to toggle button visibility
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    // Component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to smoothly scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 transition-all duration-300 ease-in-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-[#242253] hover:bg-[#bfbdff] text-white hover:text-[#242253] shadow-lg cursor-pointer transition-all duration-300"
      >
        <FaArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
