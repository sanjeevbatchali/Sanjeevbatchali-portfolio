import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { startTelegramBot } from "./telegramBot";

let botStarted = false;

export async function registerRoutes(app: Express): Promise<Server> {
  if (!botStarted) {
    startTelegramBot();
    botStarted = true;
  }

  app.get("/api/bot-status", (_req, res) => {
    const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
    res.json({
      status: hasToken ? "running" : "not_configured",
      message: hasToken
        ? "Telegram bot is running. Send /newblog to your bot to start writing."
        : "TELEGRAM_BOT_TOKEN is not set. Please add it to your secrets.",
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
