import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/shop")({
  ssr: false,
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Shop — Pr1ntpool" },
      { name: "description", content: "Manage incoming print pool orders." },
      { property: "og:title", content: "Shop — Pr1ntpool" },
      { property: "og:description", content: "Manage incoming print pool orders." },
    ],
  }),
  component: () => (
    <Placeholder role="shop" title="Shop orders" text="Your incoming pool orders will appear here." />
  ),
});
