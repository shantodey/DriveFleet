"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Sparkles } from "lucide-react";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogIn = async (values: LoginFormValues) => {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      toast.error(error.message ?? "Something went wrong");
    }
  };

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="container mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Decorative Section */}
        <div className="relative hidden overflow-hidden border-r border-white/5 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,155,101,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_30%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between px-14 py-14">
            <div>
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d6bb84]">
                <ShieldCheck className="h-9 w-9" />
              </div>

              <p className="mt-10 text-xs uppercase tracking-[6px] text-[#b89b65]">
                Secure Luxury Access
              </p>

              <h1 className="mt-5 text-6xl font-black leading-[1.05] tracking-tight text-white">
                Welcome Back <br />
                To DriveHub
              </h1>

              <p className="mt-8 max-w-lg text-base leading-8 text-gray-400">
                Access your premium dashboard, manage luxury car listings, monitor reservations and explore exclusive vehicle experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-[28px] border border-white/5 bg-white/3 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[4px] text-gray-500">
                  Premium Vehicles
                </p>
                <h2 className="mt-3 text-4xl font-black text-white">
                  250+
                </h2>
              </div>

              <div className="rounded-[28px] border border-white/5 bg-white/3 p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[4px] text-gray-500">
                  Trusted Members
                </p>
                <h2 className="mt-3 text-4xl font-black text-white">
                  12K+
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-14">
          <div className="w-full max-w-xl overflow-hidden rounded-[36px] border border-white/10  bg-linear-to-b from-[#111111] to-[#090909] shadow-[0_0_60px_rgba(0,0,0,0.45)]">
            <div className="border-b border-white/5 px-7 py-8 sm:px-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d6bb84]">
                  <Sparkles className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[5px] text-[#b89b65]">
                    Member Login
                  </p>
                  <h2 className="mt-2 text-4xl font-black text-white">
                    Sign In
                  </h2>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400">
                Continue your premium journey by signing into your luxury rental account.
              </p>
            </div>

            <div className="px-7 py-8 sm:px-10">
              <form onSubmit={handleSubmit(onLogIn)} className="flex flex-col gap-7">
                {/* Email Field */}
                <div className="w-full space-y-3">
                  <Label htmlFor="email" className="block text-xs uppercase tracking-[4px] text-gray-500">
                    Email Address
                  </Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-16 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#b89b65]" {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })} />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="w-full space-y-3">
                  <Label htmlFor="password" className="block text-xs uppercase tracking-[4px] text-gray-500">
                    Password
                  </Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="h-16 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#b89b65]"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)/,
                        message: "Password must contain at least 1 uppercase letter and 1 number",
                      },
                    })}
                  />
                  {errors.password ? (
                    <p className="text-xs text-red-400">{errors.password.message}</p>
                  ) : (
                    <p className="text-xs leading-6 text-gray-500">
                      Must contain at least 8 characters with 1 uppercase letter and 1 number.
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={isSubmitting} className="h-16 w-full rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 text-sm font-black uppercase tracking-[4px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20 disabled:opacity-50">
                  {isSubmitting ? "Signing In..." : "Login To Dashboard"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-1">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-[4px] text-gray-500">
                    Or Continue
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Google Sign-In Button */}
                <Button onClick={signIn} type="button" className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/3 text-sm font-black uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-white/6">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue With Google</span>
                </Button>

                <p className="pt-2 text-center text-sm leading-7 text-gray-500">
                  New to DriveHub?
                  <Link href="/register" className="ml-2 font-bold text-[#d6bb84] transition-all duration-300 hover:text-white">
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;