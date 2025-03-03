export const findImageUrl = (markdown: string) => {
  // ![]() 로 시작하는 모든 문구 찾기
  const regExp = /!\[.*?\]\(.*?\)/g;
  const matches = markdown.match(regExp);

  if (!matches) {
    return [];
  }

  // [] 안에 있는 alt, () 안에 있는 url 추출
  return matches
    .map((text) => ({
      src: (text.match(/\((.*?)\)/) || [])[1]!,
      alt: (text.match(/\[(.*?)\]/) || [])[1]!
    }))
    .reduce(
      (result, image) => {
        if (result.some((item) => item.src === image.src)) {
          return result;
        }
        return [...result, image];
      },
      [] as { src: string; alt: string }[]
    );
};
