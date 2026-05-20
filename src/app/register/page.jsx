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
  User,
  Image as ImageIcon,
  Lock,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPasswordError("");

    try {
      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries());

      // PASSWORD VALIDATION
      const password = user.password;

      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must contain an uppercase letter");
        setLoading(false);
        return;
      }

      if (!/[a-z]/.test(password)) {
        setPasswordError("Password must contain a lowercase letter");
        setLoading(false);
        return;
      }

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        image: user.image,
        name: user.name,
        password: user.password,
      });

      if (data) {
        toast.success("Registration successful!");
        router.push("/login");
      }

      if (error) {
        toast.error(error.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
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
            Join StudySphere
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3C0906]">
            Create Account
          </h1>

          <p className="mt-3 text-sm text-[#84352D]/70">
            Book your perfect study room anytime
          </p>
        </div>

        {/* CARD */}
        <Card className="relative overflow-hidden rounded-[28px] border border-[#BC5F41]/10 bg-white/80 p-6 shadow-[0_10px_50px_rgba(60,9,6,0.10)] backdrop-blur-2xl">

          {/* GLOW */}
          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-[#E4C08A]/30 blur-3xl" />

          <Form
            onSubmit={onSubmit}
            className="relative z-10 flex flex-col gap-5"
          >

            {/* NAME */}
            <TextField isRequired name="name" type="text">
              <Label className="flex items-center gap-2 text-[#3C0906]">
                <User size={16} className="text-[#BC5F41]" />
                Name
              </Label>

              <Input
                className="input"
                placeholder="Enter your name"
              />

              <FieldError />
            </TextField>

            {/* IMAGE URL */}
            <TextField isRequired name="image" type="url">
              <Label className="flex items-center gap-2 text-[#3C0906]">
                <ImageIcon size={16} className="text-[#BC5F41]" />
                Photo URL
              </Label>

              <Input
                className="input"
                placeholder="https://example.com/photo.jpg"
              />

              <FieldError />
            </TextField>

            {/* EMAIL */}
            <TextField isRequired name="email" type="email">
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
            <TextField isRequired name="password" type="password">
              <Label className="flex items-center gap-2 text-[#3C0906]">
                <Lock size={16} className="text-[#BC5F41]" />
                Password
              </Label>

              <Input
                className="input"
                placeholder="Enter password"
              />

              <Description className="text-xs text-[#84352D]/60">
                Must contain uppercase, lowercase & 6 characters
              </Description>

              <FieldError />
            </TextField>

            {/* PASSWORD ERROR */}
            {passwordError && (
              <p className="text-sm text-red-500">
                {passwordError}
              </p>
            )}

            {/* SUBMIT BUTTON */}
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
                "Create Account"
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

          {/* GOOGLE BUTTON */}
          <Button
            onClick={handleGoogleSignIn}
            className="w-full rounded-2xl border border-[#BC5F41]/10 bg-[#F6E7D0] text-[#3C0906] hover:bg-[#E4C08A]/40"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="h-5 w-5"
            />

            Continue with Google
          </Button>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-sm text-[#84352D]/70">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#BC5F41] hover:underline"
            >
              Login
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

export default SignUpPage;