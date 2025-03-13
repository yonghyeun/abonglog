const DEFAULT_OPTIONS = {
  quantity: 2 ** 20,
  quality: 0.8
};

type CompressImage = (
  file: File,
  options?: {
    /**
     * 이미지 압축 후 기대하는 파일 크기
     *
     * default : 1MB (2 ** 20)
     */
    quantity?: number;
    /**
     * 이미지 압축 품질
     *
     * default : 0.8
     */
    quality?: number;
  }
) => Promise<File>;

export const compressImage: CompressImage = async (file: File, _options) => {
  const options = {
    ...DEFAULT_OPTIONS,
    ..._options
  };

  if (file.size < options.quantity) {
    return file;
  }

  try {
    const url = await _readDataAsUrl(file);
    const image = await createImageElement(url);

    const ratio = Math.sqrt(options.quantity / file.size);
    const compressFileBlob = await imageToBlob(
      image,
      image.width * ratio,
      image.height * ratio
    );

    return new File([compressFileBlob], file.name, {
      type: compressFileBlob.type,
      lastModified: Date.now()
    });
  } catch (error) {
    console.error(error);
    return file;
  }
};

/**
 * 해당 메소드는 File 객체를 받아서 FileReader를 이용해 읽고
 * 메모리내에 저장된 이미지의 URL을 반환합니다.
 *
 * 콜백 기반으로 작성된 FileReader를 Promise 기반으로 작성하여
 * 사용하기 편하게 만들었습니다.
 */
const _readDataAsUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = () => {
      reject(new Error("파일을 읽는 도중 에러가 발생했습니다."));
    };
    fileReader.readAsDataURL(file);
  });
};

/**
 * 해당 메소드는 File 객체를 받아서 이미지 객체를 생성합니다.
 * 이미지 객체를 생성하는 도중 에러가 발생하면 에러를 반환합니다.
 *
 * 콜백 기반으로 작성된 Image 객체를 Promise 기반으로 작성하여
 * 사용하기 편하게 만들었습니다.
 */
const createImageElement = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error("이미지를 로드하는 도중 에러가 발생했습니다."));
    };
    image.src = url;
  });
};

/**
 * iamgeToBlob 은 HTMLImageElement를 받아서
 * canvas를 이용해 Blob 객체로 변환합니다.
 *
 * 콜백 기반으로 작성된 canvas.toBlob을 Promise 기반으로 작성하여
 * 사용하기 편하게 만들었습니다.
 */
const imageToBlob = (
  image: HTMLImageElement,
  width: number,
  height: number
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("canvas 2d context를 가져오는데 실패했습니다.");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return new Promise<Blob>((res, rej) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        rej(new Error("blob 생성에 실패했습니다."));
        return;
      }
      res(blob);
    });
  });
};
