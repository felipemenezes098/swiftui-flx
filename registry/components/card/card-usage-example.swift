import SwiftUI

struct CardUsageExample: View {
    var body: some View {
        FLXCard {
            FLXCardHeader {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: FLXSpacing.xs) {
                        FLXCardTitle("Create project")
                        FLXCardDescription("Deploy your new project in one click.")
                    }
                    Spacer()
                    FLXButton("More", systemImage: "ellipsis", variant: .ghost) {}
                        .labelStyle(.iconOnly)
                }
            }
            FLXCardContent {
                Text("Project details go here.")
                    .flxFont(.body)
            }
            FLXCardFooter {
                FLXButton("Cancel", variant: .outline) {}
                FLXButton("Deploy", variant: .primary) {}
            }
        }
        .padding(FLXSpacing.xl)
    }
}
