<script setup lang="ts">

const postProps = defineProps({
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
                        <v-tooltip :text="postProps.photo?.alt_description" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-img :src="postProps.photo?.urls?.small" v-bind="props"
                                    class="rounded-lg mb-2" height="320" cover></v-img>
                                <v-list-item :subtitle="postProps.photo?.user?.name"
                                    :title="postProps.photo?.description || postProps.photo?.alt_description"
                                    class="px-0"></v-list-item>
                            </template>
                        </v-tooltip>
                    </v-responsive>
                </v-col>
                <v-col cols="12" v-if="!postProps.loading && postProps.noMorePhotos">
                    <v-alert type="info">No more photos to load.</v-alert>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>