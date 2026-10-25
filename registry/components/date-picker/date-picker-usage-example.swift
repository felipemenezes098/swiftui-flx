import SwiftUI

struct DatePickerUsageExample: View {
    @State private var dueDate = DateComponents(calendar: .current, year: 2026, month: 10, day: 14).date ?? .now

    var body: some View {
        DatePicker("Due date", selection: $dueDate, displayedComponents: .date)
            .padding(FLXSpacing.xl)
    }
}
