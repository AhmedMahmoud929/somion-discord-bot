const getEnv = (key: string) => {
  const value = process.env[key];
  if (value) return value;
  throw new Error(`Missing environment variable: ${key}`);
};

export const DISCORD_TOKEN = getEnv("DISCORD_TOKEN");
export const API_URL = getEnv("API_URL");
