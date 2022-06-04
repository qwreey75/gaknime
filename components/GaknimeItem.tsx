import { Gaknime } from "lib/types"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export const GaknimeItem: React.FC<{
  gaknime: Gaknime
  onClick?: () => void
  textStyle?: any
}> = ({ gaknime, onClick, textStyle = {} }) => {
  const router = useRouter()

  const imageRef = React.useRef<HTMLImageElement | null>(null)

  const [fontSize, setFontSize] = React.useState(16)

  React.useEffect(() => {
    if (imageRef.current) {
      const observer = new ResizeObserver((entries) => {
        const rect = entries[0].contentRect

        setFontSize((rect.width / 240) * 16)
      })

      observer.observe(imageRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={`https://i.ytimg.com/vi/${gaknime.thumbnail}/original.jpg`}
        alt="Thumbnail"
        width="100%"
        style={{ borderRadius: 6 }}
      />
      <div style={{ fontSize: fontSize, width: "100%", ...textStyle }}>
        {gaknime.title}
      </div>
    </div>
  )

  return onClick ? (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {content}
    </div>
  ) : (
    <Link
      scroll={false}
      href={`${router.pathname}?itemId=${gaknime.id}&${new URLSearchParams(
        router.query as Record<string, string>
      )}`}
      as={`/item/${gaknime.id}`}
    >
      <a>{content}</a>
    </Link>
  )
}
