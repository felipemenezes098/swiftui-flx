import SwiftUI

@MainActor
public protocol FLXTextFieldGroupStyle {
    associatedtype Body: View
    typealias Configuration = FLXTextFieldGroupStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXTextFieldGroupStyleConfiguration {
    public struct Content: View {
        let underlyingContent: AnyView
        public var body: some View { underlyingContent }
    }
    public let content: Content
    public let isFocused: Bool
}

public struct FLXDefaultTextFieldGroupStyle: FLXTextFieldGroupStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultTextFieldGroupStyleBody(configuration: configuration)
    }
}

private struct FLXDefaultTextFieldGroupStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXTextFieldGroupStyleConfiguration

    var body: some View {
        configuration.content
            .background(theme.colors.card)
            .overlay(
                RoundedRectangle(cornerRadius: theme.radius.md)
                    .strokeBorder(borderColor, lineWidth: borderWidth)
            )
            .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
            .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }

    private var borderColor: Color {
        #if os(macOS)
        if configuration.isFocused { return theme.colors.ring }
        #endif
        return theme.colors.input
    }

    private var borderWidth: CGFloat {
        #if os(macOS)
        if configuration.isFocused { return FLXBorderWidth.thick }
        #endif
        return FLXBorderWidth.thin
    }
}

struct AnyFLXTextFieldGroupStyle: FLXTextFieldGroupStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXTextFieldGroupStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXTextFieldGroupStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXTextFieldGroupStyle? = nil
}

extension EnvironmentValues {
    var flxTextFieldGroupStyle: AnyFLXTextFieldGroupStyle? {
        get { self[FLXTextFieldGroupStyleKey.self] }
        set { self[FLXTextFieldGroupStyleKey.self] = newValue }
    }
}

extension View {
    public func flxTextFieldGroupStyle<S: FLXTextFieldGroupStyle>(_ style: S) -> some View {
        environment(\.flxTextFieldGroupStyle, AnyFLXTextFieldGroupStyle(style))
    }
}
