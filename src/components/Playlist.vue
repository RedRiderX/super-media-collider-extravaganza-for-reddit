<template>
    <!-- 
      transform: perspective(56rem) rotateY(5deg) scale(1); -->
    <aside
        class="w-80 border-l border-gray-700 h-full flex flex-col transform-[perspective(56rem)_rotateY(5deg)_scale(1)]">
        <div class="bg-black border-b border-gray-700 p-4">
            <h3 class="text-lg">r/{{ currentPost?.subreddit }}</h3>
            <p class="text-sm text-gray-400">{{ posts.length }} posts loaded</p>
        </div>

        <div class="flex flex-col overflow-y-auto overflow-x-visible divide-gray-900 divide-y">
            <button v-for="post in posts" :key="post.id" @click="$emit('select', post)" :class="[
                'flex items-center text-left gap-2 transition outline-0 outline-blue-400  rounded-lg',
                currentPost?.id === post.id
                    ? 'bg-gray-600 hover:bg-gray-500 outline-2 scale-105'
                    : 'bg-gray-800 hover:bg-gray-700 hover:scale-102',
            ]">
                <img :src="post.thumbnail" alt="" class=" rounded-lg w-20 aspect-video object-cover flex-none"
                    v-if="post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== 'nsfw'">
                <div class="flex-1 flex flex-col py-2">
                    <div class="text-sm font-semibold">{{ post.title }}</div>
                    <div class="text-xs text-gray-300 mt-1">{{ post.score }} ↑</div>
                </div>
            </button>
            <div class="bg-black border-t border-gray-700 p-4">
                <button @click="$emit('load-more')" class="btn-primary w-full">Load More</button>
            </div>
        </div>

    </aside>

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
</script>

<style scoped></style>
