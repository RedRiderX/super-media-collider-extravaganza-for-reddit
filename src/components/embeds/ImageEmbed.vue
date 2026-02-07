<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="post.title"
    class="max-h-96 max-w-full mx-auto object-contain"
  />
  <div v-else class="text-center text-gray-400">
    <p>Loading image...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const imageUrl = ref(null)

onMounted(() => {
  // For simple image URLs, just use the URL directly
  if (props.post.media && props.post.media.oembed) {
    imageUrl.value = props.post.media.oembed.thumbnail_url
  } else if (props.post.url && props.post.post_hint === 'image') {
    imageUrl.value = props.post.url
  }
})
</script>

<style scoped>
</style>
