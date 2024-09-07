<template>
    <div ref="scroller" class="scroller">
        <slot></slot>
        <div ref="endOfScroller" class="end-of-scroller"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const emits = defineEmits(['infinite']);

let scroller = ref<HTMLElement | null>(null);
let endOfScroller = ref<HTMLElement | null>(null);

onMounted(() => {
    if (scroller.value && endOfScroller.value) {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    console.log("End of scroller intersected, fetching more data...");
                    emits('infinite');
                }
            },
            { root: scroller.value, threshold: 0.5 }
        );

        observer.observe(endOfScroller.value);

        onBeforeUnmount(() => {
            observer.disconnect();
        });
    } else {
        console.error("Scroller or endOfScroller is not properly initialized.");
    }
});
</script>

<style scoped>
.scroller {
    height: 80vh;
    overflow-y: auto;
}

.end-of-scroller {
    height: 1px;
}
</style>