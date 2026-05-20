"use client";


import { Button, Form, Input, Label, TextField, Card, } from "@heroui/react";

import Link from "next/link";

import { FaLink, FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const onSingIn = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });
        if (data) {
            redirect('/')
        }
        if (error) {
            toast.error(error.message)
        }
    };
    const authClient = createAuthClient();
    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-gray-800 mb-2">Create Account</h1>
                <p className="text-gray-500 text-sm">Start your adventure with Wanderlust</p>
            </div>

            <Card className="w-full max-w-md bg-white p-8 border border-gray-100 shadow-sm rounded-none">
                <Form onSubmit={onSingIn} className="flex flex-col gap-5">
                    <TextField isRequired name="name">
                        <Label className="text-gray-900 font-medium text-sm mb-1.5 block">Full Name</Label>
                        <div className="relative flex items-center">
                            <FaRegUser className="absolute left-3 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Enter your name"
                                className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none rounded-none"
                            />
                        </div>
                    </TextField>

                    <TextField isRequired name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-gray-900 font-medium text-sm mb-1.5 block">Email Address</Label>
                        <div className="relative flex items-center">
                            <CiMail className="absolute left-3 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none rounded-none"
                            />
                        </div>
                    </TextField>

                    <TextField isRequired name="password"
                        minLength={8}
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                            return null;
                        }}
                    >
                        <Label className="text-gray-900 font-medium text-sm mb-1.5 block">Password</Label>
                        <div className="relative flex items-center">
                            <MdOutlinePassword className="absolute left-3 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Create a password"
                                className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none rounded-none"
                            />
                        </div>
                    </TextField>

                    <TextField name="image" type="url">
                        <Label className="text-gray-900 font-medium text-sm mb-1.5 block">Image Url</Label>
                        <div className="relative flex items-center">
                            <FaLink className="absolute left-3 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Your Image Url"
                                className="w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none rounded-none"
                            />
                        </div>
                    </TextField>

                    <Button type="submit" className="w-full bg-[#13a3ca] text-white py-2.5 font-medium hover:bg-[#108dae] transition-colors rounded-none mt-2">
                        Create Account
                    </Button>

                    <div className="relative flex py-2 items-center justify-center">
                        <div className="grow border-t border-gray-200"></div>
                        <span className="shrink mx-4 text-gray-400 text-xs font-normal">Or sign up with</span>
                        <div className="grow border-t border-gray-200"></div>
                    </div>

                    <Button onClick={signIn} variant="bordered" className="w-full bg-white border border-gray-200 py-2.5 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 rounded-none">
                        <FcGoogle/>
                        Sign Up With Google
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-2">
                        Already have an account?{" "}
                        <Link href={'/login'} className="text-[#13a3ca] font-medium hover:underline"> Sign In</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;