import SwiftUI

struct ListEmptyExample: View {
    @State private var messages: [String] = []

    var body: some View {
        NavigationStack {
            List(messages, id: \.self) { message in
                Text(message)
            }
            .overlay {
                if messages.isEmpty {
                    FLXEmpty {
                        FLXEmptyHeader {
                            FLXEmptyMedia(variant: .icon) {
                                Image(systemName: "tray")
                            }
                            FLXEmptyTitle("No Messages")
                            FLXEmptyDescription("New messages will appear here.")
                        }
                    }
                    .padding(.bottom, FLXSpacing.xxxl)
                }
            }
            .navigationTitle("Inbox")
        }
    }
}

