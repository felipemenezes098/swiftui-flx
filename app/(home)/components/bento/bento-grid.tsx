import { BentoTile } from "./bento-tile"
import { CalendarMock } from "./calendar-mock"
import { PlayerMock } from "./player-mock"
import { SettingsPhone } from "./settings-phone"
import { SignInWindow } from "./sign-in-window"
import { TeamMock } from "./team-mock"

export function BentoGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:grid-rows-[18rem_18rem_18rem]">
      <BentoTile
        label="Sign In"
        href="/blocks"
        className="sm:col-span-2 xl:col-span-4 xl:row-span-2"
      >
        <SignInWindow />
      </BentoTile>
      <BentoTile
        label="Form"
        href="/docs/components/ios/form"
        className="sm:col-span-2 xl:col-span-2 xl:row-span-2"
      >
        <SettingsPhone />
      </BentoTile>
      <BentoTile
        label="Card & Progress View"
        href="/docs/components/ios/card"
        className="xl:col-span-2"
      >
        <PlayerMock />
      </BentoTile>
      <BentoTile
        label="Avatar & Badge"
        href="/docs/components/ios/avatar"
        className="xl:col-span-2"
      >
        <TeamMock />
      </BentoTile>
      <BentoTile
        label="Date Picker"
        href="/docs/components/ios/date-picker"
        className="sm:col-span-2 xl:col-span-2"
      >
        <CalendarMock />
      </BentoTile>
    </section>
  )
}
