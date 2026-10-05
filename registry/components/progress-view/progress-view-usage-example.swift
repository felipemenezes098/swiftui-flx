import SwiftUI

struct ProgressViewUsageExample: View {
    var body: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.xl) {
            FLXProgressView(value: 0.25)
            FLXProgressView("Downloading", value: 0.6)
            FLXProgressView()
            FLXProgressView("Syncing")
        }
        .padding(FLXSpacing.xl)
    }
}
