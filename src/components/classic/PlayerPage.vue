<template>
    <div class="h-screen flex bg-gray-900 text-white">
        <!-- <header class="bg-black border-b border-gray-700 py-4 px-6 flex items-center justify-between">
            <RouterLink to="/" class="text-2xl font-display hover:text-blue-400 transition">
                🎬 Super Media Collider Extravaganza for Reddit!
            </RouterLink>
        </header> -->

        <main class="flex-1 overflow-scroll ">
            <!-- Media Player + Comments -->
            <div class="h-screen flex-1 flex flex-col ">
                <Player v-if="currentPost" :post="currentPost" />
                <MetaBar v-if="currentPost" :post="currentPost" @next="queueNext" @prev="queuePrev"
                    @toggle="queueToggle" :playing="mediaStatus.current" />
            </div>
            <!-- Comments Section -->
            <div class="border-t border-gray-700 p-4 bg-gray-800">
                <Comments v-if="comments" :comments="comments" />
                <div v-else-if="currentPost" class="text-gray-400 text-center py-4">
                    Loading comments...
                </div>
            </div>
        </main>

        <!-- Sidebar: Playlist -->
        <Playlist :posts="posts" :current-post="currentPost" @select="loadPost" @load-more="queueNext" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Player from '../Player.vue'
import MetaBar from './MetaBar.vue'
import Playlist from './Playlist.vue'
import Comments from './Comments.vue'
import { useRedditStore } from '@/stores/redditStore'

const route = useRoute()
const store = useRedditStore()

const posts = computed(() => store.posts)
const currentPost = computed(() => store.currentPost)
const comments = computed(() => store.comments)
const mediaStatus = computed(() => store.mediaStatus)
const fetchData = () => store.fetchData(subreddit.value)
const fetchComments = (post) => store.fetchComments(post)
const loadPost = (post) => store.loadPost(post)
const queueNext = () => store.queueNext()
const queuePrev = () => store.queuePrev()
const queueToggle = () => store.queueToggle()

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

<style scoped></style>
