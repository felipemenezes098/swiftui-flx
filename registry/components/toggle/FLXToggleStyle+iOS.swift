#if os(iOS)
import SwiftUI
import UIKit

struct FLXToggleStyleBody: View {
    @Environment(\.flxTheme) private var theme

    let configuration: FLXToggleStyle.Configuration

    var body: some View {
        Toggle(configuration)
            .toggleStyle(.switch)
            .tint(trackTint)
            .flxFont(.body)
            .foregroundStyle(theme.colors.foreground)
    }

    /// The native switch's thumb is always white, so a light dark-mode `primary`
    /// (shadcn's near-white) would hide it. The track keeps the light-mode
    /// `primary` in both appearances instead.
    private var trackTint: Color {
        let light = UITraitCollection(userInterfaceStyle: .light)
        return Color(uiColor: UIColor(theme.colors.primary).resolvedColor(with: light))
    }
}
#endif
