// src/features/Room/presentation/components/RoomLayout.tsx
import type { FC, ReactNode } from "react";

interface RoomLayoutProps {
  children: ReactNode;
}

const RoomLayout: FC<RoomLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4 md:p-12">
      {/* Panel de cristal */}
      <div className="relative z-10 w-full max-w-6xl glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

// ESTO ES LO MÁS IMPORTANTE PARA EL ERROR TS1192/TS2459
export default RoomLayout;