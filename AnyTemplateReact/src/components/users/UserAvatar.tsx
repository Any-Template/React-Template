interface UserAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-sm',
}

export function UserAvatar({ name, size = 'lg' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  )
}
