// Official brand logos as inline SVGs — clean monochrome versions for dark background
import Image from 'next/image';

interface LogoProps {
  height?: number;
  className?: string;
}

export function AWSLogo({ height = 28, className }: LogoProps) {
  return (
    <Image src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" width={100} height={height} className={className} style={{ filter: 'brightness(0) invert(1) opacity(0.85)', objectFit: 'contain' }} unoptimized />
  );
}

export function GoogleLogo({ height = 24, className }: LogoProps) {
  return (
    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" width={80} height={height} className={className} style={{ objectFit: 'contain' }} unoptimized />
  );
}

export function MicrosoftLogo({ height = 24, className }: LogoProps) {
  return (
    <Image src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" width={100} height={height} className={className} style={{ objectFit: 'contain' }} unoptimized />
  );
}

export function PhilipsLogo({ height = 26, className }: LogoProps) {
  return (
    <svg height={height} viewBox="0 0 110 30" fill="none" className={className} aria-label="Philips">
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="'Arial', sans-serif" fontSize="22" fontWeight="700" fill="#0b5ed7" letterSpacing="1.5">PHILIPS</text>
    </svg>
  );
}

export function NvidiaLogo({ height = 22, className }: LogoProps) {
  return (
    <svg height={height} viewBox="0 0 120 30" fill="none" className={className} aria-label="NVIDIA">
      <path d="M14.2 6.8v2.1C9.8 7.7 6.3 10 5.1 13.7c-1.5 4.5 1.7 9.3 6.8 10.6V26c-6.8-1.4-11.2-7.4-9.7-13.8C3.5 7.7 8.6 5.1 14.2 6.8zm1.8-.5c5.6 1.5 9.5 6.8 9.4 12.6-.1 4.6-2.7 8.7-6.9 10.8V27c3.4-2 5.5-5.5 5.5-9.3 0-4.7-3-9-7-10.6V6.3zm-1.8 4.6v8.2c-2-.7-3.4-2.4-3.4-4.4 0-1.9 1.3-3.5 3.4-3.8zm1.8 0c2.1.3 3.5 1.9 3.5 3.8s-1.4 3.5-3.5 4.1v-7.9z" fill="#76b900" opacity="1"/>
      <text x="32" y="22" fontFamily="'Arial', sans-serif" fontSize="18" fontWeight="700" fill="white" letterSpacing="1">NVIDIA</text>
    </svg>
  );
}

export function ScaleAILogo({ height = 22, className }: LogoProps) {
  // Using a clean text-based fallback with the Scale AI branding style since the wikimedia SVG is sometimes unavailable
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg height={height} viewBox="0 0 30 30" fill="none">
        <rect width="30" height="30" rx="6" fill="#020408" />
        <rect x="6" y="6" width="18" height="18" rx="3" fill="white" />
      </svg>
      <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold', color: 'white', letterSpacing: '-0.5px' }}>Scale</span>
    </div>
  );
}

export function PolytopeNetworksLogo({ height = 24, className }: LogoProps) {
  return (
    <svg height={height} viewBox="0 0 170 30" fill="none" className={className} aria-label="Polytope Networks">
      <polygon points="12,4 24,4 30,15 24,26 12,26 6,15" stroke="white" strokeWidth="2" fill="none" opacity="0.85"/>
      <text x="40" y="20" fontFamily="'Arial', sans-serif" fontSize="15" fontWeight="600" fill="white" opacity="0.9">Polytope Networks</text>
    </svg>
  );
}

export function OpenAILogo({ height = 24, className }: LogoProps) {
  return (
    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" width={100} height={height} className={className} style={{ filter: 'brightness(0) invert(1) opacity(0.9)', objectFit: 'contain' }} unoptimized />
  );
}

export function MetaLogo({ height = 24, className }: LogoProps) {
  return (
    <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" width={100} height={height} className={className} style={{ filter: 'brightness(0) invert(1) opacity(0.85)', objectFit: 'contain' }} unoptimized />
  );
}

export function LabelxAILogo({ height = 24, className }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg height={height} viewBox="0 0 30 30" fill="none">
        <rect width="30" height="30" rx="6" fill="#1e40af" />
        <path d="M9 9 L21 21 M21 9 L9 21" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "'Inter', 'Arial', sans-serif", fontSize: '18px', fontWeight: 'bold', color: 'white', letterSpacing: '-0.5px' }}>LabelX AI</span>
    </div>
  );
}

export function InfigonFuturesLogo({ height = 24, className }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className={className}>
      <svg height={height} viewBox="0 0 40 30" fill="none">
        <circle cx="12" cy="15" r="7" stroke="#0ea5e9" strokeWidth="3" />
        <circle cx="28" cy="15" r="7" stroke="#0ea5e9" strokeWidth="3" />
      </svg>
      <span style={{ fontFamily: "'Inter', 'Arial', sans-serif", fontSize: '18px', fontWeight: '800', color: 'white', letterSpacing: '0.2px' }}>Infigon</span>
    </div>
  );
}

export const partnerLogos: Record<string, React.ComponentType<LogoProps>> = {
  AWS: AWSLogo,
  Google: GoogleLogo,
  Microsoft: MicrosoftLogo,
  Philips: PhilipsLogo,
  NVIDIA: NvidiaLogo,
  "Scale AI": ScaleAILogo,
  OpenAI: OpenAILogo,
  Meta: MetaLogo,
  Polytope: PolytopeNetworksLogo,
  "LabelX AI": LabelxAILogo,
  "Infigon Futures": InfigonFuturesLogo,
};
