import SwiftUI

/// A `value` renders as a linear bar (HIG: "favor progress bars over activity
/// indicators" when activity is quantifiable); `value == nil` renders as a
/// circular spinner (HIG: activity indicator, for unquantifiable/indeterminate
/// work). There's no separate `shape`/style-only `variant` parameter — the shape
/// a design needs is already implied by whether it has a value, so an invalid
/// combination (e.g. an indeterminate bar) isn't representable.
///
/// Reuses existing theme tokens (same as `FLXBadgeVariant`/`FLXButtonVariant`) —
/// no raw `Color` parameter, so a progress view never carries a one-off color
/// that falls outside the active theme.
public enum FLXProgressViewVariant {
    case primary
    case secondary
    case destructive
}

public struct FLXProgressView<Label: View, CurrentValueLabel: View>: View {
    @Environment(\.flxProgressViewStyleOverride) private var styleOverride

    private let value: Double?
    private let total: Double
    private let variant: FLXProgressViewVariant
    private let label: () -> Label
    private let currentValueLabel: () -> CurrentValueLabel

    public init(
        value: Double? = nil,
        total: Double = 1.0,
        variant: FLXProgressViewVariant = .primary,
        @ViewBuilder label: @escaping () -> Label,
        @ViewBuilder currentValueLabel: @escaping () -> CurrentValueLabel
    ) {
        self.value = value
        self.total = total
        self.variant = variant
        self.label = label
        self.currentValueLabel = currentValueLabel
    }

    public var body: some View {
        ProgressView(value: value, total: total, label: label, currentValueLabel: currentValueLabel)
            .progressViewStyle(styleOverride ?? AnyFLXProgressViewStyle(FLXProgressViewStyle(variant: variant)))
    }
}

extension FLXProgressView where Label == EmptyView, CurrentValueLabel == EmptyView {
    public init(
        value: Double? = nil,
        total: Double = 1.0,
        variant: FLXProgressViewVariant = .primary
    ) {
        self.init(value: value, total: total, variant: variant, label: { EmptyView() }, currentValueLabel: { EmptyView() })
    }
}

extension FLXProgressView where Label == Text, CurrentValueLabel == EmptyView {
    public init(
        _ titleKey: LocalizedStringKey,
        value: Double? = nil,
        total: Double = 1.0,
        variant: FLXProgressViewVariant = .primary
    ) {
        self.init(value: value, total: total, variant: variant, label: { Text(titleKey) }, currentValueLabel: { EmptyView() })
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        value: Double? = nil,
        total: Double = 1.0,
        variant: FLXProgressViewVariant = .primary
    ) {
        self.init(value: value, total: total, variant: variant, label: { Text(titleResource) }, currentValueLabel: { EmptyView() })
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        value: Double? = nil,
        total: Double = 1.0,
        variant: FLXProgressViewVariant = .primary
    ) {
        self.init(value: value, total: total, variant: variant, label: { Text(title) }, currentValueLabel: { EmptyView() })
    }
}
