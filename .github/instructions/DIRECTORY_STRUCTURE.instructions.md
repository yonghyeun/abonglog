---
applyTo: "**/src/**/*"
---

# Directory Structure & Architecture Guidelines

> **Philosophy:** 우리는 **Feature-based Vertical Slicing** 아키텍처를 채택함.
> **Goal:** 높은 응집도(Cohesion)와 낮은 결합도(Coupling)를 유지하여 유지보수성과 확장성을 확보함.

## 1. Top-Level Structure (src/ Root)

모든 Next.js 애플리케이션(`apps/*`)의 `src` 폴더는 다음 3가지 핵심 영역으로 구분됨.

```bash
src/
├── app/             # [Routing Layer] Next.js App Router (Page, Layout, Route only)
├── features/        # [Vertical Slices] 기능 단위 모듈 (핵심 비즈니스 로직)
└── shared/          # [Shared Kernel] 전역 공유 리소스 (UI, Lib, Global Domain)
```

## 2. Feature Structure (`src/features/*`)

각 기능(Feature)은 독립적인 '작은 애플리케이션'처럼 구성되며, 내부에서 4-Layer Architecture를 구현함.

### 2.1. Anatomy of a Feature
하나의 Feature(예: `src/features/auth`)는 다음 구조를 가짐.

```bash
src/features/auth/
├── api/             # [Optional] Route Handlers (필요 시)
├── domain/          # [Domain Layer] 순수 비즈니스 로직, 타입, 스키마 (feature-specific)
├── server/          # [App & Persistence Layer] Server Actions, Services, Repositories
├── client/          # [Presentation Layer] UI Components, Hooks, State
└── index.ts         # [Public API] 외부로 노출할 모듈 정의 (Barrel File)
```

### 2.2. Layer Rules (계층 규칙)
- **domain/**: 외부 의존성(DB, UI Library) 없음. 순수 TypeScript/Zod 코드만 존재.
- **server/**: DB(`supabase`) 접근 가능. `client` 코드 import 금지.
- **client/**: React Component 존재. `server` 코드는 오직 `import type` 또는 Server Action 호출로만 사용.

### 2.3. Internal Structure Rules (내부 폴더 구조)

#### server/ (Backend Logic)
- **actions.ts:** Server Actions (Next.js) 정의. 클라이언트에서 직접 호출됨.
- **services/**: 복잡한 비즈니스 로직 조합 및 트랜잭션 관리.
- **repositories/**: DB 접근 로직 (ORM/Query Builder). Service가 호출함.
- **dtos/**: Data Transfer Object 정의 (Input/Output 검증).

#### client/ (Frontend Logic)
- **components/**: 해당 Feature 전용 UI 컴포넌트.
- **hooks/**: React Custom Hooks (View Logic).
- **stores/**: Client-side State Management (Zustand 등).
- **views/**: Page 컴포넌트에서 조합해서 쓸 거대한 단위의 화면(Section) 컴포넌트.

## 3. Handling Domain Models (Global vs Local)

도메인 모델의 성격에 따라 위치를 엄격히 구분하여 관리함.

### 3.1. Local Domain (`src/features/{name}/domain`)
- **정의:** 특정 기능(Feature) 내부에서만 사용되거나 의미가 있는 모델.
- **예시:** `PasswordResetToken`(인증), `CartItem`(장바구니), `ArticleDraft`(글쓰기).
- **위치:** `src/features/{feature-name}/domain/*.ts`
- **접근:** 해당 Feature 내부에서만 참조 권장.

### 3.2. Global Domain (`src/shared/domains`)
- **정의:** 여러 Feature가 공통으로 참조하며, 시스템 전반에 걸쳐 식별자(Identity)를 공유하는 핵심 모델.
- **예시:** `User`(사용자 계정), `Workspace`(워크스페이스), `Permission`(권한).
- **위치:** `src/shared/domains/{model-name}/*.ts`
- **접근:** 모든 Feature에서 접근 가능.

## 4. Dependency Rules (의존성 규칙)

1.  **App -> Feature:** `src/app`은 `src/features`를 import 하여 페이지를 조립함.
2.  **Feature -> Shared:** Feature는 `src/shared`를 자유롭게 사용 가능.
3.  **Feature -> Feature (Restricted):**
    - 원칙적으로 다른 Feature의 내부(`server`, `client` deep path)에 직접 접근 금지.
    - 반드시 `index.ts`를 통해 노출된 Public API만 사용.
    - *Note:* 최대한 결합도를 낮추기 위해 직접 참조보다는 URL 라우팅이나 이벤트 방식을 선호함.
4.  **Shared -> Feature (Forbidden):** `src/shared`는 절대 `src/features`를 의존할 수 없음. (순환 참조 방지)
