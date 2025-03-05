import { ImageGrid } from "./ImageGrid";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

// 샘플 이미지 데이터
const sampleImages = [
  { src: "https://picsum.photos/id/1018/300/200", alt: "산과 호수 풍경" },
  { src: "https://picsum.photos/id/1015/300/200", alt: "강과 숲" },
  { src: "https://picsum.photos/id/1019/300/200", alt: "도시 전경" },
  { src: "https://picsum.photos/id/1016/300/200", alt: "산 정상" },
  { src: "https://picsum.photos/id/1020/300/200", alt: "곰" },
  { src: "https://picsum.photos/id/1021/300/200", alt: "안개 낀 숲" }
];

const meta: Meta<typeof ImageGrid> = {
  title: "Entities/Image/ImageGrid",
  component: ImageGrid,
  parameters: {
    docs: {
      description: {
        component: `
## 개요
\`ImageGrid\` 컴포넌트는 이미지 목록을 그리드 형태로 표시하는 합성 컴포넌트(Compound Component)입니다.
\`ImageGrid.Title\`, \`ImageGrid.Container\`, \`ImageGrid.Item\` 하위 컴포넌트로 구성됩니다.

## 사용 예시

\`\`\`tsx
import { ImageGrid } from '@/entities/image/ui/ImageGrid';

const MyComponent = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <ImageGrid>
      <ImageGrid.Title>이미지 갤러리</ImageGrid.Title>
      <ImageGrid.Container gridCols={3}>
        {images.map((image) => (
          <ImageGrid.Item 
            key={image.src} 
            image={image} 
            selectedImageUrl={selectedImage}
            onSelectImage={setSelectedImage}
          />
        ))}
      </ImageGrid.Container>
    </ImageGrid>
  );
};
\`\`\`
`
      }
    }
  },
  argTypes: {
    className: {
      control: "text",
      description: "최상위 컨테이너에 적용할 추가 CSS 클래스"
    }
  }
};

export default meta;

type Story = StoryObj<typeof ImageGrid>;

// 기본 스토리 - useState 적용
export const Default: Story = {
  render: () => {
    // useState를 사용한 내부 컴포넌트
    const MockImageGrid = () => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      const handleSelectImage = (src: string) => {
        setSelectedImage(src);
        action("이미지 선택")(src);
      };

      return (
        <div style={{ width: "600px" }}>
          <ImageGrid>
            <ImageGrid.Title>
              {selectedImage
                ? `선택된 이미지: ${selectedImage.split("/").pop()}`
                : "이미지를 선택해주세요"}
            </ImageGrid.Title>
            <ImageGrid.Container>
              {sampleImages.map((image) => (
                <ImageGrid.Item
                  key={image.src}
                  image={image}
                  selectedImageUrl={selectedImage}
                  onSelectImage={handleSelectImage}
                />
              ))}
            </ImageGrid.Container>
          </ImageGrid>
        </div>
      );
    };

    return <MockImageGrid />;
  }
};

// 다양한 그리드 열 옵션 - useState 적용
export const DifferentGridColumns: Story = {
  render: () => {
    const MockGridColumns = () => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      const handleSelectImage = (src: string) => {
        setSelectedImage(src);
        action("이미지 선택")(src);
      };

      return (
        <div style={{ width: "800px" }}>
          <ImageGrid>
            <ImageGrid.Title>
              {selectedImage
                ? `선택된 이미지: ${selectedImage.split("/").pop()}`
                : "이미지를 선택해주세요"}
            </ImageGrid.Title>

            <ImageGrid.Title className="mt-4">2열 그리드</ImageGrid.Title>
            <ImageGrid.Container gridCols={2}>
              {sampleImages.slice(0, 4).map((image) => (
                <ImageGrid.Item
                  key={image.src}
                  image={image}
                  selectedImageUrl={selectedImage}
                  onSelectImage={handleSelectImage}
                />
              ))}
            </ImageGrid.Container>

            <ImageGrid.Title className="mt-8">4열 그리드</ImageGrid.Title>
            <ImageGrid.Container gridCols={4}>
              {sampleImages.map((image) => (
                <ImageGrid.Item
                  key={image.src}
                  image={image}
                  selectedImageUrl={selectedImage}
                  onSelectImage={handleSelectImage}
                />
              ))}
            </ImageGrid.Container>
          </ImageGrid>
        </div>
      );
    };

    return <MockGridColumns />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`gridCols` 속성을 사용하여 그리드 열 수를 조정할 수 있습니다. 2, 3, 4, 5열 옵션을 제공합니다."
      }
    }
  }
};

// 이미지 선택 기능이 있는 스토리 - 기존 코드 유지
export const WithImageSelection: Story = {
  render: () => {
    const ImageGridWithSelection = () => {
      const [selectedImage, setSelectedImage] = useState<string | null>(
        sampleImages[0].src
      );

      return (
        <div style={{ width: "600px" }}>
          <ImageGrid>
            <ImageGrid.Title>
              선택된 이미지: {selectedImage?.split("/").pop()}
            </ImageGrid.Title>
            <ImageGrid.Container gridCols={3}>
              {sampleImages.map((image) => (
                <ImageGrid.Item
                  key={image.src}
                  image={image}
                  selectedImageUrl={selectedImage}
                  onSelectImage={setSelectedImage}
                />
              ))}
            </ImageGrid.Container>
          </ImageGrid>
        </div>
      );
    };

    return <ImageGridWithSelection />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "이미지를 클릭하면 선택된 이미지가 하이라이트됩니다. `selectedImageUrl`과 `onSelectImage` props를 통해 선택 상태를 관리합니다."
      }
    }
  }
};

// 커스텀 스타일링을 적용한 스토리 - useState 적용
export const CustomStyling: Story = {
  render: () => {
    const StyledImageGrid = () => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      const handleSelectImage = (src: string) => {
        setSelectedImage(src);
        action("이미지 선택")(src);
      };

      return (
        <div style={{ width: "700px" }}>
          <ImageGrid className="rounded-lg bg-gray-100 p-4">
            <ImageGrid.Title className="mb-4 font-bold text-gray-700">
              {selectedImage
                ? `선택된 이미지: ${selectedImage.split("/").pop()}`
                : "커스텀 스타일 갤러리"}
            </ImageGrid.Title>
            <ImageGrid.Container className="rounded bg-white p-3 shadow-sm">
              {sampleImages.slice(0, 3).map((image) => (
                <ImageGrid.Item
                  key={image.src}
                  image={image}
                  selectedImageUrl={selectedImage}
                  onSelectImage={handleSelectImage}
                  className="overflow-hidden rounded-lg shadow transition-shadow hover:shadow-md"
                />
              ))}
            </ImageGrid.Container>
          </ImageGrid>
        </div>
      );
    };

    return <StyledImageGrid />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "각 컴포넌트는 `className` 속성을 통해 커스텀 스타일을 적용할 수 있습니다."
      }
    }
  }
};
