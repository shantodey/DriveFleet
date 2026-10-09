"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User, Mail, Lock, Link as LinkIcon, ShieldCheck, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: { name: "", email: "", password: "", image: "" },
  });

  const onSignUp = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        image: values.image?.trim() || undefined,
      });

      if (error) {
        toast.error(error.message ?? "Something went wrong");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
     if (error) toast.error(error.message ?? "Google sign-in failed");
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#070707] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <aside className="relative hidden min-w-0 border-r border-white/5 lg:flex lg:items-center">
          <div className="mx-auto w-full max-w-2xl px-10 py-16 xl:px-16">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-[#c5a46d]/10 bg-[#c5a46d]/5 text-[#c5a46d]">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c5a46d]">Premium Access</p>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">
              Join
              <br />
              DriveHub
            </h1>

            <p className="mt-8 max-w-md text-base leading-8 text-gray-400">
              Create your account and explore premium vehicles, luxury rentals and exclusive driving experiences.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <Card className="min-w-0 rounded-3xl border-white/5 bg-white/3 text-white shadow-none">
                <CardHeader className="gap-3 p-5 sm:p-6">
                  <CardDescription className="text-xs uppercase tracking-[0.2em] text-gray-500">Luxury Cars</CardDescription>
                  <CardTitle className="text-3xl font-black text-white">250+</CardTitle>
                </CardHeader>
              </Card>

              <Card className="min-w-0 rounded-3xl border-white/5 bg-white/3 text-white shadow-none">
                <CardHeader className="gap-3 p-5 sm:p-6">
                  <CardDescription className="text-xs uppercase tracking-[0.2em] text-gray-500">Active Users</CardDescription>
                  <CardTitle className="text-3xl font-black text-white">12K+</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 items-center justify-center px-4 py-10 sm:px-8 sm:py-12">
          <Card className="w-full max-w-xl overflow-hidden rounded-[32px] border-white/10 bg-[#0d0d0d] text-white shadow-2xl">
            <CardHeader className="space-y-3 border-b border-white/5 px-6 py-7 sm:px-10 sm:py-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-[#c5a46d]" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a46d]">Create Account</p>
              </div>
              <CardTitle className="text-3xl font-black text-white sm:text-4xl">Register</CardTitle>
              <CardDescription className="text-sm leading-7 text-gray-400">Start your premium driving experience with DriveHub.</CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-7 sm:px-10 sm:py-8">
              <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col gap-5" noValidate>
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-gray-500">Full Name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input id="name" autoComplete="name" placeholder="Enter your full name" aria-invalid={!!errors.name} {...register("name", { required: "Full name is required", validate: (value) => !!value.trim() || "Full name is required" })} className="h-14 rounded-2xl border-white/10 bg-white/3 pl-14 pr-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#c5a46d]" />
                  </div>
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.25em] text-gray-500">Email Address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input id="email" type="email" autoComplete="email" placeholder="Enter your email" aria-invalid={!!errors.email} {...register("email", { required: "Email address is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" } })} className="h-14 rounded-2xl border-white/10 bg-white/3 pl-14 pr-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#c5a46d]" />
                  </div>
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-xs uppercase tracking-[0.25em] text-gray-500">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input id="password" type="password" autoComplete="new-password" placeholder="Create your password" aria-invalid={!!errors.password} {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }, validate: { uppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter", number: (value) => /[0-9]/.test(value) || "Password must contain at least one number" } })} className="h-14 rounded-2xl border-white/10 bg-white/3 pl-14 pr-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#c5a46d]" />
                  </div>
                  {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="image" className="text-xs uppercase tracking-[0.25em] text-gray-500">Profile Image</Label>
                  <div className="relative">
                    <LinkIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input id="image" type="url" placeholder="Paste image URL" aria-invalid={!!errors.image} {...register("image", { validate: (value) => { if (!value?.trim()) return true; try { return ["http:", "https:"].includes(new URL(value).protocol) || "Enter a valid HTTP or HTTPS image URL"; } catch { return "Enter a valid image URL"; } } })} className="h-14 rounded-2xl border-white/10 bg-white/3 pl-14 pr-5 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#c5a46d]" />
                  </div>
                  {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
                </div>

                <Button type="submit" disabled={isLoading} className="mt-2 h-14 w-full rounded-2xl bg-[#c5a46d] text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#d4b27a]">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="relative flex items-center justify-center py-1">
                  <Separator className="bg-white/10" />
                  <span className="absolute bg-[#0d0d0d] px-3 text-xs uppercase tracking-[0.2em] text-gray-500">Or</span>
                </div>

                <Button onClick={signIn} type="button" variant="outline" className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-white/10 bg-white/3 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-white/5 hover:text-white">
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue With Google</span>
                </Button>

                <p className="pt-2 text-center text-sm text-gray-500">
                  Already have an account?
                  <Link href="/login" className="ml-2 font-semibold text-[#c5a46d] hover:text-white">Sign In</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </section>
  );
};

export default RegisterPage;

