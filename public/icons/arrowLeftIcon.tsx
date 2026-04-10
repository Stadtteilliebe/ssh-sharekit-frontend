import { IconConfig } from "@/lib/iconConfig";

type ArrowLeftIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ArrowLeftIcon({
  size = IconConfig.size,
  strokeWidth = IconConfig.strokeWidth,
  className,
}: ArrowLeftIconProps) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}