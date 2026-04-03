"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // fail silently for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <span className="text-xl font-bold tracking-tight text-white">
          kernlo<span className="text-indigo-400">.</span>
        </span>
        <a
          href="#waitlist"
          className="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-full font-medium"
        >
          Join waitlist
        </a>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-3xl mx-auto w-full">
        <div className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 rounded-full px-4 py-1 mb-6">
          Built for homeschool families
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Stop drowning in{" "}
          <span className="text-indigo-400">progress tracking.</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
          Kernlo turns what your child learned today into professional progress
          reports — in minutes, not hours. No spreadsheets. No stress.
        </p>

        {/* Waitlist Form */}
        <div id="waitlist" className="w-full max-w-md">
          {submitted ? (
            <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-2xl px-6 py-5 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-semibold text-white">You&apos;re on the list!</p>
              <p className="text-zinc-400 text-sm mt-1">
                We&apos;ll email you when Kernlo is ready.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition-colors px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
              >
                {loading ? "Joining..." : "Join waitlist"}
              </button>
            </form>
          )}
          <p className="text-zinc-600 text-xs mt-3">
            Free to join. No spam. Ever.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Reports in minutes",
              desc: "Tell Kernlo what your child studied. AI does the rest — formatted, professional, ready to submit.",
            },
            {
              icon: "📋",
              title: "Compliance-ready",
              desc: "Designed around real homeschool requirements. No more guessing what to include.",
            },
            {
              icon: "📈",
              title: "Track growth over time",
              desc: "See your child's progress at a glance. Milestones, streaks, and subjects — all in one place.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 max-w-3xl mx-auto w-full text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to reclaim your time?
        </h2>
        <p className="text-zinc-400 mb-8">
          Join families already on the waitlist. Kernlo launches soon.
        </p>
        <a
          href="#waitlist"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors px-8 py-4 rounded-xl font-semibold text-lg"
        >
          Get early access →
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} Kernlo. All rights reserved.
      </footer>
    </main>
  );
}
