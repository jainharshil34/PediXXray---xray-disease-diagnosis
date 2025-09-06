interface ProfileAvatarProps {
  firstName?: string
  lastName?: string
  title?: string
  size?: "sm" | "md" | "lg"
}

export function ProfileAvatar({
  firstName = "Sarah",
  lastName = "Chen",
  title = "MD",
  size = "lg",
}: ProfileAvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-32 h-32 text-3xl",
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex flex-col items-center justify-center text-white font-bold`}
    >
      <div>{initials}</div>
      {size === "lg" && title && <div className="text-xs font-normal">{title}</div>}
    </div>
  )
}
