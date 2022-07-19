import React from "react";
import ContentLoader from "react-content-loader";

export const PizzaBlockSkeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f2f2f2"
      foregroundColor="#ecebeb"
    >
      <circle cx="143" cy="136" r="130" />
      <rect x="0" y="280" rx="5" ry="5" width="280" height="22" />
      <rect x="0" y="319" rx="5" ry="5" width="280" height="84" />
      <rect x="3" y="425" rx="5" ry="5" width="90" height="25" />
      <rect x="124" y="424" rx="10" ry="10" width="152" height="38" />
    </ContentLoader>
  );
};
