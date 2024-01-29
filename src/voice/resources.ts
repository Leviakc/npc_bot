import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
import { StreamType, createAudioResource } from "@discordjs/voice";

const __dirname = new URL("../assets", import.meta.url).pathname;

export const roseResource = createAudioResource(
  path.join(__dirname, "rosa.ogg"),
  {
    inputType: StreamType.OggOpus,
    metadata: {
      title: "Una rosa",
    },
  }
);

export const zapResource = createAudioResource(
  path.join(__dirname, "me-electrocutaste.ogg"),
  {
    inputType: StreamType.OggOpus,
    metadata: {
      title: "Me electrocutaste",
    },
  }
);
