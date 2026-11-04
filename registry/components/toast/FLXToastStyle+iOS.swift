import SwiftUI

// Compiled on every platform so the shared files build, but unavailable on
// macOS until it has its own rendering and behavior file.

private enum FLXToastMetrics {
    static let maxWidth: CGFloat = 420
    static let cornerRadius: CGFloat = 24
    static let timerStep: Duration = .milliseconds(100)
    static let dismissDistance: CGFloat = 60
    static let resistance: CGFloat = 6
}

// Draws the slot's toast over the view it's attached to, and runs its timer.
@available(macOS, unavailable)
struct FLXToastHost: ViewModifier {
    @ObservedObject var slot: FLXToastSlot

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.accessibilityVoiceOverEnabled) private var voiceOver
    @Environment(\.scenePhase) private var scenePhase
    @State private var isHovering = false
    @State private var dragOffset: CGFloat = 0

    // VoiceOver users need time to reach the toast, so it never times out for them.
    private var isPaused: Bool {
        voiceOver || isHovering || dragOffset != 0 || scenePhase != .active
    }

    private var alignment: Alignment {
        switch slot.edge {
        case .top: .top
        case .bottom: .bottom
        }
    }

    func body(content: Content) -> some View {
        content
            .overlay(alignment: alignment) {
                ZStack {
                    if let entry = slot.current {
                        toast(entry)
                            .id(entry.key)
                            .transition(transition(entry.edge))
                    }
                }
                .padding(.horizontal, FLXSpacing.lg)
                .padding(.vertical, FLXSpacing.sm)
            }
            .animation(.default, value: slot.current?.key)
            .task(id: slot.current?.key) {
                await present()
            }
    }

    private func transition(_ edge: VerticalEdge) -> AnyTransition {
        if reduceMotion {
            return .opacity
        }
        switch edge {
        case .top: return .move(edge: .top).combined(with: .opacity)
        case .bottom: return .move(edge: .bottom).combined(with: .opacity)
        }
    }

    private func toast(_ entry: FLXToastSlot.Entry) -> some View {
        (entry.style ?? AnyFLXToastStyle(FLXDefaultToastStyle()))
            .makeBody(configuration: configuration(entry))
            .offset(y: dragOffset)
            .gesture(swipe(entry))
            .onHover { isHovering = $0 }
            .accessibilityAction(.escape) { close(entry) }
    }

    private func configuration(_ entry: FLXToastSlot.Entry) -> FLXToastStyleConfiguration {
        FLXToastStyleConfiguration(
            title: entry.content.title,
            message: entry.content.message,
            systemImage: entry.content.systemImage,
            actions: entry.content.actions.map { actions in
                FLXToastStyleConfiguration.Actions(
                    underlyingActions: AnyView(
                        HStack(spacing: FLXSpacing.sm) {
                            actions
                            FLXToastCloseButton { close(entry) }
                        }
                        .buttonStyle(FLXToastActionButtonStyle { close(entry) })
                    )
                )
            }
        )
    }

    private func swipe(_ entry: FLXToastSlot.Entry) -> some Gesture {
        DragGesture()
            .onChanged { value in
                let height = value.translation.height
                if isTowardsEdge(height, entry.edge) {
                    dragOffset = height
                } else {
                    dragOffset = height / FLXToastMetrics.resistance
                }
            }
            .onEnded { value in
                let predicted = value.predictedEndTranslation.height
                if isTowardsEdge(predicted, entry.edge) && abs(predicted) > FLXToastMetrics.dismissDistance {
                    close(entry)
                }
                withAnimation(.default) {
                    dragOffset = 0
                }
            }
    }

    private func isTowardsEdge(_ height: CGFloat, _ edge: VerticalEdge) -> Bool {
        switch edge {
        case .top: height < 0
        case .bottom: height > 0
        }
    }

    private func close(_ entry: FLXToastSlot.Entry) {
        entry.dismiss()
        slot.clear(owner: entry.owner)
    }

    // Without a duration, the toast stays until the person acts on it or closes it.
    private func present() async {
        guard let entry = slot.current else { return }
        announce(entry.content.announcement)
        guard let duration = entry.duration else { return }
        var elapsed: Duration = .zero
        while elapsed < duration {
            do {
                try await Task.sleep(for: FLXToastMetrics.timerStep)
            } catch {
                return
            }
            if !isPaused {
                elapsed += FLXToastMetrics.timerStep
            }
        }
        close(entry)
    }

    private func announce(_ announcement: String) {
        if #available(iOS 17, macOS 14, *) {
            AccessibilityNotification.Announcement(announcement).post()
        }
    }
}

@available(macOS, unavailable)
struct FLXToastStyleBody: View {
    @ScaledMetric(relativeTo: .subheadline) private var scale: CGFloat = 1

    let configuration: FLXToastStyleConfiguration

    // The surface wraps the finished layout, as Apple asks of glass, so it
    // follows the presentation transition. One shape serves both layouts: the
    // corner reaches half the one-line height, which reads as a capsule, and
    // taller content gets the rounded rectangle Apple recommends.
    var body: some View {
        ViewThatFits(in: .horizontal) {
            row
                .padding(.horizontal, FLXSpacing.lg)
                .padding(.vertical, FLXSpacing.md)
            stacked
                .padding(FLXSpacing.lg)
        }
        .frame(maxWidth: FLXToastMetrics.maxWidth)
        .modifier(
            FLXToastSurface(
                shape: RoundedRectangle(cornerRadius: FLXToastMetrics.cornerRadius * scale, style: .continuous)
            )
        )
        .accessibilityElement(children: .contain)
    }

    private var row: some View {
        HStack(spacing: FLXSpacing.md) {
            icon
            texts
            Spacer(minLength: 0)
            actions
        }
    }

    // Large Dynamic Type sizes and long text move the actions below the text.
    private var stacked: some View {
        VStack(alignment: .leading, spacing: FLXSpacing.md) {
            HStack(alignment: .firstTextBaseline, spacing: FLXSpacing.md) {
                icon
                texts
                Spacer(minLength: 0)
            }
            if configuration.actions != nil {
                HStack {
                    Spacer(minLength: 0)
                    actions
                }
            }
        }
    }

    @ViewBuilder
    private var icon: some View {
        if let systemImage = configuration.systemImage {
            Image(systemName: systemImage)
                .imageScale(.large)
                .foregroundStyle(.tint)
                .accessibilityHidden(true)
        }
    }

    // Hierarchical styles keep the system's vibrancy over glass and materials.
    private var texts: some View {
        VStack(alignment: .leading) {
            configuration.title
                .flxFont(.subheadline, weight: .semibold)
                .foregroundStyle(.primary)
            if let message = configuration.message {
                message
                    .flxFont(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
    }

    @ViewBuilder
    private var actions: some View {
        if let actions = configuration.actions {
            actions
                .buttonStyle(.borderless)
                .flxFont(.subheadline, weight: .semibold)
        }
    }
}

// The floating surface belongs to the system: Liquid Glass where available,
// the regular material before it. The theme only reaches it through tint.
@available(macOS, unavailable)
struct FLXToastSurface<S: Shape>: ViewModifier {
    let shape: S

    func body(content: Content) -> some View {
        if #available(iOS 26, macOS 26, *) {
            content.glassEffect(.regular, in: shape)
        } else {
            content.background(.regularMaterial, in: shape)
        }
    }
}

// Like an alert, any action dismisses the toast. A primitive style sees every
// activation (touch, VoiceOver, keyboard), and the Button it creates still
// takes the appearance from the styles applied further out. It dismisses
// first, so an action that presents a new toast isn't cancelled.
@available(macOS, unavailable)
struct FLXToastActionButtonStyle: PrimitiveButtonStyle {
    let dismiss: () -> Void

    func makeBody(configuration: Configuration) -> some View {
        Button(role: configuration.role) {
            dismiss()
            configuration.trigger()
        } label: {
            configuration.label
        }
    }
}

// Swipe needs a button alternative. The close role brings the system symbol
// and its translated label.
@available(macOS, unavailable)
struct FLXToastCloseButton: View {
    let action: () -> Void

    var body: some View {
        closeButton
            .labelStyle(.iconOnly)
            .foregroundStyle(.secondary)
    }

    @ViewBuilder
    private var closeButton: some View {
        if #available(iOS 26, macOS 26, *) {
            Button(role: .close, action: action)
        } else {
            Button(action: action) {
                Label("Close", systemImage: "xmark")
            }
        }
    }
}
