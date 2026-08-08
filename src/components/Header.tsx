"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

/**
 * Header — fixed, transparent over the cinematic hero (home only), frosted
 * ivory everywhere else. Full-screen clip-path mobile menu. Brand uses the
 * transparent monogram + wordmark lockup; a gold warm-up filter is applied
 * while sitting over the dark hero, removed once frosted.
 */

const NAV_LINKS = [
  { href: "/collection", label: "Collection", tag: "17 pieces" },
  { href: "/#craft", label: "Craft", tag: "named hands" },
  { href: "/#fit", label: "Size & Fit", tag: "XXS–4XL" },
  { href: "/apply", label: "Become a Custodian", tag: "Apply" },
  { href: "/#join", label: "Join the Waitlist", tag: "Join" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", isOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const solid = !isHome || isScrolled;

  return (
    <>
      <header
        className={`site-header ${solid ? "scrolled" : ""} ${isOpen ? "menu-active" : ""}`}
        role="banner"
      >
        <Link className="brand" href="/" aria-label="Susan Atelier by Riya — home">
          <Image
            src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
            alt="Susan Atelier Monogram"
            width={46}
            height={46}
            className="brand-mono"
            priority
          />
          <Image
            src="/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png"
            alt="Susan Atelier by Riya"
            width={378}
            height={96}
            className="brand-wordmark"
            priority
          />
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <Link href="/collection">Collection</Link>
          <Link href="/#craft">Craft</Link>
          <Link href="/#fit">Size &amp; Fit</Link>
          <Link href="/apply">Become a Custodian</Link>
        </nav>

        <div className="header-cta">
          <Button href="/#join" variant="primary" className="header-cta-btn">
            Join the Waitlist
          </Button>
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
        <p className="mm-foot">made by named hands ✦</p>
      </div>
    </>
  );
}
