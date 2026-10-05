import SwiftUI

public struct FLXCollapsibleStyle: DisclosureGroupStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXCollapsibleStyleBody(configuration: configuration)
    }
}

private struct FLXCollapsibleStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    let configuration: FLXCollapsibleStyle.Configuration

    var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.sm) {
            Button {
                withAnimation(.easeInOut(duration: 0.2)) {
                    configuration.isExpanded.toggle()
                }
            } label: {
                HStack(spacing: FLXSpacing.sm) {
                    configuration.label
                        .flxFont(.headline)
                        .foregroundStyle(theme.colors.foreground)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: FLXCollapsibleMetrics.iconSize * scale, weight: .medium))
                        .foregroundStyle(theme.colors.mutedForeground)
                        .frame(width: triggerHeight, height: triggerHeight)
                }
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            if configuration.isExpanded {
                configuration.content
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }

    private var triggerHeight: CGFloat {
        FLXCollapsibleMetrics.triggerHeight * scale
    }
}

struct AnyFLXCollapsibleStyle: DisclosureGroupStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: DisclosureGroupStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> some View {
        _makeBody(configuration)
    }
}

private struct FLXCollapsibleStyleOverrideKey: EnvironmentKey {
    static let defaultValue: AnyFLXCollapsibleStyle? = nil
}

extension EnvironmentValues {
    var flxCollapsibleStyleOverride: AnyFLXCollapsibleStyle? {
        get { self[FLXCollapsibleStyleOverrideKey.self] }
        set { self[FLXCollapsibleStyleOverrideKey.self] = newValue }
    }
}

extension View {
    public func flxCollapsibleStyle<S: DisclosureGroupStyle>(_ style: S) -> some View {
        environment(\.flxCollapsibleStyleOverride, AnyFLXCollapsibleStyle(style))
    }
}

private enum FLXCollapsibleMetrics {
    static let iconSize: CGFloat = 14
    static let triggerHeight: CGFloat = 32
}
