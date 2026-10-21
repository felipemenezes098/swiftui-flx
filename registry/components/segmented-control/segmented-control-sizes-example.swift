import SwiftUI

struct SegmentedControlSizesExample: View {
    @State private var range = "Week"
    private let ranges = ["Day", "Week", "Month"]

    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            picker.controlSize(.small)
            picker
            picker.controlSize(.large)
        }
        .padding(FLXSpacing.xl)
    }

    private var picker: some View {
        Picker("Range", selection: $range) {
            ForEach(ranges, id: \.self) { range in
                Text(range)
            }
        }
        .pickerStyle(.segmented)
        .labelsHidden()
    }
}
