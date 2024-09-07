<template>
  <VErrorBoundary>
    <template #boundary="{ hasError }">
      <div v-if="!hasError">
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