import SwiftUI

public struct FLXCollapsible<Label: View, Content: View>: View {
    @Environment(\.flxCollapsibleStyleOverride) private var styleOverride
    @State private var internalIsExpanded: Bool
    private let externalIsExpanded: Binding<Bool>?
    private let content: () -> Content
    private let label: () -> Label

    /// `isExpanded` is optional: pass a `Binding` to control the state from outside
    /// (mirrors Radix's `open`/`onOpenChange`), or omit it to let the component
    /// manage its own state internally (mirrors Radix's uncontrolled default).
    /// `DisclosureGroup` itself doesn't expose this duality via a single initializer,
    /// so this is a deliberate deviation from copying its init surface 1:1 — see
    /// DESIGN_SYSTEM.md section 3, "if the pattern doesn't fit".
    public init(
        isExpanded: Binding<Bool>? = nil,
        @ViewBuilder content: @escaping () -> Content,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.externalIsExpanded = isExpanded
        self._internalIsExpanded = State(initialValue: isExpanded?.wrappedValue ?? false)
        self.content = content
        self.label = label
    }

    private var isExpanded: Binding<Bool> {
        externalIsExpanded ?? $internalIsExpanded
    }

    public var body: some View {
        DisclosureGroup(isExpanded: isExpanded, content: content, label: label)
            .disclosureGroupStyle(styleOverride ?? AnyFLXCollapsibleStyle(FLXCollapsibleStyle()))
    }
}

extension FLXCollapsible where Label == Text {
    public init(
        _ titleKey: LocalizedStringKey,
        isExpanded: Binding<Bool>? = nil,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(isExpanded: isExpanded, content: content) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        isExpanded: Binding<Bool>? = nil,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(isExpanded: isExpanded, content: content) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        isExpanded: Binding<Bool>? = nil,
        @ViewBuilder content: @escaping () -> Content
    ) {
        self.init(isExpanded: isExpanded, content: content) {
            Text(title)
        }
    }
}
