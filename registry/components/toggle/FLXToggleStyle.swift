import SwiftUI

public struct FLXToggleStyle: ToggleStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXToggleStyleBody(configuration: configuration)
    }
}

struct AnyFLXToggleStyle: ToggleStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: ToggleStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> some View {
        _makeBody(configuration)
    }
}

private struct FLXToggleStyleOverrideKey: EnvironmentKey {
    static let defaultValue: AnyFLXToggleStyle? = nil
}

extension EnvironmentValues {
    var flxToggleStyleOverride: AnyFLXToggleStyle? {
        get { self[FLXToggleStyleOverrideKey.self] }
        set { self[FLXToggleStyleOverrideKey.self] = newValue }
    }
}

extension View {
    public func flxToggleStyle<S: ToggleStyle>(_ style: S) -> some View {
        environment(\.flxToggleStyleOverride, AnyFLXToggleStyle(style))
    }
}
