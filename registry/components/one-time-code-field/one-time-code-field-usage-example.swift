import SwiftUI

struct OneTimeCodeFieldUsageExample: View {
    @State private var code = ""

    var body: some View {
        FLXOneTimeCodeField("Verification code", text: $code)
            .padding(FLXSpacing.xl)
    }
}
