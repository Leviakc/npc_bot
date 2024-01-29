import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config/config.ts";
import { roseResource, zapResource } from "./voice/resources.ts";
import { connectToChannel, playSong, player } from "./voice/voice.ts";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.ClientReady, async () => {
  console.log("Discord.js client is ready");
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
        await message.reply("Playing now!");
      } catch (error) {
        console.error(error);
      }
    } else {
      void message.reply("Join a voice channel then try again!");
    }
    await message.reply("Una rosa");
  }

  if (message.content === "⚡") {
    const channel = message.member?.voice.channel;

    if (channel) {
      try {
        player.play(zapResource);
        const connection = await connectToChannel(channel);

        connection.subscribe(player);
        await message.reply("Playing now!");
      } catch (error) {
        console.error(error);
      }
    } else {
      void message.reply("Join a voice channel then try again!");
    }
    await message.reply("Zap");
  }
});

// Log in to Discord with your client's token
client.login(config.discord_token);
