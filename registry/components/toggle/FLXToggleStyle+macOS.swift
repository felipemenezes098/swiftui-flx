#if os(macOS)
import SwiftUI

struct FLXToggleStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.controlSize) private var controlSize

    let configuration: FLXToggleStyle.Configuration

    var body: some View {
        Toggle(configuration)
            .toggleStyle(.checkbox)
            .flxFont(FLXTypography.control(controlSize))
            .foregroundStyle(theme.colors.foreground)
    }
}
#endif
