import SwiftUI

@MainActor
public protocol FLXAvatarStyle {
    associatedtype Body: View
    typealias Configuration = FLXAvatarStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXAvatarStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
    public let size: FLXAvatarSize
}

public struct FLXDefaultAvatarStyle: FLXAvatarStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultAvatarStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultAvatarStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    let configuration: FLXAvatarStyleConfiguration

    var body: some View {
        ZStack {
            configuration.content
        }
        .flxFont(configuration.size.typography)
        .foregroundStyle(theme.colors.mutedForeground)
        .frame(width: configuration.size.diameter * scale, height: configuration.size.diameter * scale)
        .overlay(
            Circle().strokeBorder(theme.colors.border, lineWidth: FLXBorderWidth.thin)
        )
    }
}

struct AnyFLXAvatarStyle: FLXAvatarStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXAvatarStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXAvatarStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXAvatarStyle? = nil
}

extension EnvironmentValues {
    var flxAvatarStyle: AnyFLXAvatarStyle? {
        get { self[FLXAvatarStyleKey.self] }
        set { self[FLXAvatarStyleKey.self] = newValue }
    }
}

extension View {
    public func flxAvatarStyle<S: FLXAvatarStyle>(_ style: S) -> some View {
        environment(\.flxAvatarStyle, AnyFLXAvatarStyle(style))
    }
}
