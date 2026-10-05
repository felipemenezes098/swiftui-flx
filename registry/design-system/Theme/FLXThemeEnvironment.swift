import SwiftUI

private struct FLXThemeKey: EnvironmentKey {
    static let defaultValue: FLXTheme = .default
}

extension EnvironmentValues {
    public var flxTheme: FLXTheme {
        get { self[FLXThemeKey.self] }
        set { self[FLXThemeKey.self] = newValue }
    }
}

extension View {
    public func flxTheme(_ theme: FLXTheme) -> some View {
        environment(\.flxTheme, theme)
    }
}
