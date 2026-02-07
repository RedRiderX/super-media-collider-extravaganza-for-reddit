<template>
  <div class="bg-black border-t border-gray-700 p-4">
    <div class="max-w-full mx-auto">
      <h2 class="text-xl font-semibold mb-4 truncate">{{ post.title }}</h2>
      <div class="flex items-center justify-between gap-4">
        <div class="flex-1">
          <p class="text-sm text-gray-400">
            {{ post.subreddit }} · {{ post.score }} upvotes
          </p>
        </div>
        <div class="flex gap-2">
          <button @click="$emit('prev')" class="btn-secondary">← Prev</button>
          <button @click="$emit('toggle')" class="btn-primary">
            {{ playing === 'playing' ? '⏸ Pause' : '▶ Play' }}
          </button>
          <button @click="$emit('next')" class="btn-secondary">Next →</button>
        </div>
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

defineEmits(['next', 'prev', 'toggle'])
</script>

<style scoped>
</style>
