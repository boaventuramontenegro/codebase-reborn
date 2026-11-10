export const SITE_TITLE = "Her Concept Model Agency | Agência de Modelos em Piracicaba";
export const SITE_DESCRIPTION = "Agência de modelos em Piracicaba, SP. Conheça nosso casting, agenciamento de modelos, produções fotográficas e aluguel de estúdio de fotografia.";

// Relative references resolve against the eventual public domain; never invent a host.
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "/#agency",
      name: "Her Concept Model Agency",
      url: "/",
      description: SITE_DESCRIPTION,
      telephone: "+55 19 99867-5962",
      email: "herconceptmodel@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Floriano Peixoto, 1272 - Cidade Alta",
        addressLocality: "Piracicaba",
        addressRegion: "SP",
        postalCode: "13419-170",
        addressCountry: "BR",
      },
      sameAs: ["https://www.instagram.com/herconceptmodel", "https://www.facebook.com/herconceptmodel"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços Her Concept",
        itemListElement: ["Agenciamento de Modelos", "Aluguel de Estúdio de Fotografia", "Estúdio de Fotografia"].map(name => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, provider: { "@id": "/#agency" } },
        })),
      },
    },
    {
      "@type": "WebSite", "@id": "/#website", url: "/", name: "Her Concept Model Agency",
      inLanguage: "pt-BR", publisher: { "@id": "/#agency" },
    },
    {
      "@type": "WebPage", "@id": "/#webpage", url: "/", name: SITE_TITLE,
      description: SITE_DESCRIPTION, inLanguage: "pt-BR",
      isPartOf: { "@id": "/#website" }, about: { "@id": "/#agency" },
    },
  ],
};