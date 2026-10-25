import SwiftUI

struct NavigationUsageExample: View {
    struct Project: Identifiable, Hashable {
        let id: String
        let systemImage: String
        let owner: String
    }

    private let projects = [
        Project(id: "Launch plan", systemImage: "checklist", owner: "Ana Souza"),
        Project(id: "Build 42", systemImage: "hammer", owner: "Bruno Lima"),
        Project(id: "Q3 roadmap", systemImage: "map", owner: "Carla Dias"),
        Project(id: "Staging keys", systemImage: "key", owner: "Diego Alves")
    ]

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
                detail(for: project)
            }
        }
    }

    private func detail(for project: Project) -> some View {
        List {
            LabeledContent("Owner", value: project.owner)
            LabeledContent("Status", value: "In progress")
        }
        .listStyle(.plain)
        .navigationTitle(project.id)
        .navigationBarTitleDisplayMode(.inline)
    }
}
