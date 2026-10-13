import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Dashboard — Pr1ntpool" },
      { name: "description", content: "Your print pools." },
      { property: "og:title", content: "Dashboard — Pr1ntpool" },
      { property: "og:description", content: "Your print pools." },
    ],
  }),
  component: () => (
    <Placeholder role="customer" title="Your pools" text="Pool creation and joining is coming next." />
  ),
});
