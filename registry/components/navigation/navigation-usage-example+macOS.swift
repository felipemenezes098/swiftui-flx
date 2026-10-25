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
        Project(id: "Q3 roadmap", systemImage: "map", owner: "Carla Dias")
    ]

    @State private var selection: Project.ID? = "Launch plan"

    var body: some View {
        NavigationSplitView {
            List(projects, selection: $selection) { project in
                Label(project.id, systemImage: project.systemImage)
            }
            .navigationTitle("Projects")
        } detail: {
            if let project = projects.first(where: { $0.id == selection }) {
                Form {
                    LabeledContent("Owner", value: project.owner)
                    LabeledContent("Status", value: "In progress")
                }
                .formStyle(.grouped)
                .navigationTitle(project.id)
                .navigationSubtitle(project.owner)
            } else {
                Text("Select a project")
                    .foregroundStyle(.secondary)
            }
        }
    }
}
