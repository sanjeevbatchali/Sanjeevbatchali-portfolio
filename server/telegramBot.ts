import { Telegraf, Markup } from "telegraf";
import OpenAI from "openai";
import { buildBlogPost, saveBlogPost, createMarkdownContent, type BlogPost } from "./blogWriter";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

type SessionStep =
  | "idle"
  | "awaiting_topic"
  | "awaiting_category"
  | "awaiting_key_points"
  | "awaiting_tone"
  | "generating"
  | "preview"
  | "awaiting_edit_instructions";

interface UserSession {
  step: SessionStep;
  topic?: string;
  category?: BlogPost["category"];
  keyPoints?: string;
  tone?: string;
  draft?: BlogPost;
}

const sessions = new Map<number, UserSession>();

function getSession(chatId: number): UserSession {
  if (!sessions.has(chatId)) {
    sessions.set(chatId, { step: "idle" });
  }
  return sessions.get(chatId)!;
}

function resetSession(chatId: number): void {
  sessions.set(chatId, { step: "idle" });
}

const UNSPLASH_TOPICS: Record<string, string> = {
  Finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop",
  Career: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop",
  Technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop",
  Consulting: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop",
};

async function generateBlogContent(
  topic: string,
  category: string,
  keyPoints: string,
  tone: string
): Promise<{ title: string; excerpt: string; body: string; imageUrl: string }> {
  const prompt = `You are a professional blog writer for Sanjeev Batchali, a finance professional with expertise in corporate restructuring, investment banking, and financial advisory.

Write a comprehensive blog post with the following details:
- Topic: ${topic}
- Category: ${category}
- Key points to cover: ${keyPoints}
- Tone: ${tone}

Respond in the following JSON format:
{
  "title": "The blog post title",
  "excerpt": "A 1-2 sentence summary/excerpt for the blog listing page (max 200 characters)",
  "body": "The full markdown body of the blog post (use ## for section headers, include an introduction, multiple sections, and a conclusion. Make it detailed, at least 800 words. Use proper markdown formatting.)",
  "imageSearchTerm": "A short search term for finding a relevant Unsplash cover image"
}

Important:
- Write in first person where appropriate
- Include practical insights and real-world examples
- Use professional language appropriate for the ${category} category
- Structure with clear headings and sections using markdown ## headers
- The body MUST start with the title as an H1 header (# Title) on the first line, followed by the content. This matches the existing blog format.
- Make the excerpt compelling and concise`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_completion_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(content);

  let body = parsed.body || "";
  if (body && !body.trimStart().startsWith("# ")) {
    body = `# ${parsed.title || topic}\n\n${body}`;
  }

  const imageUrl = UNSPLASH_TOPICS[category] || UNSPLASH_TOPICS["Technology"];

  return {
    title: parsed.title || topic,
    excerpt: parsed.excerpt || `A blog post about ${topic}`,
    body: parsed.body || "",
    imageUrl,
  };
}

async function regenerateBlogContent(
  currentDraft: BlogPost,
  editInstructions: string
): Promise<{ title: string; excerpt: string; body: string }> {
  const prompt = `You are a professional blog writer. Here is the current blog post draft:

Title: ${currentDraft.title}
Excerpt: ${currentDraft.excerpt}
Category: ${currentDraft.category}

Body:
${currentDraft.body}

The author wants the following changes:
${editInstructions}

Please provide the updated blog post in the following JSON format:
{
  "title": "The updated title (keep same if no title change requested)",
  "excerpt": "The updated excerpt (keep same if no excerpt change requested)",
  "body": "The updated full markdown body"
}

Important:
- Only make the changes requested, keep everything else the same
- Maintain the same markdown formatting
- The body should NOT include the title as an H1`;

  const response = await openai.chat.completions.create({
    model: "gpt-5.2",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_completion_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content);
}

function formatPreviewMessage(draft: BlogPost): string {
  const bodyPreview = draft.body.substring(0, 800);
  const truncated = draft.body.length > 800 ? "\n\n... (truncated for preview)" : "";

  return [
    `*Blog Post Preview*`,
    ``,
    `*Title:* ${escapeMarkdown(draft.title)}`,
    `*Category:* ${draft.category}`,
    `*Date:* ${draft.date}`,
    `*Read Time:* ${draft.readTime} min`,
    `*Slug:* ${draft.slug}`,
    ``,
    `*Excerpt:*`,
    escapeMarkdown(draft.excerpt),
    ``,
    `*Body Preview:*`,
    escapeMarkdown(bodyPreview) + truncated,
    ``,
    `\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014`,
    `What would you like to do?`,
    `\u2022 Type *publish* to save and publish this blog post`,
    `\u2022 Type *edit:* followed by your changes \\(e\\.g\\. "edit: make it shorter"\\)`,
    `\u2022 Type *cancel* to discard this draft`,
  ].join("\n");
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export function startTelegramBot(): Telegraf | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.log("[Telegram Bot] No TELEGRAM_BOT_TOKEN found. Bot is disabled.");
    return null;
  }

  const bot = new Telegraf(token);

  bot.command("start", (ctx) => {
    const chatId = ctx.chat.id;
    resetSession(chatId);
    ctx.reply(
      "Welcome to the Blog Writer Bot! I can help you write and publish blog posts to your website.\n\n" +
      "Commands:\n" +
      "/newblog - Start writing a new blog post\n" +
      "/cancel - Cancel the current blog post\n" +
      "/help - Show this help message"
    );
  });

  bot.command("help", (ctx) => {
    ctx.reply(
      "Blog Writer Bot Help:\n\n" +
      "/newblog - Start creating a new blog post. I'll ask you a few questions and then generate a draft using AI.\n" +
      "/cancel - Cancel the current blog creation process.\n\n" +
      "After generating a draft, you can:\n" +
      "- Type 'publish' to save it to your website\n" +
      "- Type 'edit: [your instructions]' to request changes\n" +
      "- Type 'cancel' to discard the draft"
    );
  });

  bot.command("newblog", (ctx) => {
    const chatId = ctx.chat.id;
    const session = getSession(chatId);
    session.step = "awaiting_topic";
    ctx.reply("Great! Let's create a new blog post.\n\nWhat topic would you like to write about?");
  });

  bot.command("cancel", (ctx) => {
    const chatId = ctx.chat.id;
    resetSession(chatId);
    ctx.reply("Blog creation cancelled. Send /newblog to start again.");
  });

  bot.on("text", async (ctx) => {
    const chatId = ctx.chat.id;
    const session = getSession(chatId);
    const text = ctx.message.text;

    if (text.startsWith("/")) return;

    switch (session.step) {
      case "idle":
        ctx.reply("Send /newblog to start creating a new blog post, or /help for more information.");
        break;

      case "awaiting_topic":
        session.topic = text;
        session.step = "awaiting_category";
        ctx.reply(
          "Got it! What category should this blog post be in?\n\n" +
          "Choose one:\n" +
          "1. Finance\n" +
          "2. Career\n" +
          "3. Technology\n" +
          "4. Consulting\n\n" +
          "Just type the category name or number."
        );
        break;

      case "awaiting_category": {
        const categoryMap: Record<string, BlogPost["category"]> = {
          "1": "Finance",
          "2": "Career",
          "3": "Technology",
          "4": "Consulting",
          finance: "Finance",
          career: "Career",
          technology: "Technology",
          consulting: "Consulting",
        };
        const cat = categoryMap[text.toLowerCase().trim()];
        if (!cat) {
          ctx.reply("Please choose a valid category: Finance, Career, Technology, or Consulting (or 1-4).");
          return;
        }
        session.category = cat;
        session.step = "awaiting_key_points";
        ctx.reply(
          "What key points or aspects should the blog cover? Share any specific ideas, data, or angles you want included."
        );
        break;
      }

      case "awaiting_key_points":
        session.keyPoints = text;
        session.step = "awaiting_tone";
        ctx.reply(
          "What tone would you prefer?\n\n" +
          "Examples:\n" +
          "- Professional & analytical\n" +
          "- Casual & conversational\n" +
          "- Technical & detailed\n" +
          "- Informative & educational\n\n" +
          "Or describe your preferred tone."
        );
        break;

      case "awaiting_tone":
        session.tone = text;
        session.step = "generating";
        ctx.reply("Generating your blog post... This may take a moment.");

        try {
          const result = await generateBlogContent(
            session.topic!,
            session.category!,
            session.keyPoints!,
            session.tone!
          );

          const draft = buildBlogPost(
            result.title,
            session.category!,
            result.excerpt,
            result.body,
            result.imageUrl
          );

          session.draft = draft;
          session.step = "preview";

          const previewMsg = formatPreviewMessage(draft);
          try {
            await ctx.reply(previewMsg, { parse_mode: "MarkdownV2" });
          } catch {
            await ctx.reply(
              `Blog Post Preview\n\n` +
              `Title: ${draft.title}\n` +
              `Category: ${draft.category}\n` +
              `Date: ${draft.date}\n` +
              `Read Time: ${draft.readTime} min\n\n` +
              `Excerpt:\n${draft.excerpt}\n\n` +
              `Body Preview:\n${draft.body.substring(0, 800)}${draft.body.length > 800 ? "\n\n... (truncated)" : ""}\n\n` +
              `----------\n` +
              `What would you like to do?\n` +
              `- Type 'publish' to save and publish\n` +
              `- Type 'edit: [instructions]' to request changes\n` +
              `- Type 'cancel' to discard`
            );
          }
        } catch (error) {
          console.error("[Telegram Bot] Error generating blog:", error);
          session.step = "idle";
          ctx.reply("Sorry, there was an error generating the blog post. Please try again with /newblog.");
        }
        break;

      case "preview": {
        const lowerText = text.toLowerCase().trim();

        if (lowerText === "publish") {
          try {
            const filePath = saveBlogPost(session.draft!);
            ctx.reply(
              `Blog post published successfully!\n\n` +
              `Title: ${session.draft!.title}\n` +
              `File: ${filePath}\n\n` +
              `The post will appear on your website after the next build/deploy.\n\n` +
              `Send /newblog to create another post.`
            );
            resetSession(chatId);
          } catch (error) {
            console.error("[Telegram Bot] Error saving blog:", error);
            ctx.reply("Sorry, there was an error saving the blog post. Please try again.");
          }
        } else if (lowerText === "cancel") {
          resetSession(chatId);
          ctx.reply("Draft discarded. Send /newblog to start again.");
        } else if (lowerText.startsWith("edit:") || lowerText.startsWith("edit ")) {
          const instructions = text.substring(text.indexOf(":") + 1).trim() || text.substring(5).trim();
          if (!instructions) {
            ctx.reply("Please provide edit instructions. Example: 'edit: make the introduction shorter and add more data'");
            return;
          }
          session.step = "generating";
          ctx.reply("Making changes to your blog post...");

          try {
            const updated = await regenerateBlogContent(session.draft!, instructions);
            session.draft = buildBlogPost(
              updated.title || session.draft!.title,
              session.draft!.category,
              updated.excerpt || session.draft!.excerpt,
              updated.body || session.draft!.body,
              session.draft!.imageUrl
            );
            session.step = "preview";

            const previewMsg = formatPreviewMessage(session.draft);
            try {
              await ctx.reply(previewMsg, { parse_mode: "MarkdownV2" });
            } catch {
              await ctx.reply(
                `Updated Blog Post Preview\n\n` +
                `Title: ${session.draft.title}\n` +
                `Category: ${session.draft.category}\n` +
                `Date: ${session.draft.date}\n` +
                `Read Time: ${session.draft.readTime} min\n\n` +
                `Excerpt:\n${session.draft.excerpt}\n\n` +
                `Body Preview:\n${session.draft.body.substring(0, 800)}${session.draft.body.length > 800 ? "\n\n... (truncated)" : ""}\n\n` +
                `----------\n` +
                `What would you like to do?\n` +
                `- Type 'publish' to save and publish\n` +
                `- Type 'edit: [instructions]' to request changes\n` +
                `- Type 'cancel' to discard`
              );
            }
          } catch (error) {
            console.error("[Telegram Bot] Error editing blog:", error);
            session.step = "preview";
            ctx.reply("Sorry, there was an error making changes. You can try again with different edit instructions, or type 'publish' to publish as-is.");
          }
        } else {
          ctx.reply(
            "Please choose an action:\n" +
            "- Type 'publish' to save and publish\n" +
            "- Type 'edit: [your instructions]' to request changes\n" +
            "- Type 'cancel' to discard"
          );
        }
        break;
      }

      default:
        ctx.reply("Something went wrong. Send /newblog to start over.");
        resetSession(chatId);
    }
  });

  bot.catch((err: any) => {
    console.error("[Telegram Bot] Error:", err);
  });

  bot.launch({ dropPendingUpdates: true }).then(() => {
    console.log("[Telegram Bot] Bot started successfully!");
  }).catch((err) => {
    console.error("[Telegram Bot] Failed to start:", err);
  });

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return bot;
}
