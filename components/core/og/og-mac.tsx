import { ogColors } from "./og-colors"

const trafficLights = ["#ff5f57", "#febc2e", "#28c840"]

const sidebarItems = [
  { width: 64, dot: 1, bar: 0.9 },
  { width: 52, dot: 0.35, bar: 0.25 },
  { width: 72, dot: 0.35, bar: 0.25 },
  { width: 46, dot: 0.35, bar: 0.25 },
]

export function OgMac() {
  return (
    <div
      style={{
        position: "absolute",
        left: 824,
        top: 250,
        display: "flex",
        width: 440,
        height: 330,
        padding: 6,
        gap: 14,
        borderRadius: 18,
        border: `1px solid ${ogColors.border}`,
        background: ogColors.background,
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 116,
          height: "100%",
          padding: 12,
          gap: 10,
          borderRadius: 13,
          border: `1px solid ${ogColors.border}`,
          background: ogColors.muted,
        }}
      >
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {trafficLights.map((color) => (
            <div
              key={color}
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                background: color,
              }}
            />
          ))}
        </div>
        {sidebarItems.map((item) => (
          <div
            key={item.width}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: 3,
                background: ogColors.primary,
                opacity: item.dot,
              }}
            />
            <div
              style={{
                width: item.width,
                height: 7,
                borderRadius: 4,
                background: ogColors.foreground,
                opacity: item.bar,
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingTop: 16,
          paddingRight: 16,
          gap: 12,
        }}
      >
        <div
          style={{
            width: 110,
            height: 12,
            borderRadius: 6,
            background: ogColors.foreground,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            padding: 14,
            borderRadius: 14,
            border: `1px solid ${ogColors.border}`,
            background: ogColors.card,
          }}
        >
          <div
            style={{
              width: 150,
              height: 9,
              borderRadius: 5,
              background: ogColors.foreground,
            }}
          />
          <div
            style={{
              width: 210,
              height: 7,
              borderRadius: 4,
              background: ogColors.muted,
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <div
              style={{
                width: 72,
                height: 24,
                borderRadius: 7,
                border: `1px solid ${ogColors.border}`,
                background: ogColors.card,
              }}
            />
            <div
              style={{
                width: 84,
                height: 24,
                borderRadius: 7,
                background: ogColors.primary,
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 12,
            borderRadius: 12,
            border: `1px solid ${ogColors.border}`,
            background: ogColors.card,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              background: ogColors.muted,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                width: 120,
                height: 7,
                borderRadius: 4,
                background: ogColors.foreground,
              }}
            />
            <div
              style={{
                width: 170,
                height: 6,
                borderRadius: 3,
                background: ogColors.muted,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
