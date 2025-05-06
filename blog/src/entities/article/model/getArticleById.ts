import { parsingHeadings, rehypeMarkdown } from "../lib";
import { extractTagName } from "./utils";

import { createBrowserSupabase } from "@/shared/lib";
import { snakeToCamel } from "@/shared/util";

const ARTICLE_SELECT_FIELDS = `
  id , title , author ,
  series_name , description ,
  status , created_at, thumbnail_url,
  content, article_tags(tag_name)
`;

const fetchArticleById = (
  articleId: number,
  status: "published" | "draft" | null
) => {
  const supabase = createBrowserSupabase();

  const query = supabase
    .from("articles")
    .select(ARTICLE_SELECT_FIELDS)
    .eq("id", articleId);

  // status가 null이 아닐 경우에만 status 필터링 추가
  const finalQuery = status !== null ? query.eq("status", status) : query;

  return finalQuery.single();
};

const transformArticleData = async <
  T extends {
    content: string;
    articleTags: { tagName: string | null }[];
    createdAt: string;
  }
>(
  data: T
) => {
  const html = await rehypeMarkdown(data.content);
  const headings = parsingHeadings(data.content);

  return {
    html,
    headings,
    tags: extractTagName(data.articleTags),
    ...data
  };
};

export const getArticleById = async (
  articleId: string,
  status: "published" | "draft" | null
) => {
  // 1. 현재 글 정보 조회
  const { data: currentArticleData, error: currentArticleError } =
    await fetchArticleById(Number(articleId), status);

  if (currentArticleError || !currentArticleData) {
    // 에러 처리 또는 글이 없는 경우 처리
    console.error("Error fetching current article:", currentArticleError);
    throw currentArticleError || new Error("Article not found");
  }

  const currentArticle = snakeToCamel(currentArticleData);

  // 2. 현재 글 데이터 변환 (Markdown -> HTML 등)
  const transformedCurrentArticle = await transformArticleData(currentArticle);

  // 3. 최종 결과 조합
  return {
    ...transformedCurrentArticle
  };
};
