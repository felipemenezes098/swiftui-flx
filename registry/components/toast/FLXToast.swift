import Combine
import SwiftUI

// Titles and messages are text, not views, because VoiceOver announcements
// need a String: a LocalizedStringKey or an arbitrary view can't be read back.
// LocalizedStringResource keeps them translated and extracted by Xcode.
//
// A title can also be a String shown as is, such as a file name. A message is
// always a LocalizedStringResource: a String overload would make Swift pick it
// for literals too, and the copy would silently stop being translated. Runtime
// text goes in through interpolation, `message: "\(detail)"`.
//
// Actions take the toast's button style, which also dismisses the toast. Like
// an alert's, they shouldn't get their own `.buttonStyle(_:)`: the innermost
// style wins, so that button would no longer dismiss the toast.
@available(macOS, unavailable)
extension View {
    // Only toasts without actions time out. A toast with actions stays until
    // the person acts on it or closes it, so it takes no duration.
    public func flxToast(
        _ titleResource: LocalizedStringResource,
        systemImage: String? = nil,
        isPresented: Binding<Bool>,
        message: LocalizedStringResource? = nil,
        edge: VerticalEdge = .top,
        duration: Duration = .seconds(4)
    ) -> some View {
        modifier(
            FLXToastPresenter(
                isPresented: isPresented.wrappedValue,
                identity: nil,
                content: FLXToastContent(title: titleResource, message: message, systemImage: systemImage, actions: EmptyView()),
                edge: edge,
                duration: duration,
                dismiss: { isPresented.wrappedValue = false }
            )
        )
    }

    public func flxToast<A: View>(
        _ titleResource: LocalizedStringResource,
        systemImage: String? = nil,
        isPresented: Binding<Bool>,
        message: LocalizedStringResource? = nil,
        edge: VerticalEdge = .top,
        @ViewBuilder actions: () -> A
    ) -> some View {
        modifier(
            FLXToastPresenter(
                isPresented: isPresented.wrappedValue,
                identity: nil,
                content: FLXToastContent(title: titleResource, message: message, systemImage: systemImage, actions: actions()),
                edge: edge,
                duration: nil,
                dismiss: { isPresented.wrappedValue = false }
            )
        )
    }

    @_disfavoredOverload
    public func flxToast<S: StringProtocol>(
        _ title: S,
        systemImage: String? = nil,
        isPresented: Binding<Bool>,
        message: LocalizedStringResource? = nil,
        edge: VerticalEdge = .top,
        duration: Duration = .seconds(4)
    ) -> some View {
        modifier(
            FLXToastPresenter(
                isPresented: isPresented.wrappedValue,
                identity: nil,
                content: FLXToastContent(title: title, message: message, systemImage: systemImage, actions: EmptyView()),
                edge: edge,
                duration: duration,
                dismiss: { isPresented.wrappedValue = false }
            )
        )
    }

    @_disfavoredOverload
    public func flxToast<S: StringProtocol, A: View>(
        _ title: S,
        systemImage: String? = nil,
        isPresented: Binding<Bool>,
        message: LocalizedStringResource? = nil,
        edge: VerticalEdge = .top,
        @ViewBuilder actions: () -> A
    ) -> some View {
        modifier(
            FLXToastPresenter(
                isPresented: isPresented.wrappedValue,
                identity: nil,
                content: FLXToastContent(title: title, message: message, systemImage: systemImage, actions: actions()),
                edge: edge,
                duration: nil,
                dismiss: { isPresented.wrappedValue = false }
            )
        )
    }

    public func flxToast<T: Identifiable>(
        item: Binding<T?>,
        systemImage: String? = nil,
        edge: VerticalEdge = .top,
        duration: Duration = .seconds(4),
        title: (T) -> LocalizedStringResource,
        message: ((T) -> LocalizedStringResource)? = nil
    ) -> some View {
        itemToast(item: item, edge: edge, duration: duration) { value in
            FLXToastContent(title: title(value), message: message.map { $0(value) }, systemImage: systemImage, actions: EmptyView())
        }
    }

    // A new `id` replaces the toast on screen; the same `id` with new data
    // updates it in place without restarting its timer.
    public func flxToast<T: Identifiable, A: View>(
        item: Binding<T?>,
        systemImage: String? = nil,
        edge: VerticalEdge = .top,
        title: (T) -> LocalizedStringResource,
        message: ((T) -> LocalizedStringResource)? = nil,
        @ViewBuilder actions: (T) -> A
    ) -> some View {
        itemToast(item: item, edge: edge, duration: nil) { value in
            FLXToastContent(title: title(value), message: message.map { $0(value) }, systemImage: systemImage, actions: actions(value))
        }
    }

    @_disfavoredOverload
    public func flxToast<T: Identifiable, S: StringProtocol>(
        item: Binding<T?>,
        systemImage: String? = nil,
        edge: VerticalEdge = .top,
        duration: Duration = .seconds(4),
        title: (T) -> S,
        message: ((T) -> LocalizedStringResource)? = nil
    ) -> some View {
        itemToast(item: item, edge: edge, duration: duration) { value in
            FLXToastContent(title: title(value), message: message.map { $0(value) }, systemImage: systemImage, actions: EmptyView())
        }
    }

    @_disfavoredOverload
    public func flxToast<T: Identifiable, S: StringProtocol, A: View>(
        item: Binding<T?>,
        systemImage: String? = nil,
        edge: VerticalEdge = .top,
        title: (T) -> S,
        message: ((T) -> LocalizedStringResource)? = nil,
        @ViewBuilder actions: (T) -> A
    ) -> some View {
        itemToast(item: item, edge: edge, duration: nil) { value in
            FLXToastContent(title: title(value), message: message.map { $0(value) }, systemImage: systemImage, actions: actions(value))
        }
    }

    private func itemToast<T: Identifiable>(
        item: Binding<T?>,
        edge: VerticalEdge,
        duration: Duration?,
        content: (T) -> FLXToastContent
    ) -> some View {
        let value = item.wrappedValue
        return modifier(
            FLXToastPresenter(
                isPresented: value != nil,
                identity: value.map { AnyHashable($0.id) },
                content: value.map(content),
                edge: edge,
                duration: duration,
                dismiss: { item.wrappedValue = nil }
            )
        )
    }
}

// One toast at a time, with no setup. The outermost toast modifier owns the
// slot and hands it down through the environment, so every toast inside it
// replaces the one on screen instead of drawing over it. A sheet keeps its own
// slot: preferences don't cross a presentation, so the slot behind the sheet
// never sees the toasts declared in it.
@available(macOS, unavailable)
struct FLXToastPresenter: ViewModifier {
    let isPresented: Bool
    let identity: AnyHashable?
    let content: FLXToastContent?
    let edge: VerticalEdge
    let duration: Duration?
    let dismiss: () -> Void

    @Environment(\.flxToastSlot) private var outer
    @StateObject private var own = FLXToastSlot()
    @State private var id = UUID()

    func body(content view: Content) -> some View {
        view.modifier(
            FLXToastRouter(
                request: self,
                id: id,
                outer: outer ?? own,
                own: own
            )
        )
    }
}

@available(macOS, unavailable)
struct FLXToastRouter: ViewModifier {
    let request: FLXToastPresenter
    let id: UUID
    @ObservedObject var outer: FLXToastSlot
    @ObservedObject var own: FLXToastSlot

    @Environment(\.flxToastStyle) private var style

    private struct SyncKey: Hashable {
        var isPresented: Bool
        var identity: AnyHashable?
        var announcement: String?
        var isRouted: Bool
    }

    private var isRouted: Bool {
        outer !== own && outer.reachable.contains(id)
    }

    private var target: FLXToastSlot {
        if isRouted {
            return outer
        }
        return own
    }

    // The announcement stands in for the content: same `id` with new text
    // updates the toast in place.
    private var syncKey: SyncKey {
        SyncKey(
            isPresented: request.isPresented,
            identity: request.identity,
            announcement: request.content?.announcement,
            isRouted: isRouted
        )
    }

    func body(content: Content) -> some View {
        content
            .onPreferenceChange(FLXToastSlotMembers.self) { members in
                own.reachable = members
            }
            .environment(\.flxToastSlot, target)
            .transformPreference(FLXToastSlotMembers.self) { members in
                members.insert(id)
            }
            .modifier(FLXToastHost(slot: own))
            .task(id: syncKey) {
                sync()
            }
    }

    private func sync() {
        guard request.isPresented, let content = request.content else {
            outer.clear(owner: id)
            own.clear(owner: id)
            return
        }
        target.present(
            FLXToastSlot.Entry(
                owner: id,
                identity: request.identity,
                content: content,
                style: style,
                edge: request.edge,
                duration: request.duration,
                dismiss: request.dismiss
            )
        )
    }
}

@available(macOS, unavailable)
@MainActor
final class FLXToastSlot: ObservableObject {
    struct Key: Hashable {
        let owner: UUID
        let identity: AnyHashable?
    }

    struct Entry {
        let owner: UUID
        let identity: AnyHashable?
        let content: FLXToastContent
        let style: AnyFLXToastStyle?
        let edge: VerticalEdge
        let duration: Duration?
        let dismiss: () -> Void

        var key: Key {
            Key(owner: owner, identity: identity)
        }
    }

    @Published private(set) var current: Entry?
    // Kept after dismissal so the leaving toast exits through its own edge.
    @Published private(set) var edge: VerticalEdge = .top
    @Published var reachable: Set<UUID> = []

    // A toast from another modifier is dismissed, so its binding shows it's gone.
    func present(_ entry: Entry) {
        if let current, current.owner != entry.owner {
            current.dismiss()
        }
        edge = entry.edge
        current = entry
    }

    func clear(owner: UUID) {
        if current?.owner == owner {
            current = nil
        }
    }
}

@available(macOS, unavailable)
private struct FLXToastSlotKey: EnvironmentKey {
    static let defaultValue: FLXToastSlot? = nil
}

@available(macOS, unavailable)
extension EnvironmentValues {
    var flxToastSlot: FLXToastSlot? {
        get { self[FLXToastSlotKey.self] }
        set { self[FLXToastSlotKey.self] = newValue }
    }
}

@available(macOS, unavailable)
private struct FLXToastSlotMembers: PreferenceKey {
    static let defaultValue: Set<UUID> = []

    static func reduce(value: inout Set<UUID>, nextValue: () -> Set<UUID>) {
        value.formUnion(nextValue())
    }
}

@available(macOS, unavailable)
struct FLXToastContent {
    let title: Text
    let message: Text?
    let systemImage: String?
    let actions: AnyView?
    let announcement: String

    init<A: View>(title: LocalizedStringResource, message: LocalizedStringResource?, systemImage: String?, actions: A) {
        self.init(
            title: Text(title),
            titleString: String(localized: title),
            message: message.map { Text($0) },
            messageString: message.map { String(localized: $0) },
            systemImage: systemImage,
            actions: actions
        )
    }

    init<S: StringProtocol, A: View>(title: S, message: LocalizedStringResource?, systemImage: String?, actions: A) {
        self.init(
            title: Text(title),
            titleString: String(title),
            message: message.map { Text($0) },
            messageString: message.map { String(localized: $0) },
            systemImage: systemImage,
            actions: actions
        )
    }

    private init<A: View>(title: Text, titleString: String, message: Text?, messageString: String?, systemImage: String?, actions: A) {
        self.title = title
        self.message = message
        self.systemImage = systemImage
        self.announcement = [titleString, messageString].compactMap { $0 }.joined(separator: ". ")
        if A.self == EmptyView.self {
            self.actions = nil
        } else {
            self.actions = AnyView(actions)
        }
    }
}
