"use client";

import { useAuth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export function useLocalStorage() {
  const [sessionId, setSessionId] = useState<string | null>();
  const { userId } = useAuth();

  function deleteSessionId() {
    localStorage.removeItem("cart_session_id");
    setSessionId(null);
  }

  useEffect(() => {
    if (!userId) {
      let storedSessionId = localStorage.getItem("cart_session_id");
      if (!storedSessionId) {
        storedSessionId = nanoid();
        localStorage.setItem("cart_session_id", storedSessionId);
      }
      setSessionId(storedSessionId);
    }
  }, [userId]);

  return { sessionId, deleteSessionId };
}
