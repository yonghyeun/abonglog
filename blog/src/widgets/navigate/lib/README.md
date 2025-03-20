# useSidebar Custom Hook

사이드바의 열림/닫힘 상태를 관리하고 외부 클릭 이벤트를 처리하는 커스텀 훅입니다.

## 반환값

- `isOpen`: (boolean) 사이드바의 현재 열림/닫힘 상태
- `handleOpenSidebar`: (function) 사이드바를 여는 함수
- `handleCloseSidebar`: (function) 사이드바를 닫는 함수
- `sideBarRef`: (RefObject) 사이드바 DOM 요소에 대한 참조

## 주요 기능

1. 사이드바 상태 관리

   - useState를 사용하여 사이드바의 열림/닫힘 상태를 관리합니다.

2. 외부 클릭 감지
   - useEffect와 이벤트 리스너를 사용하여 사이드바 외부 클릭을 감지합니다.
   - 사이드바 외부 클릭 시 자동으로 닫힙니다.

## 사용 예시

```typescript
const { isOpen, handleOpenSidebar, handleCloseSidebar, sideBarRef } = useSidebar();

return (
  <div ref={sideBarRef}>
    <button onClick={handleOpenSidebar}>Open</button>
    {isOpen && <SidebarContent />}
  </div>
);
```
