<img width="1400" alt="Screenshot 2024-03-30 at 7 35 13 PM" src="https://github.com/descope-sample-apps/descope-sso-applications/assets/32936811/92ebe851-3368-4eb0-b29b-fd5f5efeadce">

# Descope SSO Applications 🌐

Descope SSO Applications is designed to simplify the authentication process for employees and other users utilizing [Dynamic Federation](https://www.descope.com/use-cases/identity-federation) and [IdP-initiated SSO](https://www.descope.com/blog/post/idp-vs-sp-sso?_gl=1*m72a5o*_gcl_aw*R0NMLjE3MTAxODM1MjAuQ2p3S0NBancxN3F2QmhCckVpd0ExclU5dzV0dUFuNm95MG9hRWtVOXpMQkdiVU4ySWI0b0dwS2tHT1o5REl2SGRHbGN4ZTZzaXdMNk9Sb0NBV01RQXZEX0J3RQ..*_gcl_au*MTExNTU5OTU2NS4xNzA2MTI5NTQ5). By acting as a centralized SSO provider, it offers seamless, frictionless sign-in capabilities across multiple SAML SSO-based applications.

## Features / Use Cases ✨

1. **Streamlined Access**: Provide a unified interface for both internal organization and external users to access SAML applications without any friction, leveraging existing login sessions with other SSO providers. 🔑
2. **Dynamic Federation**: Authentication requests can be re-routed to any of the SAML SSO providers you've previously configured, allowing you to add multiple IdPs to applications that may only support one IdP, with Descope in the middle guiding your users through to the right provider. 🔄
3. **Works with Other Auth Providers**: With IdP-initiated SSO, you can add Descope as a layer on top of any current implementation you have (with Auth0, Cognito, Firebase, etc.) to provide you and your users with seamless SAML-based SSO to all of your apps, without changing any app-level SAML configurations. 🤝

### Deployment to Vercel 🚀

This application will need to be deployed to Vercel or some other hosting service, in order to work with your application. Since this application requires a backend with your specific Descope Management Key, it's important that you properly deploy this app with secured environment secrets. To deploy in Vercel with one click, you can use the button below:

[![Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdescope-sample-apps%2Fdescope-sso-applications&env=NEXT_PUBLIC_DESCOPE_PROJECT_ID,DESCOPE_MANAGEMENT_KEY)

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
NEXT_PUBLIC_DESCOPE_PROJECT_ID=YOUR_DESCOPE_PROJECT_ID
DESCOPE_MANAGEMENT_KEY=YOUR_DESCOPE_MANAGEMENT_KEY
NEXT_PUBLIC_DESCOPE_FLOW_ID="sign-up-or-in" // Optional, if you want to use a different flow
```

4. **Run the Application Locally**

```bash
yarn dev
```

Visit `http://localhost:3000` in your browser to view the app. 🌐

## Contributing 🤝

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have feedback, suggestions, or contributions. ❤️

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details. 🔏
