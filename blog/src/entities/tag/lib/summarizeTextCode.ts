import { map, pipe, reduce } from "@fxts/core";

export const summarizeTextCode = (text: string) => {
  // reduce에 들어온 iterator 의 첫 번째 값이 done 인 경우 의도적으로 에러를 던지도록
  // 라이브러리가 설계 되었다.
  // 이 에러를 잡아내기 위해 try-catch 로 감싸준다.
  // reference : https://github.com/marpple/FxTS/issues/235
  // 2025.03.31 하지만 이 방법이 최선인지 잘 모르겠다.
  try {
    return pipe(
      text,
      map((char) => char.charCodeAt(0)),
      reduce((acc, cur) => acc + cur)
    );
  } catch {
    return 0;
  }
};
