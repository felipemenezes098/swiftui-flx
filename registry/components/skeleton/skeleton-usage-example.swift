import SwiftUI

struct SkeletonUsageExample: View {
    var body: some View {
        HStack(spacing: FLXSpacing.lg) {
            FLXSkeleton()
                .frame(width: 48, height: 48)
                .clipShape(Circle())
            VStack(alignment: .leading, spacing: FLXSpacing.sm) {
                FLXSkeleton()
                    .frame(width: 220, height: 16)
                FLXSkeleton()
                    .frame(width: 160, height: 16)
            }
        }
        .padding(FLXSpacing.xl)
    }
}
