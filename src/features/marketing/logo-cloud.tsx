import { getCustomers } from "@/lib/cms/queries";

export async function LogoCloud() {
  const customers = await getCustomers();
  return (
    <section aria-labelledby="customers-heading" className="container-page py-12">
      <h2 id="customers-heading" className="text-center text-sm text-subtle">
        Trusted by AI teams at companies like these (sample names)
      </h2>
      <ul className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {customers.map((name) => (
          <li
            key={name}
            className="text-center font-mono text-lg font-semibold tracking-tight text-muted/70"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
