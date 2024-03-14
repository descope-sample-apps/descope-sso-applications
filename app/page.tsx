"use client";

import { useSession } from "@descope/nextjs-sdk/client";
import Image from "next/image";
import { assets } from "@/utils/assets";
import { type Framework, frameworks } from "@/utils/data";
import { useState, useEffect } from "react";
import { cn } from "@/utils/tailwind";
import { FrameworkRotation } from "@/components/framework-rotation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentFramework, setCurrentFramework] = useState<Framework>(
    frameworks[0]
  );

  const [showBackground, setShowBackground] = useState(false);

  const { isAuthenticated } = useSession();

  useEffect(() => {
    let currentIndex = 0;
    const rotateFrameworks = () => {
      setCurrentFramework(frameworks[currentIndex]);
      currentIndex = (currentIndex + 1) % frameworks.length;
    };
    const intervalId = setInterval(rotateFrameworks, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div
        className={cn(
          "fixed inset-0 transition-color delay-100 duration-700 opacity-25",
          {
            "bg-purple-300": currentFramework === "okta",
            "bg-red-300": currentFramework === "ping",
            "bg-blue-300": currentFramework === "azure",
            "bg-green-300": currentFramework === "duo",
            "bg-orange-400": currentFramework === "google",
          }
        )}
      />
      <Image
        width={1200}
        height={1200}
        role="presentation"
        src={assets.gradient}
        alt="gradient-bg"
        className="fixed inset-0 w-screen h-screen object-cover"
      />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: "30px",
        }}
      />
      <div
        className={cn(
          "bg-black fixed inset-0 transition-opacity duration-1000",
          !showBackground ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <h1 className="font-bold tracking-tighter text-7xl max-w-3xl text-center leading-snug mb-12">
            <span
              className={cn("transition-colors duration-200", {
                "text-purple-300": currentFramework === "okta",
                "text-red-300": currentFramework === "ping",
                "text-blue-300": currentFramework === "azure",
                "text-green-300": currentFramework === "duo",
                "text-orange-400": currentFramework === "google",
              })}
            >
              Easy-to-use
            </span>{" "}
            SSO Apps with{" "}
            <FrameworkRotation currentFramework={currentFramework} />
          </h1>

          <p className="mb-8">
            <span className="text-gray-300">Powered by </span>
            <span
              className={cn("transition-colors duration-200 font-semibold", {
                "text-purple-300": currentFramework === "okta",
                "text-red-300": currentFramework === "ping",
                "text-blue-300": currentFramework === "azure",
                "text-green-300": currentFramework === "duo",
                "text-orange-400": currentFramework === "google",
              })}
            >
              <Link href="https://descope.com" target="__blank">
                Descope
              </Link>
            </span>
          </p>
          {!isAuthenticated && (
            <div className="mb-8 flex">
              <Link className="text-sm" href={"/sign-in"}>
                <Button
                  className={cn(
                    "bg-white px-6 py-3 rounded-md text-sm font-bold transition-colors duration-200 whitespace-nowrap",
                    {
                      "bg-purple-300 hover:bg-purple-400":
                        currentFramework === "okta",
                      "bg-red-300 hover:bg-red-400":
                        currentFramework === "ping",
                      "bg-blue-300 hover:bg-blue-400":
                        currentFramework === "azure",
                      "bg-green-300 hover:bg-green-400":
                        currentFramework === "duo",
                      "bg-orange-400 hover:bg-orange-500":
                        currentFramework === "google",
                    }
                  )}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="mb-8 flex">
              <Link className="text-sm" href={"/applications"}>
                <Button
                  className={cn(
                    "bg-white px-6 py-3 rounded-md text-sm font-bold transition-colors duration-200 whitespace-nowrap",
                    {
                      "bg-purple-300 hover:bg-purple-400":
                        currentFramework === "okta",
                      "bg-red-300 hover:bg-red-400":
                        currentFramework === "ping",
                      "bg-blue-300 hover:bg-blue-400":
                        currentFramework === "azure",
                      "bg-green-300 hover:bg-green-400":
                        currentFramework === "duo",
                      "bg-orange-400 hover:bg-orange-500":
                        currentFramework === "google",
                    }
                  )}
                >
                  Go to App List
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
