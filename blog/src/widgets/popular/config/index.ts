import type { PopularSearchParams } from "@/widgets/types";

export const popularPostNavData: {
  name: string;
  value: PopularSearchParams;
}[] = [
  { name: "일간", value: "daily" },
  {
    name: "주간",
    value: "weekly"
  },
  { name: "월간", value: "monthly" }
];
