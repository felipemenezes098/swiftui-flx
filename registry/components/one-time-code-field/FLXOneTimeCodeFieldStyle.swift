import SwiftUI

@available(macOS, unavailable)
@MainActor
public protocol FLXOneTimeCodeFieldStyle {
    associatedtype Body: View
    typealias Configuration = FLXOneTimeCodeFieldStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

// A style draws the slots however it likes. Taps pick a slot by its share of
// the field's width, so lay the slots out evenly across the field.
@available(macOS, unavailable)
public struct FLXOneTimeCodeFieldStyleConfiguration {
    public struct Slot: Identifiable {
        public let id: Int
        public let character: Text?
        // The slot the next digit goes into, or the one it replaces.
        public let isActive: Bool
    }

    public let slots: [Slot]
    public let isFocused: Bool
}

// `groupSize` splits the slots into groups with a dash between them, such as
// 3 + 3 for a six-digit code.
@available(macOS, unavailable)
public struct FLXDefaultOneTimeCodeFieldStyle: FLXOneTimeCodeFieldStyle {
    private let groupSize: Int?

    public init(groupSize: Int? = nil) {
        self.groupSize = groupSize
    }

    public func makeBody(configuration: Configuration) -> some View {
        FLXOneTimeCodeFieldStyleBody(configuration: configuration, groupSize: groupSize)
    }
}

@available(macOS, unavailable)
struct AnyFLXOneTimeCodeFieldStyle: FLXOneTimeCodeFieldStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXOneTimeCodeFieldStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

@available(macOS, unavailable)
private struct FLXOneTimeCodeFieldStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXOneTimeCodeFieldStyle? = nil
}

@available(macOS, unavailable)
extension EnvironmentValues {
    var flxOneTimeCodeFieldStyle: AnyFLXOneTimeCodeFieldStyle? {
        get { self[FLXOneTimeCodeFieldStyleKey.self] }
        set { self[FLXOneTimeCodeFieldStyleKey.self] = newValue }
    }
}

@available(macOS, unavailable)
extension View {
    public func flxOneTimeCodeFieldStyle<S: FLXOneTimeCodeFieldStyle>(_ style: S) -> some View {
        environment(\.flxOneTimeCodeFieldStyle, AnyFLXOneTimeCodeFieldStyle(style))
    }
}

private enum FLXOneTimeCodeFieldMetrics {
    // The slot grows with the text until the row would outgrow the field, then
    // stops: six slots at the largest accessibility size need about 660pt.
    static let slotWidth: CGFloat = 44
    static let slotAspectRatio: CGFloat = 44.0 / 52.0
    static let largestDigitSize: DynamicTypeSize = .xxxLarge
    static let caretWidth: CGFloat = 2
    static let caretHeightRatio: CGFloat = 0.45
    static let caretBlink: Double = 0.5
}

@available(macOS, unavailable)
private struct FLXOneTimeCodeFieldStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.isEnabled) private var isEnabled
    @ScaledMetric(relativeTo: .title2) private var slotWidth = FLXOneTimeCodeFieldMetrics.slotWidth

    let configuration: FLXOneTimeCodeFieldStyleConfiguration
    let groupSize: Int?

    var body: some View {
        HStack(spacing: FLXSpacing.sm) {
            ForEach(groups, id: \.first?.id) { group in
                if group.first?.id != 0 {
                    separator
                }
                HStack(spacing: FLXSpacing.sm) {
                    ForEach(group) { slot in
                        slotView(slot)
                    }
                }
            }
        }
        .opacity(opacity)
    }

    private var groups: [[FLXOneTimeCodeFieldStyleConfiguration.Slot]] {
        guard let groupSize, groupSize > 0 else { return [configuration.slots] }
        return stride(from: 0, to: configuration.slots.count, by: groupSize).map { start in
            Array(configuration.slots[start..<min(start + groupSize, configuration.slots.count)])
        }
    }

    private var separator: some View {
        Image(systemName: "minus")
            .flxFont(.body)
            .foregroundStyle(theme.colors.mutedForeground)
    }

    private func slotView(_ slot: FLXOneTimeCodeFieldStyleConfiguration.Slot) -> some View {
        RoundedRectangle(cornerRadius: theme.radius.md)
            .fill(theme.colors.card)
            .overlay {
                RoundedRectangle(cornerRadius: theme.radius.md)
                    .strokeBorder(borderColor(slot), lineWidth: borderWidth(slot))
            }
            .overlay {
                slotContent(slot)
            }
            .aspectRatio(FLXOneTimeCodeFieldMetrics.slotAspectRatio, contentMode: .fit)
            .frame(maxWidth: slotWidth)
    }

    @ViewBuilder
    private func slotContent(_ slot: FLXOneTimeCodeFieldStyleConfiguration.Slot) -> some View {
        if let character = slot.character {
            character
                .flxFont(.title2)
                .monospacedDigit()
                .foregroundStyle(theme.colors.foreground)
                .dynamicTypeSize(...FLXOneTimeCodeFieldMetrics.largestDigitSize)
                .minimumScaleFactor(0.5)
        } else if slot.isActive {
            FLXOneTimeCodeFieldCaret()
        }
    }

    private func borderColor(_ slot: FLXOneTimeCodeFieldStyleConfiguration.Slot) -> Color {
        if slot.isActive { return theme.colors.ring }
        return theme.colors.input
    }

    private func borderWidth(_ slot: FLXOneTimeCodeFieldStyleConfiguration.Slot) -> CGFloat {
        if slot.isActive { return FLXBorderWidth.thick }
        return FLXBorderWidth.thin
    }

    private var opacity: Double {
        if isEnabled { return 1 }
        return FLXOpacity.disabled
    }
}

// The real caret belongs to the hidden field, so the empty active slot draws
// its own. It stays still with Reduce Motion on.
@available(macOS, unavailable)
private struct FLXOneTimeCodeFieldCaret: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isVisible = true

    var body: some View {
        GeometryReader { proxy in
            Rectangle()
                .fill(theme.colors.foreground)
                .frame(
                    width: FLXOneTimeCodeFieldMetrics.caretWidth,
                    height: proxy.size.height * FLXOneTimeCodeFieldMetrics.caretHeightRatio
                )
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .opacity(caretOpacity)
        .onAppear {
            guard !reduceMotion else { return }
            withAnimation(.easeInOut(duration: FLXOneTimeCodeFieldMetrics.caretBlink).repeatForever()) {
                isVisible = false
            }
        }
    }

    private var caretOpacity: Double {
        if isVisible { return 1 }
        return 0
    }
}
