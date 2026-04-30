import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (
  src
) => {
  return {
    url: src
  }
}