import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: string;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 24,
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <use href={`/icons/sprite.svg#${icon}`} />
    </svg>
  );
};
