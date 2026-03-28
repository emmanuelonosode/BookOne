import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="120"
        height="107"
        viewBox="0 0 186 166"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H78.042C106.776 0 130.07 23.2252 130.07 51.875V129.688H52.028C23.2937 129.688 0 106.462 0 77.8125V0Z"
          fill="#E8FF47"
        />
        <path
          d="M107.958 45.3906C84.2523 45.3906 65.035 64.5514 65.035 88.1875V156.922H133.972C157.677 156.922 176.895 137.761 176.895 114.125V45.3906H107.958Z"
          fill="#FEFEFE"
          stroke="#E8FF47"
          strokeWidth="14"
        />
      </svg>
    </div>,
    { ...size }
  )
}
