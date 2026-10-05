import SwiftUI

public struct FLXCard<Content: View>: View {
    @Environment(\.flxCardStyle) private var style

    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXCardStyle(FLXDefaultCardStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content()))
        ))
    }
}

public struct FLXCardHeader<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.xs) {
            content()
        }
    }
}

public struct FLXCardTitle: View {
    @Environment(\.flxCardTitleStyle) private var style

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
        (style ?? AnyFLXCardTitleStyle(FLXDefaultCardTitleStyle())).makeBody(configuration: .init(title: title))
    }
}

public struct FLXCardDescription: View {
    @Environment(\.flxCardDescriptionStyle) private var style

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
        (style ?? AnyFLXCardDescriptionStyle(FLXDefaultCardDescriptionStyle())).makeBody(configuration: .init(text: text))
    }
}

public struct FLXCardContent<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        content()
    }
}

public struct FLXCardFooter<Content: View>: View {
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
