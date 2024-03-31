"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useDescope } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function UserNav() {
  const { user } = useUser();
  const sdk = useDescope();

  const router = useRouter();

  const handleLogout = useCallback(() => {
    sdk.logout();
    router.push("/");
  }, [sdk, router]);

  if (user) {
    // TODO: Add a settings page for admins to restrict and allow access to applications
    // const isAdmin = user?.customAttributes?.descoper;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.picture ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          {/* {isAdmin && (
            <DropdownMenuItem
              onClick={() => {
                router.push("/settings");
              }}
            >
              Settings
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          )} */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a
              href={
                "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdescope-sample-apps%2Fdescope-sso-applications&env=NEXT_PUBLIC_DESCOPE_PROJECT_ID,DESCOPE_MANAGEMENT_KEY"
              }
            >
              Deploy to Vercel
            </a>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
