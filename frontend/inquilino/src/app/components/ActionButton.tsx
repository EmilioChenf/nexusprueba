import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ActionButtonProps) {
  const variantStyles = {
    primary: "bg-blue-500 text-white active:bg-blue-600",
    secondary: "bg-gray-100 text-gray-700 active:bg-gray-200",
    danger: "bg-red-500 text-white active:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-sm transition-all ${
        variantStyles[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95"}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm text-center leading-tight">{label}</span>
    </button>
  );
}
