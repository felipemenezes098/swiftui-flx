import SwiftUI

struct TabViewTabItemExample: View {
    @State private var showsPreview = true
    @State private var opensInNewWindow = false
    @State private var checksForUpdates = true

    var body: some View {
        TabView {
            Form {
                Toggle("Show preview", isOn: $showsPreview)
                Toggle("Open projects in a new window", isOn: $opensInNewWindow)
            }
            .tabItem {
                Text("General")
            }
            Form {
                Toggle("Check for updates automatically", isOn: $checksForUpdates)
            }
            .tabItem {
                Text("Updates")
            }
        }
        .padding(FLXSpacing.xl)
    }
}
