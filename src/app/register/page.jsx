"use client";

import { Button, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaLink, FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const RegisterPage = () => {

    const router = useRouter();
    const onSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });
        if (data) {
            router.push("/");
        }
        if (error) {
            toast.error(error.message);
        }
    };

    const signIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) {
            toast.error(error.message);
        }
    };

    return (
        <section className="min-h-screen bg-[#070707] text-white">
            <div className="container mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="hidden border-r border-white/5 lg:flex">
                    <div className="flex w-full flex-col justify-center px-16">
                        <p className="text-xs font-bold uppercase tracking-[6px] text-[#c5a46d]"> Premium Access</p>
                        <h1 className="mt-6 text-6xl font-black leading-[1.05] tracking-tight text-white">
                            Join <br />
                            DriveHub</h1>

                        <p className="mt-8 max-w-md text-base leading-8 text-gray-400">
                            Create your account and explore premium vehicles, luxury rentals and exclusive driving experiences.
                        </p>

                        <div className="mt-14 flex gap-5">
                            <div className="rounded-3xl border border-white/5 bg-white/3px-7 py-6">
                                <p className="text-xs uppercase tracking-[4px] text-gray-500"> Luxury Cars </p>
                                <h2 className="mt-2 text-3xl font-black text-white">  250+ </h2>
                            </div>

                            <div className="rounded-3xl border border-white/5 bg-white/3 px-7 py-6">
                                <p className="text-xs uppercase tracking-[4px] text-gray-500"> Active Users</p>
                                <h2 className="mt-2 text-3xl font-black text-white"> 12K+ </h2>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-center px-5 py-12 sm:px-8">

                    <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#0d0d0d]">

                        <div className="border-b border-white/5 px-7 py-8 sm:px-10">

                            <p className="text-xs font-bold uppercase tracking-[5px] text-[#c5a46d]">
                                Create Account
                            </p>

                            <h2 className="mt-4 text-4xl font-black text-white">
                                Register
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-gray-400">
                                Start your premium driving experience with DriveHub.
                            </p>

                        </div>

                        <div className="px-7 py-8 sm:px-10">

                            <Form onSubmit={onSignUp} className="flex flex-col gap-6">

                                <TextField
                                    isRequired
                                    name="name"
                                    className="w-full"
                                >

                                    <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">
                                        Full Name
                                    </Label>

                                    <div className="relative">

                                        <FaRegUser className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-gray-500" />

                                        <Input
                                            placeholder="Enter your full name"
                                            className="h-15 rounded-2xl border border-white/10 bg-white/[0.03] pl-14 pr-5 text-white placeholder:text-gray-500"
                                        />

                                    </div>

                                </TextField>

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

                                    <div className="relative">

                                        <CiMail className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[20px] text-gray-500" />

                                        <Input
                                            placeholder="Enter your email"
                                            className="h-15 rounded-2xl border border-white/10 bg-white/[0.03] pl-14 pr-5 text-white placeholder:text-gray-500"
                                        />

                                    </div>

                                </TextField>

                                <TextField
                                    isRequired
                                    name="password"
                                    minLength={8}
                                    type="password"
                                    className="w-full"
                                    validate={(value) => {
                                        if (value.length < 8) return "Password must be at least 8 characters";
                                        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                                        if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                                        return null;
                                    }}
                                >

                                    <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">
                                        Password
                                    </Label>

                                    <div className="relative">

                                        <MdOutlinePassword className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[20px] text-gray-500" />

                                        <Input
                                            placeholder="Create your password"
                                            className="h-15 rounded-2xl border border-white/10 bg-white/[0.03] pl-14 pr-5 text-white placeholder:text-gray-500"
                                        />

                                    </div>

                                </TextField>

                                <TextField
                                    name="image"
                                    type="url"
                                    className="w-full"
                                >

                                    <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">
                                        Profile Image
                                    </Label>

                                    <div className="relative">

                                        <FaLink className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-gray-500" />

                                        <Input
                                            placeholder="Paste image URL"
                                            className="h-15 rounded-2xl border border-white/10 bg-white/[0.03] pl-14 pr-5 text-white placeholder:text-gray-500"
                                        />

                                    </div>

                                </TextField>

                                <Button
                                    type="submit"
                                    className="mt-2 h-15 w-full rounded-2xl bg-[#c5a46d] text-sm font-bold uppercase tracking-[3px] text-black transition-all duration-300 hover:bg-[#d4b27a]"
                                >
                                    Create Account
                                </Button>

                                <div className="flex items-center gap-4 py-1">

                                    <div className="h-px flex-1 bg-white/10" />

                                    <span className="text-xs uppercase tracking-[3px] text-gray-500">
                                        Or
                                    </span>

                                    <div className="h-px flex-1 bg-white/10" />

                                </div>

                                <Button
                                    onClick={signIn}
                                    className="h-15 w-full rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-bold uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-white/[0.05]"
                                >

                                    <FcGoogle size={22} />

                                    <span>
                                        Continue With Google
                                    </span>

                                </Button>

                                <p className="pt-2 text-center text-sm text-gray-500">

                                    Already have an account?

                                    <Link href="/login" className="ml-2 font-semibold text-[#c5a46d] hover:text-white">
                                        Sign In
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

export default RegisterPage;