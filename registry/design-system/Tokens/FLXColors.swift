import SwiftUI

public struct FLXColorTokens: Sendable {
    public var background: Color
    public var foreground: Color

    public var card: Color
    public var cardForeground: Color

    public var popover: Color
    public var popoverForeground: Color

    public var primary: Color
    public var primaryForeground: Color

    public var secondary: Color
    public var secondaryForeground: Color

    public var muted: Color
    public var mutedForeground: Color

    public var accent: Color
    public var accentForeground: Color

    public var destructive: Color
    public var destructiveForeground: Color

    public var border: Color
    public var input: Color
    public var ring: Color

    public init(
        background: Color,
        foreground: Color,
        card: Color,
        cardForeground: Color,
        popover: Color,
        popoverForeground: Color,
        primary: Color,
        primaryForeground: Color,
        secondary: Color,
        secondaryForeground: Color,
        muted: Color,
        mutedForeground: Color,
        accent: Color,
        accentForeground: Color,
        destructive: Color,
        destructiveForeground: Color,
        border: Color,
        input: Color,
        ring: Color
    ) {
        self.background = background
        self.foreground = foreground
        self.card = card
        self.cardForeground = cardForeground
        self.popover = popover
        self.popoverForeground = popoverForeground
        self.primary = primary
        self.primaryForeground = primaryForeground
        self.secondary = secondary
        self.secondaryForeground = secondaryForeground
        self.muted = muted
        self.mutedForeground = mutedForeground
        self.accent = accent
        self.accentForeground = accentForeground
        self.destructive = destructive
        self.destructiveForeground = destructiveForeground
        self.border = border
        self.input = input
        self.ring = ring
    }
}
