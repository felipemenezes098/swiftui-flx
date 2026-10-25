import SwiftUI

struct NavigationStackExample: View {
    struct Build: Identifiable, Hashable {
        let id: Int
        let status: String
    }

    private let builds = [
        Build(id: 42, status: "Passed"),
        Build(id: 41, status: "Failed"),
        Build(id: 40, status: "Passed")
    ]

    @State private var path: [Build] = []

    var body: some View {
        NavigationStack(path: $path) {
            List(builds) { build in
                NavigationLink("Build \(build.id)", value: build)
            }
            .navigationTitle("Builds")
            .navigationDestination(for: Build.self) { build in
                Form {
                    LabeledContent("Status", value: build.status)
                    LabeledContent("Branch", value: "main")
                }
                .formStyle(.grouped)
                .navigationTitle("Build \(build.id)")
            }
        }
    }
}
