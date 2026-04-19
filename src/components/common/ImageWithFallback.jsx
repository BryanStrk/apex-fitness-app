import { useState } from 'react';

export default function ImageWithFallback({ src, alt, className = '', fallback = '' }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-[#1A1A1A] flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-xs font-['Roboto_Mono']">{fallback || 'No image'}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />;
}