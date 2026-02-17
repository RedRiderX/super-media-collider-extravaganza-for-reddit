<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="post.title"
    class="max-h-full max-w-full mx-auto object-contain"
  />
  <div v-else class="text-center text-gray-400">
    <p>Loading image...</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const imageUrl = computed(() => {
  // For simple image URLs, just use the URL directly
  if (props.post.media && props.post.media.oembed) {
    return props.post.media.oembed.thumbnail_url
  } else if (props.post.url && props.post.post_hint === 'image') {
    return props.post.url
  }
  return null
})
</script>

<style scoped>
</style>
