import SwiftUI

public enum FLXButtonVariant {
    case primary
    case outline
    case secondary
    case ghost
    case link
}

public struct FLXButton<Label: View>: View {
    @Environment(\.flxButtonStyleOverride) private var styleOverride

    private let action: () -> Void
    private let role: ButtonRole?
    private let variant: FLXButtonVariant
    private let label: () -> Label

    public init(
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.role = role
        self.variant = variant
        self.action = action
        self.label = label
    }

    public var body: some View {
        Button(role: role, action: action, label: label)
            .buttonStyle(styleOverride ?? AnyFLXButtonStyle(FLXButtonStyle(variant: variant)))
    }
}

extension FLXButton where Label == Text {
    public init(
        _ titleKey: LocalizedStringKey,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            Text(titleKey)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            Text(titleResource)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            Text(title)
        }
    }
}

extension FLXButton where Label == SwiftUI.Label<Text, Image> {
    public init(
        _ titleKey: LocalizedStringKey,
        systemImage: String,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            SwiftUI.Label(titleKey, systemImage: systemImage)
        }
    }

    @_disfavoredOverload
    public init(
        _ titleResource: LocalizedStringResource,
        systemImage: String,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            SwiftUI.Label(titleResource, systemImage: systemImage)
        }
    }

    @_disfavoredOverload
    public init<S: StringProtocol>(
        _ title: S,
        systemImage: String,
        role: ButtonRole? = nil,
        variant: FLXButtonVariant = .primary,
        action: @escaping () -> Void
    ) {
        self.init(role: role, variant: variant, action: action) {
            SwiftUI.Label(title, systemImage: systemImage)
        }
    }
}
