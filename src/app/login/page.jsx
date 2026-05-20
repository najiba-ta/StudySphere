"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Description,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading Details...");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingText("Verifying Credentials...");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (!data) {
        toast.error("Login failed!");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      setLoadingText("Redirecting to Dashboard...");

      setTimeout(() => {
        router.replace(redirect);
        setLoading(false);
      }, 1500);

    } catch {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch {
      toast.error("Google login failed!");
    }
  };

  const handleRegisterNavigation = (e) => {
    e.preventDefault();
    setLoadingText("Loading Registration...");
    setLoading(true);

    setTimeout(() => {
      router.push("/register");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#E4E4E6]/40 backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E4C08A]/20 border-t-[#BC5F41] border-b-[#84352D]"></div>
            <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-[#E4E4E6]/10 border-r-[#3C0906] border-l-[#84352D]"></div>
          </div>
          <p className="mt-4 text-sm font-semibold tracking-wider text-[#3C0906] animate-pulse">
            {loadingText}
          </p>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#F6E7D0] px-4">

        <div className="w-full max-w-md">

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BC5F41]/10 border border-[#BC5F41]/20 text-xs text-[#84352D] mb-3">
              <Sparkles size={14} />
              Welcome Back
            </div>

            <h1 className="text-3xl font-bold text-[#3C0906]">
              Login Account
            </h1>

            <p className="mt-2 text-xs text-[#84352D]/70">
              Access your study dashboard
            </p>
          </div>

          <Card className="relative overflow-hidden rounded-2xl border border-[#BC5F41]/10 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

            <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#E4C08A]/30 blur-3xl" />

            <Form onSubmit={onSubmit} className="relative z-10 flex flex-col gap-4">

              <TextField isRequired name="email">
                <Label className="flex items-center gap-2 text-sm text-[#3C0906]">
                  <Mail size={14} className="text-[#BC5F41]" />
                  Email
                </Label>

                <Input
                  className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30"
                  placeholder="john@example.com"
                />
              </TextField>

              <TextField isRequired name="password">
                <Label className="flex items-center gap-2 text-sm text-[#3C0906]">
                  <Lock size={14} className="text-[#BC5F41]" />
                  Password
                </Label>

                <Input
                  type="password"
                  className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30"
                  placeholder="••••••••"
                />

                <Description className="text-[11px] text-[#84352D]/60 mt-1">
                  Use your registered credentials
                </Description>
              </TextField>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl bg-[#3C0906] text-white text-sm font-medium hover:bg-[#84352D] transition"
              >
                Login
              </Button>

            </Form>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-[#BC5F41]/10" />
              <p className="text-[11px] text-[#84352D]/50">OR</p>
              <div className="h-px flex-1 bg-[#BC5F41]/10" />
            </div>

            <Button
              onClick={handleGoogle}
              className="w-full h-11 rounded-xl border border-[#BC5F41]/20 bg-[#F6E7D0] text-sm text-[#3C0906] hover:bg-[#E4C08A]/40 transition"
            >
              Continue with Google
            </Button>

            <p className="text-center text-xs text-[#84352D]/70 mt-5">
              Don’t have an account?{" "}
              <button 
                onClick={handleRegisterNavigation} 
                className="text-[#BC5F41] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Register
              </button>
            </p>

          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;