import SwiftUI

@available(iOS 26.0, *)
struct NavigationSubtitleExample: View {
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

    var body: some View {
        NavigationStack {
            List(projects) { project in
                NavigationLink(value: project) {
                    Label(project.id, systemImage: project.systemImage)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Projects")
            .navigationSubtitle("4 in progress")
            .navigationDestination(for: Project.self) { project in
                Text(project.id)
                    .navigationTitle(project.id)
            }
        }
    }
}
