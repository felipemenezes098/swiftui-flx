import SwiftUI

struct ButtonUsageExample: View {
    var body: some View {
        VStack(spacing: FLXSpacing.md) {
            FLXButton("Primary", variant: .primary) {}
            FLXButton("Destructive", role: .destructive) {}
            FLXButton("Outline", variant: .outline) {}
            FLXButton("Secondary", variant: .secondary) {}
            FLXButton("Ghost", variant: .ghost) {}
            FLXButton("Link", variant: .link) {}
        }
        .padding(FLXSpacing.xl)
    }
}
