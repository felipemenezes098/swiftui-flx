import SwiftUI

/// Wraps the native `TextField` with FLX's theme tokens. `TextFieldStyle` doesn't
/// support custom conformances (no "Creating custom styles" section, no public
/// `makeBody(configuration:)` — same limitation as `PickerStyle`/`FLXPicker`), so
/// there's no `FLXTextFieldStyle` protocol or `.flxInputStyle(_:)` override here — just
/// default modifiers applied once, on top of `.textFieldStyle(.plain)` to strip the
/// platform's own chrome first.
public struct FLXTextField: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @FocusState private var isFocused: Bool

    private let title: String
    @Binding private var text: String
    private let groupFocus: FocusState<Bool>.Binding?

    public init(_ titleKey: LocalizedStringResource = "", text: Binding<String>) {
        self.init(String(localized: titleKey), text: text, groupFocus: nil)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ title: S, text: Binding<String>) {
        self.init(String(title), text: text, groupFocus: nil)
    }

    /// Undecorated entry point for `FLXTextFieldGroup`: no background/border of
    /// its own, so the group's own box is the only one drawn, and the group owns the
    /// focus so a tap anywhere in its box focuses this field. Not part of the public
    /// API — `FLXTextField` on its own is always the full boxed field above.
    init(_ title: String, text: Binding<String>, groupFocus: FocusState<Bool>.Binding?) {
        self.title = title
        self._text = text
        self.groupFocus = groupFocus
    }

    public var body: some View {
        let field = TextField(title, text: $text)
            .textFieldStyle(.plain)
            .flxFont(.body)
            .foregroundStyle(theme.colors.foreground)
            .padding(.vertical, FLXTextFieldMetrics.verticalPadding)

        if let groupFocus {
            field
                .focused(groupFocus)
                .padding(.horizontal, FLXSpacing.sm)
        } else {
            field
                .focused($isFocused)
                .padding(.horizontal, FLXTextFieldMetrics.horizontalPadding)
                .background(theme.colors.card)
                .overlay(
                    RoundedRectangle(cornerRadius: theme.radius.md)
                        .strokeBorder(borderColor, lineWidth: borderWidth)
                )
                .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
                .contentShape(Rectangle())
                .onTapGesture { isFocused = true }
                .opacity(isEnabled ? 1 : FLXOpacity.disabled)
        }
    }

    private var borderColor: Color {
        #if os(macOS)
        if isFocused { return theme.colors.ring }
        #endif
        return theme.colors.input
    }

    private var borderWidth: CGFloat {
        #if os(macOS)
        if isFocused { return FLXBorderWidth.thick }
        #endif
        return FLXBorderWidth.thin
    }
}

private enum FLXTextFieldMetrics {
    #if os(macOS)
    static let verticalPadding: CGFloat = 4
    #else
    static let verticalPadding: CGFloat = 6
    #endif
    static let horizontalPadding: CGFloat = FLXSpacing.md
}
