import SwiftUI

struct DatePickerFormFieldExample: View {
    @State private var dueDate = DateComponents(calendar: .current, year: 2026, month: 10, day: 14).date ?? .now

    var body: some View {
        FLXFormField {
            FLXFieldLabel("Due date") {
                DatePicker("Due date", selection: $dueDate, displayedComponents: .date)
                    .labelsHidden()
            }
            FLXFormFieldDescription("We'll remind you the day before.")
        }
        .padding(FLXSpacing.xl)
    }
}
