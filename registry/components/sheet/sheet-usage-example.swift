import SwiftUI

struct SheetUsageExample: View {
    struct Document: Identifiable {
        let id: String
        var title: String { id }
    }

    @State private var selectedDocument: Document?

    var body: some View {
        FLXButton("Show details", variant: .primary) {
            selectedDocument = Document(id: "Q3 roadmap.pdf")
        }
        .padding(FLXSpacing.xl)
        .sheet(item: $selectedDocument) { document in
            VStack(alignment: .leading, spacing: FLXSpacing.md) {
                Text(document.title)
                    .flxFont(.title3)
                Text("Updated 2 days ago.")
                    .flxFont(.callout)
                FLXButton("Open", variant: .primary) {}
                Spacer()
            }
            .padding(FLXSpacing.xl)
            .frame(maxWidth: .infinity, alignment: .leading)
            .presentationDetents([.medium])
        }
    }
}
