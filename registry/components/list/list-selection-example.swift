import SwiftUI

struct ListSelectionExample: View {
    @State private var selection: Set<String> = ["Bruno Lima", "Diego Alves"]
    @State private var editMode = EditMode.active

    private let people = ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Alves", "Elisa Rocha"]

    var body: some View {
        NavigationStack {
            List(people, id: \.self, selection: $selection) { person in
                Text(person)
            }
            .navigationTitle("Invite")
            .toolbar {
                EditButton()
            }
            .environment(\.editMode, $editMode)
        }
    }
}
