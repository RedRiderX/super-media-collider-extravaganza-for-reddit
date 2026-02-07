<template>
    <aside class="w-80 border-l border-gray-700 h-full flex flex-col">
        <div class="bg-black border-b border-gray-700 p-4">
            <h3 class="text-lg">r/{{ currentPost.subreddit }}</h3>
            <p class="text-sm text-gray-400">{{ posts.length }} posts loaded</p>
        </div>

        <div class="flex-1 overflow-y-auto space-y-2 p-2">
            <button v-for="post in posts" :key="post.id" @click="$emit('select', post)" :class="[
                'w-full text-left p-3 rounded transition',
                currentPost?.id === post.id
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-700',
            ]">
                <div class="text-sm font-semibold truncate">{{ post.title }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ post.score }} ↑</div>
            </button>
        </div>

        <div class="bg-black border-t border-gray-700 p-4">
            <button @click="$emit('load-more')" class="btn-primary w-full">Load More</button>
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
