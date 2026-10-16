import SwiftUI

extension FLXTheme {
    public static let `default` = FLXTheme(
        colors: FLXColorTokens(
            background: Color(
                flxLight: Color(red: 0.9816, green: 0.9816, blue: 0.9816),
                dark: Color(red: 0.0666, green: 0.0666, blue: 0.0666)
            ),
            foreground: Color(
                flxLight: Color(red: 0.1255, green: 0.1255, blue: 0.1255),
                dark: Color(red: 0.9333, green: 0.9333, blue: 0.9333)
            ),
            card: Color(
                flxLight: Color(red: 0.9999, green: 1.0000, blue: 1.0000),
                dark: Color(red: 0.0980, green: 0.0980, blue: 0.0980)
            ),
            cardForeground: Color(
                flxLight: Color(red: 0.1255, green: 0.1255, blue: 0.1255),
                dark: Color(red: 0.9333, green: 0.9333, blue: 0.9333)
            ),
            popover: Color(
                flxLight: Color(red: 0.9816, green: 0.9816, blue: 0.9816),
                dark: Color(red: 0.0980, green: 0.0980, blue: 0.0980)
            ),
            popoverForeground: Color(
                flxLight: Color(red: 0.1255, green: 0.1255, blue: 0.1255),
                dark: Color(red: 0.9333, green: 0.9333, blue: 0.9333)
            ),
            primary: Color(
                flxLight: Color(red: 0.3060, green: 0.2392, blue: 0.2157),
                dark: Color(red: 0.9883, green: 0.9883, blue: 0.9883)
            ),
            primaryForeground: Color(
                flxLight: Color(red: 1.0000, green: 1.0000, blue: 1.0000),
                dark: Color(red: 0.0313, green: 0.1019, blue: 0.1059)
            ),
            secondary: Color(
                flxLight: Color(red: 0.9411, green: 0.9411, blue: 0.9411),
                dark: Color(red: 0.1215, green: 0.1176, blue: 0.1099)
            ),
            secondaryForeground: Color(
                flxLight: Color(red: 0.2707, green: 0.1686, blue: 0.1294),
                dark: Color(red: 1.0000, green: 1.0000, blue: 1.0000)
            ),
            muted: Color(
                flxLight: Color(red: 0.9372, green: 0.9372, blue: 0.9372),
                dark: Color(red: 0.1334, green: 0.1334, blue: 0.1334)
            ),
            mutedForeground: Color(
                flxLight: Color(red: 0.3921, green: 0.3921, blue: 0.3921),
                dark: Color(red: 0.7058, green: 0.7058, blue: 0.7058)
            ),
            accent: Color(
                flxLight: Color(red: 0.9098, green: 0.9098, blue: 0.9098),
                dark: Color(red: 0.1647, green: 0.1647, blue: 0.1647)
            ),
            accentForeground: Color(
                flxLight: Color(red: 0.1255, green: 0.1255, blue: 0.1255),
                dark: Color(red: 0.9333, green: 0.9333, blue: 0.9333)
            ),
            destructive: Color(
                flxLight: Color(red: 0.8276, green: 0.2257, blue: 0.1029),
                dark: Color(red: 0.8994, green: 0.3111, blue: 0.1911)
            ),
            destructiveForeground: Color(
                flxLight: Color(red: 1.0000, green: 1.0000, blue: 1.0000),
                dark: Color(red: 1.0000, green: 1.0000, blue: 1.0000)
            ),
            border: Color(
                flxLight: Color(red: 0.9111, green: 0.9111, blue: 0.9111),
                dark: Color(red: 0.1255, green: 0.1176, blue: 0.0941)
            ),
            input: Color(
                flxLight: Color(red: 0.8470, green: 0.8470, blue: 0.8470),
                dark: Color(red: 0.1764, green: 0.1765, blue: 0.1765)
            ),
            ring: Color(
                flxLight: Color(red: 0.3922, green: 0.2902, blue: 0.2510),
                dark: Color(red: 1.0000, green: 0.8784, blue: 0.7607)
            )
        ),
        radius: FLXRadiusScale(base: 0.7 * 16)
    )
}
