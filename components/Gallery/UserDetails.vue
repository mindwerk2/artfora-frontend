<template>
  <div class="gallery-item-image-container-details-user">
  <img :src="getUserAvatar($props.authorAvatar, ImageTemplate.SmallThumbnail)" :alt="username">
  <div class="gallery-item-image-container-details-user-name">
    <h3>{{ username }}</h3>
    <p>{{ authorTag }}</p>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ImageTemplate } from '~/types/constants'
import { Media } from '~/types'
import useMedia from '~/composable/media'

interface Props {
  username: string
  authorTag: string
  authorAvatar: Media
}

const props = withDefaults(defineProps<Props>(), {
  username: '',
  authorTag: '',
  authorAvatar: () => ({ id: 0,  link: null, deleted_at: null }),
})
const { getUserAvatar } = useMedia()
</script>