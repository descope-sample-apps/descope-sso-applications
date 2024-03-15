"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, useUser } from "@descope/nextjs-sdk/client";

import "./tailwind.css";

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
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = React.useState(13);
  const { isAuthenticated } = useSession();
  const { user } = useUser();

  useEffect(() => {
    async function fetchUserInfo() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/sso-apps");
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fakeFetch = setTimeout(() => {
      setProgress(66);
      setTimeout(() => {
        setProgress(100);
        setIsLoading(false);
      }, 1000);
    }, 500);

    return () => clearTimeout(fakeFetch);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/4">
          <Progress value={progress} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto pt-20 pb-4 px-4">
        {apps.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {apps.map((app) => (
              <Card key={app.id} className="bg-card">
                <CardContent className="relative flex flex-col items-center justify-center p-6">
                  <Link
                    href={
                      app.samlSettings.idpSsoUrl + `&tenant=${user.email}` ||
                      "#!"
                    }
                    passHref
                  >
                    <div className="flex flex-col">
                      <Image
                        alt={app.name}
                        className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center mb-2"
                        height="80"
                        src={app.logo || "/placeholder-logo.png"}
                        width="80"
                      />
                      <p className="text-lg font-semibold mb-2">{app.name}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="flex flex-col items-center relative z-10 max-w-7xl mt-20 mx-auto">
              <h2 className="font-bold tracking-tighter text-7xl mb-12">
                You have no apps configured.
              </h2>
              <p className="tracking-tighter text-2xl mb-12">
                Please contact your system administrator if you think this is an
                error.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
