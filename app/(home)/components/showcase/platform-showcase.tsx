"use client"

import * as React from "react"

import { firstComponentHref, getPlatformInfo } from "@/lib/docs"

import { ComponentTabs } from "./component-tabs"
import { AvatarPreview } from "./previews/iphone/avatar-preview"
import { CardPreview } from "./previews/iphone/card-preview"
import { SheetPreview } from "./previews/iphone/sheet-preview"
import { SliderPreview } from "./previews/iphone/slider-preview"
import { TextFieldPreview } from "./previews/iphone/text-field-preview"
import { TogglePreview } from "./previews/iphone/toggle-preview"
import { MacAvatarPreview } from "./previews/mac/avatar-preview"
import { MacCardPreview } from "./previews/mac/card-preview"
import { MacSheetPreview } from "./previews/mac/sheet-preview"
import { MacSliderPreview } from "./previews/mac/slider-preview"
import { MacTextFieldPreview } from "./previews/mac/text-field-preview"
import { MacTogglePreview } from "./previews/mac/toggle-preview"
import { ShowcaseCard } from "./showcase-card"
import { ShowcaseIPhone } from "./showcase-iphone"
import { ShowcaseMac } from "./showcase-mac"
import { type ShowcaseTheme, ThemePicker } from "./theme-picker"

const components = [
  { id: "card", name: "Card", IPhone: CardPreview, Mac: MacCardPreview },
  { id: "sheet", name: "Sheet", IPhone: SheetPreview, Mac: MacSheetPreview },
  {
    id: "toggle",
    name: "Toggle",
    IPhone: TogglePreview,
    Mac: MacTogglePreview,
  },
  {
    id: "slider",
    name: "Slider",
    IPhone: SliderPreview,
    Mac: MacSliderPreview,
  },
  {
    id: "text-field",
    name: "Text Field",
    IPhone: TextFieldPreview,
    Mac: MacTextFieldPreview,
  },
  {
    id: "avatar",
    name: "Avatar",
    IPhone: AvatarPreview,
    Mac: MacAvatarPreview,
  },
] as const

const ios = getPlatformInfo("ios")
const mac = getPlatformInfo("mac")

export function PlatformShowcase() {
  const [componentId, setComponentId] = React.useState<string>(components[0].id)
  const [theme, setTheme] = React.useState<ShowcaseTheme>("default")
  const [hovered, setHovered] = React.useState(false)
  const [typing, setTyping] = React.useState(false)
  const [engaged, setEngaged] = React.useState(false)

  const component =
    components.find((item) => item.id === componentId) ?? components[0]

  const rootRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const enter = (event: PointerEvent) =>
      event.pointerType === "mouse" && setHovered(true)
    const leave = (event: PointerEvent) =>
      event.pointerType === "mouse" && setHovered(false)
    node.addEventListener("pointerenter", enter)
    node.addEventListener("pointerleave", leave)
    return () => {
      node.removeEventListener("pointerenter", enter)
      node.removeEventListener("pointerleave", leave)
    }
  }, [])

  const next = () => {
    const index = components.findIndex((item) => item.id === componentId)
    setComponentId(components[(index + 1) % components.length].id)
  }

  return (
    <section
      ref={rootRef}
      onPointerDown={(event) =>
        event.pointerType === "touch" && setEngaged(true)
      }
      onFocus={(event) =>
        event.target instanceof HTMLInputElement && setTyping(true)
      }
      onBlur={(event) =>
        event.target instanceof HTMLInputElement && setTyping(false)
      }
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ComponentTabs
          items={components}
          value={componentId}
          onValueChange={setComponentId}
          onComplete={next}
          paused={hovered || typing}
          autoplay={!engaged}
        />
        <ThemePicker value={theme} onValueChange={setTheme} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-6">
        <ShowcaseCard
          title="iPhone & iPad"
          detail={ios.releases[0]}
          href={firstComponentHref("ios")}
          theme={theme}
        >
          <ShowcaseIPhone id={component.id}>
            <component.IPhone />
          </ShowcaseIPhone>
        </ShowcaseCard>
        <ShowcaseCard
          title="Mac"
          detail={mac.releases[0]}
          href={firstComponentHref("mac")}
          theme={theme}
        >
          <ShowcaseMac id={component.id}>
            <component.Mac />
          </ShowcaseMac>
        </ShowcaseCard>
      </div>
    </section>
  )
}
