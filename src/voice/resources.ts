import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { StreamType, createAudioResource } from "@discordjs/voice";

const __dirname = new URL("../../assets", import.meta.url).pathname;

export const createResource = (name: string, title: string) => {
  return createAudioResource(path.join(__dirname, name), {
    inputType: StreamType.OggOpus,
    metadata: {
      title: title,
    },
  });
};
