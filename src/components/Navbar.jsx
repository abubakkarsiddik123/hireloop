"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Link, Button } from "@heroui/react";

function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Better Auth setup করার পরে এই value session থেকে আসবে।
  const isLoggedIn = false;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16  items-center justify-between px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex w-full items-center justify-between md:w-auto">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to homepage"
            onPress={handleNavigation}
          >
            <Image
              src="/logo.png"
              alt="Job Platform"
              width={140}
              height={40}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
                    {/* Mobile Menu Button */}
          <Button
            isIconOnly
            variant="light"
            className="min-w-0 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onPress={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>

        {/* Desktop Navigation + Authentication */}
        <div className="hidden items-center gap-6 md:flex">
          {/* Desktop Navigation */}
          <nav
            className="flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <span className="relative">
                  {item.name}

                  {isActive(item.href) && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-foreground" />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop Authentication */}
          {!isLoggedIn && (
            <div className="flex items-center gap-2 border-l border-separator pl-6">
              <Link href="/login">Login</Link>

              <Button
                as={Link}
                href="/register"
                color="primary"
              
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <nav
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onPress={handleNavigation}
                  className={`rounded-medium px-3 py-3 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-default text-foreground"
                      : "text-foreground/70 hover:bg-default/50 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Authentication */}
              {!isLoggedIn && (
                <div className="mt-3 flex flex-col gap-2 border-t border-separator pt-3">
                  <Link
                    href="/login"
                    onPress={handleNavigation}
                    className="px-3 py-3"
                  >
                    Login
                  </Link>

                  <Button
                    as={Link}
                    href="/register"
                    color="primary"
                    onPress={handleNavigation}
                  >
                    Register
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
