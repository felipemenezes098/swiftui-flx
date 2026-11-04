import SwiftUI

struct ToastUsageExample: View {
    @State private var isSaved = false

    var body: some View {
        FLXButton("Save changes", variant: .primary) {
            isSaved = true
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .flxToast("Changes saved", systemImage: "checkmark.circle.fill", isPresented: $isSaved)
    }
}
