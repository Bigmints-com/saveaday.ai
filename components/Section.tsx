import { PropsWithChildren } from "react";
import { Badge } from "@/components/ui/badge";

type SectionProps = PropsWithChildren<{
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}>;

export default function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: SectionProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 ${className ?? ""}`}
    >
      <div className={`relative flex flex-col gap-5 ${alignment}`}>
        {eyebrow ? (
          <Badge variant="secondary" className="uppercase tracking-widest">
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className="text-balance font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-14">{children}</div> : null}
    </section>
  );
}
