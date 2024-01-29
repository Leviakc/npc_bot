import {
  AudioPlayerStatus,
  AudioResource,
  VoiceConnectionStatus,
  createAudioPlayer,
  entersState,
  joinVoiceChannel,
} from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";
import { createDiscordJSAdapter } from "../adapter.ts";

export const player = createAudioPlayer();

export const playSong = (resource: AudioResource) => {
  player.play(resource);

  return entersState(player, AudioPlayerStatus.Playing, 5000);
};

export const connectToChannel = async (channel: VoiceBasedChannel) => {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: createDiscordJSAdapter(channel),
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
};
