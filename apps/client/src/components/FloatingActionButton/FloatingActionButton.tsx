import React, { FC, useState } from "react";
type NonEmptyArray<T> = [T, ...T[]];
type OptionProps = {
  label: string;
  icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

type Props = React.PropsWithChildren & {
  options?: NonEmptyArray<OptionProps>;
};

const FloatingActionButton: FC<Props> = ({ children, options }) => {
  const [isActive, setIsActive] = useState(false);
  const fabId = "floating-action-button";

  const handleClick = () => {
    setIsActive(!isActive);
    // You can add your action logic here
    console.log("FAB clicked");
  };

  return (
    <div id={`${fabId}-container`} className="fixed bottom-6 end-6">
      <button
        id={`${fabId}-button`}
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-2xl hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
        aria-label="Add Item"
      >
        {children}
      </button>

      {isActive && options && (
        <div
          id={`${fabId}-floating-container`}
          className="absolute bottom-20 end-0 bg-white rounded-lg shadow-xl p-4 w-48 transition-all duration-300"
        >
          <menu id={`${fabId}-options-list`} role="menu" className="space-y-2">
            {options.map((option, index) => (
              <li
                id={`${fabId}-option-${index}`}
                key={option.label}
                role="menuitem" // Added role attribute for proper accessibility
                {...option}
                className="gap-2 text-end p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors flex-row flex items-center"
              >
                {option.icon}
                {option.label}
              </li>
            ))}
          </menu>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;
