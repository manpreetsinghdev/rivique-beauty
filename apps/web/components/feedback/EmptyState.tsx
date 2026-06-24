interface EmptyStateProps {
  title:       string;
  description?: string;
  action?:      React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-base font-semibold text-neutral-700">{title}</p>
      {description && <p className="mt-1 text-sm text-neutral-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
