import { IconConfig } from "@/lib/iconConfig";

type XIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function XIcon({
  size = IconConfig.size,
  strokeWidth = IconConfig.strokeWidth,
  className,
}: XIconProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}