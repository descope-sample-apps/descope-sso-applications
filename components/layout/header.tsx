import ThemeSwitcher from "@/components/layout/theme-switcher/theme-switcher";
import { UserNav } from "./user-nav";
import Image from "next/image";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <Image
              alt="Descope"
              className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/descope-logo.png"
              width="40"
            />
            <h1 className="text-lg font-semibold text-black">Applications</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
}
