import { Logo } from "@/components/core/logo"
import { siteConfig } from "@/config/site"

import { ogColors } from "./og-colors"
import { OgMac } from "./og-mac"
import { OgPhone } from "./og-phone"

interface OgImageProps {
  title: string
  description: string
}

export function OgImage({ title, description }: Readonly<OgImageProps>) {
  const titleSize = Math.min(76, Math.max(56, 90 - title.length))

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 40,
        background: ogColors.background,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 44,
          border: `1px solid ${ogColors.border}`,
          background: ogColors.card,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 600,
            padding: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Logo.SwiftUI width={52} height={52} />
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: ogColors.foreground,
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: ogColors.foreground,
                textWrap: "balance",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 400,
                lineHeight: 1.4,
                color: ogColors.mutedForeground,
                textWrap: "balance",
              }}
            >
              {description}
            </div>
          </div>
        </div>
        <OgPhone />
        <OgMac />
      </div>
    </div>
  )
}
