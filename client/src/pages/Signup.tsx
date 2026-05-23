import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../api/axios";



export default function Signup() {

  const navigate =
    useNavigate();



  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");





  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "/auth/register",
            {
              name,
              email,
              password,
            }
          );




        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );




        navigate(
          "/dashboard"
        );

      } catch (error: any) {

        alert(
          error.response?.data?.message
        );
      }
    };






  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] border border-zinc-800"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">

          Sign Up

        </h1>






        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4 outline-none"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />






        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4 outline-none"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />






        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-800 mb-6 outline-none"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />






        <button
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
        >
          Create Account
        </button>






        <p className="text-center text-zinc-400 mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}