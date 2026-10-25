import SwiftUI

struct NavigationToolbarExample: View {
    enum SortOrder: Hashable {
        case name
        case owner
    }

    struct Project: Identifiable, Hashable {
        let id: String
        let systemImage: String
    }

    private let projects = [
        Project(id: "Launch plan", systemImage: "checklist"),
        Project(id: "Build 42", systemImage: "hammer"),
        Project(id: "Q3 roadmap", systemImage: "map"),
        Project(id: "Staging keys", systemImage: "key")
    ]

    @State private var sortOrder = SortOrder.name

    var body: some View {
        NavigationStack {
            List(projects) { project in
                NavigationLink(value: project) {
                    Label(project.id, systemImage: project.systemImage)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Projects")
            .navigationDestination(for: Project.self) { project in
                Text(project.id)
                    .navigationTitle(project.id)
            }
            .toolbar {
                ToolbarItemGroup(placement: .primaryAction) {
                    Menu("Sort", systemImage: "arrow.up.arrow.down") {
                        Picker("Sort", selection: $sortOrder) {
                            Text("Name").tag(SortOrder.name)
                            Text("Owner").tag(SortOrder.owner)
                        }
                    }
                    Button("New Project", systemImage: "plus") {}
                }
            }
        }
    }
}
