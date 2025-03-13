# Image Compression Library

## 개요

이 라이브러리는 이미지를 압축하여 파일 크기를 줄이는 기능을 제공합니다. `compressImage` 메소드는 주어진 이미지 파일을 압축하여 지정된 크기와 품질로 변환합니다.

## 메소드 흐름

### `compressImage` 메소드

1. **기본 옵션 설정**: `DEFAULT_OPTIONS`를 사용하여 기본 압축 옵션을 설정합니다.
2. **파일 크기 확인**: 주어진 파일의 크기가 지정된 `quantity`보다 작은 경우, 원본 파일을 반환합니다.
3. **이미지 URL 생성**: `_readDataAsUrl` 메소드를 사용하여 파일을 읽고, 메모리 내에 저장된 이미지의 URL을 생성합니다.
4. **이미지 객체 생성**: `createImageElement` 메소드를 사용하여 이미지 객체를 생성합니다.
5. **압축 비율 계산**: 지정된 `quantity`와 파일 크기를 기반으로 압축 비율을 계산합니다.
6. **이미지 압축**: `imageToBlob` 메소드를 사용하여 이미지 객체를 압축된 Blob 객체로 변환합니다.
7. **압축된 파일 생성**: 압축된 Blob 객체를 사용하여 새로운 `File` 객체를 생성하고 반환합니다.

### `_readDataAsUrl` 메소드

- **파일 읽기**: `FileReader`를 사용하여 파일을 읽고, 메모리 내에 저장된 이미지의 URL을 반환합니다.

### `createImageElement` 메소드

- **이미지 객체 생성**: 주어진 URL을 사용하여 이미지 객체를 생성합니다. 이미지 로드 중 에러가 발생하면 에러를 반환합니다.

### `imageToBlob` 메소드

- **Blob 객체 생성**: `canvas`를 사용하여 이미지 객체를 Blob 객체로 변환합니다. 변환 중 에러가 발생하면 에러를 반환합니다.

## 발생할 수 있는 문제

1. **메모리 사용량 증가**: 큰 이미지를 처리할 때 메모리 사용량이 증가할 수 있습니다. 이는 브라우저 환경에서 성능 문제를 일으킬 수 있습니다.
2. **이미지 로드 실패**: 이미지 로드 중 네트워크 문제나 파일 손상으로 인해 이미지 로드가 실패할 수 있습니다.
3. **Blob 생성 실패**: `canvas.toBlob` 메소드가 실패할 경우 Blob 객체 생성에 실패할 수 있습니다.

## 최적화 방법

1. **이미지 크기 제한**: 처리할 이미지의 최대 크기를 제한하여 메모리 사용량을 줄일 수 있습니다.
2. **Web Worker 사용**: 이미지 압축 작업을 Web Worker에서 수행하여 메인 스레드의 성능을 향상시킬 수 있습니다.
3. **압축 알고리즘 개선**: 더 효율적인 압축 알고리즘을 사용하여 이미지 품질을 유지하면서 파일 크기를 줄일 수 있습니다.
4. **에러 처리 개선**: 이미지 로드 및 Blob 생성 중 발생할 수 있는 에러를 더 세밀하게 처리하여 사용자 경험을 향상시킬 수 있습니다.

## 사용 예시

```typescript
import { compressImage } from "@/entities/image/lib/compressImage";

const handleImageUpload = async (file: File) => {
  try {
    const compressedFile = await compressImage(file, {
      quantity: 1 * 1024 * 1024,
      quality: 0.8
    });
    console.log("Compressed file:", compressedFile);
  } catch (error) {
    console.error("Error compressing image:", error);
  }
};
```
