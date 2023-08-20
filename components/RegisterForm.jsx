"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      const existRes = await fetch("api/userexists", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await existRes.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;

        form.reset();
        router.push("/");
      } else {
        console.log("Error during registration:", error);
      }
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
              placeholder="Name"
              className="p-2 bg-gray-300 border-b-1 border-gray-600 outline-none"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
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
            <button
              type="submit"
              className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            >
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
                {error}
              </div>
            )}

            <Link href="/" className="text-sm mt-3 text-right">
              I have already account
              <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
