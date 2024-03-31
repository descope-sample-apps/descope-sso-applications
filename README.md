# Descope SSO Applications 🌐

Descope SSO Applications is designed to simplify the authentication process for employees and other users utilizing [Dynamic Federation]() and [IdP-initiated SSO](). By acting as a centralized SSO provider, it offers seamless, frictionless sign-in capabilities across multiple SAML SSO-based applications.

## Features / Use Cases ✨

1. **Streamlined Access**: Provide a unified interface for both internal organization and external users to access SAML applications without any friction, leveraging existing login sessions with other SSO providers. 🔑
2. **Dynamic Federation**: Authentication requests can be re-routed to any of the SAML SSO providers you've previously configured, allowing you to add multiple IdPs to applications that may only support one IdP, with Descope in the middle guiding your users through to the right provider. 🔄
3. **Works with Other Auth Providers**: With IdP-initiated SSO, you can add Descope as a layer on top of any current implementation you have (with Auth0, Cognito, Firebase, etc.) to provide you and your users with seamless SAML-based SSO to all of your apps, without changing any app-level SAML configurations. 🤝

## Getting Started 🚀

### Setup Instructions 🛠️

1. **Clone the Repository**

```bash
git clone https://github.com/descope-sample-apps/descope-sso-applications
cd descope-sso-applications
```

2. **Install Dependencies**

```bash
yarn install
```

3. **Configure Environment Variables**

Create a `.env.local` file at the root of your project and define the following variables:

```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_management_key
```

> **Note**: If you want to use a different flow you can also include your flow ID with `NEXT_PUBLIC_DESCOPE_FLOW_ID`. 📝

4. **Run the Application Locally**

```bash
yarn dev
```

Visit `http://localhost:3000` in your browser to view the app. 🌐

### Deployment to Vercel 🚀

1. **Sign Up/Login to Vercel**: Go to [Vercel](https://vercel.com/) and sign in or create an account. 📌
2. **Import Your GitHub Repository**: Once logged in, import your GitHub repository into Vercel by selecting 'New Project' and connecting your GitHub account. ➕
3. **Configure Project Settings**: Add the necessary environment variables (`NEXT_PUBLIC_DESCOPE_PROJECT_ID`, `DESCOPE_MANAGEMENT_KEY`) in the project settings under the 'Environment Variables' section. ⚙️
4. **Deploy**: After configuring your project settings, deploy your application by clicking on the 'Deploy' button. Vercel will automatically build and deploy your app. 🚀

## Contributing 🤝

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have feedback, suggestions, or contributions. ❤️

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details. 🔏
