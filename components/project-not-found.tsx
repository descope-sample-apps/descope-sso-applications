import { assets } from "@/utils/assets";
import { cn } from "@/utils/tailwind";

import "../app/tailwind.css";

export default function ProjectNotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: "30px",
        }}
      />
      <div
        className={cn(
          "bg-black fixed inset-0 transition-opacity duration-1000 opacity-0"
        )}
      />
      <div className="text-center py-10">
        <div className="flex flex-col items-center relative z-10 max-w-7xl mt-20 mx-auto">
          <h2 className="font-bold tracking-tighter text-7xl mb-12">
            Please provide a Project ID as a parameter in the URL.
          </h2>
          <p className="tracking-tighter text-2xl mb-12">
            Example URL:
            http://localhost:3000?project=PROJECT_ID&flow=sign-up-or-in
          </p>
          <p className="tracking-tighter text-2xl mb-12">
            You can also deploy this app in{" "}
            <a
              href={
                "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdescope-sample-apps%2Fdescope-sso-applications&env=NEXT_PUBLIC_DESCOPE_PROJECT_ID,DESCOPE_MANAGEMENT_KEY"
              }
              className={"font-bold"}
            >
              Vercel
            </a>
            , and use environment variables instead.
          </p>
        </div>
      </div>
    </main>
  );
}
