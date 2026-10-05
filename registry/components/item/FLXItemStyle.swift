import SwiftUI

@MainActor
public protocol FLXItemStyle {
    associatedtype Body: View
    typealias Configuration = FLXItemStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXItemStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
    public let variant: FLXItemVariant
    public let size: FLXItemSize
}

public struct FLXDefaultItemStyle: FLXItemStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultItemStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultItemStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXItemStyleConfiguration

    var body: some View {
        HStack(alignment: .center, spacing: FLXSpacing.md) {
            configuration.content
        }
        .padding(padding)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(backgroundColor)
        .overlay(
            RoundedRectangle(cornerRadius: theme.radius.lg)
                .strokeBorder(borderColor, lineWidth: configuration.variant == .outline ? FLXBorderWidth.thin : 0)
        )
        .clipShape(RoundedRectangle(cornerRadius: theme.radius.lg))
    }

    private var padding: CGFloat {
        switch configuration.size {
        case .regular: FLXSpacing.lg
        case .small: FLXSpacing.md
        case .extraSmall: FLXSpacing.sm
        }
    }

    private var backgroundColor: Color {
        switch configuration.variant {
        case .regular, .outline: .clear
        case .muted: theme.colors.muted
        }
    }

    private var borderColor: Color {
        switch configuration.variant {
        case .outline: theme.colors.border
        case .regular, .muted: .clear
        }
    }
}

struct AnyFLXItemStyle: FLXItemStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXItemStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXItemStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXItemStyle? = nil
}

extension EnvironmentValues {
    var flxItemStyle: AnyFLXItemStyle? {
        get { self[FLXItemStyleKey.self] }
        set { self[FLXItemStyleKey.self] = newValue }
    }
}

extension View {
    public func flxItemStyle<S: FLXItemStyle>(_ style: S) -> some View {
        environment(\.flxItemStyle, AnyFLXItemStyle(style))
    }
}

@MainActor
public protocol FLXItemMediaStyle {
    associatedtype Body: View
    typealias Configuration = FLXItemMediaStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXItemMediaStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
    public let variant: FLXItemMediaVariant
}

public struct FLXDefaultItemMediaStyle: FLXItemMediaStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultItemMediaStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultItemMediaStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    let configuration: FLXItemMediaStyleConfiguration

    var body: some View {
        switch configuration.variant {
        case .regular:
            configuration.content
        case .icon:
            configuration.content
                .font(.system(size: FLXItemMetrics.iconSize * scale))
                .foregroundStyle(theme.colors.mutedForeground)
                .frame(width: mediaDiameter, height: mediaDiameter)
                .background(theme.colors.muted)
                .overlay(
                    RoundedRectangle(cornerRadius: theme.radius.md)
                        .strokeBorder(theme.colors.border, lineWidth: FLXBorderWidth.thin)
                )
                .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
        case .image:
            configuration.content
                .frame(width: mediaDiameter, height: mediaDiameter)
                .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
        }
    }

    private var mediaDiameter: CGFloat {
        FLXItemMetrics.mediaDiameter * scale
    }
}

struct AnyFLXItemMediaStyle: FLXItemMediaStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXItemMediaStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXItemMediaStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXItemMediaStyle? = nil
}

extension EnvironmentValues {
    var flxItemMediaStyle: AnyFLXItemMediaStyle? {
        get { self[FLXItemMediaStyleKey.self] }
        set { self[FLXItemMediaStyleKey.self] = newValue }
    }
}

extension View {
    public func flxItemMediaStyle<S: FLXItemMediaStyle>(_ style: S) -> some View {
        environment(\.flxItemMediaStyle, AnyFLXItemMediaStyle(style))
    }
}

@MainActor
public protocol FLXItemTitleStyle {
    associatedtype Body: View
    typealias Configuration = FLXItemTitleStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXItemTitleStyleConfiguration {
    public let title: Text
}

public struct FLXDefaultItemTitleStyle: FLXItemTitleStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultItemTitleStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultItemTitleStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXItemTitleStyleConfiguration

    var body: some View {
        configuration.title
            .flxFont(.callout, weight: .medium)
            .foregroundStyle(theme.colors.foreground)
            .lineLimit(1)
    }
}

struct AnyFLXItemTitleStyle: FLXItemTitleStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXItemTitleStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXItemTitleStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXItemTitleStyle? = nil
}

extension EnvironmentValues {
    var flxItemTitleStyle: AnyFLXItemTitleStyle? {
        get { self[FLXItemTitleStyleKey.self] }
        set { self[FLXItemTitleStyleKey.self] = newValue }
    }
}

extension View {
    public func flxItemTitleStyle<S: FLXItemTitleStyle>(_ style: S) -> some View {
        environment(\.flxItemTitleStyle, AnyFLXItemTitleStyle(style))
    }
}

@MainActor
public protocol FLXItemSeparatorStyle {
    associatedtype Body: View
    typealias Configuration = FLXItemSeparatorStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXItemSeparatorStyleConfiguration {}

public struct FLXDefaultItemSeparatorStyle: FLXItemSeparatorStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultItemSeparatorStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultItemSeparatorStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXItemSeparatorStyleConfiguration

    var body: some View {
        Rectangle()
            .fill(theme.colors.border)
            .frame(height: FLXBorderWidth.thin)
    }
}

struct AnyFLXItemSeparatorStyle: FLXItemSeparatorStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXItemSeparatorStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXItemSeparatorStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXItemSeparatorStyle? = nil
}

extension EnvironmentValues {
    var flxItemSeparatorStyle: AnyFLXItemSeparatorStyle? {
        get { self[FLXItemSeparatorStyleKey.self] }
        set { self[FLXItemSeparatorStyleKey.self] = newValue }
    }
}

extension View {
    public func flxItemSeparatorStyle<S: FLXItemSeparatorStyle>(_ style: S) -> some View {
        environment(\.flxItemSeparatorStyle, AnyFLXItemSeparatorStyle(style))
    }
}

@MainActor
public protocol FLXItemDescriptionStyle {
    associatedtype Body: View
    typealias Configuration = FLXItemDescriptionStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXItemDescriptionStyleConfiguration {
    public let text: Text
}

public struct FLXDefaultItemDescriptionStyle: FLXItemDescriptionStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultItemDescriptionStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultItemDescriptionStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXItemDescriptionStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.subheadline)
            .foregroundStyle(theme.colors.mutedForeground)
            .lineLimit(2)
    }
}

struct AnyFLXItemDescriptionStyle: FLXItemDescriptionStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXItemDescriptionStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXItemDescriptionStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXItemDescriptionStyle? = nil
}

extension EnvironmentValues {
    var flxItemDescriptionStyle: AnyFLXItemDescriptionStyle? {
        get { self[FLXItemDescriptionStyleKey.self] }
        set { self[FLXItemDescriptionStyleKey.self] = newValue }
    }
}

extension View {
    public func flxItemDescriptionStyle<S: FLXItemDescriptionStyle>(_ style: S) -> some View {
        environment(\.flxItemDescriptionStyle, AnyFLXItemDescriptionStyle(style))
    }
}

private enum FLXItemMetrics {
    static let mediaDiameter: CGFloat = 40
    static let iconSize: CGFloat = 18
}
