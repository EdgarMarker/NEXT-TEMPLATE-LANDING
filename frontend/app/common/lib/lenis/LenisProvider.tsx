"use client";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import Lenis from "@studio-freight/lenis";

type LenisProviderProps = {
  children: ReactNode;
};

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function startLenis() {
      if (lenisRef.current) return;

      const instance = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        smoothWheel: true,
      });

      lenisRef.current = instance;
      setLenis(instance);

      const raf = (time: number) => {
        instance.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };

      rafRef.current = requestAnimationFrame(raf);
    }

    function stopLenis() {
      if (!lenisRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      lenisRef.current.destroy();
      lenisRef.current = null;
      rafRef.current = null;
      setLenis(null);
    }

    function handleResize() {
      const isDesktop = window.innerWidth > 1024;

      if (isDesktop) {
        startLenis();
      } else {
        stopLenis();
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      stopLenis();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};

export default LenisProvider;
