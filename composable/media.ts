import { Media } from '~/types'
import { useRuntimeConfig } from '#app'
import avatar from 'assets/images/logo.jpg'

export default function () {
  const config = useRuntimeConfig()

  const getImageUrl = (media: Media, template?: string): string => {
    if (!!template) {
      return config.public.API_BASE_URL + '/cache/' + template + '/' + media.link
    }

    return config.public.API_BASE_URL + '/storage/' + media.link
  }
  const getUserAvatar = (link: string): string => {
    if (link) {
      return config.public.API_BASE_URL + '/storage/' + link
    }
    return avatar
  }

  return { getImageUrl, getUserAvatar }
}
