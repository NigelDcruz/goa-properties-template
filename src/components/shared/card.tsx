import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;

  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-[28px]
        border
        border-gray-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}