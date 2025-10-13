import * as React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "secondary";
  className?: string;
  children?: React.ReactNode;
};

export function Button({ asChild, variant = "default", className, children, ...props }: ButtonProps) {
  const Comp: any = asChild ? "a" : "button";
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition focus:outline-none focus:ring disabled:opacity-50";
  const styles = variant === "secondary"
    ? "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300"
    : "bg-black text-white hover:bg-gray-800 focus:ring-gray-300";
  return <Comp className={clsx(base, styles, className)} {...props}>{children}</Comp>;
}
