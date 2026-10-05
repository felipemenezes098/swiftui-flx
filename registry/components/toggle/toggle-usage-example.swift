import SwiftUI

struct ToggleUsageExample: View {
    @State private var wifi = true
    @State private var bluetooth = false
    @State private var airplaneMode = false

    var body: some View {
        VStack(spacing: FLXSpacing.lg) {
            FLXToggle("Wi-Fi", isOn: $wifi)
            FLXToggle("Bluetooth", isOn: $bluetooth)
            FLXToggle("Airplane Mode", isOn: $airplaneMode)
        }
        .padding(FLXSpacing.xl)
    }
}
