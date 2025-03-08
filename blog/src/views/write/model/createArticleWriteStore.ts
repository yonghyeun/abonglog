import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

interface ArticleWriteStoreState {
  // step 1 state
  title: string;
  selectedTags: string[];
  selectedSereis: string;
  markdown: string;
  html: string;

  // step 2 state
  description: string;
  thumbnailUrl: string;
}

interface ArticleWriteStoreAction {
  setTitle: (title: string | ((state: string) => string)) => void;
  setSelectedTags: (tags: string[] | ((state: string[]) => string[])) => void;
  setSelectedSeries: (series: string | ((state: string) => string)) => void;
  setMarkdown: (markdown: string | ((state: string) => string)) => void;
  setDescription: (description: string | ((state: string) => string)) => void;
  setThumbnailUrl: (thumbnailUrl: string | ((state: string) => string)) => void;
  setHtml: (html: string | ((state: string) => string)) => void;
}

const ARTICLE_WRITE_INITIAL_STATE: ArticleWriteStoreState = {
  title: "",
  selectedTags: [],
  selectedSereis: "",
  markdown: "",
  description: "",
  thumbnailUrl: "",
  html: ""
};

export const createArticleWriteStore = (
  initialState?: Partial<ArticleWriteStoreState>
) => {
  return createStore<ArticleWriteStoreState & ArticleWriteStoreAction>(
    (set, get) => ({
      ...ARTICLE_WRITE_INITIAL_STATE,
      ...initialState,

      setTitle: (action) => {
        const newState =
          typeof action === "function" ? action(get().title) : action;
        set({ title: newState });
      },
      setSelectedTags: (action) => {
        const newState =
          typeof action === "function" ? action(get().selectedTags) : action;
        set({ selectedTags: newState });
      },
      setSelectedSeries: (action) => {
        const newState =
          typeof action === "function" ? action(get().selectedSereis) : action;
        set({ selectedSereis: newState });
      },
      setMarkdown: (action) => {
        const newState =
          typeof action === "function" ? action(get().markdown) : action;
        set({ markdown: newState });
      },
      setDescription: (action) => {
        const newState =
          typeof action === "function" ? action(get().description) : action;
        set({ description: newState });
      },
      setThumbnailUrl: (action) => {
        const newState =
          typeof action === "function" ? action(get().thumbnailUrl) : action;
        set({ thumbnailUrl: newState });
      },

      setHtml: (action) => {
        const newState =
          typeof action === "function" ? action(get().html) : action;
        set({ html: newState });
      }
    })
  );
};

type ArticleWriteStore = ReturnType<typeof createArticleWriteStore>;

export const ArticleWriteStoreContext = createContext<ArticleWriteStore | null>(
  null
);

export const useArticleWriteStore = <T>(
  selector: (state: ArticleWriteStoreState & ArticleWriteStoreAction) => T
) => {
  const store = useContext(ArticleWriteStoreContext);

  if (!store) {
    throw new Error("Cannot find ArticleWriteStoreContext");
  }

  return useStore(store, selector);
};
