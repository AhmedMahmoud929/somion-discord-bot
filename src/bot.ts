import { Client, GatewayIntentBits, VoiceState } from "discord.js";
import { API_URL, DISCORD_TOKEN } from "./constants/env";
import axios from "axios";

type Event = "joined" | "left";
interface ILogEntry {
  user: {
    id: string | null;
    name: string | null;
    username: string | null;
    avatar: string | null;
  };
  timestamp: string;
  event: Event;
}

export class SomionBot {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.GuildVoiceStates],
    });

    this.registerEvents();
  }

  private async registerEvents() {
    this.client.once("ready", () => {
      console.log(`✅ Bot is ready: ${this.client.user?.tag}`);
    });

    this.client.on(
      "voiceStateUpdate",
      async (oldState: VoiceState, newState: VoiceState) => {
        const isJoined = !oldState.channelId && newState.channelId;
        const isLeft = oldState.channelId && !newState.channelId;

        if (isJoined || isLeft) {
          const logEntry = this.extractLogEntry(oldState, newState);

          const res = await axios.post(API_URL, logEntry);
          const data = res.data;

          if (res.status === 201) console.log("✅ Logged entry:", data);
          else
            console.log(
              "❌ Failed to send log entry...",
              "Event:",
              logEntry.event,
              "Status:",
              res.status,
              "Data:",
              data
            );
        }
      }
    );
  }

  private extractLogEntry(
    oldState: VoiceState,
    newState: VoiceState
  ): ILogEntry {
    const user = newState.member?.user;
    const event = oldState.channelId ? "left" : "joined";
    const timestamp = new Date().toISOString();

    const logEntry: ILogEntry = {
      user: {
        id: user?.id || null,
        name: user?.globalName || null,
        username: user?.username || null,
        avatar: user?.avatarURL({ extension: "png" }) || null,
      },
      timestamp,
      event,
    };

    return logEntry;
  }

  public start() {
    this.client.login(DISCORD_TOKEN);
  }
}
