import SwiftUI

// A one-time code field types into a native text field nobody sees. AutoFill
// only offers a code from Messages, Mail or a password app to a real text
// field on the system keyboard, so the slots are drawn over that one field
// instead of being fields of their own: one field per slot also breaks
// AutoFill, which pastes the whole code into a single field.
//
// The title isn't shown. It's the name VoiceOver reads for the field, so it's
// a LocalizedStringResource (or a String shown as is): UIKit's accessibility
// label needs a String, and a LocalizedStringKey can't be read back as one.
//
// The code accepts digits only. Spaces and dashes in a pasted or filled code
// are dropped, and the code never grows past `length`. React to a complete
// code with `.onChange(of:)`: the number pad has no Return key.
@available(macOS, unavailable)
public struct FLXOneTimeCodeField: View {
    @Environment(\.flxOneTimeCodeFieldStyle) private var style
    @State private var activeIndex: Int?

    @Binding private var text: String
    private let title: String
    private let length: Int

    public init(_ titleResource: LocalizedStringResource, text: Binding<String>, length: Int = 6) {
        self.init(title: String(localized: titleResource), text: text, length: length)
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ title: S, text: Binding<String>, length: Int = 6) {
        self.init(title: String(title), text: text, length: length)
    }

    private init(title: String, text: Binding<String>, length: Int) {
        self.title = title
        self._text = text
        self.length = max(1, length)
    }

    public var body: some View {
        (style ?? AnyFLXOneTimeCodeFieldStyle(FLXDefaultOneTimeCodeFieldStyle()))
            .makeBody(configuration: configuration)
            .accessibilityHidden(true)
            .overlay {
                input
            }
    }

    @ViewBuilder
    private var input: some View {
        #if os(iOS)
        FLXOneTimeCodeInput(title: title, text: $text, length: length, activeIndex: $activeIndex)
        #endif
    }

    private var configuration: FLXOneTimeCodeFieldStyleConfiguration {
        let characters = Array(text.prefix(length))
        let slots = (0..<length).map { index in
            FLXOneTimeCodeFieldStyleConfiguration.Slot(
                id: index,
                character: character(at: index, in: characters),
                isActive: index == activeIndex
            )
        }
        return FLXOneTimeCodeFieldStyleConfiguration(slots: slots, isFocused: activeIndex != nil)
    }

    private func character(at index: Int, in characters: [Character]) -> Text? {
        guard index < characters.count else { return nil }
        return Text(verbatim: String(characters[index]))
    }
}
