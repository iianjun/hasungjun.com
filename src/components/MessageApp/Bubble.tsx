import React from "react";

const Bubble: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className="mb-[.8rem] mr-[2rem] max-w-[33.3rem] self-end break-words rounded-[1.5rem] bg-gradient-to-b from-[#5294f7] from-0% to-[#3c83f7] to-100% px-[1rem] py-[.6rem] text-[1.3rem] leading-normal text-white">
      {message}
    </p>
  );
};

export default Bubble;
