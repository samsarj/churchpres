import { create } from 'zustand';

export const useGlobalStore = create((set, get) => ({

  selectedLibraryItem: null,
  previewItem: null,
  liveItem: null,

  blank: false,
  setBlank: (blank) => {
    if (get().blank !== blank) {
      console.log('blank changed:', blank);
      set({ blank });
    }
  },
  
  clear: false,
  setClear: (clear) => {
    if (get().clear !== clear) {
      console.log('clear changed:', clear);
      set({ clear });
    }
  },

  previewSlideIndex: 0,
  liveSlideIndex: 0,

  setPreviewSlideIndex: (index) => {
    if (get().previewSlideIndex !== index) {
      console.log('previewSlideIndex changed:', index);
      set({ previewSlideIndex: index });
    }
  },
  setLiveSlideIndex: (index) => {
    if (get().liveSlideIndex !== index) {
      console.log('liveSlideIndex changed:', index);
      set({ liveSlideIndex: index });
    }
  },

  setPreviewItem: (item) => {
    if (get().previewItem !== item) {
      console.log('previewItem changed:', item);
      set({ previewItem: item, previewSlideIndex: 0 });
    }
  },
  setLiveItem: (item) => {
    if (get().liveItem !== item) {
      console.log('liveItem changed:', item);
      set({ liveItem: item, liveSlideIndex: 0 });
    }
  },
}));
