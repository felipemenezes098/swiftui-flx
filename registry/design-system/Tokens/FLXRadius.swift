import CoreGraphics

public struct FLXRadiusScale: Sendable {
    public var base: CGFloat

    public init(base: CGFloat) {
        self.base = base
    }

    public var sm: CGFloat { max(0, base - 4) }
    public var md: CGFloat { max(0, base - 2) }
    public var lg: CGFloat { base }
    public var xl: CGFloat { base + 4 }
    public var xxl: CGFloat { base + 8 }
    public var full: CGFloat { 9999 }
}
