import React, { useId } from "react";
const SelectBtn = ({ options, label, className = "", ...props }, ref) => {
  const Id = useId();

  return (
    <div className="w-full">
      {label && <label className="" htmlFor={Id}></label>}
      <select
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={Id}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(SelectBtn);
