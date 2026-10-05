import SwiftUI

/// No native primitive backs this (it's pure layout composition, like shadcn's
/// InputGroup over `<input>`), so it's Caso B: a `FLXTextFieldGroupStyle` protocol we
/// designed ourselves, fully overridable via `.flxTextFieldGroupStyle(_:)` — unlike
/// `FLXTextField`/`FLXSecureField`, there's no ceiling here.
///
/// Draws a single shared box around an optional leading addon, the text field, and
/// an optional trailing addon. The field inside is `FLXTextField` in its undecorated
/// form (see `groupFocus` in `FLXTextField.swift`) so only this box's border/background
/// are drawn — never two boxes nested in each other.
///
/// Two initializers instead of defaulting both `leading` and `trailing` on one: with
/// two defaulted trailing-closure parameters, Swift's single-unlabeled-trailing-closure
/// call sites (`FLXTextFieldGroup(...) { ... }`) silently bind to the *last* one
/// (`trailing`), not `leading` as the call site reads — a real correctness trap, not
/// just style. Splitting into a leading-only overload and a leading+trailing overload
/// (trailing required whenever present) makes every call site unambiguous.
public struct FLXTextFieldGroup<Leading: View, Trailing: View>: View {
    @Environment(\.flxTextFieldGroupStyle) private var style
    @FocusState private var isFocused: Bool

    private let title: String
    @Binding private var text: String
    private let leading: () -> Leading
    private let trailing: () -> Trailing

    public init(
        _ titleKey: LocalizedStringResource = "",
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() }
    ) where Trailing == EmptyView {
        self.title = String(localized: titleKey)
        self._text = text
        self.leading = leading
        self.trailing = { EmptyView() }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() }
    ) where Trailing == EmptyView {
        self.title = String(title)
        self._text = text
        self.leading = leading
        self.trailing = { EmptyView() }
    }

    public init(
        _ titleKey: LocalizedStringResource = "",
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() },
        @ViewBuilder trailing: @escaping () -> Trailing
    ) {
        self.title = String(localized: titleKey)
        self._text = text
        self.leading = leading
        self.trailing = trailing
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() },
        @ViewBuilder trailing: @escaping () -> Trailing
    ) {
        self.title = String(title)
        self._text = text
        self.leading = leading
        self.trailing = trailing
    }

    public var body: some View {
        let row = HStack(spacing: 0) {
            leading()
            FLXTextField(title, text: $text, groupFocus: $isFocused)
            trailing()
        }
        (style ?? AnyFLXTextFieldGroupStyle(FLXDefaultTextFieldGroupStyle())).makeBody(configuration: .init(content: .init(underlyingContent: AnyView(row)), isFocused: isFocused))
            .contentShape(Rectangle())
            .onTapGesture { isFocused = true }
    }
}

/// A leading/trailing slot inside `FLXTextFieldGroup`/`FLXSecureTextFieldGroup` — an icon,
/// a `Text` prefix/suffix, or a `Button`. Tints its content with the theme's muted
/// foreground by default; a component with its own style (like `FLXButton`) applies
/// its own foreground and simply overrides this.
public struct FLXTextFieldGroupAddon<Content: View>: View {
    @Environment(\.flxTheme) private var theme

    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        content()
            .foregroundStyle(theme.colors.mutedForeground)
            .padding(.horizontal, FLXSpacing.sm)
    }
}

/// Same box as `FLXTextFieldGroup`, but wraps `FLXSecureField` instead of `FLXTextField` —
/// `SecureField` is a distinct native control (see `FLXSecureField.swift`), not a
/// style variant, so it gets its own entry point here too. Shares
/// `FLXTextFieldGroupStyle`/`.flxTextFieldGroupStyle(_:)` with `FLXTextFieldGroup` since the box
/// itself has no opinion about what's inside it. Same two-initializer split as
/// `FLXTextFieldGroup`, for the same reason.
public struct FLXSecureTextFieldGroup<Leading: View, Trailing: View>: View {
    @Environment(\.flxTextFieldGroupStyle) private var style
    @FocusState private var isFocused: Bool

    private let title: String
    @Binding private var text: String
    private let leading: () -> Leading
    private let trailing: () -> Trailing

    public init(
        _ titleKey: LocalizedStringResource = "",
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() }
    ) where Trailing == EmptyView {
        self.title = String(localized: titleKey)
        self._text = text
        self.leading = leading
        self.trailing = { EmptyView() }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() }
    ) where Trailing == EmptyView {
        self.title = String(title)
        self._text = text
        self.leading = leading
        self.trailing = { EmptyView() }
    }

    public init(
        _ titleKey: LocalizedStringResource = "",
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() },
        @ViewBuilder trailing: @escaping () -> Trailing
    ) {
        self.title = String(localized: titleKey)
        self._text = text
        self.leading = leading
        self.trailing = trailing
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        text: Binding<String>,
        @ViewBuilder leading: @escaping () -> Leading = { EmptyView() },
        @ViewBuilder trailing: @escaping () -> Trailing
    ) {
        self.title = String(title)
        self._text = text
        self.leading = leading
        self.trailing = trailing
    }

    public var body: some View {
        let row = HStack(spacing: 0) {
            leading()
            FLXSecureField(title, text: $text, groupFocus: $isFocused)
            trailing()
        }
        (style ?? AnyFLXTextFieldGroupStyle(FLXDefaultTextFieldGroupStyle())).makeBody(configuration: .init(content: .init(underlyingContent: AnyView(row)), isFocused: isFocused))
            .contentShape(Rectangle())
            .onTapGesture { isFocused = true }
    }
}
