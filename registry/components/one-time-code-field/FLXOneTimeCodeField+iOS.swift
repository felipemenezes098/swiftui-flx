#if os(iOS)
import SwiftUI
import UIKit

// The field the code is typed into. It sits over the slots with clear text,
// so it gets the system keyboard, AutoFill, paste and VoiceOver while the
// style draws what people see. A SwiftUI TextField can't do this: it moves
// the caret to the start on a tap and offers Select and Select All over
// slots that hide the text.
struct FLXOneTimeCodeInput: UIViewRepresentable {
    let title: String
    @Binding var text: String
    let length: Int
    @Binding var activeIndex: Int?

    func makeUIView(context: Context) -> FLXOneTimeCodeTextField {
        let field = FLXOneTimeCodeTextField()
        field.textContentType = .oneTimeCode
        field.keyboardType = .numberPad
        field.autocorrectionType = .no
        field.spellCheckingType = .no
        field.textColor = .clear
        field.tintColor = .clear
        field.delegate = context.coordinator
        field.addTarget(context.coordinator, action: #selector(Coordinator.textChanged(_:)), for: .editingChanged)
        return field
    }

    func updateUIView(_ field: FLXOneTimeCodeTextField, context: Context) {
        context.coordinator.parent = self
        field.length = length
        field.accessibilityLabel = title
        field.isEnabled = context.environment.isEnabled
        let code = FLXOneTimeCodeInput.digits(in: text, length: length)
        if field.text != code {
            field.text = code
        }
        if text != code {
            DispatchQueue.main.async {
                text = code
            }
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    static func digits(in string: String, length: Int) -> String {
        String(string.filter(\.isWholeNumber).filter(\.isASCII).prefix(length))
    }

    final class Coordinator: NSObject, UITextFieldDelegate {
        var parent: FLXOneTimeCodeInput

        init(parent: FLXOneTimeCodeInput) {
            self.parent = parent
        }

        // Typing over a filled slot replaces its digit instead of pushing the
        // rest along, and a whole code (pasted, or filled from Messages, Mail
        // or a password app) replaces everything. Deleting keeps the default:
        // the digits after it move back one slot.
        func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
            if string.isEmpty { return true }
            let length = parent.length
            let digits = Array(FLXOneTimeCodeInput.digits(in: string, length: length))
            if digits.isEmpty { return false }
            if digits.count == length {
                textField.text = String(digits)
                textChanged(textField)
                return false
            }
            var characters = Array(textField.text ?? "")
            let start = min(range.location, characters.count)
            let replaced = max(range.length, min(digits.count, characters.count - start))
            characters.replaceSubrange(start..<start + replaced, with: digits)
            textField.text = String(characters.prefix(length))
            textChanged(textField)
            let caret = min(start + digits.count, textField.text?.count ?? 0)
            if let position = textField.position(from: textField.beginningOfDocument, offset: caret) {
                textField.selectedTextRange = textField.textRange(from: position, to: position)
            }
            return false
        }

        @objc func textChanged(_ textField: UITextField) {
            let code = FLXOneTimeCodeInput.digits(in: textField.text ?? "", length: parent.length)
            if textField.text != code {
                textField.text = code
            }
            if parent.text != code {
                parent.text = code
            }
            reportActiveIndex(textField)
        }

        func textFieldDidChangeSelection(_ textField: UITextField) {
            reportActiveIndex(textField)
        }

        func textFieldDidBeginEditing(_ textField: UITextField) {
            reportActiveIndex(textField)
        }

        func textFieldDidEndEditing(_ textField: UITextField) {
            parent.activeIndex = nil
        }

        private func reportActiveIndex(_ textField: UITextField) {
            guard textField.isFirstResponder, let range = textField.selectedTextRange else { return }
            let offset = textField.offset(from: textField.beginningOfDocument, to: range.start)
            let index = min(offset, parent.length - 1)
            if parent.activeIndex != index {
                parent.activeIndex = index
            }
        }
    }
}

// A tap picks the slot under the finger: a filled slot gets selected so the
// next digit replaces it, and an empty one puts the caret after the last
// digit, since the code can't have gaps. The real caret, selection handles
// and the edit menu stay hidden; the style draws the active slot instead,
// and paste is the only action left (the system adds AutoFill next to it).
final class FLXOneTimeCodeTextField: UITextField {
    var length = 1

    override init(frame: CGRect) {
        super.init(frame: frame)
        addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(tapped(_:))))
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    @objc private func tapped(_ recognizer: UITapGestureRecognizer) {
        guard isEnabled else { return }
        if !isFirstResponder {
            becomeFirstResponder()
        }
        let position = closestPosition(to: recognizer.location(in: self)) ?? endOfDocument
        selectedTextRange = textRange(from: position, to: position)
    }

    override func closestPosition(to point: CGPoint) -> UITextPosition? {
        let count = text?.count ?? 0
        let slotWidth = bounds.width / CGFloat(length)
        guard slotWidth > 0 else { return endOfDocument }
        let slot = Int(point.x / slotWidth)
        return position(from: beginningOfDocument, offset: max(0, min(slot, count)))
    }

    override var selectedTextRange: UITextRange? {
        get { super.selectedTextRange }
        set {
            guard let newValue, newValue.isEmpty else {
                super.selectedTextRange = newValue
                return
            }
            let offset = self.offset(from: beginningOfDocument, to: newValue.start)
            guard offset < text?.count ?? 0,
                  let start = position(from: beginningOfDocument, offset: offset),
                  let end = position(from: start, offset: 1) else {
                super.selectedTextRange = newValue
                return
            }
            super.selectedTextRange = textRange(from: start, to: end)
        }
    }

    // VoiceOver reads the code digit by digit ("four, eight, two") instead of
    // as a number, and says how much of it is filled in.
    override var accessibilityAttributedValue: NSAttributedString? {
        get { NSAttributedString(string: text ?? "", attributes: [.accessibilitySpeechSpellOut: true]) }
        set {}
    }

    override var accessibilityHint: String? {
        get {
            let entered = text?.count ?? 0
            return String(localized: "\(entered) of \(length) digits entered.")
        }
        set {}
    }

    override func caretRect(for position: UITextPosition) -> CGRect {
        .zero
    }

    override func selectionRects(for range: UITextRange) -> [UITextSelectionRect] {
        []
    }

    override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        action == #selector(paste(_:))
    }
}
#endif
