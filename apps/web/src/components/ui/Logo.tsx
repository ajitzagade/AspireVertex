import Link from 'next/link'

const LOGO_SRC = '/logo.png'
const LOGO_ASPECT = 204 / 212

interface LogoProps {
  href?: string
  height?: number
  priority?: boolean
  className?: string
  onClick?: () => void
}

export default function Logo({
  href = '/',
  height = 44,
  className = '',
  onClick,
}: LogoProps) {
  const width = Math.round(height * LOGO_ASPECT)

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Aspire InfraTech"
      width={width}
      height={height}
      className={`site-logo ${className}`.trim()}
      style={{ display: 'block', height, width: 'auto', maxWidth: width }}
      onClick={onClick}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        className="site-logo-link"
        onClick={onClick}
        aria-label="Aspire InfraTech — Home"
      >
        {img}
      </Link>
    )
  }

  return img
}

export { LOGO_SRC }
