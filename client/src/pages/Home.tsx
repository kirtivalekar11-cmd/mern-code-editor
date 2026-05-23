import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCode,
  FaDatabase,
  FaLock,
} from "react-icons/fa";

export default function Home() {

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-[-180px] left-[-180px] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[160px] opacity-20"></div>

      <div className="absolute bottom-[-180px] right-[-180px] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[160px] opacity-20"></div>


      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">

          CodeChamp

        </h1>

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-zinc-800 hover:bg-zinc-900 transition text-sm"
          >
            Login
          </Link>



          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition text-sm"
          >
            Get Started
          </Link>

        </div>

      </nav>










      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-20">

        <div className="bg-zinc-900 border border-zinc-800 px-4 py-1 rounded-full text-xs text-zinc-300 mb-6">

          🚀 Modern Cloud IDE Platform

        </div>

        <h1 className="text-5xl md:text-6xl font-black max-w-4xl leading-tight">

          Write Code.

          <br />

          Execute Instantly.

          <br />

          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">

            Save Forever.

          </span>

        </h1>

        <p className="text-zinc-400 text-lg mt-6 max-w-xl leading-7">

          A modern cloud IDE built using
          MERN, TypeScript and MongoDB Atlas.

        </p>


        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">

          <Link
            to="/signup"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl text-base font-semibold hover:scale-105 transition"
          >

            Start Coding

            <FaArrowRight size={14} />

          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-base font-medium transition"
          >
            Login
          </Link>

        </div>

      </section>


      {/* FEATURES */}
      <section className="relative z-10 grid md:grid-cols-3 gap-5 px-6 md:px-16 pb-20">


     <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:translate-y-[-3px] transition">

          <FaCode className="text-4xl text-blue-500 mb-5" />

          <h2 className="text-xl font-bold mb-3">

            Multi Language

          </h2>

          <p className="text-zinc-400 leading-6 text-sm">

            Execute JavaScript, Python,
            Java and C++ directly
            from your browser.

          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:translate-y-[-3px] transition">

          <FaDatabase className="text-4xl text-purple-500 mb-5" />

          <h2 className="text-xl font-bold mb-3">

            Cloud Storage

          </h2>

          <p className="text-zinc-400 leading-6 text-sm">

            Save projects securely using
            MongoDB Atlas and access
            them anytime.

          </p>

        </div>


        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:translate-y-[-3px] transition">

          <FaLock className="text-4xl text-green-500 mb-5" />

          <h2 className="text-xl font-bold mb-3">

            Secure Authentication

          </h2>

          <p className="text-zinc-400 leading-6 text-sm">

            JWT authentication with
            protected dashboards and
            secure user sessions.

          </p>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-900 py-6 text-center text-zinc-500 text-sm">

        © 2026 CodeChamp.
        Built with MERN + TypeScript.

      </footer>

    </div>
  );
}