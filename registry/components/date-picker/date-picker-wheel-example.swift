import SwiftUI

struct DatePickerWheelExample: View {
    @State private var time = DateComponents(calendar: .current, year: 2026, month: 10, day: 14, hour: 7, minute: 30).date ?? .now

    var body: some View {
        DatePicker("Alarm", selection: $time, displayedComponents: .hourAndMinute)
            .datePickerStyle(.wheel)
            .labelsHidden()
            .padding(FLXSpacing.xl)
    }
}
