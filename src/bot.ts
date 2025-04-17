import { Client, GatewayIntentBits, VoiceState } from "discord.js";
import { API_URL, DISCORD_TOKEN } from "./constants/env";
import axios from "axios";

enum User {
  S7S = "1001159676777484308",
  SHE3BO = "1264961784952000563",
  ALAA = "1352026718487056545",
  TAREK = "1276608261872816189",
  KERO = "538763470091583498",
  MAHMOUD = "1352115973108535385",
}

const BLACK_LIST: User[] = [];
const BELOVED_LIST: User[] = [];

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
        const User = newState.member?.id;
        const isUserBlocked = this.blackListUsers(BLACK_LIST, User!);

        if ((isJoined || isLeft) && !isUserBlocked) {
          const logEntry = this.extractLogEntry(oldState, newState);
          // Update the timestamp if the user is a beloved user and left the voice channel to avoid double coun
          if (isLeft) {
            logEntry.timestamp = this.belovedList(
              BELOVED_LIST,
              User!,
              new Date(logEntry.timestamp)
            ).toISOString();
          }

          console.log(logEntry);
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

  private blackListUsers(blockedUsers: User[], userId: string): boolean {
    if (blockedUsers.includes(userId as User)) {
      console.log(`🚫 '${userId}' has been blocked`);
      return true;
    }
    return false;
  }

  private belovedList(
    belovedUsers: User[],
    userId: string,
    leftDate: Date
  ): Date {
    if (belovedUsers.includes(userId as User)) {
      console.log(`❤️ '${userId}' is a beloved user`);
      return new Date(leftDate.getTime() + 2 * 60 * 60 * 1000);
    }
    return leftDate;
  }

  public start() {
    this.client.login(DISCORD_TOKEN);
  }
}
