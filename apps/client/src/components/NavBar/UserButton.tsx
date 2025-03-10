import { FC } from "react";
import { FaUser } from "react-icons/fa6";

export const UserButton: FC = () => {
  return (
    <button
      className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
      aria-label="User Profile"
    >
      <FaUser />
    </button>
  );
};
