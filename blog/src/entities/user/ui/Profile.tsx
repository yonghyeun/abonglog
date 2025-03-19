import React from "react";

interface ProfileProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
    <picture
      className={`${profileSizeMap[size]} relative overflow-hidden rounded-full`}
    >
      <img
        className="object-cover"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </picture>
  );
};

export const AdminProfile: React.FC<Pick<ProfileProps, "size">> = ({
  size
}) => {
  return <Profile size={size} src="/images/profile.jpg" alt="프로필 이미지" />;
};
