import { create } from 'zustand';

export const useServicePlanStore = create((set) => ({
  servicePlan: [],

  setServicePlan: (plan) => set({ servicePlan: plan }),

  addItemToPlan: (item) =>
    set((state) => ({
      servicePlan: [...state.servicePlan, item],
    })),

  reorderItems: (newOrder) =>
    set(() => ({ servicePlan: newOrder })),

  updateSlideInstances: (itemId, newSlides) =>
    set((state) => ({
      servicePlan: state.servicePlan.map((item) =>
        item.id === itemId
          ? { ...item, slideInstances: newSlides }
          : item
      ),
    })),
}));
