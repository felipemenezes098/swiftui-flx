import SwiftUI

public enum FLXEmptyMediaVariant {
    case regular
    case icon
}

public struct FLXEmpty<Content: View>: View {
    @Environment(\.flxEmptyStyle) private var style

    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXEmptyStyle(FLXDefaultEmptyStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content()))
        ))
    }
}

public struct FLXEmptyHeader<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(spacing: FLXSpacing.sm) {
            content()
        }
        .frame(maxWidth: FLXEmptyMetrics.contentMaxWidth)
        .multilineTextAlignment(.center)
        // VoiceOver reads the title and description as one element, then moves to the actions.
        .accessibilityElement(children: .combine)
    }
}

public struct FLXEmptyMedia<Content: View>: View {
    @Environment(\.flxEmptyMediaStyle) private var style

    private let variant: FLXEmptyMediaVariant
    private let content: () -> Content

    public init(
        variant: FLXEmptyMediaVariant = .regular,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.variant = variant
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXEmptyMediaStyle(FLXDefaultEmptyMediaStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content())),
            variant: variant
        ))
        // The title already says what's missing; the artwork is decorative.
        .accessibilityHidden(true)
    }
}

public struct FLXEmptyTitle: View {
    @Environment(\.flxEmptyTitleStyle) private var style

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
        (style ?? AnyFLXEmptyTitleStyle(FLXDefaultEmptyTitleStyle())).makeBody(configuration: .init(title: title))
            .accessibilityAddTraits(.isHeader)
    }
}

public struct FLXEmptyDescription: View {
    @Environment(\.flxEmptyDescriptionStyle) private var style

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
        (style ?? AnyFLXEmptyDescriptionStyle(FLXDefaultEmptyDescriptionStyle())).makeBody(configuration: .init(text: text))
    }
}

public struct FLXEmptyContent<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            content()
        }
        .frame(maxWidth: FLXEmptyMetrics.contentMaxWidth)
    }
}

private enum FLXEmptyMetrics {
    // Keeps lines short enough to read on iPad and Mac windows.
    static let contentMaxWidth: CGFloat = 384
}
