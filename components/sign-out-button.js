"use client";
import SubmitButton from "@/components/submit-button";
import { signOut } from "@/lib/actions";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}
