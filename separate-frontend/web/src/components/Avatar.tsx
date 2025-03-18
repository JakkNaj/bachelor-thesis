import { useMemo } from 'react';

type TAvatarProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const generateColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 80%)`;
};

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export const Avatar = ({ name, size = 'md' }: TAvatarProps) => {
  const initials = useMemo(() => getInitials(name), [name]);
  const backgroundColor = useMemo(() => generateColor(name), [name]);

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium ${sizeMap[size]}`}
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
}; 