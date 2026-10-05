import SwiftUI

struct BadgeUsageExample: View {
    var body: some View {
        HStack(spacing: FLXSpacing.sm) {
            FLXBadge("Primary", variant: .primary)
            FLXBadge("Secondary", variant: .secondary)
            FLXBadge("Destructive", variant: .destructive)
            FLXBadge("Outline", variant: .outline)
        }
        .padding(FLXSpacing.xl)
    }
}
