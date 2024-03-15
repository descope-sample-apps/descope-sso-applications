"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/utils/assets";

export default function SignInPage() {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push("/applications");
  }, [router]);

  const handleLogout = useCallback(() => {
    router.push("/sign-out");
  }, [router]);

  const urlParams = new URLSearchParams(window.location.search);

  const flowId =
    urlParams.get("flow") || process.env.DESCOPE_FLOW_ID || "sign-up-or-in";

  const debug =
    urlParams.get("debug") === "true" ||
    process.env.DESCOPE_FLOW_DEBUG === "true";

  const tenantId = urlParams.get("tenant") || process.env.DESCOPE_TENANT_ID;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={
          "fixed inset-0 transition-color delay-100 duration-700 opacity-25 bg-blue-300"
        }
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
        className={
          "bg-black fixed inset-0 transition-opacity duration-1000 opacity-0"
        }
      />

      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <Descope
            flowId={flowId}
            debug={debug}
            tenant={tenantId}
            onSuccess={handleLogin}
            onError={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
