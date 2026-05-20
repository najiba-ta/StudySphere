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
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
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

      setTimeout(() => {
        router.replace(redirect);
      }, 300);

    } catch {
      toast.error("Something went wrong!");
    } finally {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6E7D0] px-4">

      <div className="w-full max-w-md">

        {/* HEADER */}
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

        {/* CARD */}
        <Card className="relative overflow-hidden rounded-2xl border border-[#BC5F41]/10 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

          {/* glow */}
          <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#E4C08A]/30 blur-3xl" />

          <Form onSubmit={onSubmit} className="relative z-10 flex flex-col gap-4">

            {/* EMAIL */}
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

            {/* PASSWORD */}
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

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-[#3C0906] text-white text-sm font-medium hover:bg-[#84352D] transition"
            >
              {loading ? "Loading..." : "Login"}
            </Button>

          </Form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-[#BC5F41]/10" />
            <p className="text-[11px] text-[#84352D]/50">OR</p>
            <div className="h-px flex-1 bg-[#BC5F41]/10" />
          </div>

          {/* GOOGLE */}
          <Button
            onClick={handleGoogle}
            className="w-full h-11 rounded-xl border border-[#BC5F41]/20 bg-[#F6E7D0] text-sm text-[#3C0906] hover:bg-[#E4C08A]/40 transition"
          >
            Continue with Google
          </Button>

          {/* REGISTER */}
          <p className="text-center text-xs text-[#84352D]/70 mt-5">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#BC5F41] font-medium">
              Register
            </Link>
          </p>

        </Card>
      </div>
    </div>
  );
};

export default LoginPage;