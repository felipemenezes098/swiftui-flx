#if os(iOS)
import SwiftUI

struct FLXToggleStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXToggleStyle.Configuration

    var body: some View {
        Toggle(configuration)
            .toggleStyle(.switch)
            .tint(theme.colors.primary)
            .flxFont(.body)
            .foregroundStyle(theme.colors.foreground)
    }
}
#endif
