import { IconConfig } from "@/lib/iconConfig";

type CheckIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function CheckIcon({
  size = IconConfig.size,
  strokeWidth = IconConfig.strokeWidth,
  className,
}: CheckIconProps) {
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
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}