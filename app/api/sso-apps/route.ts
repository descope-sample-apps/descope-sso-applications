import { createSdk, session } from "@descope/nextjs-sdk/server";

interface UserResponse {
  ssoAppIds?: string[];
}

interface SSOApplication {
  appType: string;
  description: string;
  enabled: boolean;
  id: string;
  logo: string;
  name: string;
  samlSettings: {
    idpSsoUrl: string;
  };
}

const sdk = createSdk({
  projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID,
  managementKey: process.env.DESCOPE_MANAGEMENT_KEY,
});

export async function GET(req: Request) {
  const currentSession = session();
  if (!currentSession || !currentSession.token.sub) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!sdk.management) {
    console.error(
      "Management SDK is not available, Make sure you have the DESCOPE_MANAGEMENT_KEY environment variable set"
    );
    return new Response("Internal error", { status: 500 });
  }

  const res = await sdk.management.user.loadByUserId(currentSession.token.sub);

  if (!res.ok) {
    console.error("Failed to load user", res.error);
    return new Response("Not found", { status: 404 });
  }

  const userData = res.data as UserResponse;
  if (!userData.ssoAppIds) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const ssoApps = await Promise.all(
    // TODO: Include IdP initiated SSO URL in Descope API response
    userData.ssoAppIds.map(async (appId) => {
      const appUrl = `https://api.descope.com/v1/mgmt/sso/idp/app/load?id=${appId}`;
      const appRes = await fetch(appUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}:${process.env.DESCOPE_MANAGEMENT_KEY}`,
        },
      });
      if (!appRes.ok) return null;
      return appRes.json();
    })
  );

  // Filter for SAML apps and map to required fields
  const validSamlApps = ssoApps
    .filter((app) => app !== null && app.appType === "saml")
    .map((app: SSOApplication) => ({
      description: app.description,
      enabled: app.enabled,
      name: app.name,
      id: app.id,
      logo: app.logo,
      samlSettings: {
        idpSsoUrl: app.samlSettings.idpSsoUrl.replace("/sso", "/initiate"),
      },
    }));

  return new Response(JSON.stringify(validSamlApps), { status: 200 });
}
