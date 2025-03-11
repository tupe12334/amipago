import React, { FC } from "react";

type Option = {
  value: string;
  label: string;
};

type ButtonGroupProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 py-2 ps-4 pe-4 rounded border 
            ${
              selected === option.value
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 text-gray-700 border-gray-200"
            } 
            transition-colors duration-200`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
