import SwiftUI

struct FormValidationExample: View {
    @Environment(\.flxTheme) private var theme
    @State private var username = "ab"

    private var isValid: Bool {
        username.count >= 3
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Username", text: $username)
                } footer: {
                    if !isValid {
                        Text("Must be at least 3 characters.")
                            .foregroundStyle(theme.colors.destructive)
                    }
                }
                Section {
                    Button("Create Account") {}
                        .disabled(!isValid)
                }
            }
            .navigationTitle("Sign Up")
        }
    }
}
