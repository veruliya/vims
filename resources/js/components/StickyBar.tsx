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
        'sticky z-10 border-y bg-surface text-surface-foreground',
        placement === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
    >
      {children}
    </div>
  );
}
