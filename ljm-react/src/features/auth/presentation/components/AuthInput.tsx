interface AuthInputProps {
  label: string;
  icon: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const AuthInput = ({ label, icon, type = "text", placeholder, value, onChange }: AuthInputProps) => {
  return (
    <div className="relative flex flex-col text-left">
      <label className="pb-2 text-sm font-medium text-white/90">{label}</label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">
          {icon}
        </span>
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-lg border border-primary/20 bg-black/40 pl-12 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};