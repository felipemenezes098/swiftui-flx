import SwiftUI

struct FormFieldUsageExample: View {
    @State private var email = ""

    var body: some View {
        FLXFormField {
            FLXFieldLabel("Email") {
                FLXTextField("teammate@company.com", text: $email)
            }
            FLXFormFieldDescription("We'll never share your email.")
        }
        .padding(FLXSpacing.xl)
    }
}
