import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Log in — Pr1ntpool" },
      { name: "description", content: "Log in to Pr1ntpool to manage your print pools." },
      { property: "og:title", content: "Log in — Pr1ntpool" },
      { property: "og:description", content: "Log in to Pr1ntpool to manage your print pools." },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
