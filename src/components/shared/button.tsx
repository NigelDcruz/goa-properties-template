import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-2xl
        bg-emerald-700
        px-5
        py-3
        font-medium
        text-white
        transition
        hover:bg-emerald-600
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}