import SwiftUI

@MainActor
public protocol FLXBadgeStyle {
    associatedtype Body: View
    typealias Configuration = FLXBadgeStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXBadgeStyleConfiguration {
    public let text: Text
    public let variant: FLXBadgeVariant
}

public struct FLXDefaultBadgeStyle: FLXBadgeStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultBadgeStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultBadgeStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.colorScheme) private var colorScheme

    let configuration: FLXBadgeStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.caption, weight: .semibold)
            .padding(.horizontal, FLXSpacing.sm)
            .padding(.vertical, FLXSpacing.xs / 2)
            .foregroundStyle(foregroundColor)
            .background(backgroundColor)
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius.full)
                    .strokeBorder(borderColor, lineWidth: configuration.variant == .outline ? FLXBorderWidth.thin : 0)
            )
            .clipShape(RoundedRectangle(cornerRadius: theme.radius.full))
    }

    private var backgroundColor: Color {
        switch configuration.variant {
        case .primary: theme.colors.primary
        case .secondary: theme.colors.secondary
        case .destructive: destructiveBackground
        case .outline: .clear
        }
    }

    private var destructiveBackground: Color {
        switch colorScheme {
        case .dark: theme.colors.destructive.opacity(FLXOpacity.destructiveDark)
        default: theme.colors.destructive
        }
    }

    private var foregroundColor: Color {
        switch configuration.variant {
        case .primary: theme.colors.primaryForeground
        case .secondary: theme.colors.secondaryForeground
        case .destructive: theme.colors.destructiveForeground
        case .outline: theme.colors.foreground
        }
    }

    private var borderColor: Color {
        switch configuration.variant {
        case .outline: theme.colors.border
        default: .clear
        }
    }
}

struct AnyFLXBadgeStyle: FLXBadgeStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXBadgeStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXBadgeStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXBadgeStyle? = nil
}

extension EnvironmentValues {
    var flxBadgeStyle: AnyFLXBadgeStyle? {
        get { self[FLXBadgeStyleKey.self] }
        set { self[FLXBadgeStyleKey.self] = newValue }
    }
}

extension View {
    public func flxBadgeStyle<S: FLXBadgeStyle>(_ style: S) -> some View {
        environment(\.flxBadgeStyle, AnyFLXBadgeStyle(style))
    }
}
