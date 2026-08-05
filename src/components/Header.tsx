"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Header — sticky, transparent → frosted on scroll. Full-screen clip-path
 * mobile menu. Brand uses the monogram PNG + word/script text lockup.
 */

const NAV_LINKS = [
  { href: "/collection", label: "Collection", tag: "17 pieces" },
  { href: "/#craft", label: "Craft", tag: "named hands" },
  { href: "/#fit", label: "Size & Fit", tag: "XXS–4XL" },
  { href: "/#about", label: "About", tag: "Riya" },
  { href: "/#join", label: "Join the Waitlist", tag: "1/50" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", isOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <header
        className={`site-header ${isScrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <Link className="brand" href="/" aria-label="Susan Atelier by Riya — home">
          <Image
            src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
            alt=""
            width={46}
            height={46}
            className="brand-mono"
            priority
          />
          <span className="brand-text">
            <span className="brand-word">Susan Atelier</span>
            <span className="brand-script">by Riya</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <Link href="/collection">Collection</Link>
          <Link href="/#craft">Craft</Link>
          <Link href="/#fit">Size &amp; Fit</Link>
          <Link href="/#about">About</Link>
        </nav>

        <div className="header-cta">
          <Link href="/#join" className="btn btn--solid">
            Join the Waitlist
          </Link>
          <button
            className="burger"
            id="burger"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobileMenu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobileMenu" aria-hidden={!isOpen}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            className="mm-link"
            href={link.href}
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            {link.label} <small>{link.tag}</small>
          </Link>
        ))}
        <p className="mm-foot">timeless · feminine · refined ✦</p>
      </div>
    </>
  );
}
