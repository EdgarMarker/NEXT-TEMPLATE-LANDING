import React from "react";
import type { AmenityModel } from "@/app/_domain/model/home-page.model";
import type { IconPackage } from "@/app/_domain/module.interface";
import { lucideMap } from "@/app/common/utils/helper-icon";
import ResponsiveImage from "./ResponsiveImage";

interface IconProps {
  data: AmenityModel;
  iconPackage: IconPackage;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

const Icon = ({
  data,
  iconPackage,
  size = 50,
  strokeWidth = 1,
  className,
  color = "var(--color-secondary)",
}: IconProps) => {
  const LucideIcon = lucideMap[data.iconName];

  const iconVariants = {
    lucide: LucideIcon ? (
      <LucideIcon
        color={color}
        size={size}
        strokeWidth={strokeWidth}
        className={className}
      />
    ) : null,
    custom: <ResponsiveImage imageData={data?.customIcon} />,
  };

  return iconVariants[iconPackage];
};

export default Icon;
