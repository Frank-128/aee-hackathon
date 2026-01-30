import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Base
        "flex h-12 w-full rounded-xl border border-border bg-transparent px-4 py-3",
        "text-base font-medium text-foreground placeholder:text-muted-foreground",

        // Focus
        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
