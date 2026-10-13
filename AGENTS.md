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
- Auth client lives in src/lib/supabase.ts and is null until backend env vars exist; swap to the generated integration client once the project's backend is connected (keeps the app building without a backend).

- Landing-page parallax uses a scoped CSS variable updated through a passive scroll listener and animation frames, with reduced-motion support, to keep motion browser-only and lightweight.
- Shared visual tokens live in src/styles.css and shared controls use the Button component so the editorial theme remains consistent across pages.
