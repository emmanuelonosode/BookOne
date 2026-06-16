import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Bookone layered-stack mark on a warm-ink tile
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#1C1917',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="132" height="132" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,112 68,148 68,164 32,128" fill="#DCD3BD" />
          <polygon points="68,148 132,148 132,164 68,164" fill="#ECE4D2" />
          <polygon points="132,148 168,112 168,128 132,164" fill="#C9BFA6" />
          <polygon points="32,96 68,132 68,148 32,112" fill="#3A463E" />
          <polygon points="68,132 132,132 132,148 68,148" fill="#4A564C" />
          <polygon points="132,132 168,96 168,112 132,148" fill="#2C352F" />
          <polygon points="32,80 68,116 68,132 32,96" fill="#BBD133" />
          <polygon points="68,116 132,116 132,132 68,132" fill="#CFE53C" />
          <polygon points="132,116 168,80 168,96 132,132" fill="#A7BC2A" />
          <polygon points="68,44 132,44 168,80 132,116 68,116 32,80" fill="#E8FF47" />
          <polygon points="68,44 132,44 150,62 86,62" fill="#F2FF8C" opacity="0.55" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
