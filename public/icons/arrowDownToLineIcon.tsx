import { IconConfig } from "@/lib/iconConfig";

type ArrowDownToLineIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ArrowDownToLineIcon({
  size = IconConfig.size,
  strokeWidth = IconConfig.strokeWidth,
  className,
}: ArrowDownToLineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 17V3" />
      <path d="m6 11 6 6 6-6" />
      <path d="M19 21H5" />
    </svg>
  );
}