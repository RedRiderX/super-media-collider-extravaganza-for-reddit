<template>
    <div
        class="absolute right-0 top-0 h-screen w-80 bg-linear-to-l from-black via-gray-900/95 to-transparent p-2 z-20 flex flex-col">
        <div class="border-b border-gray-700 pb-4 mb-4">
            <h3 class="text-lg font-semibold text-gray-300">r/{{ currentPost?.subreddit }}</h3>
            <p class="text-xs text-gray-500">{{ posts.length }} posts</p>
        </div>

        <div class="flex-1 overflow-y-auto flex flex-col gap-1 p-4">
                <button v-for="(post, index) in posts" :key="post.id" @click="$emit('select', post)" :class="[
                    'coverflow-card aspect-video relative group text-left',
                    currentPost?.id === post.id ? 'coverflow-active' : '',
                ]" :style="{ '--index': index }">
                    <!-- Thumbnail image -->
                    <img v-if="post.thumbnail && isValidThumbnail(post.thumbnail)" :src="post.thumbnail" alt=""
                        class="w-full h-full object-cover object-center rounded-lg" />
                    <div v-else class="w-full h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span class="text-2xl">🖼️</span>
                    </div>

                    <!-- Title and karma overlay -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent rounded-lg p-2 flex flex-col justify-end opacity-100 group-hover:opacity-100 transition">
                        <p class=" font-semibold line-clamp-2">{{ post.title }}</p>
                        <p class="text-xs text-gray-400 font-bold">{{ formatScore(post.score) }} ↑</p>
                    </div>

                    <!-- Current post indicator -->
                    <div v-if="currentPost?.id === post.id"
                        class="absolute inset-0 border-2 border-blue-500 rounded-lg"></div>
                </button>
        </div>

        <!-- Load more button -->
        <button @click="$emit('load-more')" class="btn-secondary text-xs mt-4 w-full">Load More</button>
    </div>
</template>

<script setup>
defineProps({
    posts: {
        type: Array,
        default: () => [],
    },
    currentPost: {
        type: Object,
        default: null,
    },
})

defineEmits(['select', 'load-more'])

const isValidThumbnail = (thumbnail) => {
    return thumbnail && thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== 'nsfw'
}

const formatScore = (score) => {
    if (score >= 1000000) return (score / 1000000).toFixed(1) + 'M'
    if (score >= 1000) return (score / 1000).toFixed(1) + 'K'
    return score
}
</script>

<style scoped>
.coverflow-card {
    position: relative;
    flex-shrink: 0;
    transition: all 0.4s ease;
    /* transform-style: preserve-3d; */
    opacity: 0.7;
    /* scale: 0.9; */
    z-index: 10;
}

.coverflow-card:hover {
    opacity: 0.9;
    /* scale: 0.95; */
    scale: 1.05;
    z-index: 30;
}

.coverflow-card.coverflow-active {
    opacity: 1;
    /* scale: 1; */
    scale: 1.1;
    z-index: 20;
}
</style>
