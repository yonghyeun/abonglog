"use client";

import React, { useEffect, useState } from "react";

export const ProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleProgress = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleProgress);

    return () => {
      window.removeEventListener("scroll", handleProgress);
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
