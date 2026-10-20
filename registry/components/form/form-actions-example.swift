import SwiftUI

struct FormActionsExample: View {
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    LabeledContent("Version", value: "2.4.1")
                    LabeledContent("Storage", value: "12 GB")
                }
                Section {
                    Button("Export Data") {}
                    Button("Reset Settings") {}
                        .disabled(true)
                }
                Section {
                    Button("Delete Account", role: .destructive) {}
                }
            }
            .navigationTitle("Account")
        }
    }
}
