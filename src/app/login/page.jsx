"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";

const LoginPage = () => {

    const onLogIn = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (data) {
            redirect('/');
        }

        if (error) {
            toast.error(error.message);
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

                <div className="relative hidden overflow-hidden border-r border-white/5 lg:flex">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,155,101,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_30%)]" />

                    <div className="relative z-10 flex w-full flex-col justify-between px-14 py-14">

                        <div>

                            <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d6bb84]">
                                <IoShieldCheckmarkOutline size={34} />
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

                            <div className="rounded-[28px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

                                <p className="text-xs uppercase tracking-[4px] text-gray-500">
                                    Premium Vehicles
                                </p>

                                <h2 className="mt-3 text-4xl font-black text-white">
                                    250+
                                </h2>

                            </div>

                            <div className="rounded-[28px] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

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

                <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-14">

                    <div className="w-full max-w-xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] shadow-[0_0_60px_rgba(0,0,0,0.45)]">

                        <div className="border-b border-white/5 px-7 py-8 sm:px-10">

                            <div className="flex items-center gap-4">

                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d6bb84]">
                                    <HiOutlineSparkles size={28} />
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

                            <Form onSubmit={onLogIn} className="flex flex-col gap-7">

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

                                    <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">
                                        Email Address
                                    </Label>

                                    <Input
                                        placeholder="john@example.com"
                                        className="h-16 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white placeholder:text-gray-500"
                                    />

                                    <FieldError className="mt-2 text-xs text-red-400" />

                                </TextField>

                                <TextField
                                    isRequired
                                    minLength={8}
                                    name="password"
                                    type="password"
                                    className="w-full"
                                >

                                    <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">
                                        Password
                                    </Label>

                                    <Input
                                        placeholder="Enter your password"
                                        className="h-16 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white placeholder:text-gray-500"
                                    />

                                    <Description className="mt-3 text-xs leading-6 text-gray-500">
                                        Must contain at least 8 characters with 1 uppercase letter and 1 number.
                                    </Description>

                                    <FieldError className="mt-2 text-xs text-red-400" />

                                </TextField>

                                <Button
                                    type="submit"
                                    className="h-16 w-full rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 text-sm font-black uppercase tracking-[4px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20"
                                >
                                    Login To Dashboard
                                </Button>

                                <div className="flex items-center gap-4 py-1">

                                    <div className="h-px flex-1 bg-white/10" />

                                    <span className="text-xs uppercase tracking-[4px] text-gray-500">
                                        Or Continue
                                    </span>

                                    <div className="h-px flex-1 bg-white/10" />

                                </div>

                                <Button
                                    onClick={signIn}
                                    type="button"
                                    className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-black uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-white/[0.06]"
                                >

                                    <FcGoogle size={24} />

                                    <span>
                                        Continue With Google
                                    </span>

                                </Button>

                                <p className="pt-2 text-center text-sm leading-7 text-gray-500">

                                    New to DriveHub?

                                    <Link href="/register" className="ml-2 font-bold text-[#d6bb84] transition-all duration-300 hover:text-white">
                                        Create Account
                                    </Link>

                                </p>

                            </Form>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default LoginPage;