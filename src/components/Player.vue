<template>
  <div class="flex-1 flex items-center justify-center bg-gray-950 p-4">
    <div v-if="post.domain === 'youtube'" class="w-full max-w-3xl aspect-video">
      <YouTubeEmbed :post="post" />
    </div>
    <div v-else-if="post.domain === 'imgur'" class="w-full">
      <ImgurEmbed :post="post" />
    </div>
    <div v-else-if="post.domain === 'reddit'" class="w-full max-w-2xl">
      <VideoEmbed :post="post" />
    </div>
    <div v-else-if="post.post_hint === 'image'" class="w-full h-full">
      <ImageEmbed :post="post" />
    </div>
    <div v-else class="text-center text-gray-400">
      <p>Unsupported media type</p>
      <p class="text-sm mt-2">{{ post.domain }}</p>
    </div>
  </div>
</template>

<script setup>
import YouTubeEmbed from './embeds/YouTubeEmbed.vue'
import ImgurEmbed from './embeds/ImgurEmbed.vue'
import VideoEmbed from './embeds/VideoEmbed.vue'
import ImageEmbed from './embeds/ImageEmbed.vue'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
</style>
