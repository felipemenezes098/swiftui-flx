import SwiftUI

public struct FLXProgressViewStyle: ProgressViewStyle {
    public let variant: FLXProgressViewVariant

    public init(variant: FLXProgressViewVariant) {
        self.variant = variant
    }

    public func makeBody(configuration: Configuration) -> some View {
        FLXProgressViewStyleBody(configuration: configuration, variant: variant)
    }
}

private struct FLXProgressViewStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXProgressViewStyle.Configuration
    let variant: FLXProgressViewVariant

    var body: some View {
        Group {
            if let fractionCompleted = configuration.fractionCompleted {
                linearBar(fractionCompleted: fractionCompleted)
            } else {
                circularSpinner
            }
        }
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }

    @ViewBuilder
    private func linearBar(fractionCompleted: Double) -> some View {
        VStack(alignment: .leading, spacing: FLXSpacing.xs) {
            if let label = configuration.label {
                label
                    .flxFont(.subheadline)
                    .foregroundStyle(theme.colors.foreground)
            }
            GeometryReader { proxy in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(fillColor.opacity(FLXProgressViewMetrics.trackOpacity))
                    Capsule()
                        .fill(fillColor)
                        .frame(width: proxy.size.width * fractionCompleted)
                }
            }
            .frame(height: FLXProgressViewMetrics.trackHeight)
            .animation(.easeInOut(duration: 0.2), value: fractionCompleted)
            if let currentValueLabel = configuration.currentValueLabel {
                currentValueLabel
                    .flxFont(.caption)
                    .foregroundStyle(theme.colors.mutedForeground)
            }
        }
    }

    /// No shadcn/HIG spec calls for a recolored track or custom motion here —
    /// the system spinner already nails the look and owns its own accessibility
    /// (VoiceOver "busy" state, reduce-motion, etc.) and sizes itself from the
    /// environment's `controlSize`, so we only tint it instead of redrawing it
    /// (see 3.1: style what modifiers reach before reaching for a full custom render).
    private var circularSpinner: some View {
        ProgressView(configuration)
            .progressViewStyle(.circular)
            .tint(fillColor)
    }

    /// Reuses the same theme tokens `FLXBadgeVariant`/`FLXButtonVariant` map to —
    /// never a raw `Color`, so a variant here can't drift outside the active theme.
    private var fillColor: Color {
        switch variant {
        case .primary: theme.colors.primary
        case .secondary: theme.colors.secondary
        case .destructive: theme.colors.destructive
        }
    }
}

struct AnyFLXProgressViewStyle: ProgressViewStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: ProgressViewStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> some View {
        _makeBody(configuration)
    }
}

private struct FLXProgressViewStyleOverrideKey: EnvironmentKey {
    static let defaultValue: AnyFLXProgressViewStyle? = nil
}

extension EnvironmentValues {
    var flxProgressViewStyleOverride: AnyFLXProgressViewStyle? {
        get { self[FLXProgressViewStyleOverrideKey.self] }
        set { self[FLXProgressViewStyleOverrideKey.self] = newValue }
    }
}

extension View {
    public func flxProgressViewStyle<S: ProgressViewStyle>(_ style: S) -> some View {
        environment(\.flxProgressViewStyleOverride, AnyFLXProgressViewStyle(style))
    }
}

private enum FLXProgressViewMetrics {
    static let trackHeight: CGFloat = 4
    static let trackOpacity: Double = 0.2
}
