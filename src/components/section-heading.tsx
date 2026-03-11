import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <Badge variant="outline" className="w-fit">
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
