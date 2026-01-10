import { GithubIcon, HumanIcon } from "@/shared/config";
import { Container } from "@/shared/ui/layout";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-default bg-app py-12 text-tertiary">
      <Container variant="listing">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex-grow space-y-2">
            <h3 className="text-body-l font-bold text-primary">abonglog</h3>
            <p className="text-body-m">
              공부한 내용을 기록하고 함께 성장하고 싶어 만든 두 번째
              블로그입니다.
              <br />
              주로 웹개발과 관련된 내용을 포스팅합니다.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-2">
            <a
              href="https://github.com/yonghyeun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body-m transition-colors hover:text-primary"
            >
              <GithubIcon className="h-5 w-5" />
              Github
            </a>
            <a
              href="mailto:ttddcc119@naver.com"
              className="flex items-center gap-2 text-body-m transition-colors hover:text-primary"
            >
              <HumanIcon className="h-5 w-5" />
              ttddcc119@naver.com
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-caption italic text-quaternary">
          © {new Date().getFullYear()} abonglog All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
