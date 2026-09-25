"use client";

import Link from "next/link";

import { Check, LogoGooglePlay } from "@gravity-ui/icons";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const route=useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    console.log(user, "userdata");

    const { data, error } = await authClient.signIn.email({
      email: user?.email,
      password: user?.password,
    });

    console.log(data, error);

    if (!data) {
      toast.error(error.message);
      return;
    } else {
      toast.success("Login Successfully!");
      route.push('/')
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080508] px-4 py-10">
      <Card className="w-full max-w-[500px] border border-white/[0.08] bg-[#0d0a0e] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:px-10 sm:py-10">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-[-0.03em] text-white">
          Login
        </h1>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-white/70">
              Email
            </Label>

            <Input
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25"
              placeholder="Enter Your Email"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label className="mb-2 text-sm font-medium text-white/70">
              Password
            </Label>

            <Input
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25"
              placeholder="Enter your password"
            />

            <FieldError />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-1 h-12 w-full rounded-xl bg-[#7054f5] text-sm font-semibold text-white"
          >
            <Check width={17} height={17} />
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-white/[0.08]" />

            <span className="text-[11px] font-medium text-white/25">OR</span>

            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="secondary"
            className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] text-sm font-medium text-white/70"
          >
            <LogoGooglePlay width={18} height={18} />
            Continue with Google
          </Button>

          {/* Sign Up */}
          <p className="pt-1 text-center text-sm text-white/35">
            Do not have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-[#8b76ff] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </Form>
      </Card>
    </main>
  );
}
