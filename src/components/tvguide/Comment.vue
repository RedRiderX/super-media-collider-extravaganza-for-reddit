<template>
  <div class="border-l-2 border-gray-700 pl-4 py-2">
    <div class="flex items-center justify-between">
      <span class="font-semibold text-sm">{{ comment.author }}</span>
      <span class="text-xs ">{{ comment.score }} points</span>
    </div>
    <p class="text-sm mt-2">{{ comment.body }}</p>
    <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 space-y-2">
      <Comment
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
</style>
