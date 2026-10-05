import SwiftUI

@MainActor
public protocol FLXCardStyle {
    associatedtype Body: View
    typealias Configuration = FLXCardStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXCardStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
}

public struct FLXDefaultCardStyle: FLXCardStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultCardStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultCardStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXCardStyleConfiguration

    var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.lg) {
            configuration.content
        }
        .padding(FLXSpacing.lg)
        .background(theme.colors.card)
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius.lg)
                .strokeBorder(theme.colors.border, lineWidth: FLXBorderWidth.thin)
        )
        .clipShape(RoundedRectangle(cornerRadius: theme.radius.lg))
    }
}

struct AnyFLXCardStyle: FLXCardStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXCardStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXCardStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXCardStyle? = nil
}

extension EnvironmentValues {
    var flxCardStyle: AnyFLXCardStyle? {
        get { self[FLXCardStyleKey.self] }
        set { self[FLXCardStyleKey.self] = newValue }
    }
}

extension View {
    public func flxCardStyle<S: FLXCardStyle>(_ style: S) -> some View {
        environment(\.flxCardStyle, AnyFLXCardStyle(style))
    }
}

@MainActor
public protocol FLXCardTitleStyle {
    associatedtype Body: View
    typealias Configuration = FLXCardTitleStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXCardTitleStyleConfiguration {
    public let title: Text
}

public struct FLXDefaultCardTitleStyle: FLXCardTitleStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultCardTitleStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultCardTitleStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXCardTitleStyleConfiguration

    var body: some View {
        configuration.title
            .flxFont(.title3)
            .foregroundStyle(theme.colors.cardForeground)
    }
}

struct AnyFLXCardTitleStyle: FLXCardTitleStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXCardTitleStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXCardTitleStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXCardTitleStyle? = nil
}

extension EnvironmentValues {
    var flxCardTitleStyle: AnyFLXCardTitleStyle? {
        get { self[FLXCardTitleStyleKey.self] }
        set { self[FLXCardTitleStyleKey.self] = newValue }
    }
}

extension View {
    public func flxCardTitleStyle<S: FLXCardTitleStyle>(_ style: S) -> some View {
        environment(\.flxCardTitleStyle, AnyFLXCardTitleStyle(style))
    }
}

@MainActor
public protocol FLXCardDescriptionStyle {
    associatedtype Body: View
    typealias Configuration = FLXCardDescriptionStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXCardDescriptionStyleConfiguration {
    public let text: Text
}

public struct FLXDefaultCardDescriptionStyle: FLXCardDescriptionStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultCardDescriptionStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultCardDescriptionStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXCardDescriptionStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.subheadline)
            .foregroundStyle(theme.colors.mutedForeground)
    }
}

struct AnyFLXCardDescriptionStyle: FLXCardDescriptionStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXCardDescriptionStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXCardDescriptionStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXCardDescriptionStyle? = nil
}

extension EnvironmentValues {
    var flxCardDescriptionStyle: AnyFLXCardDescriptionStyle? {
        get { self[FLXCardDescriptionStyleKey.self] }
        set { self[FLXCardDescriptionStyleKey.self] = newValue }
    }
}

extension View {
    public func flxCardDescriptionStyle<S: FLXCardDescriptionStyle>(_ style: S) -> some View {
        environment(\.flxCardDescriptionStyle, AnyFLXCardDescriptionStyle(style))
    }
}
