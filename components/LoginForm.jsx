"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
          <h1 className="text-xl font-bold my-4">Enter The Details</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-[400px]"
          >
            <input
              type="text"
              placeholder="Email"
              className="p-2 bg-gray-300 border-b-1 border-gray-600 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 bg-gray-300 border-b-1 border-gray-600 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
                {error}
              </div>
            )}

            <Link href="/register" className="text-sm mt-3 text-right">
              Do not have an account ?{" "}
              <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
