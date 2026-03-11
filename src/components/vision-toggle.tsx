import { Accessibility } from "lucide-react";

type VisionMode =
  | "default"
  | "deuteranopia"
  | "protanopia"
  | "tritanopia"
  | "monochromacy";

type VisionToggleProps = {
  value: VisionMode;
  onChange: (mode: VisionMode) => void;
  labels: {
    title: string;
    options: ReadonlyArray<{
      label: string;
      value: VisionMode;
    }>;
  };
};

export function VisionToggle({ value, onChange, labels }: VisionToggleProps) {
  return (
    <label className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur">
      <span className="text-muted-foreground" aria-hidden="true">
        <Accessibility className="size-4" />
      </span>
      <span className="sr-only">{labels.title}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as VisionMode)}
        aria-label={labels.title}
        className="min-w-0 bg-transparent text-sm font-medium text-foreground outline-none"
      >
        {labels.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
