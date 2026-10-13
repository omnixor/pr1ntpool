import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sign up — Pr1ntpool" },
      { name: "description", content: "Create a Pr1ntpool account as a customer or print shop." },
      { property: "og:title", content: "Sign up — Pr1ntpool" },
      { property: "og:description", content: "Create a Pr1ntpool account as a customer or print shop." },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
