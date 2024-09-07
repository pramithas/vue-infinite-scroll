<script setup lang="ts">

const props = defineProps({
    photo: Object,
    loading: Boolean,
    noMorePhotos: Boolean
});

</script>

<template>
    <v-card max-width="800" rounded="lg" theme="dark">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-responsive>
                        <v-img :src="props.photo?.urls.small" class="rounded-lg mb-2" height="184" width="500"
                            cover></v-img>
                        <v-list-item :subtitle="props.photo?.user.name"
                            :title="props.photo?.description || props.photo?.alt_description"
                            class="px-0"></v-list-item>
                    </v-responsive>
                </v-col>
                <v-col cols="12" v-if="!props.loading && props.noMorePhotos">
                    <v-alert type="info">No more photos to load.</v-alert>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>