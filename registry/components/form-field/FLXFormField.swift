import SwiftUI

/// The SwiftUI translation of shadcn/ui's `Field` family. Matches the
/// original 1:1: takes no `label`/`description`/`error` prop — the caller
/// composes `FLXFieldLabel`, the control, `FLXFormFieldDescription`, and
/// `FLXFormFieldError` as free children. No native primitive backs this
/// shape, so it's Caso B (DESIGN_SYSTEM.md §3.3) — `FLXFormFieldStyle` plays
/// the same thin spacing role `FLXCardStyle` plays for `FLXCard`.
public struct FLXFormField<Content: View>: View {
    @Environment(\.flxFormFieldStyle) private var style

    private let content: () -> Content

    public init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }

    public var body: some View {
        (style ?? AnyFLXFormFieldStyle(FLXDefaultFormFieldStyle())).makeBody(configuration: .init(
            content: .init(underlyingContent: AnyView(content()))
        ))
    }
}

public struct FLXFormFieldDescription: View {
    @Environment(\.flxFormFieldDescriptionStyle) private var style

    private let text: Text

    public init(_ textKey: LocalizedStringKey) {
        self.text = Text(textKey)
    }

    @_disfavoredOverload
    public init(_ textResource: LocalizedStringResource) {
        self.text = Text(textResource)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ text: S) {
        self.text = Text(text)
    }

    public var body: some View {
        (style ?? AnyFLXFormFieldDescriptionStyle(FLXDefaultFormFieldDescriptionStyle())).makeBody(configuration: .init(text: text))
    }
}

public struct FLXFormFieldError: View {
    @Environment(\.flxFormFieldErrorStyle) private var style

    private let text: Text

    public init(_ textKey: LocalizedStringKey) {
        self.text = Text(textKey)
    }

    @_disfavoredOverload
    public init(_ textResource: LocalizedStringResource) {
        self.text = Text(textResource)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ text: S) {
        self.text = Text(text)
    }

    public var body: some View {
        (style ?? AnyFLXFormFieldErrorStyle(FLXDefaultFormFieldErrorStyle())).makeBody(configuration: .init(text: text))
    }
}
