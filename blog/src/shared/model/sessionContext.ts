"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const SessionContext = createContext<User | null>(null);
export const useSession = () => useContext(SessionContext);
