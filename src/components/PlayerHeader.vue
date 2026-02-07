<template>
  <header class="bg-black border-b border-gray-700 py-4 px-6 flex items-center justify-between">
    <RouterLink to="/" class="text-2xl font-bungee hover:text-blue-400 transition">
      🎬 Reddit Player
    </RouterLink>

    <button
      @click="$emit('toggle-about')"
      class="btn-secondary"
    >
      About
    </button>
  </header>
</template>

<script setup>
defineEmits(['toggle-about'])
</script>

<style scoped>
</style>
