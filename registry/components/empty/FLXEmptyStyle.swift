import SwiftUI

@MainActor
public protocol FLXEmptyStyle {
    associatedtype Body: View
    typealias Configuration = FLXEmptyStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXEmptyStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
}

public struct FLXDefaultEmptyStyle: FLXEmptyStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultEmptyStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultEmptyStyleBody: View {
    let configuration: FLXEmptyStyleConfiguration

    var body: some View {
        VStack(spacing: FLXSpacing.xl) {
            configuration.content
        }
        .padding(FLXSpacing.xl)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct AnyFLXEmptyStyle: FLXEmptyStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXEmptyStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXEmptyStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXEmptyStyle? = nil
}

extension EnvironmentValues {
    var flxEmptyStyle: AnyFLXEmptyStyle? {
        get { self[FLXEmptyStyleKey.self] }
        set { self[FLXEmptyStyleKey.self] = newValue }
    }
}

extension View {
    public func flxEmptyStyle<S: FLXEmptyStyle>(_ style: S) -> some View {
        environment(\.flxEmptyStyle, AnyFLXEmptyStyle(style))
    }
}

@MainActor
public protocol FLXEmptyMediaStyle {
    associatedtype Body: View
    typealias Configuration = FLXEmptyMediaStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXEmptyMediaStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
    public let variant: FLXEmptyMediaVariant
}

public struct FLXDefaultEmptyMediaStyle: FLXEmptyMediaStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultEmptyMediaStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultEmptyMediaStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    let configuration: FLXEmptyMediaStyleConfiguration

    var body: some View {
        media
            .padding(.bottom, FLXSpacing.sm)
    }

    @ViewBuilder
    private var media: some View {
        switch configuration.variant {
        case .regular:
            configuration.content
        case .icon:
            configuration.content
                .font(.system(size: FLXEmptyMediaMetrics.iconSize * scale))
                .foregroundStyle(theme.colors.foreground)
                .frame(width: mediaDiameter, height: mediaDiameter)
                .background(theme.colors.muted)
                .clipShape(RoundedRectangle(cornerRadius: theme.radius.lg))
        }
    }

    private var mediaDiameter: CGFloat {
        FLXEmptyMediaMetrics.mediaDiameter * scale
    }
}

struct AnyFLXEmptyMediaStyle: FLXEmptyMediaStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXEmptyMediaStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXEmptyMediaStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXEmptyMediaStyle? = nil
}

extension EnvironmentValues {
    var flxEmptyMediaStyle: AnyFLXEmptyMediaStyle? {
        get { self[FLXEmptyMediaStyleKey.self] }
        set { self[FLXEmptyMediaStyleKey.self] = newValue }
    }
}

extension View {
    public func flxEmptyMediaStyle<S: FLXEmptyMediaStyle>(_ style: S) -> some View {
        environment(\.flxEmptyMediaStyle, AnyFLXEmptyMediaStyle(style))
    }
}

@MainActor
public protocol FLXEmptyTitleStyle {
    associatedtype Body: View
    typealias Configuration = FLXEmptyTitleStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXEmptyTitleStyleConfiguration {
    public let title: Text
}

public struct FLXDefaultEmptyTitleStyle: FLXEmptyTitleStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultEmptyTitleStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultEmptyTitleStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXEmptyTitleStyleConfiguration

    var body: some View {
        configuration.title
            .flxFont(.title3)
            .foregroundStyle(theme.colors.foreground)
    }
}

struct AnyFLXEmptyTitleStyle: FLXEmptyTitleStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXEmptyTitleStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXEmptyTitleStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXEmptyTitleStyle? = nil
}

extension EnvironmentValues {
    var flxEmptyTitleStyle: AnyFLXEmptyTitleStyle? {
        get { self[FLXEmptyTitleStyleKey.self] }
        set { self[FLXEmptyTitleStyleKey.self] = newValue }
    }
}

extension View {
    public func flxEmptyTitleStyle<S: FLXEmptyTitleStyle>(_ style: S) -> some View {
        environment(\.flxEmptyTitleStyle, AnyFLXEmptyTitleStyle(style))
    }
}

@MainActor
public protocol FLXEmptyDescriptionStyle {
    associatedtype Body: View
    typealias Configuration = FLXEmptyDescriptionStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXEmptyDescriptionStyleConfiguration {
    public let text: Text
}

public struct FLXDefaultEmptyDescriptionStyle: FLXEmptyDescriptionStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultEmptyDescriptionStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultEmptyDescriptionStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXEmptyDescriptionStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.subheadline)
            .foregroundStyle(theme.colors.mutedForeground)
    }
}

struct AnyFLXEmptyDescriptionStyle: FLXEmptyDescriptionStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXEmptyDescriptionStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXEmptyDescriptionStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXEmptyDescriptionStyle? = nil
}

extension EnvironmentValues {
    var flxEmptyDescriptionStyle: AnyFLXEmptyDescriptionStyle? {
        get { self[FLXEmptyDescriptionStyleKey.self] }
        set { self[FLXEmptyDescriptionStyleKey.self] = newValue }
    }
}

extension View {
    public func flxEmptyDescriptionStyle<S: FLXEmptyDescriptionStyle>(_ style: S) -> some View {
        environment(\.flxEmptyDescriptionStyle, AnyFLXEmptyDescriptionStyle(style))
    }
}

private enum FLXEmptyMediaMetrics {
    static let mediaDiameter: CGFloat = 40
    static let iconSize: CGFloat = 24
}
