import SwiftUI

public enum FLXBadgeVariant {
    case primary
    case secondary
    case destructive
    case outline
}

public struct FLXBadge: View {
    @Environment(\.flxBadgeStyle) private var style

    private let text: Text
    private let variant: FLXBadgeVariant

    public init(_ textKey: LocalizedStringKey, variant: FLXBadgeVariant = .primary) {
        self.text = Text(textKey)
        self.variant = variant
    }

    @_disfavoredOverload
    public init(_ textResource: LocalizedStringResource, variant: FLXBadgeVariant = .primary) {
        self.text = Text(textResource)
        self.variant = variant
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ text: S, variant: FLXBadgeVariant = .primary) {
        self.text = Text(text)
        self.variant = variant
    }

    public var body: some View {
        (style ?? AnyFLXBadgeStyle(FLXDefaultBadgeStyle())).makeBody(configuration: .init(text: text, variant: variant))
    }
}
