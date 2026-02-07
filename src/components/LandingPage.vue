<template>
  <div class="page min-h-screen flex flex-col bg-gray-950 text-white">
    <header class="bg-black border-b border-gray-700 py-6 px-4 lg:py-8 lg:px-6">
      <h1 class="text-4xl font-display text-center lg:text-7xl m-4  max-w-6xl mx-auto">Super Media Collider Extravaganza for Reddit!</h1>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="mb-12 text-center max-w-2xl">
        <h2 class="text-3xl mb-4">What are you in the mood for?</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div v-for="moodGroup in moods" :key="moodGroup.name" class="space-y-4">
          <h3 class="text-2xl text-center mb-6">{{ moodGroup.name }}</h3>
          <RouterLink
            v-for="subreddit in moodGroup.subreddits"
            :key="subreddit.path"
            :to="`/r/${subreddit.path}`"
            class="block bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer group"
          >
            <div class="text-lg font-semibold group-hover:text-blue-400 transition">
              {{ subreddit.name }}
            </div>
            <div class="text-sm text-gray-400 mt-1">r/{{ subreddit.path }}</div>
          </RouterLink>
        </div>
      </div>
    </main>

    <footer class="bg-black border-t border-gray-700 py-4 px-4 text-center text-gray-400">
       <a href="https://github.com/RedRiderX/super-media-collider-extravaganza-for-reddit" target="_blank" class="text-blue-400 hover:underline">The code is here</a>
    </footer>
  </div>
</template>

<script setup>
import { moods } from '@/config'
</script>

<style scoped>
</style>
