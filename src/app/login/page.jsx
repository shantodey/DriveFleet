"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const onLogIn = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());


    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,

    });
    console.log(data);

    if (data) {
      redirect('/')
    }
    if (error) {
      toast.error(error.message)
    }
  };
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-screen">

        <div className="px-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary"> Secure Access </p>
          <h1 className="text-6xl font-black leading-[1.1] tracking-tight text-foreground">  Welcome back<br />to DriveHub </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/50">
            Manage listings, book available cars, and keep your rental history
            organized in one private dashboard.
          </p>
        </div>

        <div className="flex w-full items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-divider bg-content1 px-10 py-10 shadow-xl">
            <h2 className="mb-6 text-3xl font-black text-foreground">Login</h2>

            <Form onSubmit={onLogIn} className="flex flex-col gap-5">
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="w-full"
              >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />
                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                <FieldError />
              </TextField>

              <Button type="submit" color="primary" size="lg" radius="lg" className="w-full font-bold">
                Login
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-divider" />
                <span className="text-xs text-foreground/40">or</span>
                <div className="h-px flex-1 bg-divider" />
              </div>

              <Button onClick={signIn} type="button" variant="bordered" size="lg" radius="lg" className="w-full font-bold">
                <FcGoogle />Google Login
              </Button>

              <p className="text-center text-sm text-foreground/50">
                New to DriveHub?{" "}
                <Link href="/register" className="font-bold text-foreground underline underline-offset-2">
                  Register
                </Link>
              </p>
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;