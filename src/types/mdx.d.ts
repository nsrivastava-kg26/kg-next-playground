declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  /** Every post exports its frontmatter as a typed `metadata` object. */
  export const metadata: unknown;
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
