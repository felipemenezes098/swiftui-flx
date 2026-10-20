import SwiftUI

struct FormPickersExample: View {
    @State private var appearance = "Automatic"
    @State private var language = "English"
    @State private var sort = "Date"
    @State private var size = "M"

    private let appearances = ["Automatic", "Light", "Dark"]
    private let languages = ["English", "Português", "Español"]
    private let sortOptions = ["Date", "Name", "Size"]
    private let sizes = ["S", "M", "L"]

    var body: some View {
        NavigationStack {
            Form {
                Section("Menu") {
                    Picker("Appearance", selection: $appearance) {
                        ForEach(appearances, id: \.self) { Text($0) }
                    }
                }
                Section("Navigation link") {
                    Picker("Language", selection: $language) {
                        ForEach(languages, id: \.self) { Text($0) }
                    }
                    .pickerStyle(.navigationLink)
                }
                Section("Inline") {
                    Picker("Sort by", selection: $sort) {
                        ForEach(sortOptions, id: \.self) { Text($0) }
                    }
                    .pickerStyle(.inline)
                    .labelsHidden()
                }
                Section("Segmented") {
                    Picker("Size", selection: $size) {
                        ForEach(sizes, id: \.self) { Text($0) }
                    }
                    .pickerStyle(.segmented)
                }
            }
            .navigationTitle("Pickers")
        }
    }
}
