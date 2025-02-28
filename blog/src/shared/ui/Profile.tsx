import Image, { ImageProps } from "next/image";

interface ProfileProps extends ImageProps {
  size: keyof typeof profileSizeMap;
}

const profileSizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16"
} as const;

export const Profile: React.FC<ProfileProps> = ({
  size,
  src,
  alt,
  ...props
}) => {
  return (
    <div
      className={`${profileSizeMap[size]} relative overflow-hidden rounded-full`}
    >
      <Image
        width={48}
        height={48}
        className="object-cover"
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
};
