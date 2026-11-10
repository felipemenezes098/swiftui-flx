import SwiftUI

struct SettingsView: View {
    enum Appearance: String, CaseIterable {
        case system = "System"
        case light = "Light"
        case dark = "Dark"
    }

    enum Summary: String, CaseIterable {
        case never = "Never"
        case daily = "Daily"
        case weekly = "Weekly"
    }

    var onSignOut: () -> Void = {}
    var onDeleteAccount: () -> Void = {}

    @Environment(\.flxTheme) private var theme
    @State private var appearance = Appearance.system
    @State private var opensAtLogin = true
    @State private var showsInMenuBar = false
    @State private var notifications = true
    @State private var sounds = false
    @State private var summary = Summary.daily
    @State private var sharesAnalytics = false

    var body: some View {
        TabView {
            general
                .tabItem { Label("General", systemImage: "gearshape") }
            notificationSettings
                .tabItem { Label("Notifications", systemImage: "bell") }
            privacy
                .tabItem { Label("Privacy", systemImage: "hand.raised") }
        }
    }

    private var general: some View {
        styled(Form {
            Section {
                HStack(spacing: FLXSpacing.md) {
                    FLXAvatar(size: .medium) {
                        FLXAvatarFallback("SD")
                        FLXAvatarImage(url: URL(string: "https://github.com/shadcn.png"))
                    }
                    VStack(alignment: .leading, spacing: FLXSpacing.xs) {
                        Text("Sofia Davis")
                            .flxFont(.headline)
                            .foregroundStyle(theme.colors.foreground)
                        Text("sofia@example.com")
                            .flxFont(.subheadline)
                            .foregroundStyle(theme.colors.mutedForeground)
                    }
                    Spacer()
                    Button("Sign Out", action: onSignOut)
                }
            }
            Section {
                Picker("Appearance", selection: $appearance) {
                    ForEach(Appearance.allCases, id: \.self) { appearance in
                        Text(appearance.rawValue)
                    }
                }
                Toggle("Open at login", isOn: $opensAtLogin)
                Toggle("Show in menu bar", isOn: $showsInMenuBar)
            }
        })
    }

    private var notificationSettings: some View {
        styled(Form {
            Section {
                Toggle("Allow notifications", isOn: $notifications)
                Toggle("Play sounds", isOn: $sounds)
            }
            Section {
                Picker("Email summary", selection: $summary) {
                    ForEach(Summary.allCases, id: \.self) { summary in
                        Text(summary.rawValue)
                    }
                }
            }
        })
    }

    private var privacy: some View {
        styled(Form {
            Section {
                Toggle("Share analytics", isOn: $sharesAnalytics)
            } footer: {
                Text("Help improve the app by sending anonymous usage data.")
                    .flxFont(.footnote)
                    .foregroundStyle(theme.colors.mutedForeground)
            }
            Section {
                Button("Delete Account…", role: .destructive, action: onDeleteAccount)
            }
        })
    }

    private func styled(_ form: some View) -> some View {
        form
            .formStyle(.grouped)
            .scrollContentBackground(.hidden)
            .background(theme.colors.background)
            .listRowBackground(theme.colors.card)
    }
}
