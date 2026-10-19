import Image from "next/image";

export function IssueCover({
  issue,
}: {
  issue: { image: string; title: string; month: string; year: number };
}) {
  return (
    <div className="issue-cover">
      <Image
        src={issue.image}
        alt={`${issue.month} ${issue.year} illustrated magazine cover`}
        width={320}
        height={440}
        loading="lazy"
        sizes="320px"
        quality={80}
      />
      <div className="issue-cover-text">
        <strong>
          MEDIAVAULT
          <br />
          GLOBAL
        </strong>
        <h3>{issue.title}</h3>
        <small>
          {issue.month.toUpperCase()} {issue.year} · PREVIEW ISSUE
        </small>
      </div>
    </div>
  );
}
