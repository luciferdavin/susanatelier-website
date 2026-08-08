"use client";

import { useState, type FormEvent } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "PLACEHOLDER_REPLACE_ME";

const WHATSAPP_LINK =
  "https://wa.me/" +
  WA +
  "?text=" +
  encodeURIComponent("Hi Susan Atelier — please add me to the waitlist.");

export default function WaitlistCard() {
  const reduced = useSafeReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(0);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    if (phone.replace(/\D/g, "").length < 10) return;
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
          <Button
            variant="outline"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener"
            className="w-full justify-center mt-4"
          >
            Confirm on WhatsApp →
          </Button>
        </motion.div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Input
              id="wName"
              type="text"
              label="Your name"
              placeholder="e.g. Ananya"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="wPhone"
              type="tel"
              label="WhatsApp number"
              placeholder="+91 ·····"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button variant="primary" type="submit" className="w-full justify-center mt-4">
              Join the Waitlist →
            </Button>
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

