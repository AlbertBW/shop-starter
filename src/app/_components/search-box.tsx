"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Effect to focus the input when the search box opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small timeout to ensure the input is rendered before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isOpen, inputRef]);

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (input.trim() !== "") {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const url = new URL(window.location.origin + "/products");
    url.searchParams.set("search", input);
    router.push(url.toString());
    setInput("");
    setIsOpen(false);
  };

  return (
    <div
      onSubmit={handleSubmit}
      className={`hidden items-center justify-center rounded md:flex ${isOpen ? "border border-border focus-within:ring-2 focus-within:ring-sky-500" : ""}`}
      onClick={() => {
        if (!isOpen) {
          open();
        }
      }}
    >
      {isOpen && (
        <div className="search-box">
          <Input
            ref={inputRef}
            type="text"
            name="query"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-7 rounded-none border-0 border-r-0 font-extralight focus:outline-none focus-visible:ring-0"
            autoComplete="off"
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      <button
        onClick={() => {
          if (isOpen) {
            if (input.trim() === "") {
              close();
              return;
            }

            handleSubmit();
          }
          setIsOpen((prev) => !prev);
        }}
        className={`${isOpen && "py-[3px]"}`}
      >
        <Search className={`${isOpen ? "scale-90 pr-1" : ""} transition-all`} />
      </button>
    </div>
  );
}
