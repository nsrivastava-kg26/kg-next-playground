import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <main
      id="main"
      className="container-page flex min-h-dvh flex-col items-center justify-center gap-6 text-center"
    >
      <LogoMark className="size-12" />
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        404 · span not found
      </p>
      <h1 className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">
        This page didn&apos;t make it into the trace
      </h1>
      <p className="max-w-md text-muted">The link may be broken or the page may have moved.</p>
      <div className="flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          Read the blog
        </ButtonLink>
      </div>
    </main>
  );
}
