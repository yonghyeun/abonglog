"use client";

import React, { useEffect, useState } from "react";

export const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScrollChange = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScrollChange);

    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  return (
    <div className="fixed top-0 h-1 w-full bg-primary">
      <div
        className="h-full origin-left transform bg-blue-500"
        style={{
          transform: `scaleX(${progress})`
        }}
      />
    </div>
  );
};
