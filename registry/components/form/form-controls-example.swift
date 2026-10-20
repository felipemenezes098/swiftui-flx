import SwiftUI

struct FormControlsExample: View {
    @State private var name = ""
    @State private var password = ""
    @State private var notifications = true
    @State private var birthday = DateComponents(calendar: .current, year: 1994, month: 5, day: 12).date ?? .now
    @State private var guests = 2
    @State private var volume = 0.6

    var body: some View {
        NavigationStack {
            Form {
                TextField("Name", text: $name)
                SecureField("Password", text: $password)
                Toggle("Notifications", isOn: $notifications)
                DatePicker("Birthday", selection: $birthday, displayedComponents: .date)
                Stepper("Guests: \(guests)", value: $guests, in: 1...10)
                Slider(value: $volume) {
                    Text("Volume")
                }
            }
            .navigationTitle("Controls")
        }
    }
}
