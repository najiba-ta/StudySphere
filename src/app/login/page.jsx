"use client";

import React, { useState } from "react";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  LogIn,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

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

      if (data) {
        toast.success("Login successful!");
        router.push("/");
      }

      if (error) {
        toast.error("Invalid email or password!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6E7D0] px-4 py-14 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="mb-7 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#BC5F41]/20 bg-[#BC5F41]/10 px-5 py-2 text-sm font-medium text-[#84352D] backdrop-blur-md">
            <Sparkles size={16} />
            Welcome Back
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3C0906]">
            Login Account
          </h1>

          <p className="mt-3 text-sm text-[#84352D]/70">
            Access your study room dashboard
          </p>
        </div>

        {/* CARD */}
        <Card className="relative overflow-hidden rounded-[28px] border border-[#BC5F41]/10 bg-white/80 p-6 shadow-[0_10px_50px_rgba(60,9,6,0.10)] backdrop-blur-2xl">

          {/* GLOW */}
          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-[#E4C08A]/30 blur-3xl" />

          <Form
            onSubmit={onSubmit}
            className="relative z-10 flex w-full flex-col gap-5"
          >

            {/* EMAIL */}
            <TextField
              isRequired
              name="email"
              type="email"
            >
              <Label className="flex items-center gap-2 text-[#3C0906]">
                <Mail size={16} className="text-[#BC5F41]" />
                Email
              </Label>

              <Input
                className="input"
                placeholder="john@example.com"
              />

              <FieldError />
            </TextField>

            {/* PASSWORD */}
            <TextField
              isRequired
              name="password"
              type="password"
            >
              <Label className="flex items-center gap-2 text-[#3C0906]">
                <Lock size={16} className="text-[#BC5F41]" />
                Password
              </Label>

              <Input
                className="input"
                placeholder="Enter your password"
              />

              <Description className="text-xs text-[#84352D]/60">
                Use your registered credentials
              </Description>

              <FieldError />
            </TextField>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl bg-[#3C0906] text-white font-semibold transition hover:scale-[1.01] hover:bg-[#84352D] disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Loading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn size={16} />
                  Login
                </div>
              )}
            </Button>

          </Form>

          {/* DIVIDER */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#BC5F41]/10" />

            <p className="text-xs text-[#84352D]/50">
              OR
            </p>

            <div className="h-[1px] flex-1 bg-[#BC5F41]/10" />
          </div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full rounded-2xl border border-[#BC5F41]/10 bg-[#F6E7D0] text-[#3C0906] hover:bg-[#E4C08A]/40"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="h-5 w-5"
            />

            Continue with Google
          </Button>

          {/* REGISTER LINK */}
          <p className="mt-6 text-center text-sm text-[#84352D]/70">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-[#BC5F41] hover:underline"
            >
              Register
            </a>
          </p>
        </Card>
      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(188, 95, 65, 0.15);
          padding: 12px;
          color: #3c0906;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;