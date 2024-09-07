<template>
  <InfiniteScroller @infinite="fetchPhotos">
    <v-row>
      <v-col v-for="photo in photos" :key="photo.id" cols="4">
        <Post :photo="photo" :loading="loading" :noMorePhotos="noMorePhotos" />
      </v-col>
    </v-row>
  </InfiniteScroller>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import usePhotos from '../../hooks/usePhotos';
import Post from "./Post.vue";
import InfiniteScroller from '../infinite-scroll/InfiniteScroller.vue';

const { photos, loading, fetchPhotos, noMorePhotos } = usePhotos();

onMounted(async () => {
  await fetchPhotos();
});

</script>

<style scoped>
.image-container v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>