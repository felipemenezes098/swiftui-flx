import SwiftUI

extension FLXTheme {
    public static let sienna = FLXTheme(
        colors: FLXColorTokens(
            background: Color(
                flxLight: Color(red: 0.9779, green: 0.9657, blue: 0.9475),
                dark: Color(red: 0.0666, green: 0.0666, blue: 0.0666)
            ),
            foreground: Color(
                flxLight: Color(red: 0.1788, green: 0.1421, blue: 0.1181),
                dark: Color(red: 0.9324, green: 0.9203, blue: 0.8990)
            ),
            card: Color(
                flxLight: Color(red: 1.0000, green: 0.9993, blue: 0.9858),
                dark: Color(red: 0.0823, green: 0.0784, blue: 0.0785)
            ),
            cardForeground: Color(
                flxLight: Color(red: 0.1788, green: 0.1421, blue: 0.1181),
                dark: Color(red: 0.9324, green: 0.9203, blue: 0.8990)
            ),
            popover: Color(
                flxLight: Color(red: 1.0000, green: 0.9993, blue: 0.9858),
                dark: Color(red: 0.0823, green: 0.0784, blue: 0.0785)
            ),
            popoverForeground: Color(
                flxLight: Color(red: 0.1788, green: 0.1421, blue: 0.1181),
                dark: Color(red: 0.9324, green: 0.9203, blue: 0.8990)
            ),
            primary: Color(
                flxLight: Color(red: 0.2591, green: 0.1929, blue: 0.1536),
                dark: Color(red: 0.9054, green: 0.8651, blue: 0.7998)
            ),
            primaryForeground: Color(
                flxLight: Color(red: 0.9820, green: 0.9728, blue: 0.9567),
                dark: Color(red: 0.1496, green: 0.1141, blue: 0.0908)
            ),
            secondary: Color(
                flxLight: Color(red: 0.9432, green: 0.9259, blue: 0.9001),
                dark: Color(red: 0.1627, green: 0.1411, blue: 0.1256)
            ),
            secondaryForeground: Color(
                flxLight: Color(red: 0.2393, green: 0.1865, blue: 0.1555),
                dark: Color(red: 0.9324, green: 0.9203, blue: 0.8990)
            ),
            muted: Color(
                flxLight: Color(red: 0.9548, green: 0.9391, blue: 0.9159),
                dark: Color(red: 0.1564, green: 0.1369, blue: 0.1229)
            ),
            mutedForeground: Color(
                flxLight: Color(red: 0.4289, green: 0.3966, blue: 0.3699),
                dark: Color(red: 0.6859, green: 0.6588, blue: 0.6270)
            ),
            accent: Color(
                flxLight: Color(red: 0.9352, green: 0.9040, blue: 0.8646),
                dark: Color(red: 0.2005, green: 0.1740, blue: 0.1519)
            ),
            accentForeground: Color(
                flxLight: Color(red: 0.2016, green: 0.1602, blue: 0.1330),
                dark: Color(red: 0.9324, green: 0.9203, blue: 0.8990)
            ),
            destructive: Color(
                flxLight: Color(red: 0.7640, green: 0.2728, blue: 0.1895),
                dark: Color(red: 0.8199, green: 0.3528, blue: 0.2736)
            ),
            destructiveForeground: Color(
                flxLight: Color(red: 0.9924, green: 0.9863, blue: 0.9755),
                dark: Color(red: 0.9792, green: 0.9731, blue: 0.9624)
            ),
            border: Color(
                flxLight: Color(red: 0.9043, green: 0.8870, blue: 0.8615),
                dark: Color(red: 0.1832, green: 0.1600, blue: 0.1421)
            ),
            input: Color(
                flxLight: Color(red: 0.8671, green: 0.8483, blue: 0.8204),
                dark: Color(red: 0.2130, green: 0.1892, blue: 0.1708)
            ),
            ring: Color(
                flxLight: Color(red: 0.2591, green: 0.1929, blue: 0.1536),
                dark: Color(red: 0.9054, green: 0.8651, blue: 0.7998)
            )
        ),
        radius: FLXRadiusScale(base: 0.875 * 16) // --radius: 0.875rem
    )
}
