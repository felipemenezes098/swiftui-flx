import SwiftUI

struct ItemUsageExample: View {
    var body: some View {
        FLXItemGroup {
            FLXItem(variant: .outline) {
                FLXItemContent {
                    FLXItemTitle("Basic Item")
                    FLXItemDescription("A simple item with title and description.")
                }
                FLXItemActions {
                    FLXButton("Action", variant: .outline) {}
                        .controlSize(.small)
                }
            }
            FLXItem(variant: .outline, size: .small) {
                FLXItemMedia(variant: .icon) {
                    Image(systemName: "checkmark.seal.fill")
                }
                FLXItemContent {
                    FLXItemTitle("Your profile has been verified.")
                }
                FLXItemActions {
                    Image(systemName: "chevron.right")
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(FLXSpacing.xl)
    }
}
