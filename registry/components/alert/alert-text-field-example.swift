import SwiftUI

struct AlertTextFieldExample: View {
    @State private var isPresented = false
    @State private var name = "Q3 roadmap"

    var body: some View {
        FLXButton("Rename", variant: .secondary) {
            isPresented = true
        }
        .alert("Rename project", isPresented: $isPresented) {
            TextField("Name", text: $name)
            Button("Cancel", role: .cancel) {}
            Button("Save") {}
                .keyboardShortcut(.defaultAction)
        } message: {
            Text("Enter a new name for this project.")
        }
    }
}
