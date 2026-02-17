<template>
    <div class="h-screen w-screen bg-gray-900 text-white overflow-hidden relative" @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = mediaStatus.current === 'stopped'" @mousemove="resetOverlayTimer">
        <!-- Full-screen player (primary focus) -->
        <div class="w-full h-full flex items-center justify-center">
            <Player v-if="currentPost" :post="currentPost" />
        </div>

        <!-- Overlays visible on hover/pause -->
        <transition name="fade">
            <div v-show="showOverlay" class="absolute inset-0 pointer-events-none">
                <!-- Metadata overlay (center-left) -->
                <MetaBarVariant v-if="currentPost" :post="currentPost" :playing="mediaStatus.current" @next="queueNext"
                    @prev="queuePrev" @toggle="handleToggle" @comments="showCommentsModal = true"
                    class="pointer-events-auto" />
            </div>
        </transition>

        <!-- Playlist coverflow (right side) - slides in from right -->
        <transition name="slide-in-left">
            <PlaylistCoverflow v-show="showOverlay" :posts="posts" :current-post="currentPost" @select="loadPost"
                @load-more="queueNext" class="pointer-events-auto" />
        </transition>

        <!-- Comments modal (center bottom) -->
        <CommentsModal :is-open="showCommentsModal" :comments="comments" @close="showCommentsModal = false" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import Player from './Player.vue'
import MetaBarVariant from './MetaBarVariant.vue'
import PlaylistCoverflow from './PlaylistCoverflow.vue'
import CommentsModal from './CommentsModal.vue'
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

// Local UI state
const showOverlay = ref(false)
const showCommentsModal = ref(false)
const overlayTimer = ref(null)

const subreddit = computed(() => route.params.subreddit)

// Auto-hide overlay after 3 seconds of inactivity (when playing)
const resetOverlayTimer = () => {
    // debugger
    // if (mediaStatus.value.current === 'playing') {
    //     clearTimeout(overlayTimer.value)
    //     showOverlay.value = true
    //     overlayTimer.value = setTimeout(() => {
    //         showOverlay.value = false
    //     }, 3000)
    // }
}

// Handle play toggle
const handleToggle = () => {
    queueToggle()
    // Keep overlay visible when paused
    // if (mediaStatus.current !== 'stopped') {
    //     clearTimeout(overlayTimer.value)
    //     showOverlay.value = false
    // }
}

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

// Clean up timer on unmount
onBeforeUnmount(() => {
    clearTimeout(overlayTimer.value)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-in-left-enter-active,
.slide-in-left-leave-active {
    transition: transform 0.3s ease;
}

.slide-in-left-enter-from,
.slide-in-left-leave-to {
    transform: translateX(100%);
}
</style>
