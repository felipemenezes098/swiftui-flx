# Contributing to swiftui-flx

Thanks for helping. Bug and docs fixes can go straight to a pull request. For a new component or an API change, open an issue first.

## Setup

You need Node.js, pnpm and Xcode 16 or later.

```bash
pnpm install
pnpm dev
```

Swift sources live in `registry/`. The docs live in `app/content`. `public/r` is generated, so don't edit it by hand.

## Try your change in an app

With `pnpm dev` running, rebuild the registry and install from it into any Xcode app:

```bash
pnpm registry:build
npx shadcn@latest add http://localhost:3000/r/foundation.json --overwrite
npx shadcn@latest add http://localhost:3000/r/ios-button.json --overwrite
```

Run `npx` from the app's source folder. Use `ios-` items for iOS and `mac-` items for macOS. Every change must build on both, with iOS 16.4 and macOS 13.3 as the deployment target, in Swift 5 and Swift 6.

## Component rules

- **Start from the native control.** If SwiftUI has it, style the real control (`ButtonStyle`, `ToggleStyle`...). Never wrap it in a new view.
- **Theme and tokens only.** No hardcoded colors, spacing, radius or fonts. Measurements used by one component go in its `private enum FLX<Name>Metrics`.
- **Dynamic Type.** Fonts through `.flxFont(_:)`, no fixed heights.
- **Match Apple's API.** Same initializers as the native control, `role:` for meaning, `.controlSize(_:)` for size.
- **iPhone and Mac.** Differences go in `#if os(...)` next to the value. A component missing on a platform is marked `@available(macOS, unavailable)`.
- **Public API, no dependencies.** Only SwiftUI, Foundation and CoreGraphics.

## Add a component

1. Add the Swift files and a `<slug>-usage-example.swift` to `registry/components/<slug>/`.
2. Add `ios-<slug>` and `mac-<slug>` items to `registry/components/registry.json`.
3. Add the component to `componentCatalog` in `lib/docs.ts`.
4. Add `app/content/components/ios/<slug>.mdx` and `mac/<slug>.mdx`, based on an existing page.
5. Run `pnpm registry:build` and commit `public/r`.

Leave out preview images. The maintainers add them before merging.

## Changelog

Each release gets one entry.

1. Add the entry to `changelog` in `lib/changelog.ts`, with a slug like `2026-11-short-title` and the release date.
2. Write it in `app/content/changelog/<slug>.mdx`. Start with a bold sentence and use `###` headings. When people need to change their code, add an `### Update your code` section with `<AiInstall variant="update" changelog="<slug>" />` and a short excerpt of each changed file, titled with its path.
3. When a change needs people to update their code, add it to the entry's `actions` with the component slug and platforms. That component's page then lists it in a Changelog section at the end. Leave `actions` empty when nothing needs to change on their side.

The five newest entries show in full on `/docs/changelog`, and older ones are listed by month.

## Pull requests

- One change per pull request.
- Say how you tested it, and add light and dark screenshots for visual changes.
- Website code: no ternaries, no barrel files, no comments, one component per file. Run `pnpm lint`, `pnpm typecheck` and `pnpm format`.

## License

Contributions to `registry/` are licensed under [MIT](registry/LICENSE). Everything else is under [AGPL-3.0](LICENSE).
