# Descope SSO Applications

Descope SSO Applications is designed to simplify the authentication process for employees and other users within organizations utilizing Descope as a Federation Identity Broker. By acting as a centralized SSO provider, it offers seamless, frictionless sign-in capabilities across multiple SAML SSO-based applications.

## Use Cases

1. **Streamlined Access**: Provide a unified interface for both internal and external company members to access various applications seamlessly, leveraging existing sessions with external SSO providers.
2. **Flexible Authentication Routing**: Utilize Descope to reroute authentication requests to any of the SAML tenants you've configured, allowing you to replace your current SAML IdP connected to each of your applications with Descope, which supports multiple IdPs. This is a great solution for handling sign in with multiple different SSO providers, with an app that only supports one SAML IdP.

## Getting Started

### Prerequisites

- Next.js
- A Descope account and project
- Access to the applications you wish to integrate with SSO

### Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/descope-saml-sso-app.git
cd descope-saml-sso-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env.local` file at the root of your project and define the following variables:

```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_management_key
```

4. **Run the Application Locally**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to view the app.

### Deployment to Vercel

1. **Sign Up/Login to Vercel**: Go to [Vercel](https://vercel.com/) and sign in or create an account.
2. **Import Your GitHub Repository**: Once logged in, import your GitHub repository into Vercel by selecting 'New Project' and connecting your GitHub account.
3. **Configure Project Settings**: Add the necessary environment variables (`NEXT_PUBLIC_DESCOPE_PROJECT_ID`, `DESCOPE_MANAGEMENT_KEY`) in the project settings under the 'Environment Variables' section.
4. **Deploy**: After configuring your project settings, deploy your application by clicking on the 'Deploy' button. Vercel will automatically build and deploy your app.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have feedback, suggestions, or contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
