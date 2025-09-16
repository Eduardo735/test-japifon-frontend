"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const user = useAuth();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = await user.getToken();
      setToken(token);
    };
    fetchData();
  }, [user]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center m-2"
      style={{
        backgroundImage: "url('/images/gradient-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-[0] border-transparent"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(40px) saturate(250%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 32px 80px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(255, 255, 255, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <div className="flex justify-end items-center p-4 gap-4 h-16">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-30"
            onClick={handleCopy}
          >
            {!copied ? (
              <span>Copy</span>
            ) : (
              <span className="inline-flex items-center">
                <svg
                  className="w-3 h-3 text-white me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                Copied!
              </span>
            )}
          </Button>
        </div>
        <div className="flex justify-end items-center p-4 gap-4 h-16">
          <label htmlFor="toke-to-copy" className="sr-only">
            Label
          </label>
          <textarea
            id="toke-to-copy"
            className="max-w-120 max-h-200 col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={token ?? ""}
            disabled
            readOnly
          />
        </div>
      </Card>
    </div>
  );
}
