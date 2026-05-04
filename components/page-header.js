import Link from "next/link";
import DarkModeToggle from "./dark.mode.toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import Button from "./button";
import { createClient } from "@/lib/supabase/server";
import { CircleUser, KeyRound } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import SignOutButton from "@/components/sign-out-button";

export default async function PageHeader({ className }) {
  const theme = await useServerDarkMode(); // ✅ get theme from cookie
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-1">
        <DarkModeToggle defaultMode={theme} />
        <div>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <CircleUser className="w-6 h-6" />
              <span>{user?.email}</span>
            </Button>
          )}
          {user && <SignOutButton />}
          {!user && (
            <Link
              href="/login"
              className={`${variants["ghost"]} ${sizes["sm"]}`}
            >
              <KeyRound className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
