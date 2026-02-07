<template>
  <div class="w-full h-full">
    <div id="youtube-player" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

let player = null

onMounted(() => {
  // Load YouTube IFrame API if not already loaded
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
    window.onYouTubeIframeAPIReady = initPlayer
  } else {
    initPlayer()
  }
})

function initPlayer() {
  const videoId = extractYouTubeId(props.post.url)
  if (videoId) {
    player = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        fs: 1,
      },
    })
  }
}

function extractYouTubeId(url) {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v')
    } else if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1)
    }
  } catch (e) {
    console.error('Error extracting YouTube ID:', e)
  }
  return null
}
</script>

<style scoped>
</style>
