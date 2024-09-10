<template>
    <v-container class="d-flex flex-column align-center justify-center text-center">
      <v-row>
        <v-col>
          <v-icon size="128" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
          <p class="text-h4 font-weight-bold mb-3">Oops! Something went wrong</p>
          <p class="text-body-1 mb-5">{{ errorMessage || defaultErrorMessage }}</p>
  
          <v-btn color="primary" @click="retryAction">
            <v-icon left>mdi-refresh</v-icon> Retry
          </v-btn>
  
          <v-btn color="secondary" class="ml-4" @click="goHome">
            <v-icon left>mdi-home</v-icon> Go to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    errorMessage: {
      type: String,
      default: ''
    }
  });
  
  const defaultErrorMessage = 'An unexpected error occurred. Please try again later.';
  
  const router = useRouter();
  
  const retryAction = () => {
    window.location.reload();
  };
  
  const goHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .v-container {
    height: 100vh;
  }
  </style>
  