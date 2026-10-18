import SwiftUI

struct EmptyUsageExample: View {
    var body: some View {
        FLXEmpty {
            FLXEmptyHeader {
                FLXEmptyMedia(variant: .icon) {
                    Image(systemName: "folder")
                }
                FLXEmptyTitle("No Projects Yet")
                FLXEmptyDescription("You haven't created any projects yet. Get started by creating your first project.")
            }
            FLXEmptyContent {
                HStack(spacing: FLXSpacing.sm) {
                    FLXButton("Create") {}
                    FLXButton("Import", variant: .outline) {}
                }
                FLXButton(variant: .link, action: {}) {
                    HStack(spacing: FLXSpacing.xs) {
                        Text("Learn More")
                        Image(systemName: "arrow.up.right")
                    }
                }
                .controlSize(.small)
            }
        }
    }
}
