import React from "react";

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: string;
};

type FormSelectProps<T extends string> = {
  label: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
  error?: string;
  columns?: number;
  id?: string;
};

export const FormSelect = <T extends string>({
  label,
  options,
  selected,
  onChange,
  error,
  columns = 2,
  id,
}: FormSelectProps<T>) => {
  const selectId = id || `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`grid grid-cols-${columns} gap-3`}
        role="radiogroup"
        aria-labelledby={selectId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-errormessage={error ? errorId : undefined}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            role="radio"
            aria-checked={selected === option.value}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
              selected === option.value
                ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {option.icon && (
              <i className={`fa fa-${option.icon}`} aria-hidden="true"></i>
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      {error && (
        <span
          id={errorId}
          className="text-red-500 text-sm mt-1 text-start"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
