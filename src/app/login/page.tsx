import { LoginForm } from "@/components/auth/login-form";
import { PenToolIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - Noevo",
  description: "Sign in to your Noevo account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container py-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <PenToolIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Noevo</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Noevo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
