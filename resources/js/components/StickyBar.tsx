import { cn } from '@/lib/utils';

export function StickyBar({
  children,
  placement,
  className = "",
}: {
  children: React.ReactNode;
  placement: 'top' | 'bottom';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'sticky z-10 bg-surface text-surface-foreground',
        placement === 'top' ? 'border-b top-0' : 'border-t bottom-0',
        className
      )}
    >
      {children}
    </div>
  );
}
