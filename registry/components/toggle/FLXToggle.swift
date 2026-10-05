import SwiftUI

/// Always controlled — mirrors `FLXTextField`'s `text: Binding<String>`. The on/off
/// value is application data the caller needs to read regardless, so there's no
/// uncontrolled variant (unlike `FLXCollapsible`'s ephemeral open/closed state).
public struct FLXToggle<Label: View>: View {
    @Environment(\.flxToggleStyleOverride) private var styleOverride

    @Binding private var isOn: Bool
    private let label: () -> Label

    public init(isOn: Binding<Bool>, @ViewBuilder label: @escaping () -> Label) {
        self._isOn = isOn
        self.label = label
    }

    public var body: some View {
        Toggle(isOn: $isOn, label: label)
            .toggleStyle(styleOverride ?? AnyFLXToggleStyle(FLXToggleStyle()))
    }
}

extension FLXToggle where Label == Text {
    public init(_ titleKey: LocalizedStringKey, isOn: Binding<Bool>) {
        self.init(isOn: isOn) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(_ titleResource: LocalizedStringResource, isOn: Binding<Bool>) {
        self.init(isOn: isOn) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(_ title: S, isOn: Binding<Bool>) {
        self.init(isOn: isOn) {
            Text(title)
        }
    }
}
