import SwiftUI

/// A placeholder block shown while content loads. It fills the size it's
/// offered, so the caller sets its shape with `.frame` (and `.clipShape` for
/// a circle), like shadcn/ui's `className`. To turn an existing view into a
/// placeholder instead, use SwiftUI's `.redacted(reason: .placeholder)`.
public struct FLXSkeleton: View {
    @Environment(\.flxSkeletonStyle) private var style

    public init() {}

    public var body: some View {
        (style ?? AnyFLXSkeletonStyle(FLXDefaultSkeletonStyle())).makeBody(configuration: .init())
            .accessibilityHidden(true)
    }
}
