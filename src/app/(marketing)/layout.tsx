import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Route group layout for all marketing pages.
 * `modal` is a parallel route slot (@modal) used to intercept /demo as a dialog.
 */
export default function MarketingLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      {modal}
    </>
  );
}
