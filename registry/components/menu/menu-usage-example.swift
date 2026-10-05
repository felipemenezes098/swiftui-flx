import SwiftUI

struct MenuUsageExample: View {
    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            FLXMenu("Actions", systemImage: "ellipsis.circle", variant: .primary) {
                Button("Rename", systemImage: "pencil") {}
                Button("Duplicate", systemImage: "doc.on.doc") {}
                Divider()
                Button("Delete", systemImage: "trash", role: .destructive) {}
            }

            FLXMenu("Actions", systemImage: "ellipsis.circle", variant: .secondary) {
                Button("Rename", systemImage: "pencil") {}
                Button("Delete", systemImage: "trash", role: .destructive) {}
            }
            .controlSize(.small)

            FLXMenu("Actions", systemImage: "ellipsis.circle", variant: .outline) {
                Button("Rename", systemImage: "pencil") {}
                Button("Delete", systemImage: "trash", role: .destructive) {}
            }
            .controlSize(.large)
        }
        .padding(FLXSpacing.xl)
    }
}
