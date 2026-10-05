import SwiftUI

struct AvatarUsageExample: View {
    var body: some View {
        HStack(spacing: FLXSpacing.md) {
            FLXAvatar(size: .small) {
                FLXAvatarFallback("FM")
                FLXAvatarImage(url: URL(string: "https://github.com/shadcn.png"))
            }
            FLXAvatar(size: .medium) {
                FLXAvatarFallback("FM")
                FLXAvatarImage(url: URL(string: "https://github.com/shadcn.png"))
            }
            FLXAvatar(size: .large) {
                FLXAvatarFallback("FM")
                FLXAvatarImage(url: URL(string: "https://github.com/shadcn.png"))
            }
            FLXAvatar(size: .medium) {
                FLXAvatarFallback("FM")
                FLXAvatarImage(url: URL(string: "https://github.com/shadcn.png"))
                FLXAvatarBadge()
            }
        }
        .padding(FLXSpacing.xl)
    }
}
