import { ref } from "vue";
import axios from "axios";

export default function usePhotos() {
  const UNSPLASH_API_URL = "https://api.unsplash.com/photos";

  interface Photo {
    id: string;
    description: string | null;
    urls: {
      small: string;
    };
    user: {
      name: string;
    };
  }

  const photos = ref<Photo[]>([]);
  const page = ref(1);
  const loading = ref(false);
  const noMorePhotos = ref(false);
  const limit = 10;

  const fetchPhotos = async () => {
    if (loading.value || noMorePhotos.value) return;
    loading.value = true;
    try {
      const response = await axios.get<Photo[]>(UNSPLASH_API_URL, {
        params: {
          page: page.value,
          per_page: limit,
          client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
        },
      });

      if (response.data.length < limit) {
        noMorePhotos.value = true;
      }

      photos.value.push(...response.data);
      page.value++;
    } catch (error) {
      console.error("Error fetching photos:", error);
      throw new Error("Error fetching photos");
    } finally {
      loading.value = false;
    }
  };

  return { photos, loading, fetchPhotos, noMorePhotos };
}
