import SwiftUI

@available(iOS 18.0, macOS 15.0, *)
struct TabViewSearchExample: View {
    enum AppTab: Hashable {
        case inbox
        case contacts
        case search
    }

    @State private var selection = AppTab.inbox
    @State private var query = ""

    var body: some View {
        TabView(selection: $selection) {
            Tab("Inbox", systemImage: "tray.fill", value: .inbox) {
                NavigationStack {
                    List(["Launch checklist", "Build 42", "Q3 roadmap"], id: \.self) { title in
                        Text(title)
                    }
                    .listStyle(.plain)
                    .navigationTitle("Inbox")
                }
            }
            Tab("Contacts", systemImage: "person.2.fill", value: .contacts) {
                NavigationStack {
                    List(["Ana Souza", "Bruno Lima", "Carla Dias"], id: \.self) { name in
                        Text(name)
                    }
                    .listStyle(.plain)
                    .navigationTitle("Contacts")
                }
            }
            Tab(value: .search, role: .search) {
                NavigationStack {
                    List {
                        Section("Recent") {
                            Label("Launch checklist", systemImage: "clock")
                            Label("Ana Souza", systemImage: "clock")
                            Label("Q3 roadmap", systemImage: "clock")
                        }
                    }
                    .listStyle(.plain)
                    .navigationTitle("Search")
                    .searchable(text: $query, prompt: "Messages and contacts")
                }
            }
        }
    }
}
