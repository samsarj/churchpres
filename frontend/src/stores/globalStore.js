import { create } from 'zustand';
import socket from '../sockets/socket'; // adjust path to match

export const useGlobalStore = create((set, get) => ({

  // --- State
  selectedLibraryItem: null,
  previewItem: null,
  liveItem: null,
  blank: false,
  clear: false,
  previewSlideIndex: 0,
  liveSlideIndex: 0,

  // --- Setters (preview)
  setPreviewItem: (item) => {
    set({ previewItem: item, previewSlideIndex: 0 });
  },
  setPreviewSlideIndex: (index) => {
    set({ previewSlideIndex: index });
  },

  // --- Live setters with WebSocket emit
  setLiveItem: (item) => {
    const payload = { type: 'item', item };
    socket.emit('live:set', payload);
    set({ liveItem: item, liveSlideIndex: 0 });
  },
  setLiveSlideIndex: (index) => {
    const payload = { type: 'slideIndex', slideIndex: index };
    socket.emit('live:set', payload);
    set({ liveSlideIndex: index });
  },

  setBlank: (blank) => {
    socket.emit('live:set', { type: 'blank', blank });
    set({ blank });
  },
  setClear: (clear) => {
    socket.emit('live:set', { type: 'clear', clear });
    set({ clear });
  },

  // --- Init WebSocket listeners
  initLiveSync: () => {
    socket.on('live:update', (payload) => {
      // handle each type of update
      const { type } = payload;
      if (type === 'item') {
        set({ liveItem: payload.item, liveSlideIndex: 0 });
      } else if (type === 'slideIndex') {
        set({ liveSlideIndex: payload.slideIndex });
      } else if (type === 'blank') {
        set({ blank: payload.blank });
      } else if (type === 'clear') {
        set({ clear: payload.clear });
      }
    });

    // Get initial state
    socket.emit('live:get');
    socket.on('live:state', (state) => {
      set({ ...state });
    });
  },
}));
