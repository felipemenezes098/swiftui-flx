import SwiftUI

struct SegmentedControlOptionsExample: View {
    @State private var range = "Week"
    private let ranges = ["Day", "Week", "Month"]

    var body: some View {
        Picker("Range", selection: $range) {
            ForEach(ranges, id: \.self) { range in
                Text(range)
            }
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .padding(FLXSpacing.xl)
    }
}
