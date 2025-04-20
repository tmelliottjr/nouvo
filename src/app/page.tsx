"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/state-providers/use-auth";
import {
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  PenToolIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const metadata: Metadata = {
  title: "Noevo - A Modern Note-Taking Application",
  description: "Organize your thoughts, ideas, and knowledge with Noevo",
};

export default function LandingPage() {
  // Use the auth hook to determine if the user is logged in
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <PenToolIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Noevo</span>
          </div>
          <nav>
            {isLoading ? (
              <Button variant="outline" disabled>
                Loading...
              </Button>
            ) : isAuthenticated ? (
              <Button variant="outline" asChild>
                <Link href="/notes">Go to notes</Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                A better way to capture your thoughts and ideas
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Noevo helps you organize your notes, create rich content, and
                access your information from anywhere.
              </p>
              <div className="flex gap-4 pt-4">
                {isAuthenticated ? (
                  <Button size="lg" asChild>
                    <Link href="/notes">Go to notes</Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link href="/login">Get Started</Link>
                  </Button>
                )}
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:pl-10">
              <div className="relative border rounded-lg shadow-lg p-2 bg-background">
                <div className="rounded border overflow-hidden">
                  <div className="border-b flex items-center px-4 py-2 bg-muted/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="mx-auto font-medium text-sm">My Notes</div>
                  </div>
                  <div className="aspect-video flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 p-4 text-center">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                          <FileTextIcon className="h-8 w-8 text-primary" />
                          <span className="text-sm font-medium">Rich Text</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                          <FolderIcon className="h-8 w-8 text-primary" />
                          <span className="text-sm font-medium">
                            Organization
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                          <CalendarIcon className="h-8 w-8 text-primary" />
                          <span className="text-sm font-medium">
                            Calendar View
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-primary/10">
                          <PenToolIcon className="h-8 w-8 text-primary" />
                          <span className="text-sm font-medium">
                            Easy Editing
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Noevo comes with everything you need to capture, organize, and
              access your notes
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg border">
              <FileTextIcon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Rich Text Editing</h3>
              <p className="text-muted-foreground">
                Create beautifully formatted notes with our powerful rich text
                editor.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <FolderIcon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">
                Hierarchical Organization
              </h3>
              <p className="text-muted-foreground">
                Organize your notes with folders, sub-folders, and tagging.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border">
              <CalendarIcon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Calendar Integration</h3>
              <p className="text-muted-foreground">
                View your notes by creation date with our calendar view.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:h-16 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Noevo. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
