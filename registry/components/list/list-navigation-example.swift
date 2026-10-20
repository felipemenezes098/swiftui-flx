import SwiftUI

struct ListNavigationExample: View {
    struct Mailbox: Identifiable {
        let id: String
        let systemImage: String
        let unread: Int
    }

    private let mailboxes = [
        Mailbox(id: "Inbox", systemImage: "tray", unread: 12),
        Mailbox(id: "Drafts", systemImage: "doc", unread: 2),
        Mailbox(id: "Sent", systemImage: "paperplane", unread: 0)
    ]
    private let folders = [
        Mailbox(id: "Archive", systemImage: "archivebox", unread: 0),
        Mailbox(id: "Trash", systemImage: "trash", unread: 0)
    ]

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(mailboxes) { mailbox in
                        row(for: mailbox)
                    }
                }
                Section {
                    ForEach(folders) { mailbox in
                        row(for: mailbox)
                    }
                }
            }
            .navigationTitle("Mailboxes")
        }
    }

    private func row(for mailbox: Mailbox) -> some View {
        NavigationLink {
            Text(mailbox.id)
                .navigationTitle(mailbox.id)
        } label: {
            Label(mailbox.id, systemImage: mailbox.systemImage)
        }
        .badge(mailbox.unread)
    }
}
