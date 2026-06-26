// src/hooks/useUserRealtime.tsx
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { mainUrl } from "./supabase";

// Adjust to match your backend URL
const socket = io(mainUrl, {
  withCredentials: true,
});

export default function useUserRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // When the backend emits a change, invalidate the user query
    socket.on("user-change", (payload) => {
      // console.log("Realtime update:", payload);
      queryClient.invalidateQueries(["user"]); // forces refetch
    });

    socket.on("spinner-change", (payload) => {
      // console.log("spiiner change:", payload);
      queryClient.invalidateQueries(["spinnerReward"]); // refetch transactions query
    });

    // Clean up on unmount
    return () => {
      socket.off("user-change");
      socket.off("spinner-change");
    };
  }, [queryClient]);
}
