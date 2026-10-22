import SwiftUI

@available(macOS 15.0, *)
struct TabViewUsageExample: View {
    @State private var showsPreview = true
    @State private var opensInNewWindow = false
    @State private var checksForUpdates = true

    var body: some View {
        TabView {
            Tab("General", systemImage: "gearshape") {
                Form {
                    Toggle("Show preview", isOn: $showsPreview)
                    Toggle("Open projects in a new window", isOn: $opensInNewWindow)
                }
            }
            Tab("Updates", systemImage: "arrow.down.circle") {
                Form {
                    Toggle("Check for updates automatically", isOn: $checksForUpdates)
                }
            }
        }
        .padding(FLXSpacing.xl)
    }
}
