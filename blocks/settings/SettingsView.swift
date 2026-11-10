import SwiftUI

struct SettingsView: View {
    enum Destination: String, Hashable {
        case profile = "Profile"
        case privacy = "Privacy"
        case help = "Help"
    }

    enum Appearance: String, CaseIterable {
        case system = "System"
        case light = "Light"
        case dark = "Dark"
    }

    var onSignOut: () -> Void = {}

    @Environment(\.flxTheme) private var theme
    @State private var notifications = true
    @State private var sounds = false
    @State private var appearance = Appearance.system

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    NavigationLink(value: Destination.profile) {
                        profile
                    }
                }
                Section("Preferences") {
                    Toggle("Notifications", isOn: $notifications)
                    Toggle("Sounds", isOn: $sounds)
                    Picker("Appearance", selection: $appearance) {
                        ForEach(Appearance.allCases, id: \.self) { appearance in
                            Text(appearance.rawValue)
                        }
                    }
                }
                Section("Support") {
                    NavigationLink(value: Destination.privacy) {
                        Label("Privacy", systemImage: "hand.raised")
                    }
                    NavigationLink(value: Destination.help) {
                        Label("Help", systemImage: "questionmark.circle")
                    }
                    LabeledContent("Version", value: "1.0.0")
                }
                Section {
                    Button("Sign Out", role: .destructive, action: onSignOut)
                }
            }
            .scrollContentBackground(.hidden)
            .background(theme.colors.background)
            .listRowBackground(theme.colors.card)
            .listRowSeparatorTint(theme.colors.border)
            .navigationTitle("Settings")
            .navigationDestination(for: Destination.self) { destination in
                Text(destination.rawValue)
                    .navigationTitle(destination.rawValue)
            }
        }
    }

    private var profile: some View {
        HStack(spacing: FLXSpacing.md) {
            FLXAvatar(size: .large) {
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
        }
        .padding(.vertical, FLXSpacing.xs)
    }
}
