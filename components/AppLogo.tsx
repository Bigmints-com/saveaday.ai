type AppColor = "blue" | "green" | "purple" | "orange" | "pink" | "indigo" | "teal";

interface AppLogoProps {
  appName: string;
  color: AppColor;
  icon?: string;
  size?: number;
}

const colorMap: Record<AppColor, string> = {
  blue: "#3b82f6",
  green: "#10b981",
  purple: "#a855f7",
  orange: "#f97316",
  pink: "#ec4899",
  indigo: "#6366f1",
  teal: "#14b8a6",
};

export default function AppLogo({ appName, color }: AppLogoProps) {
  const brandColor = colorMap[color] || colorMap.blue;

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 border border-gray-200 p-2"
      title={appName}
    >
      <svg width="100%" height="100%" viewBox="0 0 294 259" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M147 195.316C183.451 195.316 213 165.767 213 129.316C213 92.8656 183.451 63.3164 147 63.3164C110.549 63.3164 81 92.8656 81 129.316C81 165.767 110.549 195.316 147 195.316Z" stroke={brandColor} strokeWidth="33" />
        <path d="M279 144.316C287.284 144.316 294 137.601 294 129.316C294 121.032 287.284 114.316 279 114.316C270.716 114.316 264 121.032 264 129.316C264 137.601 270.716 144.316 279 144.316Z" fill={brandColor} />
        <path d="M213 258.629C221.284 258.629 228 251.913 228 243.629C228 235.345 221.284 228.629 213 228.629C204.716 228.629 198 235.345 198 243.629C198 251.913 204.716 258.629 213 258.629Z" fill={brandColor} />
        <path d="M81 258.629C89.2843 258.629 96 251.913 96 243.629C96 235.345 89.2843 228.629 81 228.629C72.7157 228.629 66 235.345 66 243.629C66 251.913 72.7157 258.629 81 258.629Z" fill={brandColor} />
        <path d="M15 144.316C23.2843 144.316 30 137.601 30 129.316C30 121.032 23.2843 114.316 15 114.316C6.71573 114.316 0 121.032 0 129.316C0 137.601 6.71573 144.316 15 144.316Z" fill={brandColor} />
        <path d="M81 30C89.2843 30 96 23.2843 96 15C96 6.71573 89.2843 0 81 0C72.7157 0 66 6.71573 66 15C66 23.2843 72.7157 30 81 30Z" fill={brandColor} />
        <path d="M213 30C221.284 30 228 23.2843 228 15C228 6.71573 221.284 0 213 0C204.716 0 198 6.71573 198 15C198 23.2843 204.716 30 213 30Z" fill={brandColor} />
      </svg>
    </div>
  );
}
