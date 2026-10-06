const stats = [
  { value: "4.2B", label: "spans traced each month" },
  { value: "38%", label: "median cut in LLM spend" },
  { value: "<5 min", label: "from npm install to first trace" },
  { value: "99.95%", label: "ingest uptime SLA" },
];

export function Stats() {
  return (
    <section aria-label="Lumen in numbers" className="border-y border-line/60 bg-surface/30">
      <dl className="container-page grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <dt className="order-2 text-sm text-muted">{stat.label}</dt>
            <dd className="order-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
