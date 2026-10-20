import SwiftUI

struct ListUsageExample: View {
    struct Contact: Identifiable {
        let id: String
        let initials: String
        let role: String
        var name: String { id }
    }

    private let favorites = [
        Contact(id: "Ana Souza", initials: "AS", role: "Design"),
        Contact(id: "Bruno Lima", initials: "BL", role: "Engineering")
    ]
    private let team = [
        Contact(id: "Carla Dias", initials: "CD", role: "Product"),
        Contact(id: "Diego Alves", initials: "DA", role: "Engineering"),
        Contact(id: "Elisa Rocha", initials: "ER", role: "Support")
    ]

    var body: some View {
        NavigationStack {
            List {
                Section("Favorites") {
                    ForEach(favorites) { contact in
                        row(for: contact)
                    }
                }
                Section("Team") {
                    ForEach(team) { contact in
                        row(for: contact)
                    }
                }
            }
            .navigationTitle("Contacts")
        }
    }

    private func row(for contact: Contact) -> some View {
        HStack(spacing: FLXSpacing.md) {
            FLXAvatar(size: .small) {
                FLXAvatarFallback(contact.initials)
            }
            VStack(alignment: .leading) {
                Text(contact.name)
                    .flxFont(.body)
                Text(contact.role)
                    .flxFont(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}
