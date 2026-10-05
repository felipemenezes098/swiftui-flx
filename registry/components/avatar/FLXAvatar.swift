import SwiftUI

public enum FLXAvatarSize {
    case small
    case medium
    case large

    public var diameter: CGFloat {
        switch self {
        case .small: 32
        case .medium: 40
        case .large: 56
        }
    }

    public var typography: FLXTypography {
        switch self {
        case .small: .footnote
        case .medium: .callout
        case .large: .title3
        }
    }

    public var badgeDiameter: CGFloat {
        switch self {
        case .small: 8
        case .medium: 10
        case .large: 12
        }
    }
}

public struct FLXAvatar<Content: View>: View {
    @Environment(\.flxAvatarStyle) private var style

    private let size: FLXAvatarSize
    private let content: () -> Content

    public init(
        size: FLXAvatarSize = .medium,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.size = size
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXAvatarStyle(FLXDefaultAvatarStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content())),
            size: size
        ))
        .dynamicTypeSize(...FLXAvatarMetrics.largestDynamicTypeSize)
    }
}

public struct FLXAvatarImage: View {
    private let url: URL?

    public init(url: URL?) {
        self.url = url
    }

    public var body: some View {
        AsyncImage(url: url) { image in
            image
                .resizable()
                .scaledToFill()
        } placeholder: {
            Color.clear
        }
        .clipShape(Circle())
    }
}

public struct FLXAvatarFallback: View {
    @Environment(\.flxTheme) private var theme

    private let text: String

    public init(_ text: String) {
        self.text = text
    }

    public var body: some View {
        Text(text.uppercased())
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(theme.colors.muted)
            .clipShape(Circle())
    }
}

public struct FLXAvatarBadge: View {
    @Environment(\.flxTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    private let size: FLXAvatarSize

    public init(size: FLXAvatarSize = .medium) {
        self.size = size
    }

    public var body: some View {
        Circle()
            .fill(theme.colors.primary)
            .frame(width: size.badgeDiameter * scale, height: size.badgeDiameter * scale)
            .overlay(
                Circle().strokeBorder(theme.colors.background, lineWidth: FLXBorderWidth.regular)
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
    }
}

public struct FLXAvatarGroup<Content: View>: View {
    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        HStack(spacing: -FLXSpacing.sm) {
            content()
        }
    }
}

public struct FLXAvatarGroupCount: View {
    private let count: Int
    private let size: FLXAvatarSize

    public init(count: Int, size: FLXAvatarSize = .medium) {
        self.count = count
        self.size = size
    }

    public var body: some View {
        FLXAvatarGroupCountBody(count: count, size: size)
            .dynamicTypeSize(...FLXAvatarMetrics.largestDynamicTypeSize)
    }
}

private struct FLXAvatarGroupCountBody: View {
    @Environment(\.flxTheme) private var theme
    @ScaledMetric(relativeTo: .body) private var scale: CGFloat = 1

    let count: Int
    let size: FLXAvatarSize

    var body: some View {
        Text("+\(count)")
            .flxFont(size.typography)
            .foregroundStyle(theme.colors.mutedForeground)
            .frame(width: size.diameter * scale, height: size.diameter * scale)
            .background(theme.colors.muted)
            .clipShape(Circle())
            .overlay(
                Circle().strokeBorder(theme.colors.border, lineWidth: FLXBorderWidth.thin)
            )
    }
}

private enum FLXAvatarMetrics {
    /// Avatars are pictures, not text to read, so they stop growing at AX2
    /// (about 2x) instead of filling the screen at the largest sizes.
    static let largestDynamicTypeSize: DynamicTypeSize = .accessibility2
}
