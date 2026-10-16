export function PolicyPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
}) {
  return (
    <div className="site-container">
      <div className="page-heading">
        <span className="eyebrow">Our standards · Draft for review</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="prose-page">
        {sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
        <p>
          These draft policies require publisher approval and confirmed contact details before the
          site launches.
        </p>
      </div>
    </div>
  );
}
