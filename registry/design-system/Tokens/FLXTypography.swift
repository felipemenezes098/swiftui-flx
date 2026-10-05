import SwiftUI

public enum FLXTypography {
    case largeTitle
    case title
    case title2
    case title3

    case headline
    case body
    case callout

    case subheadline
    case footnote
    case caption
    case caption2

    public var weight: Font.Weight {
        switch self {
        case .largeTitle, .title: .bold
        case .title2, .title3, .headline: .semibold
        case .body, .callout, .subheadline, .footnote, .caption, .caption2: .regular
        }
    }

    public var textStyle: Font.TextStyle {
        switch self {
        case .largeTitle: .largeTitle
        case .title: .title
        case .title2: .title2
        case .title3: .title3
        case .headline: .headline
        case .body: .body
        case .callout: .callout
        case .subheadline: .subheadline
        case .footnote: .footnote
        case .caption: .caption
        case .caption2: .caption2
        }
    }

    public static func control(_ controlSize: ControlSize) -> FLXTypography {
        switch controlSize {
        case .mini, .small: .subheadline
        case .regular, .large, .extraLarge: .body
        @unknown default: .body
        }
    }
}

private struct FLXFontModifier: ViewModifier {
    private let typography: FLXTypography
    private let weight: Font.Weight

    init(typography: FLXTypography, weight: Font.Weight?) {
        self.typography = typography
        self.weight = weight ?? typography.weight
    }

    func body(content: Content) -> some View {
        content.font(.system(typography.textStyle, weight: weight))
    }
}

extension View {
    public func flxFont(_ typography: FLXTypography, weight: Font.Weight? = nil) -> some View {
        modifier(FLXFontModifier(typography: typography, weight: weight))
    }
}
