import React from "react";

// 1. Define the props for our button
// We extend React.ComponentPropsWithoutRef<'button'> to inherit all standard HTML button attributes
interface BtnProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * The text label displayed inside the button.
   */
  label: string;
  /**
   * Optional additional CSS classes to apply to the button.
   */
  className?: string;
  /**
   * Optional styling variant for the button.
   * Defaults to 'primary'.
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * Optional size for the button.
   * Defaults to 'md'.
   */
  size?: "sm" | "md" | "lg";
  /**
   * If true, the button will take up the full width of its parent.
   */
  fullWidth?: boolean;
}

/**
 * A versatile and type-safe button component.
 * It provides common styling variants and sizes, and accepts all native button properties.
 */
const Btn: React.FC<BtnProps> = ({
  label,
  className = "", // Provide an empty string as default for className
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props // Captures any other standard button props like onClick, type, disabled, etc.
}) => {
  // Define base styles and variant-specific styles
  const baseStyles =
    "font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-primary text-white font-bold  rounded-lg hover:opacity-90 transition-opacity",
    secondary:
      "bg-zink-300 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-[var(--foreground)] text-[var(--primary)] hover:text-white hover:bg-[var(--primary)]",
    ghost: "text-primary font-bold",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "py-2 px-6 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  // Combine all relevant classes
  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyle,
    className, // Ensure custom classes are applied last to allow overriding
  ]
    .filter(Boolean)
    .join(" "); // .filter(Boolean) removes any potential empty strings

  return (
    <button
      className={combinedClassName}
      {...props} // Spread the rest of the props here (e.g., onClick, type, disabled)
    >
      {label}
    </button>
  );
};

export default Btn;
