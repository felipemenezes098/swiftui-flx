import SwiftUI

struct DatePickerGraphicalExample: View {
    @State private var date = DateComponents(calendar: .current, year: 2026, month: 10, day: 14).date ?? .now

    var body: some View {
        DatePicker("Date", selection: $date, displayedComponents: .date)
            .datePickerStyle(.graphical)
            .padding(FLXSpacing.xl)
    }
}
