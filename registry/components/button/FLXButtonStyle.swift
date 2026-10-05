import SwiftUI

public struct FLXButtonStyle: ButtonStyle {
    public let variant: FLXButtonVariant

    public init(variant: FLXButtonVariant) {
        self.variant = variant
    }

    public func makeBody(configuration: Configuration) -> some View {
        FLXButtonStyleBody(configuration: configuration, variant: variant)
    }
}

private struct FLXButtonStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.controlSize) private var controlSize

    let configuration: FLXButtonStyle.Configuration
    let variant: FLXButtonVariant

    var body: some View {
        configuration.label
            .flxFont(FLXTypography.control(controlSize), weight: .medium)
            .padding(.horizontal, FLXButtonMetrics.horizontalPadding(controlSize))
            .padding(.vertical, FLXButtonMetrics.verticalPadding(controlSize))
            .foregroundStyle(foregroundColor)
            .background(backgroundColor)
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius.md)
                    .strokeBorder(borderColor, lineWidth: variant == .outline ? FLXBorderWidth.thin : 0)
            )
            .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
            .opacity(isEnabled ? (configuration.isPressed ? FLXOpacity.pressed : 1) : FLXOpacity.disabled)
    }

    private var isDestructive: Bool {
        configuration.role == .destructive
    }

    private var backgroundColor: Color {
        switch variant {
        case .primary: primaryBackground
        case .outline: .clear
        case .secondary: secondaryBackground
        case .ghost: .clear
        case .link: .clear
        }
    }

    private var primaryBackground: Color {
        guard isDestructive else { return theme.colors.primary }
        switch colorScheme {
        case .dark: return theme.colors.destructive.opacity(FLXOpacity.destructiveDark)
        default: return theme.colors.destructive
        }
    }

    private var secondaryBackground: Color {
        guard isDestructive else { return theme.colors.secondary }
        return primaryBackground
    }

    private var foregroundColor: Color {
        guard isDestructive else { return variantForeground }
        switch variant {
        case .primary, .secondary: return theme.colors.destructiveForeground
        case .outline, .ghost, .link: return theme.colors.destructive
        }
    }

    private var variantForeground: Color {
        switch variant {
        case .primary: theme.colors.primaryForeground
        case .outline: theme.colors.foreground
        case .secondary: theme.colors.secondaryForeground
        case .ghost: theme.colors.foreground
        case .link: theme.colors.primary
        }
    }

    private var borderColor: Color {
        switch variant {
        case .outline: theme.colors.border
        default: .clear
        }
    }
}

struct AnyFLXButtonStyle: ButtonStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: ButtonStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> some View {
        _makeBody(configuration)
    }
}

private struct FLXButtonStyleOverrideKey: EnvironmentKey {
    static let defaultValue: AnyFLXButtonStyle? = nil
}

extension EnvironmentValues {
    var flxButtonStyleOverride: AnyFLXButtonStyle? {
        get { self[FLXButtonStyleOverrideKey.self] }
        set { self[FLXButtonStyleOverrideKey.self] = newValue }
    }
}

extension View {
    public func flxButtonStyle<S: ButtonStyle>(_ style: S) -> some View {
        environment(\.flxButtonStyleOverride, AnyFLXButtonStyle(style))
    }
}

private enum FLXButtonMetrics {
    static func verticalPadding(_ controlSize: ControlSize) -> CGFloat {
        #if os(macOS)
        switch controlSize {
        case .mini, .small: 3
        case .regular: 4
        case .large: 6
        case .extraLarge: 10
        @unknown default: 4
        }
        #else
        switch controlSize {
        case .mini, .small: 5
        case .regular: 7
        case .large, .extraLarge: 15
        @unknown default: 7
        }
        #endif
    }

    static func horizontalPadding(_ controlSize: ControlSize) -> CGFloat {
        #if os(macOS)
        switch controlSize {
        case .mini, .small: 10
        case .regular: 12
        case .large: 14
        case .extraLarge: 18
        @unknown default: 12
        }
        #else
        switch controlSize {
        case .mini, .small: 10
        case .regular: 12
        case .large, .extraLarge: 20
        @unknown default: 12
        }
        #endif
    }
}
