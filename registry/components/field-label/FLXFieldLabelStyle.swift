import SwiftUI

public struct FLXFieldLabelStyle: LabeledContentStyle {
    public let orientation: FLXFieldLabelOrientation

    public init(orientation: FLXFieldLabelOrientation) {
        self.orientation = orientation
    }

    public func makeBody(configuration: Configuration) -> some View {
        FLXFieldLabelStyleBody(configuration: configuration, orientation: orientation)
    }
}

private struct FLXFieldLabelStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled

    let configuration: FLXFieldLabelStyle.Configuration
    let orientation: FLXFieldLabelOrientation

    var body: some View {
        switch orientation {
        case .vertical:
            VStack(alignment: .leading, spacing: FLXSpacing.xs) {
                labelText
                configuration.content
            }
        case .horizontal:
            HStack(alignment: .center, spacing: FLXSpacing.md) {
                labelText
                Spacer()
                configuration.content
            }
        }
    }

    // Only the caption dims on `.disabled(true)` — the wrapped control (`FLXTextField`,
    // `FLXPicker`, ...) already dims itself via its own style. Applying opacity to
    // the whole row here too would compound (0.5 * 0.5), double-dimming the control.
    private var labelText: some View {
        configuration.label
            .flxFont(.subheadline)
            .foregroundStyle(theme.colors.foreground)
            .opacity(isEnabled ? 1 : FLXOpacity.disabled)
    }
}

struct AnyFLXFieldLabelStyle: LabeledContentStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: LabeledContentStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> some View {
        _makeBody(configuration)
    }
}

private struct FLXFieldLabelStyleOverrideKey: EnvironmentKey {
    static let defaultValue: AnyFLXFieldLabelStyle? = nil
}

extension EnvironmentValues {
    var flxFieldLabelStyleOverride: AnyFLXFieldLabelStyle? {
        get { self[FLXFieldLabelStyleOverrideKey.self] }
        set { self[FLXFieldLabelStyleOverrideKey.self] = newValue }
    }
}

extension View {
    public func flxFieldLabelStyle<S: LabeledContentStyle>(_ style: S) -> some View {
        environment(\.flxFieldLabelStyleOverride, AnyFLXFieldLabelStyle(style))
    }
}
