"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@descope/nextjs-sdk/client";

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

export default function AppPage() {
  const [apps, setApps] = useState<SSOApplication[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("/api/sso-apps");
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 right-0 left-0 h-14 flex items-center justify-between px-4 bg-gray">
        <div className="flex items-center gap-2">
          <Image
            alt="Descope"
            className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
            height="40"
            src="/descope-logo.png"
            width="40"
          />
          <h1 className="text-lg font-semibold">SSO Applications</h1>
        </div>
        <Link className="text-sm" href={"/sign-out"}>
          <Button variant="outline" color="black">
            Sign Out
          </Button>
        </Link>
      </header>
      <main className="flex-1 overflow-y-auto pt-16 pb-4 px-4">
        {apps.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {apps.map((app) => (
              <Card key={app.id}>
                <CardContent className="relative flex flex-col items-center justify-center p-6">
                  <Link
                    href={
                      app.samlSettings.idpSsoUrl + `&tenant=${user.email}` ||
                      "#!"
                    }
                    passHref
                  >
                    <Image
                      alt={app.name}
                      className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center mb-2"
                      height="100"
                      src={app.logo || "/placeholder-logo.png"}
                      width="100"
                    />
                    <h3 className="text-lg font-semibold mb-2">{app.name}</h3>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center relative z-10 max-w-7xl mt-20 mx-auto">
            <h2 className="font-bold tracking-tighter text-7xl mb-12">
              You have no apps configured.
            </h2>
            <p className="tracking-tighter text-2xl mb-12">
              Please contact your system administrator if you think this is an
              error.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
