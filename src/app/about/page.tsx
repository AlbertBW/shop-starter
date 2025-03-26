"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({
      x: ev.clientX,
      y: ev.clientY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition]);

  return (
    <div className="relative overflow-hidden py-12">
      {/* background gradient that follows cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb), 0.55), transparent 40%)`,
        }}
      />

      <section className="relative mb-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-light">About Us</h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-primary" />
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We offer premium technology products that seamlessly blend
            innovation, performance, and elegant design.
          </p>
        </div>
      </section>

      <section className="relative mb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/about-page-upVLtGLE7zrHK21K2b5DnTZtBIFdKP.jpeg"
              alt="Our technology philosophy"
              fill
              className="object-cover shadow-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl font-light">Our Approach</h2>
            <p className="mb-4 text-muted-foreground">
              We believe technology should enhance everyday experiences through
              intuitive design and flawless performance. Every product we offer
              is carefully selected for its quality and attention to detail.
            </p>
            <p className="text-muted-foreground">
              Our team curates a collection of technology that&apos;s as
              beautiful as it is functional, ensuring exceptional performance
              and lasting value.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
