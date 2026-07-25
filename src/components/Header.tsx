"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Header component with navigation and mobile menu
 * Client component for interactive menu toggle
 */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isJoinPage = pathname === "/join";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header
      className={`site-header ${isScrolled ? "scrolled" : ""}`}
      role="banner"
    >
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/" className="logo-link" aria-label="Susan Atelier home">
          <Image
            src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
            alt=""
            width={56}
            height={56}
            className="logo-monogram"
            priority
          />
        </Link>

        <button
          className="menu-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-links"
          onClick={toggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`} id="nav-links" role="navigation">
          <Link href="/">Home</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/craft">Our Craft</Link>
          <Link href="/fit">Size & Fit</Link>
          <Link href="/about">About</Link>
          <Link href="/join" className="nav-join">
            Join Waitlist
          </Link>
        </div>

        {!isJoinPage && (
          <div className="nav-cta">
            <Link href="/join" className="btn btn--outline">
              Join Waitlist
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}