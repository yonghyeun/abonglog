import { PropsWithChildren } from "react";

const ArticleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="media-padding-x flex min-h-screen flex-col">
      {children}
    </section>
  );
};

export default ArticleLayout;
