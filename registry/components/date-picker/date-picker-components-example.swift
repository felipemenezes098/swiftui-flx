import SwiftUI

struct DatePickerComponentsExample: View {
    @State private var date = DateComponents(calendar: .current, year: 2026, month: 10, day: 14, hour: 9, minute: 41).date ?? .now

    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            DatePicker("Date", selection: $date, displayedComponents: .date)
            DatePicker("Time", selection: $date, displayedComponents: .hourAndMinute)
            DatePicker("Starts", selection: $date)
        }
        .padding(FLXSpacing.xl)
    }
}
