import React from 'react';

interface OwlLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const OwlLogo: React.FC<OwlLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${className}`}>
      🦉
    </div>
  );
};

export default OwlLogo;