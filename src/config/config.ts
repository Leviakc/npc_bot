import { load } from "https://deno.land/std@0.213.0/dotenv/mod.ts";

const env = await load();
const discord_token = env["DISCORD_TOKEN"];

export const config = {
  discord_token,
};
