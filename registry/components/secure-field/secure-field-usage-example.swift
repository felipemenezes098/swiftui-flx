import SwiftUI

struct SecureFieldUsageExample: View {
    @State private var password = "supersecret"

    var body: some View {
        FLXFieldLabel("Password") {
            FLXSecureField("Password", text: $password)
        }
        .padding(FLXSpacing.xl)
    }
}
