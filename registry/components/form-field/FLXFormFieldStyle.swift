import SwiftUI

@MainActor
public protocol FLXFormFieldStyle {
    associatedtype Body: View
    typealias Configuration = FLXFormFieldStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXFormFieldStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }

    public let content: Content
}

public struct FLXDefaultFormFieldStyle: FLXFormFieldStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultFormFieldStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultFormFieldStyleBody: View {
    let configuration: FLXFormFieldStyleConfiguration

    var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.sm) {
            configuration.content
        }
    }
}

struct AnyFLXFormFieldStyle: FLXFormFieldStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXFormFieldStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXFormFieldStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXFormFieldStyle? = nil
}

extension EnvironmentValues {
    var flxFormFieldStyle: AnyFLXFormFieldStyle? {
        get { self[FLXFormFieldStyleKey.self] }
        set { self[FLXFormFieldStyleKey.self] = newValue }
    }
}

extension View {
    public func flxFormFieldStyle<S: FLXFormFieldStyle>(_ style: S) -> some View {
        environment(\.flxFormFieldStyle, AnyFLXFormFieldStyle(style))
    }
}

@MainActor
public protocol FLXFormFieldDescriptionStyle {
    associatedtype Body: View
    typealias Configuration = FLXFormFieldDescriptionStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXFormFieldDescriptionStyleConfiguration {
    public let text: Text
}

public struct FLXDefaultFormFieldDescriptionStyle: FLXFormFieldDescriptionStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultFormFieldDescriptionStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultFormFieldDescriptionStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXFormFieldDescriptionStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.footnote)
            .foregroundStyle(theme.colors.mutedForeground)
            .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }
}

struct AnyFLXFormFieldDescriptionStyle: FLXFormFieldDescriptionStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXFormFieldDescriptionStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXFormFieldDescriptionStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXFormFieldDescriptionStyle? = nil
}

extension EnvironmentValues {
    var flxFormFieldDescriptionStyle: AnyFLXFormFieldDescriptionStyle? {
        get { self[FLXFormFieldDescriptionStyleKey.self] }
        set { self[FLXFormFieldDescriptionStyleKey.self] = newValue }
    }
}

extension View {
    public func flxFormFieldDescriptionStyle<S: FLXFormFieldDescriptionStyle>(_ style: S) -> some View {
        environment(\.flxFormFieldDescriptionStyle, AnyFLXFormFieldDescriptionStyle(style))
    }
}

@MainActor
public protocol FLXFormFieldErrorStyle {
    associatedtype Body: View
    typealias Configuration = FLXFormFieldErrorStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXFormFieldErrorStyleConfiguration {
    public let text: Text
}

public struct FLXDefaultFormFieldErrorStyle: FLXFormFieldErrorStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultFormFieldErrorStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultFormFieldErrorStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXFormFieldErrorStyleConfiguration

    var body: some View {
        configuration.text
            .flxFont(.footnote)
            .foregroundStyle(theme.colors.destructive)
            .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }
}

struct AnyFLXFormFieldErrorStyle: FLXFormFieldErrorStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXFormFieldErrorStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXFormFieldErrorStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXFormFieldErrorStyle? = nil
}

extension EnvironmentValues {
    var flxFormFieldErrorStyle: AnyFLXFormFieldErrorStyle? {
        get { self[FLXFormFieldErrorStyleKey.self] }
        set { self[FLXFormFieldErrorStyleKey.self] = newValue }
    }
}

extension View {
    public func flxFormFieldErrorStyle<S: FLXFormFieldErrorStyle>(_ style: S) -> some View {
        environment(\.flxFormFieldErrorStyle, AnyFLXFormFieldErrorStyle(style))
    }
}
