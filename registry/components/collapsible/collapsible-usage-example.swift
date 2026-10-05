import SwiftUI

struct CollapsibleUsageExample: View {
    @State private var isExpanded = true

    var body: some View {
        FLXCollapsible("@peduarte starred 3 repositories", isExpanded: $isExpanded) {
            VStack(alignment: .leading, spacing: FLXSpacing.sm) {
                Text("@radix-ui/colors")
                    .flxFont(.callout)
                Text("@stitches/react")
                    .flxFont(.callout)
            }
        }
        .padding(FLXSpacing.xl)
    }
}
