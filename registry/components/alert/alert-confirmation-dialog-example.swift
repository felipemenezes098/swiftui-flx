import SwiftUI

struct AlertConfirmationDialogExample: View {
    @State private var isPresented = false

    var body: some View {
        FLXButton("Sign out", variant: .secondary) {
            isPresented = true
        }
        .confirmationDialog("Sign out?", isPresented: $isPresented, titleVisibility: .visible) {
            Button("Sign Out of This Device") {}
            Button("Sign Out of All Devices", role: .destructive) {}
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("You'll need to sign in again to sync your projects.")
        }
    }
}
