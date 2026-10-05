import SwiftUI

struct SliderUsageExample: View {
    @State private var brightness = 0.6

    var body: some View {
        FLXFieldLabel("Brightness") {
            FLXSlider("Brightness", value: $brightness)
        }
        .padding(FLXSpacing.xl)
    }
}
