import { ogColors } from "./og-colors"

export function OgPhone() {
  return (
    <div
      style={{
        position: "absolute",
        left: 610,
        top: 180,
        display: "flex",
        width: 190,
        height: 400,
        padding: 7,
        borderRadius: 40,
        background: ogColors.foreground,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: 12,
          paddingTop: 46,
          gap: 10,
          borderRadius: 33,
          background: ogColors.background,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 11,
            left: 58,
            width: 60,
            height: 18,
            borderRadius: 9,
            background: ogColors.foreground,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 12,
            borderRadius: 16,
            border: `1px solid ${ogColors.border}`,
            background: ogColors.card,
          }}
        >
          <div
            style={{
              width: 84,
              height: 10,
              borderRadius: 5,
              background: ogColors.foreground,
            }}
          />
          <div
            style={{
              width: 124,
              height: 7,
              borderRadius: 4,
              background: ogColors.muted,
            }}
          />
          <div
            style={{
              width: 100,
              height: 7,
              borderRadius: 4,
              background: ogColors.muted,
            }}
          />
          <div
            style={{
              height: 26,
              marginTop: 4,
              borderRadius: 8,
              background: ogColors.primary,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 10,
            borderRadius: 14,
            border: `1px solid ${ogColors.border}`,
            background: ogColors.card,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: ogColors.muted,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                width: 72,
                height: 7,
                borderRadius: 4,
                background: ogColors.foreground,
              }}
            />
            <div
              style={{
                width: 96,
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
