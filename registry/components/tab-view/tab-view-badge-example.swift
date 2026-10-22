import SwiftUI

@available(iOS 18.0, macOS 15.0, *)
struct TabViewBadgeExample: View {
    struct Message: Identifiable {
        let id: String
        let sender: String
        let time: String
    }

    private let messages = [
        Message(id: "The launch checklist is ready for review.", sender: "Ana Souza", time: "9:41"),
        Message(id: "Build 42 is on TestFlight with the fixes.", sender: "Bruno Lima", time: "8:15"),
        Message(id: "Here is the draft roadmap for next quarter.", sender: "Carla Dias", time: "Yesterday"),
        Message(id: "Staging keys were rotated, nothing to change.", sender: "Diego Alves", time: "Monday")
    ]

    @State private var notifications = true

    var body: some View {
        TabView {
            Tab("Inbox", systemImage: "tray.fill") {
                NavigationStack {
                    List(messages) { message in
                        row(for: message)
                    }
                    .listStyle(.plain)
                    .navigationTitle("Inbox")
                }
            }
            .badge(2)
            Tab("Contacts", systemImage: "person.2.fill") {
                NavigationStack {
                    List(["Ana Souza", "Bruno Lima", "Carla Dias"], id: \.self) { name in
                        Text(name)
                    }
                    .listStyle(.plain)
                    .navigationTitle("Contacts")
                }
            }
            Tab("Settings", systemImage: "gearshape.fill") {
                NavigationStack {
                    Form {
                        Toggle("Notifications", isOn: $notifications)
                    }
                    .navigationTitle("Settings")
                }
            }
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
