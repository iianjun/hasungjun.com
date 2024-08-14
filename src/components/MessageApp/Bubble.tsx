import React from "react";
const Bubble: React.FC<{
  message: string;
  showDelivered: boolean;
  isNotDelivered: boolean;
}> = ({ message, showDelivered, isNotDelivered }) => {
  return (
    <li className="mb-2 mr-5 flex flex-col items-end gap-1 self-end [&:first-child]:mt-2 [&:last-child]:mb-0">
      <p className="max-w-[20.75rem] whitespace-pre-wrap break-words rounded-[.875rem] bg-[#2982f6] px-[.625rem] py-[.375rem] text-[.8125rem] leading-tight text-white">
        {message}
      </p>
      {isNotDelivered && (
        <span className="text-[.625rem] font-semibold text-[#e25243]">
          Not Delivered
        </span>
      )}
      {showDelivered && (
        <span className="text-[.625rem] font-semibold text-[#9a9a9a]">
          Delivered
        </span>
      )}
    </li>
  );
};

export default Bubble;
