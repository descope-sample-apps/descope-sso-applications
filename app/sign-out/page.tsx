"use client";

import { useRouter } from "next/navigation";
import { useDescope } from "@descope/nextjs-sdk/client";
import { useCallback } from "react";

export default function SignOutPage() {
  const router = useRouter();
  const sdk = useDescope();

  const handleLogout = useCallback(() => {
    sdk.logout();
    router.push("/");
  }, [sdk, router]);

  handleLogout();
}
