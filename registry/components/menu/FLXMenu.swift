import SwiftUI

/// Wraps the native `Menu` (SwiftUI's pull-down/command menu) with FLX's theme tokens.
/// `MenuStyle`'s `Configuration` only exposes `label` — never `content` — so there's no
/// `FLXMenuStyle` protocol or `.flxMenuStyle(_:)` override here, the same limitation
/// `FLXPicker` documents for `PickerStyle`. The menu's content (items, sections, submenus,
/// dividers) is rendered entirely by the system — its background/blur/corner radius can't
/// be restyled, which is also how it picks up Liquid Glass for free. The trigger, though,
/// behaves like a real button for styling purposes, so a decorated trigger reuses
/// `FLXButtonStyle` directly (and honors the same `.flxButtonStyle(_:)` override a real
/// `FLXButton` would) instead of inventing a second style mechanism for it.
@available(macOS, unavailable)
public struct FLXMenu<Content: View, Label: View>: View {
    @Environment(\.flxButtonStyleOverride) private var styleOverride
    @Environment(\.isEnabled) private var isEnabled

    private let content: () -> Content
    private let label: () -> Label
    private let variant: FLXButtonVariant?

    /// Custom-label init (e.g. an icon-only trigger or an `FLXAvatar`). The caller owns
    /// the whole trigger appearance — no `FLXButtonStyle` is applied here.
    public init(
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.content = content
        self.label = label
        self.variant = nil
    }

    private init(
        variant: FLXButtonVariant,
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.content = content
        self.label = label
        self.variant = variant
    }

    public var body: some View {
        if let variant {
            Menu(content: content, label: label)
                .buttonStyle(styleOverride ?? AnyFLXButtonStyle(FLXButtonStyle(variant: variant)))
        } else {
            Menu(content: content, label: label)
                .opacity(isEnabled ? 1 : FLXOpacity.disabled)
        }
    }
}

@available(macOS, unavailable)
extension FLXMenu where Label == Text {
    public init(
        _ titleKey: LocalizedStringKey,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            Text(title)
        }
    }
}

@available(macOS, unavailable)
extension FLXMenu where Label == SwiftUI.Label<Text, Image> {
    public init(
        _ titleKey: LocalizedStringKey,
        systemImage: String,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            SwiftUI.Label(titleKey, systemImage: systemImage)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        systemImage: String,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            SwiftUI.Label(titleResource, systemImage: systemImage)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        systemImage: String,
        variant: FLXButtonVariant = .secondary,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(variant: variant, content: content) {
            SwiftUI.Label(title, systemImage: systemImage)
        }
    }
}
