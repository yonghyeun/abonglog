import Image from "next/image";

interface ProfileProps {
  size: keyof typeof profileSizeMap;
}

const profileSizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16"
} as const;

export const Profile: React.FC<ProfileProps> = ({ size }) => (
  <div
    className={`${profileSizeMap[size]} relative overflow-hidden rounded-full`}
  >
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/profile.jpg"
      alt="프로필 이미지"
    />
  </div>
);
