import SwiftUI

struct AlertUsageExample: View {
    @State private var isPresented = false

    var body: some View {
        FLXButton("Delete project", role: .destructive) {
            isPresented = true
        }
        .alert("Delete Q3 roadmap?", isPresented: $isPresented) {
            Button("Delete", role: .destructive) {}
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This permanently deletes the project and its 12 files.")
        }
    }
}
