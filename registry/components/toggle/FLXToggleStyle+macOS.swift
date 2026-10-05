#if os(macOS)
import SwiftUI

struct FLXToggleStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.controlSize) private var controlSize

    let configuration: FLXToggleStyle.Configuration

    var body: some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            HStack(spacing: FLXToggleMetrics.labelSpacing(controlSize)) {
                box
                configuration.label
                    .flxFont(FLXTypography.control(controlSize))
                    .foregroundStyle(theme.colors.foreground)
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }

    private var box: some View {
        let side = FLXToggleMetrics.boxSize(controlSize)
        return RoundedRectangle(cornerRadius: FLXToggleMetrics.cornerRadius)
            .fill(configuration.isOn ? theme.colors.primary : theme.colors.card)
            .overlay(
                RoundedRectangle(cornerRadius: FLXToggleMetrics.cornerRadius)
                    .strokeBorder(configuration.isOn ? theme.colors.primary : theme.colors.input, lineWidth: FLXBorderWidth.thin)
            )
            .overlay {
                if configuration.isOn {
                    Image(systemName: "checkmark")
                        .font(.system(size: side * FLXToggleMetrics.checkmarkScale, weight: .bold))
                        .foregroundStyle(theme.colors.primaryForeground)
                }
            }
            .frame(width: side, height: side)
    }
}

private enum FLXToggleMetrics {
    static let cornerRadius: CGFloat = 4
    static let checkmarkScale: CGFloat = 0.6

    static func boxSize(_ controlSize: ControlSize) -> CGFloat {
        switch controlSize {
        case .mini: 12
        case .small: 14
        case .regular: 16
        case .large, .extraLarge: 18
        @unknown default: 16
        }
    }

    static func labelSpacing(_ controlSize: ControlSize) -> CGFloat {
        switch controlSize {
        case .mini, .small: 4
        case .regular, .large, .extraLarge: 5
        @unknown default: 5
        }
    }
}
#endif
