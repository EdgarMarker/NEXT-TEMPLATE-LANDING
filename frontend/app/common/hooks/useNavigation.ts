/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/app/common/utils/constants"

export const useNavigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  //* Close with ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  //* Close when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      )
        return;
      setIsMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  //* Close nav on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <custom hook>
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  //* Detect anchors
  useEffect(() => {
    const anchorItems = NAV_ITEMS.filter((item) => item.href.startsWith("#"));

    if (pathname !== "/" || anchorItems.length === 0) {
      setActiveHash("");
      return;
    }

    const sectionIds = anchorItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveHash(`#${visibleEntry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  //* Check if link is active
  const isLinkActive = (href: string): boolean => {
    if (href.startsWith("#")) return activeHash === href;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Handlers
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    // Estado
    isMenuOpen,
    pathname,

    // Refs
    menuRef,
    toggleRef,

    // Funciones
    toggleMenu,
    closeMenu,
    isLinkActive,

    // Datos
    navItems: NAV_ITEMS,
  };
};
