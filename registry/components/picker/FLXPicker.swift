import SwiftUI

/// Wraps the native `Picker` (`.menu` style, SwiftUI's dropdown/select) with FLX's
/// theme tokens. `PickerStyle` doesn't support custom conformances (unlike
/// `ButtonStyle`/`ToggleStyle`), so there's no `FLXPickerStyle` protocol or
/// `.flxSelectStyle(_:)` override here — just default modifiers applied once.
@available(macOS, unavailable)
public struct FLXPicker<SelectionValue: Hashable, Content: View, Label: View>: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    @Binding private var selection: SelectionValue
    private let isDecorated: Bool
    private let content: () -> Content
    private let label: () -> Label

    /// Custom-label init (e.g. an icon or `FLXAvatar` as the trigger). The
    /// caller owns the whole trigger appearance, so no input-box decoration
    /// (background/border/padding) is applied here — only `.menu` behavior.
    public init(
        selection: Binding<SelectionValue>,
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self._selection = selection
        self.isDecorated = false
        self.content = content
        self.label = label
    }

    private init(
        selection: Binding<SelectionValue>,
        isDecorated: Bool,
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self._selection = selection
        self.isDecorated = isDecorated
        self.content = content
        self.label = label
    }

    public var body: some View {
        let picker = Picker(selection: $selection, content: content) {
            label().fixedSize()
        }
            .pickerStyle(.menu)
            .tint(theme.colors.foreground)

        if isDecorated {
            picker
                .flxFont(.body)
                .background(theme.colors.card)
                .overlay(
                    RoundedRectangle(cornerRadius: theme.radius.md)
                        .strokeBorder(theme.colors.input, lineWidth: FLXBorderWidth.thin)
                )
                .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
                .opacity(isEnabled ? 1 : FLXOpacity.disabled)
        } else {
            picker
                .opacity(isEnabled ? 1 : FLXOpacity.disabled)
        }
    }
}

@available(macOS, unavailable)
extension FLXPicker where Label == Text {
    public init(
        _ titleKey: LocalizedStringKey = "",
        selection: Binding<SelectionValue>,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(selection: selection, isDecorated: true, content: content) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        selection: Binding<SelectionValue>,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(selection: selection, isDecorated: true, content: content) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        selection: Binding<SelectionValue>,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(selection: selection, isDecorated: true, content: content) {
            Text(title)
        }
    }
}
