import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Content, metadata } = await import(`../../../../content/blog/${slug}.mdx`);
  const meta = metadata as any;
  return (
    <>
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-5xl font-semibold">{meta.title}</h1>
        <Content />
      </article>
      <Footer />
    </>
  );
}
