import SwiftUI

struct FormUsageExample: View {
    @State private var name = "Ana Souza"
    @State private var notifications = true
    @State private var appearance = "Automatic"
    @State private var fontSize = 17

    private let appearances = ["Automatic", "Light", "Dark"]

    var body: some View {
        NavigationStack {
            Form {
                Section("Profile") {
                    TextField("Name", text: $name)
                    LabeledContent("Email", value: "ana@example.com")
                }
                Section {
                    Toggle("Notifications", isOn: $notifications)
                    Picker("Appearance", selection: $appearance) {
                        ForEach(appearances, id: \.self) { Text($0) }
                    }
                    Stepper("Font size: \(fontSize)", value: $fontSize, in: 12...24)
                } header: {
                    Text("Preferences")
                } footer: {
                    Text("Changes apply on all your devices.")
                }
                Section {
                    Button("Sign Out", role: .destructive) {}
                }
            }
            .navigationTitle("Settings")
        }
    }
}
