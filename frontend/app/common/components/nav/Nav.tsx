/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import "./nav.css";
import { useRef } from "react";
import { useNavScrollShrink } from "./nav.animation";
import ResponsiveImage from "../img/ResponsiveImage";
import { useNavigation } from "../../hooks/useNavigation";
import { CompanyModel } from "@/app/_domain/model/company.model";

interface Props {
  companyData?: CompanyModel;
}

const Nav = ({ companyData }: Props) => {
  const headerRef = useRef<HTMLElement>(null);
  useNavScrollShrink(headerRef);
  const {
    isMenuOpen,
    menuRef,
    toggleRef,
    toggleMenu,
    closeMenu,
    isLinkActive,
    navItems,
  } = useNavigation();

  return (
    <header id="Header" ref={headerRef}>
      <nav>
        <a href="/" className="logo" aria-label="Ir al inicio">
          {companyData?.general.icon_general_navLogo ? (
            <ResponsiveImage
              imageData={companyData?.general.icon_general_navLogo}
              variant="icon"
            />
          ) : (
            <span>LOGO</span>
          )}
        </a>

        <ul role="list" className="nav-links">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
      >
        <ul role="list">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`mobile-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Nav;
