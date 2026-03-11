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
    <label className="inline-flex min-h-11 w-full items-center gap-3 rounded-full border border-border/70 bg-background/70 px-3.5 py-1 backdrop-blur">
      <span className="text-muted-foreground" aria-hidden="true">
        <Accessibility className="size-4" />
      </span>
      <span className="sr-only">{labels.title}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as VisionMode)}
        aria-label={labels.title}
        className="h-9 min-w-0 flex-1 bg-transparent pr-1 text-sm font-medium text-foreground outline-none"
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
