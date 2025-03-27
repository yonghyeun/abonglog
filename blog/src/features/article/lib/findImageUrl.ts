export const findImageUrl = (markdown: string) => {
  // 줄바꿈과 공백을 포함하여 매칭하도록 수정
  const regExp = /!\[(.*?)\]\(([\s\S]*?)\)/g;
  const matches = Array.from(markdown.matchAll(regExp));

  if (!matches.length) {
    return [];
  }

  return matches
    .map((match) => ({
      alt: match[1].trim(),
      // URL에서 줄바꿈과 공백 제거
      src: match[2].replace(/[\n\r\s]+/g, "")
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
