import {
  ChevronDown,
} from "lucide-react";

type InputRowProps = {
  label: string;
  value: string;
};

export default function InputRow({
  label,
  value,
}: InputRowProps) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-4
        py-4
        text-left
        shadow-sm
      "
    >
      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>

      <ChevronDown
        size={18}
        className="text-gray-400"
      />
    </button>
  );
}