import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config/config.ts";
// import { roseResource, zapResource } from "./voice/resources.ts";
import { connectToChannel, playSong, player } from "./voice/voice.ts";
import { createResource } from "./voice/resources.ts";
// import { AudioPlayerStatus } from "@discordjs/voice";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

let roseResource = createResource("rosa.ogg", "Una rosa");

let zapResource = createResource("me-electrocutaste.ogg", "Me electrocutaste");

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.ClientReady, async () => {
  try {
    await playSong(roseResource);
    console.log("Song is ready to play!");
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (!message.guild) return;

  if (message.author.bot) return;

  if (message.content === "🌹") {
    const channel = message.member?.voice.channel;

    if (channel) {
      try {
        player.play(roseResource);
        const connection = await connectToChannel(channel);
        connection.subscribe(player);
        roseResource = createResource("rosa.ogg", "Una rosa");
        await message.reply("Gracias por tu rosa!");
      } catch (error) {
        console.error(error);
      }
    } else {
      void message.reply("Join a voice channel then try again!");
    }
  }

  if (message.content === "⚡") {
    const channel = message.member?.voice.channel;

    if (channel) {
      try {
        player.play(zapResource);
        const connection = await connectToChannel(channel);

        connection.subscribe(player);
        await message.reply("¡Me electrocutaste!");

        zapResource = createResource(
          "me-electrocutaste.ogg",
          "Me electrocutaste"
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      void message.reply("Join a voice channel then try again!");
    }
  }
});

player.on("error", (error) => {
  console.error(error);
});

// Log in to Discord with your client's token
client.login(config.discord_token);
