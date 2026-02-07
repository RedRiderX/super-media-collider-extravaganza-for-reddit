<template>
  <video
    controls
    class="w-full h-full max-h-96 bg-black"
    autoplay
  >
    <source v-if="videoUrl" :src="videoUrl" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const videoUrl = ref(null)

onMounted(() => {
  if (props.post.media && props.post.media.reddit_video) {
    // v.redd.it videos have fallback_url
    videoUrl.value = props.post.media.reddit_video.fallback_url
  }
})
</script>

<style scoped>
</style>
