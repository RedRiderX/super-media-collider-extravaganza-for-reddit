<template>
  <component :is="activeComponent" :post="post" />
</template>

<script setup>
import { computed, h } from 'vue'
import YouTubeEmbed from './embeds/YouTubeEmbed.vue'
import ImgurEmbed from './embeds/ImgurEmbed.vue'
import VideoEmbed from './embeds/VideoEmbed.vue'
import ImageEmbed from './embeds/ImageEmbed.vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const activeComponent = computed(() => {
  if (props.post.domain === 'youtube') return YouTubeEmbed
  if (props.post.domain === 'imgur') return ImgurEmbed
  if (props.post.domain === 'reddit') return VideoEmbed
  if (props.post.post_hint === 'image') return ImageEmbed
  return ErrorComponent
})

// Runtime error component shown when no embed matches
const ErrorComponent = (props) =>
  h('div', { class: 'text-center text-gray-400' }, [
    h('p', 'Unsupported media type'),
    h('p', { class: 'text-sm mt-2' }, props.post?.domain || '')
  ])
</script>

<style scoped></style>
