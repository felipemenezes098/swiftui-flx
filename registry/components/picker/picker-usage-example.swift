import SwiftUI

struct PickerUsageExample: View {
    enum Fruit: String, CaseIterable, Identifiable {
        case apple = "Apple"
        case banana = "Banana"
        case cherry = "Cherry"

        var id: String { rawValue }
    }

    @State private var fruit: Fruit = .apple

    var body: some View {
        FLXPicker("Fruit", selection: $fruit) {
            ForEach(Fruit.allCases) { fruit in
                Text(fruit.rawValue).tag(fruit)
            }
        }
        .padding(FLXSpacing.xl)
    }
}
