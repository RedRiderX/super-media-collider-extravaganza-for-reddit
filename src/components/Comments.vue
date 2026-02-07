<template>
    <h3 class="text-lg mb-4">Comments</h3>
    <div v-if="!comments" class="text-gray-400">Loading comments...</div>
    <div v-else class="space-y-4">
      <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
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
