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

import { useRouter } from "next/navigation";

import {
  Mail,
  User,
  Image as ImageIcon,
  Lock,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Must contain uppercase letter";
    if (!/[a-z]/.test(password))
      return "Must contain lowercase letter";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      // PASSWORD VALIDATION (STOP SUBMIT)
      const errorMsg = validatePassword(user.password);
      if (errorMsg) {
        setPasswordError(errorMsg);
        setLoading(false);
        return;
      }

      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        image: user.image,
        password: user.password,
        autoSignIn: false, // IMPORTANT: prevent auto login → redirect control
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Registration successful! Please login.");
        router.push("/login"); // REQUIRED FLOW
      }
    } catch (err) {
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // REQUIRED: direct login → home
      });
    } catch {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6E7D0] px-4">

      <div className="w-full max-w-md">

        {/* HEADER (UNCHANGED) */}
        <div className="text-center mb-6">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BC5F41]/10 border border-[#BC5F41]/20 text-xs text-[#84352D] mb-3">
            <Sparkles size={14} />
            Join StudySphere
          </div>

          <h1 className="text-3xl font-bold text-[#3C0906]">
            Create Account
          </h1>

          <p className="mt-2 text-xs text-[#84352D]/70">
            Book your perfect study room anytime
          </p>

        </div>

        {/* CARD (UNCHANGED) */}
        <Card className="relative overflow-hidden rounded-2xl border border-[#BC5F41]/10 bg-white/80 p-5 shadow-lg backdrop-blur-xl">

          <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#E4C08A]/30 blur-3xl" />

          <Form
            onSubmit={onSubmit}
            className="relative z-10 flex flex-col gap-4"
          >

            {/* NAME */}
            <TextField isRequired name="name">
              <Label className="flex items-center gap-2 text-sm text-[#3C0906] mb-1">
                <User size={14} className="text-[#BC5F41]" />
                Name
              </Label>
              <Input className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30" />
            </TextField>

            {/* IMAGE */}
            <TextField isRequired name="image" type="url">
              <Label className="flex items-center gap-2 text-sm text-[#3C0906] mb-1">
                <ImageIcon size={14} className="text-[#BC5F41]" />
                Photo URL
              </Label>
              <Input className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30" />
            </TextField>

            {/* EMAIL */}
            <TextField isRequired name="email">
              <Label className="flex items-center gap-2 text-sm text-[#3C0906] mb-1">
                <Mail size={14} className="text-[#BC5F41]" />
                Email
              </Label>
              <Input className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30" />
            </TextField>

            {/* PASSWORD */}
            <TextField isRequired name="password">
              <Label className="flex items-center gap-2 text-sm text-[#3C0906] mb-1">
                <Lock size={14} className="text-[#BC5F41]" />
                Password
              </Label>

              <Input
                type="password"
                className="w-full rounded-xl border border-[#BC5F41]/20 bg-white/70 px-3 py-2 text-sm text-[#3C0906] focus:outline-none focus:ring-2 focus:ring-[#BC5F41]/30"
              />

              <Description className="text-[11px] text-[#84352D]/60 mt-1">
                Min 6 chars, 1 uppercase, 1 lowercase
              </Description>
            </TextField>

            {/* ERROR */}
            {passwordError && (
              <p className="text-xs text-red-500">
                {passwordError}
              </p>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-[#3C0906] text-white text-sm font-medium hover:bg-[#84352D] transition"
            >
              {loading ? "Loading..." : "Register"}
            </Button>

          </Form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-[#BC5F41]/10" />
            <p className="text-[11px] text-[#84352D]/50">OR</p>
            <div className="h-px flex-1 bg-[#BC5F41]/10" />
          </div>

          {/* GOOGLE */}
          <Button
            onClick={handleGoogle}
            className="w-full h-10 rounded-xl border border-[#BC5F41]/20 bg-[#F6E7D0] text-sm text-[#3C0906] hover:bg-[#E4C08A]/40"
          >
            Continue with Google
          </Button>

          {/* LOGIN */}
          <p className="text-center text-xs text-[#84352D]/70 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#BC5F41] font-medium">
              Login
            </Link>
          </p>

        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;