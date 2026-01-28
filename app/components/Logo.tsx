import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'icon';
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ 
  variant = 'full', 
  width, 
  height,
  className = '' 
}: LogoProps) {
  if (variant === 'icon') {
    return (
      <Image
        src="/logo-icon.svg"
        alt="Fenstermann24 Logo"
        width={width || 48}
        height={height || 48}
        className={className}
        priority
      />
    );
  }

  return (
    <Image
      src="/logo.svg"
      alt="Fenstermann24 - Online-Konfigurator"
      width={width || 200}
      height={height || 60}
      className={className}
      priority
    />
  );
}
