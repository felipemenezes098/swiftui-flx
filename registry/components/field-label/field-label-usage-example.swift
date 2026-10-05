import SwiftUI

struct FieldLabelUsageExample: View {
    @State private var name = ""
    @State private var email = ""

    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            FLXFieldLabel("Name") {
                FLXTextField(text: $name)
            }

            FLXFieldLabel("Email") {
                FLXTextField(text: $email)
            }
        }
        .padding(FLXSpacing.xl)
    }
}
