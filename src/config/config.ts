import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";

await load({ export: true, allowEmptyValues: true });
const discord_token = Deno.env.get("DISCORD_TOKEN");

if (!discord_token) {
  throw new Error("Missing environment variables");
}

export const config = {
  discord_token,
};
