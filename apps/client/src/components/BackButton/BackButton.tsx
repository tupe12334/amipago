import { FaArrowRight } from "react-icons/fa6";

export function BackButton() {
  return (
    <button
      className="h-full flex items-center justify-center active:scale-95 focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-105"
      aria-label="Back"
    >
      <FaArrowRight className="text-4xl" />
    </button>
  );
}
