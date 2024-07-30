export default defineNuxtConfig({
  routeRules: {
    '/**': { isr: 60 },
  },

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/image",
    "nuxt-graphql-client",
    "nuxt-jsonld",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap"
  ],

  runtimeConfig: {
    hygraphToken: process.env.HYGRAPH_TOKEN,
    hygraphEndpoint: process.env.GQL_HOST,
    public: {
      imageProvider: process.env.IMAGE_PROVIDER,
      cloudinaryBaseUrl: process.env.CLOUDINARY_BASE_URL
    }
  },

  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASE_URL,
    },
    providers: {
      hygraph: {
        name: 'hygraph',
        provider: '~/providers/hygraph.ts',
        options: {
          baseURL: "https://eu-central-1-shared-euc1-02.graphassets.com/cluqa1kb02bgi07tdbi3a8tbo"
        }
      }
    }
  },

  fonts: {
    families: [{
      name: 'Poppins', provider: 'google', weights: [100, 400, 700]
    },
    {
      name: 'Roboto', provider: 'google', weights: [400]
    }]
  },

  site: {
    url: 'https://mallorca.cmscamp.eu/',
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },
})