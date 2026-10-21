import SwiftUI

struct SegmentedControlIconsExample: View {
    enum Layout: Hashable {
        case list
        case grid
        case gallery
    }

    @State private var layout = Layout.list

    var body: some View {
        Picker("Layout", selection: $layout) {
            Image(systemName: "list.bullet")
                .accessibilityLabel("List")
                .tag(Layout.list)
            Image(systemName: "square.grid.2x2")
                .accessibilityLabel("Grid")
                .tag(Layout.grid)
            Image(systemName: "photo")
                .accessibilityLabel("Gallery")
                .tag(Layout.gallery)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .fixedSize()
        .padding(FLXSpacing.xl)
    }
}
