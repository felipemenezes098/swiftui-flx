import SwiftUI

/// There's no native `SheetStyle` for `.sheet` to conform to — Apple resolves sheet
/// appearance entirely through presentation view modifiers (`presentationDetents`,
/// `presentationCornerRadius`, `presentationBackground`, ...) applied to the sheet's
/// content, not through a style protocol like `ButtonStyle`/`ToggleStyle`. That's why
/// there's no `FLXSheetStyle.swift`/`.flxSheetStyle(_:)` here — the same limitation
/// `FLXPicker`/`FLXMenu` already document for their own native primitives.
///
/// `.sheet` itself also isn't a control you drop into a view tree — it's a modifier
/// applied to whatever triggers the presentation. So `FLXSheet` deviates from the usual
/// "public View you instantiate" shape and is exposed as a `View` modifier
/// (`.flxSheet(item:onDismiss:content:)`), mirroring the native API's own shape.
///
/// Always controlled: `item` must come from the presenting screen (the least common
/// ancestor). There's no uncontrolled/internal-state variant like `FLXCollapsible` has —
/// nothing about "which sheet, with what data" can be decided by the sheet itself.
///
/// Only theme identity (corner radius, background) is applied here. Presentation
/// behavior — `presentationDetents`, `interactiveDismissDisabled`,
/// `presentationDragIndicator`, `presentationSizing` — is left to the caller, written
/// inside `content`: a modifier applied here, outside the content, would silently win
/// over the caller's own.
///
/// One platform behavior is baked in here rather than left for every call site to
/// rediscover on its own: VoiceOver focus doesn't return to the trigger once a sheet
/// dismisses (a documented Apple platform gap, not a bug in this component) — fixed via
/// `accessibilityFocused` on the trigger, re-focused from `onDismiss`.

private struct FLXSheetModifier<Item: Identifiable, SheetContent: View>: ViewModifier {
    // Reading @Environment directly here is safe, unlike inside a *Style conformance
    // (section 3.4): a ViewModifier's `body(content:)` is invoked by SwiftUI's normal
    // render path, not called as a plain function through a type-erasing wrapper.
    @Environment(\.flxTheme) private var theme
    @AccessibilityFocusState private var isTriggerFocused: Bool

    @Binding var item: Item?
    let onDismiss: (() -> Void)?
    let content: (Item) -> SheetContent

    func body(content triggerContent: Content) -> some View {
        triggerContent
            .accessibilityFocused($isTriggerFocused)
            .sheet(item: $item, onDismiss: {
                isTriggerFocused = true
                onDismiss?()
            }) { unwrapped in
                content(unwrapped)
                    .presentationCornerRadius(theme.radius.lg)
                    .presentationBackground(theme.colors.popover)
            }
    }
}

extension View {
    /// Presents `content` for the item currently held in `item`, styled with FLX's theme
    /// tokens (corner radius, background) and with VoiceOver focus return handled
    /// automatically.
    public func flxSheet<Item: Identifiable, SheetContent: View>(
        item: Binding<Item?>,
        onDismiss: (() -> Void)? = nil,
        @ViewBuilder content: @escaping (Item) -> SheetContent
    ) -> some View {
        modifier(
            FLXSheetModifier(
                item: item,
                onDismiss: onDismiss,
                content: content
            )
        )
    }
}
