interface ArticleListPageProps {
  searchParams: {
    series?: string;
  };
}

const ArticleListPage: React.FC<ArticleListPageProps> = async ({
  searchParams
}) => {
  const { series } = await searchParams;

  // 전체 게시글 보기인 경우
  if (!series) {
    return (
      <section className="media-padding-x flex h-screen flex-col">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-bright-blue">전체 게시글 보기</h1>
        </header>
        <main className="flex-grow border"></main>
      </section>
    );
  }

  // 시리즈 별로 모아보기인 경우

  return (
    <section className="media-padding-x flex h-screen flex-col">
      <header className="flex flex-col items-center justify-center">
        {series ? (
          <>
            <p className="text-gray-500">시리즈별로 모아보기</p>
            <h1 className="text-bright-blue">{series}</h1>
          </>
        ) : (
          <h1 className="text-bright-blue">전체 게시글 보기</h1>
        )}
      </header>
      <main className="flex-grow border"></main>
    </section>
  );
};

export default ArticleListPage;
