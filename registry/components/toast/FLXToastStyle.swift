import SwiftUI

@available(macOS, unavailable)
@MainActor
public protocol FLXToastStyle {
    associatedtype Body: View
    typealias Configuration = FLXToastStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

@available(macOS, unavailable)
public struct FLXToastStyleConfiguration {
    // The caller's actions plus the close button. Nil when the toast has no
    // actions, so it dismisses on its own.
    public struct Actions: View {
        let underlyingActions: AnyView
        public var body: some View { underlyingActions }
    }

    public let title: Text
    public let message: Text?
    public let systemImage: String?
    public let actions: Actions?
}

@available(macOS, unavailable)
public struct FLXDefaultToastStyle: FLXToastStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXToastStyleBody(configuration: configuration)
    }
}

@available(macOS, unavailable)
struct AnyFLXToastStyle: FLXToastStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXToastStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

@available(macOS, unavailable)
private struct FLXToastStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXToastStyle? = nil
}

@available(macOS, unavailable)
extension EnvironmentValues {
    var flxToastStyle: AnyFLXToastStyle? {
        get { self[FLXToastStyleKey.self] }
        set { self[FLXToastStyleKey.self] = newValue }
    }
}

@available(macOS, unavailable)
extension View {
    public func flxToastStyle<S: FLXToastStyle>(_ style: S) -> some View {
        environment(\.flxToastStyle, AnyFLXToastStyle(style))
    }
}
