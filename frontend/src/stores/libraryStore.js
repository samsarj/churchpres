import { create } from 'zustand';
import socket from '../sockets/socket';
import * as libraryAPI from '../api/library';

export const useLibraryStore = create((set) => ({
  items: [],
  loading: false,

  fetchItems: async () => {
    set({ loading: true });
    console.log('Fetching library items...');
    const response = await libraryAPI.fetchLibraryItems();
    const items = response.data; // Use the data object from the API response
    set({ items, loading: false });
    console.log('Fetched library items:', items);
  },

  addItem: async (item) => {
    const response = await libraryAPI.createLibraryItem(item);
    const newItem = response.data; // Use the data object from the API response
    set((state) => ({ items: [...state.items, newItem] }));
    socket.emit('library:item-added', newItem);
  },

  updateSlide: async (libraryId, slideId, newLyrics) => {
    // 1. Call API
    const response = await libraryAPI.updateSlide(libraryId, slideId, newLyrics);
    const updatedItem = response.data; // Use the data object from the API response

    // 2. Update local state
    set(state => ({
      items: state.items.map(item =>
        item._id === libraryId
          ? updatedItem
          : item
      )
    }));

    // 3. Emit via WebSocket
    socket.emit('library:updateSlide', {
      libraryId,
      slideId,
      newLyrics
    });
  },

  initSocketListeners: () => {
    socket.on('library:item-added', (item) => {
      set((state) => ({ items: [...state.items, item] }));
    });

    socket.on('library:item-updated', (updatedItem) => {
      set((state) => ({
        items: state.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        ),
      }));
    });
  }
}));
