import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "pt-BR" | "en";

type LanguageToggleProps = {
  value: Language;
  onChange: (language: Language) => void;
};

const items: Array<{ label: string; value: Language }> = [
  { label: "PT", value: "pt-BR" },
  { label: "EN", value: "en" },
];

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1 backdrop-blur">
      <span className="px-3 text-muted-foreground">
        <Languages className="size-4" />
      </span>
      {items.map((item) => (
        <Button
          key={item.value}
          type="button"
          size="sm"
          variant={value === item.value ? "default" : "ghost"}
          className={cn(
            "rounded-full px-3",
            value !== item.value && "text-muted-foreground",
          )}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
