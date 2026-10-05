import Foundation

public struct FLXTheme: Sendable {
    public var colors: FLXColorTokens
    public var radius: FLXRadiusScale

    public init(colors: FLXColorTokens, radius: FLXRadiusScale) {
        self.colors = colors
        self.radius = radius
    }
}
