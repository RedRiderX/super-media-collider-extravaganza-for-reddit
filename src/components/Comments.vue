<template>
  <div class="bg-gray-900 p-4 rounded">
    <h3 class="font-bungee text-lg mb-4">Comments</h3>
    <div v-if="!comments" class="text-gray-400">Loading comments...</div>
    <div v-else class="space-y-4">
      <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script setup>
import Comment from './Comment.vue'

defineProps({
  comments: {
    type: Array,
    default: null,
  },
})
</script>

<style scoped>
</style>
