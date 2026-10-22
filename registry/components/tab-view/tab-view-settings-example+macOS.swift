import SwiftUI

@available(macOS 15.0, *)
struct TabViewSettingsExample: View {
    @State private var showsPreview = true
    @State private var opensInNewWindow = false
    @State private var restoresWindows = true
    @State private var appearance = "System"
    @State private var iconSize = "Medium"
    @State private var checksForUpdates = true
    @State private var includesBetas = false

    var body: some View {
        TabView {
            Tab("General", systemImage: "gearshape") {
                Form {
                    Section {
                        Toggle("Show preview", isOn: $showsPreview)
                        Toggle("Open projects in a new window", isOn: $opensInNewWindow)
                        Toggle("Restore windows at launch", isOn: $restoresWindows)
                    }
                    Section {
                        Picker("Appearance", selection: $appearance) {
                            Text("System").tag("System")
                            Text("Light").tag("Light")
                            Text("Dark").tag("Dark")
                        }
                        Picker("Sidebar icon size", selection: $iconSize) {
                            Text("Small").tag("Small")
                            Text("Medium").tag("Medium")
                            Text("Large").tag("Large")
                        }
                    }
                }
                .formStyle(.grouped)
            }
            Tab("Updates", systemImage: "arrow.down.circle") {
                Form {
                    Toggle("Check for updates automatically", isOn: $checksForUpdates)
                    Toggle("Include beta versions", isOn: $includesBetas)
                }
                .formStyle(.grouped)
            }
        }
        .frame(width: 450, height: 260)
    }
}
