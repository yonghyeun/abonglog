export const extractTagName = (articleTags: { tagName: string | null }[]) => {
  return articleTags
    .filter((tag): tag is { tagName: string } => tag.tagName !== null)
    .map(({ tagName }) => tagName);
};
