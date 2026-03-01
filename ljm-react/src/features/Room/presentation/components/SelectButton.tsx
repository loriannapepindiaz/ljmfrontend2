// src/features/Room/presentation/components/SelectButton.tsx
import type { FC } from "react";

interface SelectButtonProps {
  isSelected: boolean;
  label?: string;
}

const SelectButton: FC<SelectButtonProps> = ({
  isSelected,
  label = "SELECT",
}) => {
  return (
    <button
      className={`
        w-full py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
        ${
          isSelected
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "border border-primary text-primary hover:bg-primary hover:text-white"
        }
      `}
    >
      {isSelected ? "SELECTED" : label}
    </button>
  );
};

export default SelectButton;