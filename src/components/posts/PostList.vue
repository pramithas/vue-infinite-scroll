<template>
  <VErrorBoundary>
    <template #boundary="{ hasError }">
      <div v-if="!hasError">
        <p class="text-h3 mb-10 mt-4 text-center">Photo Collection App</p>
        <InfiniteScroller @infinite="fetchPhotos">
          <v-row>
            <v-col v-for="photo in photos" :key="photo.id" cols="4">
              <Post :photo="photo" :loading="loading" :noMorePhotos="noMorePhotos" />
            </v-col>
            <v-col v-for="n in 10" cols="4" v-if="loading">
              <v-skeleton-loader :key="n" :loading="loading" height="240"
                type="image, list-item-two-line"></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row class="position-fixed bottom-0 right-0">
            <v-col class="d-flex justify-end pr-5 pb-3 mb-10">
              <v-btn icon="mdi-arrow-up-bold-outline" class="mr-6" size="x-large"></v-btn>
            </v-col>
          </v-row>
        </InfiniteScroller>
      </div>
      <div v-else>Message to appear if error occurred.</div>
    </template>
  </VErrorBoundary>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import VErrorBoundary from "vue-error-boundary";
import usePhotos from '../../hooks/usePhotos';
import Post from "./Post.vue";
import InfiniteScroller from '../infinite-scroll/InfiniteScroller.vue';

const { photos, loading, fetchPhotos, noMorePhotos } = usePhotos();

onMounted(async () => {
  await fetchPhotos();
});

</script>