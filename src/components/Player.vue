<template>
    <YouTubeEmbed v-if="post.domain === 'youtube'" :post="post" />
    <ImgurEmbed v-else-if="post.domain === 'imgur'" :post="post" />
    <VideoEmbed v-else-if="post.domain === 'reddit'" :post="post" />
    <ImageEmbed v-else-if="post.post_hint === 'image'" :post="post" />
    <div v-else class="text-center text-gray-400">
      <p>Unsupported media type</p>
      <p class="text-sm mt-2">{{ post.domain }}</p>
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
