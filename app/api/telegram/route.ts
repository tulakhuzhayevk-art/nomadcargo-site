import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhook = process.env.BITRIX_WEBHOOK_URL;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!webhook || !telegramBotToken) {
      return NextResponse.json({ success: false });
    }

    const callback = body.callback_query;

    if (!callback) {
      return NextResponse.json({ success: true });
    }

    const callbackData = callback.data || "";
    const callbackId = callback.id;
    const chatId = callback.message?.chat?.id;
    const messageId = callback.message?.message_id;

    if (!callbackData.startsWith("take_lead_")) {
      return NextResponse.json({ success: true });
    }

    const leadId = callbackData.replace("take_lead_", "");

    await fetch(`${webhook}/crm.lead.update.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: leadId,
        fields: {
          STATUS_ID: "IN_PROCESS",
          COMMENTS: `Лид взят в работу через Telegram.\nLead ID: ${leadId}`,
        },
      }),
    });

    await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/answerCallbackQuery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            callback_query_id: callbackId,
            text: "Лид взят в работу ✅",
            show_alert: false,
          }),
        }
      );

    if (chatId && messageId) {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/editMessageReplyMarkup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✅ Уже в работе",
                  callback_data: `already_taken_${leadId}`,
                },
              ],
            ],
          },
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TELEGRAM WEBHOOK ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}