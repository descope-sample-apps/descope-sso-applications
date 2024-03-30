"use client";

import { Descope } from "@descope/nextjs-sdk";
import Image from "next/image";
import { assets } from "@/utils/assets";

export default function SignInPage() {
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

      <div className="max-w-3xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <Descope
            flowId={process.env.NEXT_PUBLIC_DESCOPE_FLOW_ID || "sign-up-or-in"}
            redirectAfterSuccess="/applications"
            redirectAfterError="/"
          />
        </div>
      </div>
    </div>
  );
}
