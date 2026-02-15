// import A11yButton from '@/components/accessibility/a11y-button';
import { A11yMenu } from '@/components/accessibility/a11y-menu';
import Footer from '@/components/layout/footer';
import TopBar from '@/components/layout/top-bar';
import { Toaster } from '@/components/ui/sonner';
import { useA11yEffect } from '@/hooks/use-a11y-effect';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  useA11yEffect();

  return (
    <>
      <TopBar />
      <Outlet />
      {/* <A11yButton /> */}
      <A11yMenu />
      <Toaster position='bottom-center' />
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}
