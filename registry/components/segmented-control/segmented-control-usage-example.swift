import SwiftUI

struct SegmentedControlUsageExample: View {
    enum Tab: String, CaseIterable, Identifiable {
        case overview = "Overview"
        case analytics = "Analytics"

        var id: Self { self }
    }

    @State private var tab = Tab.overview

    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            Picker("Section", selection: $tab) {
                ForEach(Tab.allCases) { tab in
                    Text(tab.rawValue).tag(tab)
                }
            }
            .pickerStyle(.segmented)
            .labelsHidden()

            FLXCard {
                FLXCardHeader {
                    switch tab {
                    case .overview:
                        FLXCardTitle("Overview")
                        FLXCardDescription("View your key metrics and recent project activity.")
                    case .analytics:
                        FLXCardTitle("Analytics")
                        FLXCardDescription("Track performance and engagement across your projects.")
                    }
                }
            }
        }
        .padding(FLXSpacing.xl)
    }
}
