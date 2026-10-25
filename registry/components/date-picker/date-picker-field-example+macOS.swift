import SwiftUI

struct DatePickerFieldExample: View {
    @State private var date = DateComponents(calendar: .current, year: 2026, month: 10, day: 14).date ?? .now

    var body: some View {
        DatePicker("Due date", selection: $date, displayedComponents: .date)
            .datePickerStyle(.field)
            .padding(FLXSpacing.xl)
    }
}
