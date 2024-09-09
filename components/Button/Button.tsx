import type { ButtonHTMLAttributes, FunctionComponent } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils/classNames";

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-50",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:bg-blue-700"],
        secondary: [
          "bg-transparent",
          "text-blue-400",
          "hover:bg-blue-400",
          "hover:text-white",
        ],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof button> {
  underline?: boolean;
  href: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  intent,
  size,
  underline,
  ...props
}) => (
  <a className={cn(button({ intent, size, className, underline }))} {...props}>
    {props.children}
  </a>
);
