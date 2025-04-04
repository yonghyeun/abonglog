import { create } from "zustand";

export interface NotifyData {
  id: string;
  type: "error" | "success" | "info";
  text: string;
}

interface NotifyState {
  topLeftQueue: NotifyData[];
  topRightQueue: NotifyData[];
  bottomLeftQueue: NotifyData[];
  bottomRightQueue: NotifyData[];
}

interface NotifyActions {
  topLeft: {
    add: (data: NotifyData) => void;
    remove: (data: NotifyData) => void;
  };
  topRight: {
    add: (data: NotifyData) => void;
    remove: (data: NotifyData) => void;
  };
  bottomLeft: {
    add: (data: NotifyData) => void;
    remove: (data: NotifyData) => void;
  };
  bottomRight: {
    add: (data: NotifyData) => void;
    remove: (data: NotifyData) => void;
  };
}

const initialState: NotifyState = {
  topLeftQueue: [],
  topRightQueue: [],
  bottomLeftQueue: [],
  bottomRightQueue: []
};

export const useNotifyStore = create<NotifyState & NotifyActions>((set) => ({
  ...initialState,

  topLeft: {
    add: (data) =>
      set((state) => ({ topLeftQueue: [...state.topLeftQueue, data] })),
    remove: (data) =>
      set((state) => ({
        topLeftQueue: state.topLeftQueue.filter((item) => item.id !== data.id)
      }))
  },

  topRight: {
    add: (data) =>
      set((state) => ({ topRightQueue: [...state.topRightQueue, data] })),
    remove: (data) =>
      set((state) => ({
        topRightQueue: state.topRightQueue.filter((item) => item.id !== data.id)
      }))
  },

  bottomLeft: {
    add: (data) =>
      set((state) => ({ bottomLeftQueue: [data, ...state.bottomLeftQueue] })),
    remove: (data) =>
      set((state) => ({
        bottomLeftQueue: state.bottomLeftQueue.filter(
          (item) => item.id !== data.id
        )
      }))
  },

  bottomRight: {
    add: (data) =>
      set((state) => ({
        bottomRightQueue: [data, ...state.bottomRightQueue]
      })),
    remove: (data) =>
      set((state) => ({
        bottomRightQueue: state.bottomRightQueue.filter(
          (item) => item.id !== data.id
        )
      }))
  }
}));
