#if os(iOS)
import SwiftUI

struct FLXToggleStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXToggleStyle.Configuration

    var body: some View {
        HStack(spacing: FLXSpacing.md) {
            configuration.label
                .flxFont(.body)
                .foregroundStyle(theme.colors.foreground)
            Spacer(minLength: FLXSpacing.md)
            track
        }
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }

    private var track: some View {
        Button {
            configuration.isOn.toggle()
        } label: {
            Capsule()
                .fill(configuration.isOn ? theme.colors.primary : theme.colors.input)
                .frame(width: FLXToggleMetrics.trackWidth, height: FLXToggleMetrics.trackHeight)
                .overlay(alignment: .leading) {
                    Circle()
                        .fill(configuration.isOn ? theme.colors.primaryForeground : .white)
                        .frame(width: FLXToggleMetrics.thumbDiameter, height: FLXToggleMetrics.thumbDiameter)
                        .padding(.horizontal, FLXToggleMetrics.thumbInset)
                        .offset(x: configuration.isOn ? thumbTravel : 0)
                }
        }
        .buttonStyle(.plain)
        .animation(.easeInOut(duration: 0.15), value: configuration.isOn)
    }

    private var thumbTravel: CGFloat {
        FLXToggleMetrics.trackWidth
            - FLXToggleMetrics.thumbDiameter
            - FLXToggleMetrics.thumbInset * 2
    }
}

private enum FLXToggleMetrics {
    static let trackWidth: CGFloat = 44
    static let trackHeight: CGFloat = 24
    static let thumbDiameter: CGFloat = 20
    static let thumbInset: CGFloat = 2
}
#endif
