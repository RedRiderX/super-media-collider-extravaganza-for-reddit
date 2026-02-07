<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="post.title"
    class="max-h-96 max-w-full mx-auto object-contain"
  />
  <div v-else class="text-center text-gray-400">
    <p>Loading Imgur media...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { config } from '@/config'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const imageUrl = ref(null)

onMounted(async () => {
  // Extract Imgur ID from URL
  const match = props.post.url.match(/imgur\.com\/([a-zA-Z0-9]+)/)
  if (match) {
    const imgurId = match[1]
    try {
      const response = await fetch(`https://api.imgur.com/3/image/${imgurId}`, {
        headers: {
          Authorization: `Client-ID ${config.imgurClientId}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        imageUrl.value = data.data.link
      }
    } catch (error) {
      console.error('Error fetching Imgur data:', error)
    }
  }
})
</script>

<style scoped>
</style>
