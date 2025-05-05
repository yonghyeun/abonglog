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

// 이전/다음 글 조회를 위한 필드
const NEIGHBOR_ARTICLE_SELECT_FIELDS = `id, title`;

// 기존 fetchArticleById 함수 유지
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

const fetchPreviousArticle = (
  createdAt: string,
  seriesName: string | null, // seriesName 파라미터 추가
  status: "published" | "draft" | null
) => {
  const supabase = createBrowserSupabase();
  let query = supabase
    .from("articles")
    .select(NEIGHBOR_ARTICLE_SELECT_FIELDS)
    .lt("created_at", createdAt); // 현재 글보다 오래된 글

  // seriesName이 null이 아닐 경우에만 series_name 필터링 추가
  if (seriesName !== null) {
    query = query.eq("series_name", seriesName);
  } else {
    // seriesName이 null이면, series_name이 null인 글만 찾도록 함
    query = query.is("series_name", null);
  }

  query = query.order("created_at", { ascending: false }); // 최신 순으로 정렬

  // status가 null이 아닐 경우에만 status 필터링 추가
  const finalQuery = status !== null ? query.eq("status", status) : query;

  return finalQuery.limit(1).maybeSingle(); // 하나만 가져오거나 null 반환
};

const fetchNextArticle = (
  createdAt: string,
  seriesName: string | null, // seriesName 파라미터 추가
  status: "published" | "draft" | null
) => {
  const supabase = createBrowserSupabase();
  let query = supabase
    .from("articles")
    .select(NEIGHBOR_ARTICLE_SELECT_FIELDS)
    .gt("created_at", createdAt); // 현재 글보다 최신 글

  // seriesName이 null이 아닐 경우에만 series_name 필터링 추가
  if (seriesName !== null) {
    query = query.eq("series_name", seriesName);
  } else {
    // seriesName이 null이면, series_name이 null인 글만 찾도록 함
    query = query.is("series_name", null);
  }

  query = query.order("created_at", { ascending: true }); // 오래된 순으로 정렬

  // status가 null이 아닐 경우에만 status 필터링 추가
  const finalQuery = status !== null ? query.eq("status", status) : query;

  return finalQuery.limit(1).maybeSingle(); // 하나만 가져오거나 null 반환
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

  // 2. 이전 글과 다음 글 정보 병렬 조회
  const [{ data: prevArticleData }, { data: nextArticleData }] =
    await Promise.all([
      fetchPreviousArticle(
        currentArticle.createdAt,
        currentArticle.seriesName,
        status
      ),
      fetchNextArticle(
        currentArticle.createdAt,
        currentArticle.seriesName,
        status
      )
    ]);

  // 3. 현재 글 데이터 변환 (Markdown -> HTML 등)
  const transformedCurrentArticle = await transformArticleData(currentArticle);

  // 4. 최종 결과 조합
  return {
    ...transformedCurrentArticle,
    previousArticle: prevArticleData ? snakeToCamel(prevArticleData) : null,
    nextArticle: nextArticleData ? snakeToCamel(nextArticleData) : null
  };
};
