<script setup lang="ts">

const props = defineProps({
    photo: Object,
    loading: Boolean,
    noMorePhotos: Boolean
});

</script>

<template>
    <v-card class="image-container">
        <v-img :src="props.photo?.urls.small" :alt="props.photo?.description" height="200"></v-img>
        <v-card-title>{{ props.photo?.description || 'Untitled' }}</v-card-title>
        <v-card-subtitle>By: {{ props.photo?.user.name }}</v-card-subtitle>
    </v-card>
    <v-col cols="12" v-if="props.loading">
        <v-skeleton-loader v-for="n in 3" :key="n" type="image" />
    </v-col>
    <v-col cols="12" v-if="!props.loading && props.noMorePhotos">
        <v-alert type="info">No more photos to load.</v-alert>
    </v-col>
</template>


<style scoped>
.image-container {
    padding: 20px;
    width: 350px;
    height: 300px;
    overflow: hidden;
    position: relative;
    background-color: #f0f0f0;
}
</style>