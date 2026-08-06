"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Monogram } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";

/**
 * Header — sticky, transparent → frosted on scroll. Full-screen clip-path
 * mobile menu. Brand uses the monogram SVG + word/script text lockup.
 */

const NAV_LINKS = [
  { href: "/collection", label: "Collection", tag: "17 pieces" },
  { href: "/#craft", label: "Craft", tag: "named hands" },
  { href: "/#fit", label: "Size & Fit", tag: "XXS–4XL" },
  { href: "/#about", label: "About", tag: "Riya" },
  { href: "/apply", label: "Join the Waitlist", tag: "Apply" },
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
        className={`site-header ${isScrolled ? "scrolled" : ""} ${isOpen ? "menu-active" : ""}`}
        role="banner"
      >
        <Link className="brand" href="/" aria-label="Susan Atelier by Riya — home">
          <Monogram size={46} color="auto" className="brand-mono" />
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
          <Button href="/apply" variant="primary" className="header-cta-btn">
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
        <p className="mm-foot">timeless · feminine · refined ✦</p>
      </div>
    </>
  );
}

