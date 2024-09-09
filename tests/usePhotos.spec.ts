// tests/usePhotos.spec.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import usePhotos from '../src/hooks/usePhotos.js'; // Adjust the import path as needed

// Create a new instance of MockAdapter for each test
let mock;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('usePhotos', () => {
  it('fetches photos and updates state', async () => {
    const mockData = [
      { id: '1', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } },
      { id: '2', description: 'A snowy mountain', urls: { small: 'https://example.com/photo2.jpg' }, user: { name: 'Jane Doe' } },
      { id: '3', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } },
      { id: '4', description: 'A snowy mountain', urls: { small: 'https://example.com/photo2.jpg' }, user: { name: 'Jane Doe' } },
      { id: '5', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } },
      { id: '6', description: 'A snowy mountain', urls: { small: 'https://example.com/photo2.jpg' }, user: { name: 'Jane Doe' } },
      { id: '7', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } },
      { id: '8', description: 'A snowy mountain', urls: { small: 'https://example.com/photo2.jpg' }, user: { name: 'Jane Doe' } },
      { id: '9', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } },
      { id: '10', description: 'A snowy mountain', urls: { small: 'https://example.com/photo2.jpg' }, user: { name: 'Jane Doe' } }
    ];

    mock.onGet('https://ai.unsplash.com/photos').reply(200, mockData);

    const { photos, loading, fetchPhotos, noMorePhotos } = usePhotos();

    // Check initial state
    expect(photos.value).toHaveLength(0);
    expect(loading.value).toBe(false);
    expect(noMorePhotos.value).toBe(false);

    // Fetch photos
    await fetchPhotos();

    // Check state after fetching
    expect(photos.value).toHaveLength(10);
    expect(photos.value[0].id).toBe('1');
    expect(loading.value).toBe(false);
    expect(noMorePhotos.value).toBe(false);
  });

  it('handles no more photos scenario', async () => {
    const mockData = [
      { id: '1', description: 'A beautiful sunset', urls: { small: 'https://example.com/photo1.jpg' }, user: { name: 'John Doe' } }
    ];

    mock.onGet('https://ai.unsplash.com/photos').reply(200, mockData);

    const { photos, loading, fetchPhotos, noMorePhotos } = usePhotos();

    await fetchPhotos();
    await fetchPhotos(); // Try fetching again

    // Check state after trying to fetch more photos
    expect(photos.value).toHaveLength(1);
    expect(noMorePhotos.value).toBe(true);
    expect(loading.value).toBe(false);
  });

  it('handles fetch error', async () => {
    mock.onGet('https://ai.unsplash.com/photos').reply(500);

    const { photos, loading, fetchPhotos, noMorePhotos } = usePhotos();

    try {
      await fetchPhotos();
    } catch (e) {
      expect(e.message).toBe('Error fetching photos');
    }

    // Check state after error
    expect(photos.value).toHaveLength(0);
    expect(loading.value).toBe(false);
    expect(noMorePhotos.value).toBe(false);
  });
});
