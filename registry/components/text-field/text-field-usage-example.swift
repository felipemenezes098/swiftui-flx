import SwiftUI

struct TextFieldUsageExample: View {
    @State private var email = ""

    var body: some View {
        FLXFieldLabel("Email") {
            FLXTextField("you@example.com", text: $email)
        }
        .padding(FLXSpacing.xl)
    }
}
