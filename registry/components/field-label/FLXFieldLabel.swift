import SwiftUI

public enum FLXFieldLabelOrientation {
    case vertical
    case horizontal
}

/// Pairs a caption with a control (`FLXTextField`, `FLXPicker`, `Toggle`, ...) — the
/// form-field "label" role, like shadcn's `<Label>`/`<FieldLabel>` or HTML's
/// `<label>`. Native primitive: `LabeledContent`/`LabeledContentStyle` (both
/// Apple's, both conformable — see DESIGN_SYSTEM.md 3.1, Caso A). This is a
/// different job than SwiftUI's own `Label` (icon+text, used inside `Button`,
/// `Menu`, etc.) — there's no `FLX` counterpart for that one yet.
///
/// SwiftUI has no `for`/id-based association like HTML's `<label for="">` — the
/// pairing here is purely structural (label and content rendered together by
/// `LabeledContent`). If the wrapped control needs its own accessibility label
/// (e.g. it has no visible text of its own), set `.accessibilityLabel(_:)` on it
/// directly.
public struct FLXFieldLabel<Label: View, Content: View>: View {
    @Environment(\.flxFieldLabelStyleOverride) private var styleOverride

    private let orientation: FLXFieldLabelOrientation
    private let label: () -> Label
    private let content: () -> Content

    public init(
        orientation: FLXFieldLabelOrientation = .vertical,
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.orientation = orientation
        self.content = content
        self.label = label
    }

    public var body: some View {
        LabeledContent(content: content, label: label)
            .labeledContentStyle(styleOverride ?? AnyFLXFieldLabelStyle(FLXFieldLabelStyle(orientation: orientation)))
    }
}

extension FLXFieldLabel where Label == Text {
    public init(
        _ titleKey: LocalizedStringKey,
        orientation: FLXFieldLabelOrientation = .vertical,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(orientation: orientation, content: content) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        orientation: FLXFieldLabelOrientation = .vertical,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(orientation: orientation, content: content) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        orientation: FLXFieldLabelOrientation = .vertical,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(orientation: orientation, content: content) {
            Text(title)
        }
    }
}
