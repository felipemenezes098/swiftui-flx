import SwiftUI

struct DatePickerFormExample: View {
    @State private var title = "Design review"
    @State private var date = DateComponents(calendar: .current, year: 2026, month: 10, day: 14, hour: 9, minute: 30).date ?? .now
    @State private var allDay = false

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $title)
                Toggle("All-day", isOn: $allDay)
                DatePicker("Date", selection: $date, displayedComponents: .date)
                if !allDay {
                    DatePicker("Time", selection: $date, displayedComponents: .hourAndMinute)
                }
            }
            .navigationTitle("New Event")
        }
    }
}
