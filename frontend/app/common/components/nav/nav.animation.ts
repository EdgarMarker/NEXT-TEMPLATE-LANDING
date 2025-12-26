// nav.animation.ts
"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useNavScrollShrink(headerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const header = headerRef.current;
    const main = document.querySelector("main");
    const logo = document.querySelector(".logo img");

    if (!header || !main || !logo) return;

    ScrollTrigger.matchMedia({
      // Solo Desktop >= 1024px
      "(min-width: 1025px)": () => {
        gsap.to(header, {
          paddingTop: 0,
          paddingBottom: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: main,
            start: "top+=200 top+=100",
            end: "top+=200 top+=100",
            scrub: true,
          },
        });

        gsap.to(logo, {
          height: "50px",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: main,
            start: "top+=200 top+=100",
            end: "top+=200 top+=100",
            scrub: true,
          },
        });
      },

      "(max-width: 1024px)": () => {
        gsap.set(headerRef.current, { paddingTop: "", paddingBottom: "" });
        gsap.set(".logo img", { height: "" });
      },
    });
  }, [headerRef]);
}
