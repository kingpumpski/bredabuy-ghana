interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-card p-8">
        <p className="text-sm text-muted-foreground">
          This module is ready for implementation.
        </p>
      </div>
    </section>
  );
}
