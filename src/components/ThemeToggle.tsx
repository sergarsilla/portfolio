import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  label: string;
}

const ThemeToggle = ({ isDark, onToggle, label }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-150"
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
