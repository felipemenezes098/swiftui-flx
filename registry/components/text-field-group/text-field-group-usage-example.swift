import SwiftUI

struct TextFieldGroupUsageExample: View {
    @State private var search = ""

    var body: some View {
        FLXTextFieldGroup("Search", text: $search) {
            FLXTextFieldGroupAddon { Image(systemName: "magnifyingglass") }
        }
        .padding(FLXSpacing.xl)
    }
}
