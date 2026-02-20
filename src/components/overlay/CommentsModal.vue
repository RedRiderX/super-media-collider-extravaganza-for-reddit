<template>
    <!-- Modal backdrop -->
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-30" @click="$emit('close')"></div>
    </transition>

    <!-- Modal panel (slides up from bottom) -->
    <transition name="slide-up">
        <div v-if="isOpen" class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-gray-900 border-t border-gray-700 z-40 flex flex-col rounded-t-lg">
            <div class="border-b border-gray-700 p-4 flex items-center justify-between">
                <h3 class="text-lg font-semibold">Comments</h3>
                <button @click="$emit('close')" class="text-2xl hover:text-gray-400 transition">&times;</button>
            </div>
            <div class="flex-1 overflow-y-auto">
                <Comments v-if="comments" :comments="comments" />
                <div v-else class="text-gray-400 text-center py-8">
                    Loading comments...
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import Comments from '../classic/Comments.vue'

defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    comments: {
        type: Array,
        default: () => [],
    },
})

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}
</style>
