<template>
    <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 m-6 max-w-full w-100 rubberized-texture p-4 rounded-lg border-2 border-gray-800 shadow-2xl z-20">
        <div class="flex flex-col gap-3">
            <div class=" p-2 led-old">
                <h2 class="text-lg font-semibold truncate">{{ post.title }}</h2>
                <p class="text-sm ">
                    r/{{ post.subreddit }} · {{ post.score }} ↑·
                </p>
            </div>
            
            <div class="flex gap-2 flex-wrap self-center items-center justify-center">
                <div class="flex flex-col items-center gap-2 ">
                    <div class="uppercase tracking-wider text-sm text-gray-300">Prev</div>
                    <button @click="$emit('prev')" class="rubberized-button rounded-l-full text-[30px] py-4 px-6">🞀</button>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="uppercase tracking-wider text-sm text-gray-300">{{ playing === 'playing' ? 'Pause' : 'Play' }}</div>
                    <button @click="$emit('toggle')" class="rubberized-button rounded-full text-[40px] py-4 px-6 w-[80px] h-[80px]">
                        {{ playing === 'playing' ? '⏸' : '▶' }}
                    </button>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="uppercase tracking-wider text-sm text-gray-300">Next</div>
                    <button @click="$emit('next')" class="rubberized-button  rounded-r-full text-[30px] py-4 px-6">🞂</button>
                </div>
            </div>
            
            <div class="flex flex-col items-center gap-2">
                <div class="uppercase tracking-wider text-sm text-gray-300">permalink</div>
                <a 
                    :href="`https://reddit.com${post.permalink}`" 
                    target="_blank" 
                    class="rubberized-button leading-0  rounded-xl">🡥</a>
            </div>
            
            <div class="flex flex-col items-center gap-2">
                <div class="uppercase tracking-wider text-sm text-gray-300">Comments</div>
                <button @click="$emit('comments')" class="rubberized-button leading-0 rounded-xl">🕮</button>
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

// setInterval(function () {
//   var today = new Date();
//   var clk = $("#clock");
//   var hora =
//     pad(today.getHours(),2) + ":" + pad(today.getMinutes(), 2) + ":" + pad(today.getSeconds(),2);
//   clk.text(hora);
//   $("#stat").toggleClass("led-off");
// }, 500);

// function pra8(n){
//   if (n > 0) return Math.ceil(n / 8.0) * 8;
//   else if (n < 0) return Math.floor(n / 8.0) * 8;
//   else return 8;
// }

// var rds = "CODEPEN FM - YOUR KNOWLEDGE BASE FOR DEVELOPMENT IMPROVEMENT";
// var idx_ini = 0;
// var idx_end =  rds.length;

// setInterval(function () {
//   var display = rds.substring(idx_ini, idx_ini+7 );
//   if ((idx_ini + 7) >= rds.length){
//     idx_ini = 0;  
//   }
//   idx_ini++;
  
//   $("#rds").text(display);  
// }, 500);

// function pad(num, size) {
//     num = num.toString();
//     while (num.length < size) num = "0" + num;
//     return num;
// }
</script>

<style scoped></style>
