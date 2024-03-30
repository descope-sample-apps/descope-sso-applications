"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@descope/nextjs-sdk/client";

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

  const isAdmin = user?.customAttributes?.descoper;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto pt-20 pb-4 px-4">
        {apps.length > 0 && user ? (
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {apps.map((app) => (
              <Card
                key={app.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <CardContent className="relative flex flex-col items-center justify-center p-6">
                  <Link
                    href={
                      app.samlSettings.idpSsoUrl + `&tenant=${user.email}` ||
                      "#!"
                    }
                    passHref
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      {app.logo ? (
                        <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                          <Image
                            alt={app.name}
                            className="object-contain"
                            src={app.logo}
                            height="80"
                            width="80"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 relative rounded-full flex items-center justify-center text-2xl font-semibold bg-gray-100 dark:bg-gray-800">
                          {app.name.charAt(0)}
                        </div>
                      )}
                      <p className="text-lg font-semibold mt-2">{app.name}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
            {isAdmin && (
              <Card className="bg-white shadow rounded-lg overflow-hidden">
                <Dialog>
                  <Link href={""} passHref>
                    <DialogTrigger asChild>
                      <CardContent className="relative flex flex-col items-center justify-center p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-20 h-20 relative rounded-full flex items-center justify-center text-3xl font-semibold bg-gray-100 dark:bg-gray-800">
                            +
                          </div>
                          <p className="text-lg font-semibold mt-2">
                            Create New App
                          </p>
                        </div>
                      </CardContent>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New App</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        You can create a new application in the Descope Console,
                        under{" "}
                        <Link
                          className={"font-semibold"}
                          href={"https://app.descope.com/applications"}
                        >
                          Applications
                        </Link>
                        .
                      </DialogDescription>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="default">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Link>
                </Dialog>
              </Card>
            )}
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
