import { cn } from "@/shared/lib";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-700", className)}
      {...props}
    />
  );
}

export { Skeleton };
