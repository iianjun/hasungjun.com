import React from "react";
const Bubble: React.FC<{
  message: string;
  showDelivered: boolean;
  isNotDelivered: boolean;
}> = ({ message, showDelivered, isNotDelivered }) => {
  return (
    <li className="mb-[.8rem] mr-[2rem] flex flex-col items-end gap-[.3rem] self-end">
      <p className="max-w-[33.3rem] whitespace-pre-wrap break-words rounded-[1.4rem] bg-[#2982f6] px-[1rem] py-[.6rem] text-[1.3rem] leading-tight text-white">
        {message}
      </p>
      {isNotDelivered && (
        <span className="text-[1rem] font-semibold text-[#e25243]">
          Not Delivered
        </span>
      )}
      {showDelivered && (
        <span className="text-[1rem] font-semibold text-[#9a9a9a]">
          Delivered
        </span>
      )}
    </li>
  );
};

export default Bubble;
