import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

interface ArticleWriteStoreState {
  // step 1 state
  title: string;
  tags: string[];
  seriesName: string;
  content: string;
  html: string;
  articleId: number;

  // step 2 state
  description: string;
  thumbnailUrl: string | null;

  // util state
  isPreviewNeedScroll: boolean;
}

interface ArticleWriteStoreAction {
  setTitle: (title: string | ((state: string) => string)) => void;
  setTags: (tags: string[] | ((state: string[]) => string[])) => void;
  setSeriesName: (series: string | ((state: string) => string)) => void;
  setContent: (content: string | ((state: string) => string)) => void;
  setDescription: (description: string | ((state: string) => string)) => void;
  setThumbnailUrl: (
    thumbnailUrl: (string | null) | ((state: string | null) => string)
  ) => void;
  setHtml: (html: string | ((state: string) => string)) => void;

  setisPreviewNeedScroll: (
    isPreviewNeedScroll: boolean | ((state: boolean) => boolean)
  ) => void;
}

const ARTICLE_WRITE_INITIAL_STATE: ArticleWriteStoreState = {
  title: "",
  tags: [],
  seriesName: "",
  content: "",
  description: "",
  thumbnailUrl: null,
  html: "",
  articleId: 0,
  isPreviewNeedScroll: true
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
      setTags: (action) => {
        const newState =
          typeof action === "function" ? action(get().tags) : action;
        set({ tags: newState });
      },
      setSeriesName: (action) => {
        const newState =
          typeof action === "function" ? action(get().seriesName) : action;
        set({ seriesName: newState });
      },
      setContent: (action) => {
        const newState =
          typeof action === "function" ? action(get().content) : action;
        set({ content: newState });
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
      },
      setisPreviewNeedScroll: (action) => {
        const newState =
          typeof action === "function"
            ? action(get().isPreviewNeedScroll)
            : action;
        set({ isPreviewNeedScroll: newState });
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
