<script lang="ts" setup>
useHead({
  meta: [
    {
      "http-equiv": "accept-ch",
      content: "dpr, viewport-width, width",
    },
    {
      name: "theme-color",
      content: "#003A3E",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

useJsonld({
  "@context": "https://schema.org",
  "@type": "Event",
  name: "CMS Camp Mallorca",
  startDate: "2024-09-27T00:00-00:00",
  endDate: "2025-09-27T00:00-00:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Catalonia Majorica Palma Mallorca",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de la Garita, 3, Ponent",
      addressLocality: "Illes Balears",
      postalCode: "07015 Palma",
      addressCountry: "ES",
    },
  },
  description:
    "CMS Camp Mallorca is the first international Barcamp on the topic of CMS and all related areas resulting in a digital experience platform. It brings together agencies, customers and vendors of software products for the web in a unique atmosphere. It doesn't matter whether we are talking about a large DXP platform, headless CMS or an open source product in a composable architecture, as long as the focus is on a greater web experience.",

  organizer: {
    "@type": "Organization",
    name: "CMS Camp",
    url: "https://mallorca.cmscamp.eu",
  },
});
</script>
<template>
  <div class="mx-auto max-w-[1440px]">
    <Head>
      <Link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <Link rel="manifest" href="/site.webmanifest" />
      <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#003a3e" />
      <Meta name="apple-mobile-web-app-title" content="CMS Camp" />
      <Meta name="application-name" content="CMS Camp" />
      <Meta name="msapplication-TileColor" content="#ffffff" />
      <Meta name="theme-color" content="#ffffff" />
    </Head>
    <PreviewMode />
    <GlobalHeader />
    <main><slot /></main>
    <GlobalFooter />
  </div>
</template>
