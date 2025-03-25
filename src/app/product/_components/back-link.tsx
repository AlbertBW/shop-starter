"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackLink() {
  const router = useRouter();

  return (
    <div className="flex font-light tracking-wide text-muted-foreground">
      <button
        className="flex items-center transition-colors hover:text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-1 inline-block h-4" />
        <span>Back</span>
      </button>
    </div>
  );
}
