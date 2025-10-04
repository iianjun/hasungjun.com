import React from "react";

export default function MessageBubble({
  message,
  showDelivered,
  isNotDelivered,
}: {
  message: string;
  showDelivered: boolean;
  isNotDelivered: boolean;
}) {
  return (
    <li className="mr-5 mb-2 flex flex-col items-end gap-1 self-end [&:first-child]:mt-2 [&:last-child]:mb-0">
      <p className="bg-message-app-bubble max-w-[20.75rem] rounded-[.875rem] px-[.625rem] py-[.375rem] text-[.8125rem] leading-tight break-words whitespace-pre-wrap text-white">
        {message}
      </p>
      {isNotDelivered && (
        <span className="text-message-app-error text-[.625rem] font-semibold">
          Not Delivered
        </span>
      )}
      {showDelivered && (
        <span className="text-[.625rem] font-semibold text-neutral-400">
          Delivered
        </span>
      )}
    </li>
  );
}
