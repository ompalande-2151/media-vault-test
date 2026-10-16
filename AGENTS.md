<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Architecture

- Uses Next.js (App Router) and Tailwind CSS v4 stack.
- Store typed magazine content in `src/lib/data.ts` and expose it through `src/lib/queries.ts`; central query rules protect publication visibility consistently.
- Keep launch frontend-only, with browser-to-third-party form delivery configured via public NEXT_PUBLIC_* or VITE_* endpoint variables; the TRD excludes persistent backend features.
- Use shared magazine templates and metadata for all editorial and utility pages; consistent templates keep navigation and SEO coherent.
- Keep placeholder editorial content explicitly identified as sample content until approved publishing assets are supplied; invented journalism must not be represented as verified reporting.
- Public publication pages use Next.js static site generation (`generateStaticParams`); static HTML supports the publication with zero request-time data dependencies.
