import SwiftUI

struct AlertErrorExample: View {
    struct UploadError: LocalizedError {
        var errorDescription: String? { "Upload failed" }
        var recoverySuggestion: String? { "Check your connection and try again." }
    }

    @State private var error: UploadError?
    @State private var isPresented = false

    var body: some View {
        FLXButton("Upload", variant: .primary) {
            error = UploadError()
            isPresented = true
        }
        .alert(isPresented: $isPresented, error: error) { _ in
            Button("Cancel", role: .cancel) {}
            Button("Try Again") {}
                .keyboardShortcut(.defaultAction)
        } message: { error in
            Text(error.recoverySuggestion ?? "")
        }
    }
}
