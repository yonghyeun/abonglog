import Image from "next/image";
import React from "react";

import { TagChip } from "@/entities/tag/ui";

interface ArticleRowCardProps {
  thumbnailUrl: string | null;
  tags: string[];
  seriesName: string;
  title: string;
  description: string;
  createdAt: string;
}

export const ArticleRowCard: React.FC<ArticleRowCardProps> = ({
  thumbnailUrl,
  tags,
  title,
  seriesName,
  description,
  createdAt
}) => {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-xl border border-default bg-overlay transition-all hover:border-brand-primary/50 hover:shadow-lg dark:bg-surface-1 sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface-2 sm:w-72">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={80}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-tertiary">
            <span className="text-4xl font-bold opacity-10">Logo</span>
          </div>
        )}
      </div>

      <div className="flex w-full flex-grow flex-col justify-between p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-secondary">
              {seriesName}
            </span>
            <time dateTime={createdAt} className="text-xs text-tertiary">
              {new Date(createdAt).toLocaleDateString()}
            </time>
          </div>
          
          <h3 className="line-clamp-2 text-heading-s font-bold text-primary transition-colors group-hover:text-brand-primary">
            {title}
          </h3>

          <p className="line-clamp-2 text-body-m text-secondary">
            {description}
          </p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <TagChip key={tag} className="scale-90 opacity-90">
                {tag}
              </TagChip>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
