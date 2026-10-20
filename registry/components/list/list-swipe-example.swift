import SwiftUI

struct ListSwipeExample: View {
    @Environment(\.flxTheme) private var theme

    struct Message: Identifiable {
        let id: String
        let sender: String
        let time: String
    }

    @State private var messages = [
        Message(id: "The launch checklist is ready for review.", sender: "Ana Souza", time: "9:41"),
        Message(id: "Build 42 is on TestFlight with the fixes.", sender: "Bruno Lima", time: "8:15"),
        Message(id: "Here is the draft roadmap for next quarter.", sender: "Carla Dias", time: "Yesterday"),
        Message(id: "Staging keys were rotated, nothing to change.", sender: "Diego Alves", time: "Monday")
    ]

    var body: some View {
        NavigationStack {
            List(messages) { message in
                row(for: message)
                    .swipeActions {
                        Button("Delete", systemImage: "trash", role: .destructive) {
                            messages.removeAll { $0.id == message.id }
                        }
                        .tint(theme.colors.destructive)
                        Button("Archive", systemImage: "archivebox") {}
                    }
                    .swipeActions(edge: .leading) {
                        Button("Read", systemImage: "envelope.open") {}
                    }
            }
            .listStyle(.plain)
            .navigationTitle("Inbox")
        }
    }

    private func row(for message: Message) -> some View {
        VStack(alignment: .leading, spacing: FLXSpacing.xs) {
            HStack {
                Text(message.sender)
                    .flxFont(.headline)
                Spacer()
                Text(message.time)
                    .flxFont(.subheadline)
                    .foregroundStyle(.secondary)
            }
            Text(message.id)
                .flxFont(.subheadline)
                .foregroundStyle(.secondary)
        }
    }
}
