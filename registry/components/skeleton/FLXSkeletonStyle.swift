import SwiftUI

@MainActor
public protocol FLXSkeletonStyle {
    associatedtype Body: View
    typealias Configuration = FLXSkeletonStyleConfiguration

    @ViewBuilder func makeBody(configuration: Configuration) -> Body
}

public struct FLXSkeletonStyleConfiguration {}

public struct FLXDefaultSkeletonStyle: FLXSkeletonStyle {
    public init() {}

    public func makeBody(configuration: Configuration) -> some View {
        FLXDefaultSkeletonStyleBody()
    }
}

private enum FLXSkeletonMetrics {
    static let pulseOpacity: Double = 0.5
    static let pulseDuration: Double = 1
}

private struct FLXDefaultSkeletonStyleBody: View {
    @Environment(\.flxTheme) private var theme
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var isPulsing = false

    var body: some View {
        RoundedRectangle(cornerRadius: theme.radius.md)
            .fill(theme.colors.accent)
            .opacity(opacity)
            .animation(.easeInOut(duration: FLXSkeletonMetrics.pulseDuration).repeatForever(autoreverses: true), value: isPulsing)
            .onAppear { isPulsing = true }
    }

    private var opacity: Double {
        if isPulsing && !reduceMotion {
            return FLXSkeletonMetrics.pulseOpacity
        }
        return 1
    }
}

struct AnyFLXSkeletonStyle: FLXSkeletonStyle {
    private let _makeBody: (Configuration) -> AnyView

    init<S: FLXSkeletonStyle>(_ style: S) {
        _makeBody = { AnyView(style.makeBody(configuration: $0)) }
    }

    func makeBody(configuration: Configuration) -> AnyView {
        _makeBody(configuration)
    }
}

private struct FLXSkeletonStyleKey: EnvironmentKey {
    static let defaultValue: AnyFLXSkeletonStyle? = nil
}

extension EnvironmentValues {
    var flxSkeletonStyle: AnyFLXSkeletonStyle? {
        get { self[FLXSkeletonStyleKey.self] }
        set { self[FLXSkeletonStyleKey.self] = newValue }
    }
}

extension View {
    public func flxSkeletonStyle<S: FLXSkeletonStyle>(_ style: S) -> some View {
        environment(\.flxSkeletonStyle, AnyFLXSkeletonStyle(style))
    }
}
