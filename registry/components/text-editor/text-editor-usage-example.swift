import SwiftUI

struct TextEditorUsageExample: View {
    @State private var bio = "iOS developer who loves design systems, clean APIs, and good coffee."

    var body: some View {
        FLXFieldLabel("Bio") {
            FLXTextEditor("Tell us about yourself", text: $bio)
        }
        .padding(FLXSpacing.xl)
    }
}
