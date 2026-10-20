import SwiftUI

struct ListSectionsExample: View {
    var body: some View {
        NavigationStack {
            List {
                Section("Today") {
                    Text("Design review")
                    Text("Team sync")
                }
                Section {
                    Text("Quarterly planning")
                    Text("Launch retro")
                } header: {
                    Text("This week")
                } footer: {
                    Text("Events from all your calendars.")
                }
            }
            .navigationTitle("Events")
        }
    }
}
