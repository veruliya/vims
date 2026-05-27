import { Breadcrumbs, Button, ScrollShadow } from '@heroui/react';

import { ChevronLeft } from '@gravity-ui/icons';

import { router, usePage } from '@inertiajs/react';

interface Breadcrumb {
  url: string;
  title: string;
}

interface PageProps {
  [key: string]: unknown;
  backUrl: string | null;
  breadcrumbs: Breadcrumb[];
}

export function AppBarNavigation() {
  const { backUrl, breadcrumbs } = usePage<PageProps>().props;

  if (!backUrl && !breadcrumbs) {
    return <></>;
  }

  return (
    <div className="flex h-14 w-screen max-w-screen items-center gap-2 px-2">
      {/* Back Button */}
      <Button
        isIconOnly
        variant="tertiary"
        className="shrink-0"
        onPress={() => {
          if (backUrl === null) {
            return;
          }
          router.get(backUrl);
        }}
        isDisabled={backUrl === null}
      >
        <ChevronLeft />
      </Button>
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <ScrollShadow
          orientation="horizontal"
          hideScrollBar
        >
          <Breadcrumbs
            onAction={(breadcrumbUrl) => {
              if (typeof breadcrumbUrl === 'string') {
                if (breadcrumbUrl[0] === '#') {
                  return;
                }
                router.get(breadcrumbUrl.toString());
              }
            }}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumbs.Item
                id={breadcrumb.url}
                key={index}
              >
                {breadcrumb.title}
              </Breadcrumbs.Item>
            ))}
          </Breadcrumbs>
        </ScrollShadow>
      )}
    </div>
  );
}
