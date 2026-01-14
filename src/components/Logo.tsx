import { Link } from 'react-router-dom';

export const Logo = ({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) => {
  const sizeClasses = {
    sm: "h-6",
    default: "h-8 md:h-10",
    lg: "h-12"
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo-9n.png"
        alt="Nine Hub Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
      <div className="flex flex-col">
        <span className="text-base md:text-lg font-bold leading-none">Nine Hub</span>
        <span className="text-[10px] md:text-xs text-muted-foreground leading-none">Tools</span>
      </div>
    </Link>
  );
};
