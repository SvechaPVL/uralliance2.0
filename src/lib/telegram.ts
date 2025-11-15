import "server-only";

interface SendTelegramMessageOptions {
  text: string;
  parseMode?: "Markdown" | "MarkdownV2" | "HTML";
  chatId?: string;
}

const TELEGRAM_API_BASE = "https://api.telegram.org";

/**
 * Escape characters that have a special meaning in Telegram Markdown.
 * Prevents user input from breaking formatting or injecting markup.
 */
export function escapeMarkdown(text: string) {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

/**
 * Send a message via Telegram Bot API using credentials from environment variables.
 * Throws if TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not configured.
 */
export async function sendTelegramMessage({
  text,
  parseMode = "Markdown",
  chatId,
}: SendTelegramMessageOptions) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !targetChatId) {
    throw new Error("Telegram credentials are not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.");
  }

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: targetChatId,
      text,
      parse_mode: parseMode,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to send Telegram message");
  }

  return response.json();
}
