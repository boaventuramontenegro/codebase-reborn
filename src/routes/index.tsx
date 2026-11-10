import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Models } from "@/components/site/Models";
import { Gallery } from "@/components/site/Gallery";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { SITE_TITLE as TITLE, SITE_DESCRIPTION as DESC, siteSchema } from "@/lib/seo";
import { OpeningLoader } from "@/components/site/OpeningLoader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "/" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(siteSchema) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <OpeningLoader />
      <main id="conteudo">
      <Hero />
      <About />
      <Models />
      <Gallery />
      <Services />
      <Testimonials />
      <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
