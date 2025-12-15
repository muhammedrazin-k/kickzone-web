import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Creator = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  return (
    <div className="min-h-screen bg-[#F7F7F7] text-gray-800">
  {/* Header */}
  <header className="border-b border-gray-200 bg-white">
    <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
          KZ
        </div>
        <div>
          <p className="text-sm font-semibold">Kick Zone</p>
          <p className="text-xs text-gray-500 -mt-0.5">
            Football • Stats • Community
          </p>
        </div>
      </div>

      <Link
        to={"/"}
        className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:border-emerald-500 hover:text-emerald-600 transition"
      >
        Back to App
      </Link>
    </div>
  </header>

  {/* Body */}
  <main className="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-14">

    {/* ===================== HERO SECTION ===================== */}
    <section className="grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT TEXT */}
      <div>
        <p className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-600 mb-4">
          👟 Creator Story • Kick Zone
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
          Hey, I'm{" "}
          <span className="text-emerald-600 underline decoration-emerald-300">
            Razin
          </span>
          .
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          I'm a MERN-stack developer and football lover. Kick Zone started as a
          simple idea — tracking local football matches with real stats, goals,
          and player performance.
        </p>
      </div>

      {/* RIGHT IMAGE CARD (Your Photo Section) */}
      <div className="flex justify-center">
        <div className="relative group">
          {/* Glow Shadow */}
          <div className="absolute inset-0 rounded-full bg-emerald-300 blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

          {/* Image Frame */}
          <div className="relative h-52 w-52 md:h-64 md:w-64 rounded-full overflow-hidden shadow-xl border-4 border-white bg-white">
            {/* Replace with your image */}
            <img
              src="/my.jpeg"
              alt="Creator"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ===================== INFO CARD ===================== */}
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500">Quick Info</p>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Role</span>
          <span className="font-medium">FullStack Developer</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tech Stack</span>
          <span className="font-medium text-right">
            React · Node · MongoDB · Tailwind · Express 
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Focus</span>
          <span className="font-medium text-right">
            Local football stats
          </span>
        </div>
      </div>
    </section>

    {/* ===================== JOURNEY SECTION ===================== */}
    <section className="space-y-5">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
        My Journey 🛣️
      </h2>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <div className="w-px bg-gray-300 flex-1" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Football → Stats mindset
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Our matches were intense, but nothing was recorded — no goal
              history, no performance logs. Kick Zone started here.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <div className="w-px bg-gray-300 flex-1" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Learning & building with MERN
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              I moved from tutorials to real-world development, building tools
              that actually solve a problem.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Kick Zone becomes real
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Now it’s becoming a platform for match bookings, tracking goals,
              player profiles, and football community stats.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ===================== CARDS SECTION ===================== */}
    <section className="grid md:grid-cols-2 gap-6">
      {/* What I'm Building */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          What I'm building with Kick Zone
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Match score and stat tracking</li>
          <li>• Player career and performance records</li>
          <li>• Tools for turf owners</li>
          <li>• Clean, simple UI for all players</li>
        </ul>
      </div>

      {/* How I Build */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          How I like to build
        </h2>
        <p className="text-sm text-gray-700">
          I focus on clean UI, smooth UX, real usage patterns, and solving
          actual football community needs.
        </p>

        <div className="mt-4">
          <p className="text-xs uppercase text-gray-500 mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 bg-gray-100"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>

    {/* ===================== CONTACT SECTION ===================== */}
    <section>
      <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 shadow-sm">
        <h2 className="text-lg md:text-xl font-semibold text-emerald-700">
          Want to follow the journey?
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          I'm building Kick Zone step by step. Let’s connect.
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <a className="px-4 py-2 rounded-full text-sm font-medium border border-emerald-500 bg-white text-emerald-700 hover:bg-emerald-100 transition">
            DM me on Instagram
          </a>
          <a className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 transition">
            GitHub
          </a>
        </div>
      </div>
    </section>

  </main>
</div>
  );
};

export default Creator;
