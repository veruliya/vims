import { BookOpen, FileText } from '@gravity-ui/icons';
import { Link, usePage } from '@inertiajs/react';

import { welcome } from '@/routes';
import { cn } from '@/lib/utils';

type NavigationLink = {
  href: string;
  label: string;
  matcher?: (url: string) => boolean;
};

type NavigationSection = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  links: NavigationLink[];
};

const navigationSections: NavigationSection[] = [
  {
    id: 'gettingStarted',
    icon: BookOpen,
    label: 'Overview',
    links: [
      {
        href: welcome.url(),
        label: 'Welcome',
        matcher: (url) => url === welcome.url(),
      },
    ],
  },
];

export function SidebarNavigation() {
  const { url } = usePage();

  return (
    <div className="flex flex-col gap-5">
      {navigationSections.map((section) => {
        const SectionIcon = section.icon;

        return (
          <div key={section.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <SectionIcon className="text-overlay-foreground" />
              <h5
                key={section.id}
                className="font-semibold text-sm text-overlay-foreground"
              >
                {section.label}
              </h5>
            </div>
            <div className="flex flex-col gap-2">
              {section.links.map((link) => {
                const isLinkActive = link.matcher
                  ? link.matcher(url)
                  : url === link.href;
                return (
                  <Link
                    href={link.href}
                    key={link.label}
                    className={cn(
                      'rounded-xl py-2 px-4 text-sm font-semibold transition-colors',
                      isLinkActive
                        ? 'bg-accent text-accent-foreground shadow-sm dark:shadow-none'
                        : 'text-muted hover:bg-surface-tertiary',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
