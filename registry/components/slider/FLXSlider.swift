import SwiftUI

/// Wraps the native `Slider` with FLX's theme tokens. Unlike `Button`/`Toggle`/`ProgressView`,
/// SwiftUI's `Slider` has no public `SliderStyle` protocol at all (not even a
/// non-conformable enum like `PickerStyle`) — so there's no `FLXSliderStyle` or
/// `.flxSliderStyle(_:)` override here, just `.tint(_:)` applied once. Track height,
/// thumb shape/image, and a range (two-thumb) slider are all unreachable without
/// dropping to `UISlider` or a fully custom view — out of scope for this component.
public struct FLXSlider<Label: View>: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    @Binding private var value: Double
    private let bounds: ClosedRange<Double>
    private let step: Double.Stride?
    private let label: () -> Label

    public init(
        value: Binding<Double>,
        in bounds: ClosedRange<Double> = 0...1,
        step: Double.Stride? = nil,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self._value = value
        self.bounds = bounds
        self.step = step
        self.label = label
    }

    public var body: some View {
        Group {
            if let step {
                Slider(value: $value, in: bounds, step: step, label: label)
            } else {
                Slider(value: $value, in: bounds, label: label)
            }
        }
        .tint(theme.colors.primary)
        .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }
}

extension FLXSlider where Label == Text {
    /// `titleKey` is accessibility-only (read by VoiceOver) — the native `Slider`
    /// never renders its label visually, so this doesn't behave like
    /// `FLXTextField`'s `titleKey` placeholder. Pair with `FLXFieldLabel` for a
    /// visible caption.
    public init(_ titleKey: LocalizedStringKey = "", value: Binding<Double>, in bounds: ClosedRange<Double> = 0...1, step: Double.Stride? = nil) {
        self.init(value: value, in: bounds, step: step) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(_ titleResource: LocalizedStringResource, value: Binding<Double>, in bounds: ClosedRange<Double> = 0...1, step: Double.Stride? = nil) {
        self.init(value: value, in: bounds, step: step) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ title: S, value: Binding<Double>, in bounds: ClosedRange<Double> = 0...1, step: Double.Stride? = nil) {
        self.init(value: value, in: bounds, step: step) {
            Text(title)
        }
    }
}
