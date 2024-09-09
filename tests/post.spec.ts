// tests/PhotoCard.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import PhotoCard from '../src/components/posts/Post.vue'; // Adjust the import path as needed

describe('PhotoCard Component', () => {
  it('renders photo data correctly', () => {
    const photo = {
      urls: {
        small: 'https://example.com/photo.jpg'
      },
      user: {
        name: 'Jane Doe'
      },
      description: 'A beautiful sunset',
      alt_description: 'Sunset'
    };

    const wrapper = mount(PhotoCard, {
      props: {
        photo,
        loading: false,
        noMorePhotos: false
      }
    });

    // Check if image is rendered correctly
    const img = wrapper.find('v-img');
    expect(img.attributes('src')).toBe(photo.urls?.small);

    // Check if title and subtitle are rendered correctly
    const listItem = wrapper.find('v-list-item');
    expect(listItem.attributes('title')).toBe(photo.description);
    expect(listItem.attributes('subtitle')).toBe(photo.user.name);
  });

  it('shows alert when noMorePhotos is true and loading is false', () => {
    const wrapper = mount(PhotoCard, {
      props: {
        photo: {},
        loading: false,
        noMorePhotos: true
      }
    });

    const alert = wrapper.find('v-alert');
    expect(alert.exists()).toBe(true);
    expect(alert.text()).toBe('No more photos to load.');
  });

  it('does not show alert when loading is true', () => {
    const wrapper = mount(PhotoCard, {
      props: {
        photo: {},
        loading: true,
        noMorePhotos: true
      }
    });

    const alert = wrapper.find('v-alert');
    expect(alert.exists()).toBe(false);
  });

  it('does not show alert when noMorePhotos is false', () => {
    const wrapper = mount(PhotoCard, {
      props: {
        photo: {},
        loading: false,
        noMorePhotos: false
      }
    });

    const alert = wrapper.find('v-alert');
    expect(alert.exists()).toBe(false);
  });
});
