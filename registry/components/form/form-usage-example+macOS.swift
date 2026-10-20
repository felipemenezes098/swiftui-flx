import SwiftUI

struct FormUsageExample: View {
    @State private var name = "Ana Souza"
    @State private var notifications = true
    @State private var appearance = "Automatic"

    private let appearances = ["Automatic", "Light", "Dark"]

    var body: some View {
        Form {
            Section("Profile") {
                TextField("Name", text: $name)
                LabeledContent("Email", value: "ana@example.com")
            }
            Section("Preferences") {
                Toggle("Notifications", isOn: $notifications)
                Picker("Appearance", selection: $appearance) {
                    ForEach(appearances, id: \.self) { Text($0) }
                }
            }
        }
        .formStyle(.grouped)
    }
}
