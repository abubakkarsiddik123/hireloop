"use client";

import Link from "next/link";

import { Check, LogoGooglePlay } from "@gravity-ui/icons";

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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function SignUpPage() {
    const router=useRouter()
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user, "userdata");

    const { data, error } = await authClient.signUp.email({
      name: user?.name,
      igame: user?.image,
      email: user?.email,
      password: user?.password,
    });
    console.log(data, error);
    if (!data) {
      toast.error(error.message);
      return;
    } else {
      toast.success("Account Create Successfully!");
      router.push("/")
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080508] px-4 py-10">
      <Card className="w-full max-w-[500px] border border-white/[0.08] bg-[#0d0a0e] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:px-10 sm:py-10">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-[-0.03em] text-white">
          Sign Up
        </h1>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label className="mb-2 text-sm font-medium text-white/70">
              Name
            </Label>

            <Input
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25"
              placeholder="Enter your name"
            />

            <FieldError />
          </TextField>

          {/* Image */}
          <TextField isRequired name="image" type="text">
            <Label className="mb-2 text-sm font-medium text-white/70">
              Image URL
            </Label>

            <Input
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25"
              placeholder="Image URL"
            />

            <FieldError />
          </TextField>

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
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-white/70">
              Password
            </Label>

            <Input
              className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/25"
              placeholder="Enter your password"
            />

            <Description className="mt-1 text-xs text-white/30">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Submit + Reset */}
          <div className="mt-1 flex gap-3">
            <Button
              type="submit"
              className="h-12 flex-1 rounded-xl bg-[#7054f5] text-sm font-semibold text-white"
            >
              <Check width={17} height={17} />
              Submit
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="h-12 rounded-xl border border-white/[0.09] bg-white/[0.04] px-6 text-sm text-white/60"
            >
              Reset
            </Button>
          </div>

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

          {/* Login */}
          <p className="pt-1 text-center text-sm text-white/35">
            Already have an account?{" "}
            <Link
              href="/auth/signIn"
              className="font-medium text-[#8b76ff] hover:underline"
            >
              Login
            </Link>
          </p>
        </Form>
      </Card>
    </main>
  );
}
