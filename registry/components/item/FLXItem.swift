import SwiftUI

public enum FLXItemVariant {
    case regular
    case outline
    case muted
}

public enum FLXItemSize {
    case regular
    case small
    case extraSmall
}

public enum FLXItemMediaVariant {
    case regular
    case icon
    case image
}

public struct FLXItem<Content: View>: View {
    @Environment(\.flxItemStyle) private var style

    private let variant: FLXItemVariant
    private let size: FLXItemSize
    private let content: () -> Content

    public init(
        variant: FLXItemVariant = .regular,
        size: FLXItemSize = .regular,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.variant = variant
        self.size = size
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXItemStyle(FLXDefaultItemStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content())),
            variant: variant,
            size: size
        ))
    }
}

public struct FLXItemGroup<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(spacing: FLXSpacing.xs) {
            content()
        }
    }
}

public struct FLXItemSeparator: View {
    @Environment(\.flxItemSeparatorStyle) private var style

    public init() {}

    public var body: some View {
        (style ?? AnyFLXItemSeparatorStyle(FLXDefaultItemSeparatorStyle())).makeBody(configuration: .init())
    }
}

public struct FLXItemMedia<Content: View>: View {
    @Environment(\.flxItemMediaStyle) private var style

    private let variant: FLXItemMediaVariant
    private let content: () -> Content

    public init(
        variant: FLXItemMediaVariant = .regular,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.variant = variant
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXItemMediaStyle(FLXDefaultItemMediaStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content())),
            variant: variant
        ))
    }
}

public struct FLXItemContent<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.xs) {
            content()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

public struct FLXItemTitle: View {
    @Environment(\.flxItemTitleStyle) private var style

    private let title: Text

    public init(_ titleKey: LocalizedStringKey) {
        self.title = Text(titleKey)
    }

    @_disfavoredOverload
    public init(_ titleResource: LocalizedStringResource) {
        self.title = Text(titleResource)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ title: S) {
        self.title = Text(title)
    }

    public var body: some View {
        (style ?? AnyFLXItemTitleStyle(FLXDefaultItemTitleStyle())).makeBody(configuration: .init(title: title))
    }
}

public struct FLXItemDescription: View {
    @Environment(\.flxItemDescriptionStyle) private var style

    private let text: Text

    public init(_ textKey: LocalizedStringKey) {
        self.text = Text(textKey)
    }

    @_disfavoredOverload
    public init(_ textResource: LocalizedStringResource) {
        self.text = Text(textResource)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ text: S) {
        self.text = Text(text)
    }

    public var body: some View {
        (style ?? AnyFLXItemDescriptionStyle(FLXDefaultItemDescriptionStyle())).makeBody(configuration: .init(text: text))
    }
}

public struct FLXItemActions<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        HStack(spacing: FLXSpacing.sm) {
            content()
        }
    }
}

public struct FLXItemHeader<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        HStack(spacing: FLXSpacing.sm) {
            content()
        }
        .frame(maxWidth: .infinity)
    }
}

public struct FLXItemFooter<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        HStack(spacing: FLXSpacing.sm) {
            content()
        }
        .frame(maxWidth: .infinity)
    }
}
