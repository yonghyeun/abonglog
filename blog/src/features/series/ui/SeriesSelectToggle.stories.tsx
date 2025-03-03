import { SeriesSelectToggle } from "./SeriesSelectToggle";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Series } from "@/entities/series/model";

const meta: Meta<typeof SeriesSelectToggle> = {
  title: "features/series/SeriesSelectToggle",
  component: SeriesSelectToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 개요
\`SeriesSelectToggle\` 컴포넌트는 시리즈 목록을 관리하고 편집하기 위한 UI 컴포넌트입니다.
사용자가 시리즈를 검색하거나 추가할 수 있으며, 선택된 시리즈 목록을 관리합니다.

내부에서 사용되는 데이터와 비즈니스 로직은 모두 외부에서 주입받는 비제어 컴포넌트입니다.

## 사용 예시 

\`\`\`tsx
import { SeriesSelectToggle } from '@/features/series/ui/SeriesSelectToggle';
import { useState } from 'react';

const MockSeriesSelectToggle = () => {
  const [series, setSeries] = useState<Series[]>([
    { id: 1, name: "JavaScript", created_at: new Date().toISOString() },
    { id: 2, name: "TypeScript", created_at: new Date().toISOString() },
    { id: 3, name: "React", created_at: new Date().toISOString() }
  ]);

  const handleSeriesClick = (series: Series) => {
    console.log("Clicked series:", series);
  };

  const handleAddNewSeries = (seriesName: string) => {
    const newSeries = {
      id: series.length + 1,
      name: seriesName,
      created_at: new Date().toISOString()
    };
    setSeries([...series, newSeries]);
  };

  return (
    <SeriesSelectToggle
      series={series}
      onEachSeriesClick={handleSeriesClick}
      onAddNewSeries={handleAddNewSeries}
    />
  );
};
\`\`\`

## 주요 기능
- 시리즈 검색 및 선택
- 선택된 시리즈 외부에서 주입 받은 액션 수행
- 새로운 시리즈 추가 버튼 눌릴 시 외부에서 주입 받은 액션 수행
`
      }
    }
  },
  argTypes: {
    series: {
      description: "현재 선택된 시리즈 목록",
      control: {
        type: "object"
      }
    },
    onEachSeriesClick: {
      description:
        "시리즈 클릭 시 호출되는 함수. 클릭된 시리즈 객체를 인자로 받습니다.",
      action: "clicked"
    },
    onAddNewSeries: {
      description:
        "새 시리즈 추가 시 호출되는 함수. 시리즈 이름을 인자로 받습니다.",
      action: "added"
    }
  }
};

export default meta;

const MockSeriesSelectToggle = () => {
  const [series, setSeries] = useState<Series[]>([
    { id: 1, name: "JavaScript", created_at: new Date().toISOString() },
    { id: 2, name: "TypeScript", created_at: new Date().toISOString() },
    { id: 3, name: "React", created_at: new Date().toISOString() }
  ]);

  const handleSeriesClick = (series: Series) => {
    console.log("Clicked series:", series);
  };

  const handleAddNewSeries = (seriesName: string) => {
    const newSeries = {
      id: series.length + 1,
      name: seriesName,
      created_at: new Date().toISOString()
    };
    setSeries([...series, newSeries]);
  };

  return (
    <div className="relative w-screen">
      <SeriesSelectToggle
        series={series}
        onEachSeriesClick={handleSeriesClick}
        onAddNewSeries={handleAddNewSeries}
      />
    </div>
  );
};

export const Default: StoryObj<typeof SeriesSelectToggle> = {
  render: () => <MockSeriesSelectToggle />
};
