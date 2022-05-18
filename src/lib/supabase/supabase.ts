import { createClient } from "@supabase/supabase-js";

//env用
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// if (!SUPABASE_URL) {
//   throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
// }
// if (!SUPABASE_KEY) {
//   throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
// }

const supabaseUrl = "https://ecrwkbqqxybwbvglgbil.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcndrYnFxeHlid2J2Z2xnYmlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1Mjg5Mjg0MiwiZXhwIjoxOTY4NDY4ODQyfQ.GdAi3Br-Yo9OCSrGOflqFQdB4Kg_aZTtlPmguspQVSk";

export const config = {
  supabase: createClient(supabaseUrl, supabaseKey),
};
