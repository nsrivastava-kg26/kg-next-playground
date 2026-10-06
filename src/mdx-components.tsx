import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Required by @next/mdx in the App Router. Maps markdown elements to styled
 * components so posts never need inline classes.
 */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props) => <p className="mt-5 leading-7 text-foreground/85" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/85" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/85" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-brand pl-5 text-muted italic" {...props} />
  ),
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      // Internal links get client-side navigation and prefetching.
      <Link href={href as never} className="text-accent underline underline-offset-4" {...props} />
    ) : (
      <a
        href={href}
        className="text-accent underline underline-offset-4"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
  code: (props) => (
    <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-sm leading-6 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
