type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({
  children,
}: ButtonProps) {
  return (
    <button
      className="
        rounded-2xl
        bg-emerald-700
        px-5
        py-3
        font-medium
        text-white
        transition
        hover:bg-emerald-600
      "
    >
      {children}
    </button>
  );
}