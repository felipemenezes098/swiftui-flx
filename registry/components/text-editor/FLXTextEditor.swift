import SwiftUI

public enum FLXTextEditorSize {
    case small
    case medium
    case large
}

/// Wraps the native `TextEditor` with FLX's theme tokens. `TextEditor` is even
/// more limited than `TextField`/`SecureField`: it has no style protocol at all
/// (not even the closed set of built-ins `TextFieldStyle` offers), and its only
/// initializer is `init(text:)` — no `prompt`/`label` parameter, so there's no
/// native placeholder. The placeholder below is a hand-rolled `ZStack` overlay
/// (the standard SwiftUI workaround for this), not something the platform gives
/// us for free. `.scrollContentBackground(.hidden)` removes `TextEditor`'s own
/// opaque background so our `theme.colors.card` fill shows through.
///
/// `TextEditor` is greedy: it takes all the height it's offered. Each size is a
/// fixed height, so the editor never grows past its box (text scrolls inside).
public struct FLXTextEditor: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1
    @FocusState private var isFocused: Bool

    private let placeholder: Text
    @Binding private var text: String
    private let size: FLXTextEditorSize

    public init(_ placeholderKey: LocalizedStringResource = "", text: Binding<String>, size: FLXTextEditorSize = .medium) {
        self.placeholder = Text(String(localized: placeholderKey))
        self._text = text
        self.size = size
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ placeholder: S, text: Binding<String>, size: FLXTextEditorSize = .medium) {
        self.placeholder = Text(placeholder)
        self._text = text
        self.size = size
    }

    public var body: some View {
        ZStack(alignment: .topLeading) {
            if text.isEmpty {
                placeholder
                    .flxFont(.body)
                    .foregroundStyle(theme.colors.mutedForeground)
                    // Approximates TextEditor's own fixed internal inset (undocumented,
                    // not a design choice) so the placeholder lines up with the caret.
                    .padding(.horizontal, FLXSpacing.xs)
                    .padding(.vertical, FLXSpacing.sm)
                    .allowsHitTesting(false)
            }
            TextEditor(text: $text)
                .focused($isFocused)
                .flxFont(.body)
                .foregroundStyle(theme.colors.foreground)
                .scrollContentBackground(.hidden)
                .padding(.vertical, FLXTextEditorMetrics.textVerticalInset)
        }
        .padding(.horizontal, FLXSpacing.xs)
        .frame(height: height, alignment: .top)
        .background(theme.colors.card)
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius.md)
                .strokeBorder(borderColor, lineWidth: borderWidth)
        )
        .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
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

    private var height: CGFloat {
        baseHeight * scale
    }

    private var baseHeight: CGFloat {
        switch size {
        case .small: 80
        case .medium: 120
        case .large: 160
        }
    }
}

private enum FLXTextEditorMetrics {
    /// UITextView insets its text 8pt top and bottom; the Mac's NSTextView has
    /// no inset, so it's added around the editor to match.
    static var textVerticalInset: CGFloat {
        #if os(macOS)
        8
        #else
        0
        #endif
    }
}
