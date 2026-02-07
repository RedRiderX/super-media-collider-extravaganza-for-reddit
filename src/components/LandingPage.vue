<template>
  <div class="page min-h-screen flex flex-col bg-gray-950 text-white">
    <header class="bg-black border-b border-gray-700 py-6 px-4">
      <h1 class="text-4xl font-bungee text-center">Reddit Player</h1>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="mb-12 text-center max-w-2xl">
        <h2 class="text-3xl font-bungee mb-4">Choose Your Mood</h2>
        <p class="text-gray-300 text-lg">Select a category and start browsing media from your favorite subreddits</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div v-for="moodGroup in moods" :key="moodGroup.name" class="space-y-4">
          <h3 class="text-2xl font-bungee text-center mb-6">{{ moodGroup.name }}</h3>
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
      <RouterLink to="/about" class="hover:text-blue-400">About</RouterLink>
    </footer>
  </div>
</template>

<script setup>
import { moods } from '@/config'
</script>

<style scoped>
</style>
