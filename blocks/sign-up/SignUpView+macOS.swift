import AuthenticationServices
import SwiftUI

struct SignUpView: View {
    enum Field {
        case name
        case email
        case password
    }

    var onSignUp: (_ name: String, _ email: String, _ password: String) -> Void = { _, _, _ in }
    var onSignUpWithApple: (Result<ASAuthorization, Error>) -> Void = { _ in }
    var onSignIn: () -> Void = {}

    @Environment(\.flxTheme) private var theme
    @Environment(\.colorScheme) private var colorScheme
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?

    var body: some View {
        VStack(spacing: FLXSpacing.xl) {
            header
            appleButton
            divider
            fields
            Text("By continuing, you agree to our [Terms of Service](https://example.com/terms) and [Privacy Policy](https://example.com/privacy).")
                .flxFont(.footnote)
                .foregroundStyle(theme.colors.mutedForeground)
                .tint(theme.colors.foreground)
                .multilineTextAlignment(.center)
            footer
        }
        .frame(maxWidth: 300)
        .padding(FLXSpacing.xl)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(theme.colors.background)
    }

    private var header: some View {
        VStack(spacing: FLXSpacing.xs) {
            Text("Create an account")
                .flxFont(.title)
                .foregroundStyle(theme.colors.foreground)
            Text("Enter your details to get started.")
                .flxFont(.subheadline)
                .foregroundStyle(theme.colors.mutedForeground)
        }
        .multilineTextAlignment(.center)
    }

    private var appleButton: some View {
        SignInWithAppleButton(.signUp) { request in
            request.requestedScopes = [.fullName, .email]
        } onCompletion: { result in
            onSignUpWithApple(result)
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
            FLXFieldLabel("Name") {
                FLXTextField("Your name", text: $name)
                    .textContentType(.name)
                    .focused($focusedField, equals: .name)
                    .onSubmit { focusedField = .email }
            }
            FLXFieldLabel("Email") {
                FLXTextField("you@example.com", text: $email)
                    .textContentType(.username)
                    .focused($focusedField, equals: .email)
                    .onSubmit { focusedField = .password }
            }
            FLXFormField {
                FLXFieldLabel("Password") {
                    FLXSecureField("Password", text: $password)
                        .focused($focusedField, equals: .password)
                        .onSubmit(signUp)
                }
                FLXFormFieldDescription("Use 8 or more characters.")
            }
        }
    }

    private var footer: some View {
        HStack(spacing: FLXSpacing.xs) {
            Text("Already have an account?")
                .foregroundStyle(theme.colors.mutedForeground)
            Button("Sign in", action: onSignIn)
                .buttonStyle(.plain)
                .fontWeight(.medium)
                .foregroundStyle(theme.colors.foreground)
        }
        .flxFont(.subheadline)
    }

    private func signUp() {
        onSignUp(name, email, password)
    }
}
