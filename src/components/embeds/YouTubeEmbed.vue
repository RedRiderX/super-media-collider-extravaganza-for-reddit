<template>
  <div id="youtube-player" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRedditStore } from '@/stores/redditStore'

const store = useRedditStore()

const mediaStatus = computed(() => store.mediaStatus.current)
const queueNext = () => store.queueNext()

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

let player = null

watch(() => props.post, (newPost) => {
  // debugger
  if (newPost && player) {
    const videoId = extractYouTubeId(newPost.url)
    console.log('Extracted YouTube ID:', videoId, newPost.url)
    if (videoId) {
      player.loadVideoById(videoId)
    }
  }
})

watch(mediaStatus, (newStatus) => {
  // debugger
  if (player) {
    if (newStatus === 'playing') {
      player.playVideo()
    } else if (newStatus === 'stopped') {
      player.pauseVideo()
    }
  }
})

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
        // controls: 1,
        controls: 0,
        rel: 0,
        fs: 0,
        widget_referrer: window.location.href,
      },
      events: {
        // 'onReady': this.onYoutubeReady,
        'onStateChange': onYoutubeStateChange
      }
    })
  }
}

function onYoutubeStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.ENDED:
      // console.log('done I guess?');
      this.$emit('media-finished');
      queueNext()
      break;
    case YT.PlayerState.PLAYING:
      this.$emit('media-started');
      mediaStatus.value = 'playing'
      break;
    case YT.PlayerState.PAUSED:
      this.$emit('media-stopped');
      mediaStatus.value = 'stopped'
      break;
  }
}

function extractYouTubeId(url) {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('shorts')) {
        return urlObj.pathname.split('/')[2]
      }
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

<style scoped></style>
