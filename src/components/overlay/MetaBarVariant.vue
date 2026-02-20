<template>
    <div
        class="absolute left-0 top-1/2 -translate-y-1/2 m-6 max-w-96 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 z-20">
        <div class="flex flex-col gap-3">
            <div>
                <h2 class="text-lg font-semibold truncate">{{ post.title }}</h2>
                <p class="text-sm text-gray-400">
                    r/{{ post.subreddit }} · {{ post.score }} ↑·
                    <a :href="`https://reddit.com${post.permalink}`" target="_blank"
                        class="text-blue-400 hover:underline">
                        permalink 🔗
                    </a>
                </p>
            </div>
            <div class="flex gap-2 flex-wrap">
                <button @click="$emit('prev')" class="btn-secondary text-sm px-3 py-1">← Prev</button>
                <button @click="$emit('toggle')" class="btn-primary text-sm px-3 py-1">
                    {{ playing === 'playing' ? '⏸' : '▶' }}
                </button>
                <button @click="$emit('next')" class="btn-secondary text-sm px-3 py-1">Next →</button>
                <button @click="$emit('comments')" class="btn-secondary text-sm px-3 py-1">💬 Comments</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    post: {
        type: Object,
        required: true,
    },
    playing: {
        type: String,
        default: 'playing',
    },
})

defineEmits(['next', 'prev', 'toggle', 'comments'])
</script>

<style scoped></style>
