<template>
    <div class="h-screen w-screen bg-gray-900 text-white overflow-hidden relative" @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = mediaStatus.current === 'stopped'" @mousemove="resetOverlayTimer">
        <div :class="['w-full h-full', { 'crt-flicker': crtFlickerEnabled }]">
            <div class="w-full h-full flex items-center justify-center">
                <Player v-if="currentPost" :post="currentPost" />
            </div>

            <transition name="slide-in-left">
                <Playlist v-show="showOverlay" :posts="posts" :current-post="currentPost" @select="loadPost"
                    @load-more="queueNext" class="pointer-events-auto" :class="{ 'crt-color-separation': crtGlowEnabled }" />
            </transition>
        </div>

        <transition name="fade">
            <div v-show="showOverlay" class="absolute inset-0 pointer-events-none">
                <!-- Metadata overlay (center-left) -->
                <MetaBar v-if="currentPost" :post="currentPost" :playing="mediaStatus.current" @next="queueNext"
                    @prev="queuePrev" @toggle="handleToggle" @comments="showCommentsModal = true"
                    @toggle-crt-flicker="toggleCrtFlicker" @toggle-crt-glow="toggleCrtGlow"
                    :crt-flicker-enabled="crtFlickerEnabled" :crt-glow-enabled="crtGlowEnabled"
                    class="pointer-events-auto" />
            </div>
        </transition>

        <CommentsGuide :is-open="showCommentsModal" :comments="comments" @close="showCommentsModal = false" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import Player from '../Player.vue'
import MetaBar from './Remote.vue'
import Playlist from './Playlist.vue'
import CommentsGuide from './CommentsGuide.vue'
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
const crtFlickerEnabled = ref(true)
const crtGlowEnabled = ref(true)

const subreddit = computed(() => route.params.subreddit)

// console.log(GeistPixelSquare.variable);

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

const toggleCrtFlicker = () => {
    crtFlickerEnabled.value = !crtFlickerEnabled.value
}

const toggleCrtGlow = () => {
    crtGlowEnabled.value = !crtGlowEnabled.value
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

@keyframes flicker {
    0% {
        opacity: 0.27861;
    }

    5% {
        opacity: 0.34769;
    }

    10% {
        opacity: 0.23604;
    }

    15% {
        opacity: 0.90626;
    }

    20% {
        opacity: 0.18128;
    }

    25% {
        opacity: 0.83891;
    }

    30% {
        opacity: 0.65583;
    }

    35% {
        opacity: 0.67807;
    }

    40% {
        opacity: 0.26559;
    }

    45% {
        opacity: 0.84693;
    }

    50% {
        opacity: 0.96019;
    }

    55% {
        opacity: 0.08594;
    }

    60% {
        opacity: 0.20313;
    }

    65% {
        opacity: 0.71988;
    }

    70% {
        opacity: 0.53455;
    }

    75% {
        opacity: 0.37288;
    }

    80% {
        opacity: 0.71428;
    }

    85% {
        opacity: 0.70419;
    }

    90% {
        opacity: 0.7003;
    }

    95% {
        opacity: 0.36108;
    }

    100% {
        opacity: 0.24387;
    }
}

@keyframes textShadow {
    0% {
        text-shadow: 0.4389924193300864px 0 1px rgba(0, 30, 255, 0.5), -0.4389924193300864px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    5% {
        text-shadow: 2.7928974010788217px 0 1px rgba(0, 30, 255, 0.5), -2.7928974010788217px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    10% {
        text-shadow: 0.02956275843481219px 0 1px rgba(0, 30, 255, 0.5), -0.02956275843481219px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    15% {
        text-shadow: 0.40218538552878136px 0 1px rgba(0, 30, 255, 0.5), -0.40218538552878136px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    20% {
        text-shadow: 3.4794037899852017px 0 1px rgba(0, 30, 255, 0.5), -3.4794037899852017px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    25% {
        text-shadow: 1.6125630401149584px 0 1px rgba(0, 30, 255, 0.5), -1.6125630401149584px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    30% {
        text-shadow: 0.7015590085143956px 0 1px rgba(0, 30, 255, 0.5), -0.7015590085143956px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    35% {
        text-shadow: 3.896914047650351px 0 1px rgba(0, 30, 255, 0.5), -3.896914047650351px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    40% {
        text-shadow: 3.870905614848819px 0 1px rgba(0, 30, 255, 0.5), -3.870905614848819px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    45% {
        text-shadow: 2.231056963361899px 0 1px rgba(0, 30, 255, 0.5), -2.231056963361899px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    50% {
        text-shadow: 0.08084290417898504px 0 1px rgba(0, 30, 255, 0.5), -0.08084290417898504px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    55% {
        text-shadow: 2.3758461067427543px 0 1px rgba(0, 30, 255, 0.5), -2.3758461067427543px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    60% {
        text-shadow: 2.202193051050636px 0 1px rgba(0, 30, 255, 0.5), -2.202193051050636px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    65% {
        text-shadow: 2.8638780614874975px 0 1px rgba(0, 30, 255, 0.5), -2.8638780614874975px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    70% {
        text-shadow: 0.48874025155497314px 0 1px rgba(0, 30, 255, 0.5), -0.48874025155497314px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    75% {
        text-shadow: 1.8948491305757957px 0 1px rgba(0, 30, 255, 0.5), -1.8948491305757957px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    80% {
        text-shadow: 0.0833037308038857px 0 1px rgba(0, 30, 255, 0.5), -0.0833037308038857px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    85% {
        text-shadow: 0.09769827255241735px 0 1px rgba(0, 30, 255, 0.5), -0.09769827255241735px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    90% {
        text-shadow: 3.443339761481782px 0 1px rgba(0, 30, 255, 0.5), -3.443339761481782px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    95% {
        text-shadow: 2.1841838852799786px 0 1px rgba(0, 30, 255, 0.5), -2.1841838852799786px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }

    100% {
        text-shadow: 2.6208764473832513px 0 1px rgba(0, 30, 255, 0.5), -2.6208764473832513px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
    }
}

.crt-flicker::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 20;
    pointer-events: none;
    animation: flicker 0.15s infinite;
}

.crt-flicker::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 20;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
}

.crt-color-separation {
    animation: textShadow 1.6s infinite;
}
</style>
