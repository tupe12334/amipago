import React, { FC, useId } from "react";

type Option<T extends string> = {
  value: T;
  label: string;
};

type ButtonGroupProps<T extends string> = {
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
};

export const ButtonGroup = <T extends string>({
  options,
  selected,
  onChange,
}: ButtonGroupProps<T>) => {
  const groupId = useId();

  return (
    <div id={`${groupId}-container`} className="flex gap-2">
      {options.map((option) => (
        <button
          id={`${groupId}-button-${option.value}`}
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 py-2 ps-4 pe-4 rounded border 
            ${
              selected === option.value
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 text-gray-700 border-gray-200"
            } 
            transition-colors duration-200`}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
