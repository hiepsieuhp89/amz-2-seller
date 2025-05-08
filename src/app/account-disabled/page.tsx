"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { useEffect, useState } from "react";

export default function AccountDisabledPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const checkAccountStatus = () => {
            const isDisabled = localStorage.getItem("accountDisabled") === "true";
            setShouldRedirect(isDisabled);
            if (isDisabled) {
                localStorage.removeItem("accountDisabled");
            }
        };
        checkAccountStatus();
    }, []);

    useEffect(() => {
        if (!shouldRedirect) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        window.location.href = "/sign-in";
                    }, 500);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [shouldRedirect]);

    return (
        <div className="min-h-screen bg-[#4D148C] flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                <div className="bg-white border border-gray-300 rounded-md p-4 px-8 mb-4">
                    <div className="flex justify-center mb-4">
                        <Link href="/">
                            <img src="/images/fedex2.png" alt="Amazon Logo" className="h-12" />
                        </Link>
                    </div>
                    <h1 className="text-2xl text-center font-bold text-[#0F1111] mb-4 flex items-center justify-center gap-2">
                        Your account has been disabled
                        <span className="inline-flex items-center justify-center bg-red-100 rounded-full p-1">
                            {/* @ts-ignore */}
                            {Icons.info({ style: { display: 'block' } })}
                        </span>
                    </h1>
                    <p className="text-[#0F1111] mb-2">
                        We have detected that your account has violated Amazon policies. As a result, your ability to sell on Amazon has been temporarily disabled.
                    </p>
                    <h2 className="text-lg font-bold text-[#0F1111] mb-2">
                        Why did this happen?
                    </h2>
                    <p className="text-[#0F1111] mb-4">
                        Your account is under review for suspected policy violations, such as intellectual property infringement, poor performance metrics, or suspicious activity.
                    </p>

                    <h2 className="text-lg font-bold text-[#0F1111] mb-2">
                        What can you do?
                    </h2>
                    <ul className="text-[#0F1111] mb-4">
                        <li className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1">
                                {/* @ts-ignore */}
                                {Icons.check({ style: { display: 'block' } })}
                            </span>
                            Check your email for a detailed explanation.
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1">
                                {/* @ts-ignore */}
                                {Icons.check({ style: { display: 'block' } })}
                            </span>
                            Submit a Plan of Action (POA) if available.
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center bg-green-100 rounded-full p-1">
                                {/* @ts-ignore */}
                                {Icons.check({ style: { display: 'block' } })}
                            </span>
                            You can appeal this decision through the Performance Notifications page or by contacting support.
                        </li>
                    </ul>

                    <div className="mt-4 space-x-4 flex justify-center">
                        <button
                            onClick={() => router.push('/contact-support')}
                            className="py-2 px-6 bg-[#FD9C06] hover:bg-[#FD9C06]/90 border border-[#FD9C06] rounded-md text-[#0F1111] font-medium shadow-sm focus:outline-none"
                        >
                            Contact Support
                        </button>
                        <button
                            onClick={() => router.push('/performance-notifications')}
                            className="py-2 px-6 bg-white hover:bg-gray-100 border border-gray-300 rounded-md text-[#0F1111] font-medium shadow-sm focus:outline-none"
                        >
                            Appeal Decision
                        </button>
                    </div>
                    <div className="text-center text-xs text-[#565959] mt-4">
                        <p>
                            &copy; 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 