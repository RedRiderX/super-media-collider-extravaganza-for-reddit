<template>
  <div class="page min-h-screen flex flex-col bg-gray-950">
    <PlayerHeader @toggle-about="showAbout = !showAbout" />

    <main class="flex-1 flex overflow-hidden">
      <!-- Media Player + Comments -->
      <div class="flex-1 flex flex-col bg-gray-900 border-r border-gray-700 overflow-y-auto">
        <div class="flex-1 flex flex-col min-h-0">
          <Player v-if="currentPost" :post="currentPost" />
          <MetaBar
            v-if="currentPost"
            :post="currentPost"
            @next="queueNext"
            @prev="queuePrev"
            @toggle="queueToggle"
            :playing="mediaStatus.current"
          />
        </div>

        <!-- Comments Section -->
        <div class="border-t border-gray-700 p-4 overflow-y-auto flex-1 min-h-0 bg-gray-800">
          <Comments v-if="comments" :comments="comments" />
          <div v-else-if="currentPost" class="text-gray-400 text-center py-4">
            Loading comments...
          </div>
        </div>
      </div>

      <!-- Sidebar: Playlist -->
      <aside class="w-80 border-l border-gray-700 overflow-y-auto bg-black">
        <Playlist
          :posts="posts"
          :current-post="currentPost"
          @select="loadPost"
          @load-more="queueNext"
        />
      </aside>
    </main>

    <!-- About Modal -->
    <div v-if="showAbout" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div class="bg-gray-900 p-8 rounded-lg max-w-md">
        <h3 class="text-2xl font-bungee mb-4">About</h3>
        <p class="text-gray-300 mb-4">You know what I'm about dawg</p>
        <button @click="showAbout = false" class="btn-primary">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Player from './Player.vue'
import MetaBar from './MetaBar.vue'
import Playlist from './Playlist.vue'
import PlayerHeader from './PlayerHeader.vue'
import Comments from './Comments.vue'
import { useRedditAPI } from '@/composables/useRedditAPI'

const route = useRoute()
const showAbout = ref(false)

const {
  posts,
  currentPost,
  comments,
  mediaStatus,
  fetchData,
  fetchComments,
  loadPost,
  queueNext,
  queuePrev,
  queueToggle,
} = useRedditAPI()

const subreddit = computed(() => route.params.subreddit)

onMounted(async () => {
  if (subreddit.value) {
    await fetchData(subreddit.value)
  }
})

watch(currentPost, (newPost) => {
  if (newPost) {
    fetchComments(newPost)
  }
})
</script>

<style scoped>
</style>
