import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

type ImageOptimizations = {
  width?: number
  height?: number
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'clip' | 'crop' | 'scale' | 'max'
  format?: 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'auto_image'
  quality?: number
}

export function optimizeHygraphImage(baseURL: string, url: string, optimizations: ImageOptimizations) {
  baseURL = baseURL.replace(/\/+$/, '');
  
  const imageId = url.split(`${baseURL}/`)[1]
  if (!imageId) {
    return url
  }

  const transformations: string[] = []

  if (optimizations.width || optimizations.height) {
    const resizeParams: string[] = []
    if (optimizations.width) resizeParams.push(`width:${optimizations.width}`)
    if (optimizations.height) resizeParams.push(`height:${optimizations.height}`)
    if (optimizations.fit) {
      const fitMap: Record<string, string> = {
        cover: 'crop',
        contain: 'max',
        fill: 'scale',
        inside: 'clip',
        outside: 'max',
        clip: 'clip',
        crop: 'crop',
        scale: 'scale',
        max: 'max'
      }
      resizeParams.push(`fit:${fitMap[optimizations.fit] || 'clip'}`)
    }
    transformations.push(`resize=${resizeParams.join(',')}`)
  }

  if (optimizations.quality) {
    transformations.push(`quality=value:${optimizations.quality}`)
  }

  if (optimizations.format && optimizations.format !== 'auto_image') {
    transformations.push(`format:${optimizations.format}`)
  } else if (!optimizations.format || optimizations.format === 'auto_image') {
    transformations.push('auto_image')
  }

  const transformString = transformations.join('/')
  return joinURL(baseURL, transformString, imageId)
}

const DEFAULT_BASE_URL = 'https://eu-central-1-shared-euc1-02.graphassets.com/cluqa1kb02bgi07tdbi3a8tbo'

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL } = {}
) => {

  const {
    width,
    height,
    fit,
    format,
    quality
  } = modifiers

  const resolvedBaseURL = baseURL || DEFAULT_BASE_URL

  return {
    url: optimizeHygraphImage(resolvedBaseURL, src, { width, height, fit, format, quality })
  }
}