import AuthenticationServices
import SwiftUI

struct SignInView: View {
    enum Field {
        case email
        case password
    }

    var onSignIn: (_ email: String, _ password: String) -> Void = { _, _ in }
    var onSignInWithApple: (Result<ASAuthorization, Error>) -> Void = { _ in }
    var onForgotPassword: () -> Void = {}
    var onSignUp: () -> Void = {}

    @Environment(\.flxTheme) private var theme
    @Environment(\.colorScheme) private var colorScheme
    @State private var email = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?

    var body: some View {
        VStack(spacing: FLXSpacing.xl) {
            header
            appleButton
            divider
            fields
            footer
        }
        .frame(maxWidth: 300)
        .padding(FLXSpacing.xl)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(theme.colors.background)
    }

    private var header: some View {
        VStack(spacing: FLXSpacing.md) {
            Image(systemName: "sparkle")
                .font(.title3)
                .foregroundStyle(theme.colors.primaryForeground)
                .frame(width: 40, height: 40)
                .background(theme.colors.primary, in: RoundedRectangle(cornerRadius: theme.radius.lg))
            VStack(spacing: FLXSpacing.xs) {
                Text("Welcome back")
                    .flxFont(.title)
                    .foregroundStyle(theme.colors.foreground)
                Text("Sign in to your account to continue.")
                    .flxFont(.subheadline)
                    .foregroundStyle(theme.colors.mutedForeground)
            }
        }
        .multilineTextAlignment(.center)
    }

    private var appleButton: some View {
        SignInWithAppleButton(.signIn) { request in
            request.requestedScopes = [.fullName, .email]
        } onCompletion: { result in
            onSignInWithApple(result)
        }
        .signInWithAppleButtonStyle(appleButtonStyle)
        .frame(height: 28)
        .clipShape(RoundedRectangle(cornerRadius: theme.radius.md))
    }

    private var appleButtonStyle: SignInWithAppleButton.Style {
        if colorScheme == .dark { return .white }
        return .black
    }

    private var divider: some View {
        HStack(spacing: FLXSpacing.md) {
            line
            Text("or")
                .flxFont(.footnote)
                .foregroundStyle(theme.colors.mutedForeground)
            line
        }
    }

    private var line: some View {
        Rectangle()
            .fill(theme.colors.border)
            .frame(height: 1)
    }

    private var fields: some View {
        VStack(spacing: FLXSpacing.md) {
            FLXFieldLabel("Email") {
                FLXTextField("you@example.com", text: $email)
                    .textContentType(.username)
                    .focused($focusedField, equals: .email)
                    .onSubmit { focusedField = .password }
            }
            FLXFieldLabel {
                FLXSecureField("Password", text: $password)
                    .textContentType(.password)
                    .focused($focusedField, equals: .password)
                    .onSubmit(signIn)
            } label: {
                HStack {
                    Text("Password")
                    Spacer()
                    Button("Forgot password?", action: onForgotPassword)
                        .buttonStyle(.plain)
                        .flxFont(.subheadline)
                        .foregroundStyle(theme.colors.mutedForeground)
                }
            }
        }
    }

    private var footer: some View {
        HStack(spacing: FLXSpacing.xs) {
            Text("Don't have an account?")
                .foregroundStyle(theme.colors.mutedForeground)
            Button("Sign up", action: onSignUp)
                .buttonStyle(.plain)
                .fontWeight(.medium)
                .foregroundStyle(theme.colors.foreground)
        }
        .flxFont(.subheadline)
    }

    private func signIn() {
        onSignIn(email, password)
    }
}
