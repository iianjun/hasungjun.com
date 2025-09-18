import { cn } from "@/utils/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
