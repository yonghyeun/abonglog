import Image from "next/image";
import React from "react";

import { TagChip } from "@/entities/tag/ui";

interface ArticlePreviewCardProps {
  thumbnailUrl: string | null;
  tags: string[];
  seriesName: string;
  title: string;
  description: string;
  createdAt: string;
}

export const ArticlePreviewCard: React.FC<ArticlePreviewCardProps> = ({
  thumbnailUrl,
  tags,
  title,
  seriesName,
  description,
  createdAt
}) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-overlay transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:bg-surface-1">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-tertiary">
            <span className="text-4xl font-bold opacity-10">Logo</span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col justify-between p-5">
        <div className="flex flex-col gap-3">
          {/* Series & Title */}
          <div>
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-info">
              {seriesName}
            </span>
            <h3 className="line-clamp-2 text-heading-s font-bold text-primary transition-colors group-hover:text-info">
              {title}
            </h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagChip key={tag} className="pointer-events-none opacity-90">
                {tag}
              </TagChip>
            ))}
            {tags.length > 3 && (
              <span className="flex items-center text-xs text-tertiary">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="line-clamp-3 text-body-m text-secondary">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-caption text-tertiary">
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </article>
  );
};
