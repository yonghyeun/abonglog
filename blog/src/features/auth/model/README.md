# features/auth/model

인증 관련 기능들을 관리하는 폴더입니다.

## 구조

```
auth/
├── model/          # 인증 관련 로직 및 상태 관리
│   ├── useLoginAction.ts    # 로그인 기능
│   └── useLogoutAction.ts   # 로그아웃 기능
```

## 주요 기능

### useLoginAction

- 사용자 로그인 처리
- 로그인 상태 및 에러 관리
- 로딩 상태 표시

### useLogoutAction

- 사용자 로그아웃 처리
- 로그아웃 후 홈페이지 리다이렉션
