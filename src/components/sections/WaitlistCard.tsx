"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "PLACEHOLDER_REPLACE_ME";

const WHATSAPP_LINK =
  "https://wa.me/" +
  WA +
  "?text=" +
  encodeURIComponent("Hi Susan Atelier — please add me to the waitlist.");

export default function WaitlistCard() {
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(0);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nameInput = document.getElementById("wName") as HTMLInputElement | null;
    const phoneInput = document.getElementById("wPhone") as HTMLInputElement | null;
    if (!name.trim()) {
      nameInput?.focus();
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      phoneInput?.focus();
      return;
    }
    setPosition(22 + Math.floor(Math.random() * 18)); // 22–39
    setSubmitted(true);
  }

  const firstName = name.trim().split(/\s+/)[0] || name.trim();

  return (
    <div className="join-card">
      {submitted ? (
        <motion.div
          className="join-success"
          style={{ display: "block" }}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="hs-script">welcome in,</p>
          <p className="hs-num">
            You&apos;re Nº {position} / 50 in line, {firstName}.
          </p>
          <a
            className="btn btn--ghost"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener"
          >
            Confirm on WhatsApp →
          </a>
        </motion.div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="wName">Your name</label>
            <input
              id="wName"
              type="text"
              placeholder="e.g. Ananya"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="wPhone">WhatsApp number</label>
            <input
              id="wPhone"
              type="tel"
              placeholder="+91 ·····"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="btn btn--solid" type="submit">
              Join the Waitlist →
            </button>
          </form>
          <p className="jc-alt">
            Prefer WhatsApp?{" "}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener">
              Join via WhatsApp
            </a>
          </p>
        </>
      )}
    </div>
  );
}
