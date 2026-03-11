import { LaptopMinimal, MoonStar, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";

type ThemeToggleProps = {
  value: Theme;
  onChange: (theme: Theme) => void;
};

const items = [
  { label: "System", value: "system" as const, icon: LaptopMinimal },
  { label: "Light", value: "light" as const, icon: SunMedium },
  { label: "Dark", value: "dark" as const, icon: MoonStar },
];

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1 backdrop-blur">
      {items.map((item) => {
        const Icon = item.icon;
        return (
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
            <Icon className="size-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
