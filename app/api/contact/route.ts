import { NextResponse } from "next/server";

function clean(value: unknown, fallback = "-") {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value).trim();
}

function hasValue(value: string) {
  return value !== "-" && value !== "" && value !== "null" && value !== "undefined";
}

function addLine(label: string, value: string, suffix = "") {
  if (!hasValue(value)) return "";
  return `${label}: ${value}${suffix}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const webhook = process.env.BITRIX_WEBHOOK_URL;

    if (!telegramBotToken || !telegramChatId) {
      return NextResponse.json(
        { success: false, message: "Telegram env not found" },
        { status: 500 }
      );
    }

    const name = clean(body.name, "Без имени");
    const phone = clean(body.phone, "");
    const cargoType = clean(body.cargoType);
    const direction = clean(body.direction);
    const comment = clean(body.comment);
    const deliveryType = clean(body.deliveryType);
    const country = clean(body.country);
    const weight = clean(body.weight);
    const volume = clean(body.volume);
    const density = clean(body.density);
    const language = clean(body.language);
    const sourceForm = clean(body.sourceForm, "site_form");
    const pageUrl = clean(body.pageUrl);

    const telegramText = [
      "🔥 Новая заявка Nomad Cargo",
      "",
      addLine("👤 Имя", name),
      addLine("📞 Телефон", phone),
      "",
      addLine("📦 Груз", cargoType),
      addLine("🌍 Направление", direction),
      addLine("🚚 Тип доставки", deliveryType),
      addLine("🏁 Страна", country),
      "",
      addLine("⚖️ Вес", weight, " кг"),
      addLine("📐 Объём", volume, " м³"),
      addLine("📊 Плотность", density, " кг/м³"),
      "",
      addLine("📝 Комментарий", comment),
      "",
      addLine("📌 Источник формы", sourceForm),
      addLine("🌐 Язык сайта", language),
      addLine("🔗 Страница", pageUrl),
    ]
      .filter(Boolean)
      .join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramData.ok) {
      console.log("TELEGRAM ERROR:", telegramData);

      return NextResponse.json(
        { success: false, message: "Telegram error", data: telegramData },
        { status: 500 }
      );
    }

    // Bitrix пробуем отдельно, но если он сломан — заявку НЕ ломаем
    if (webhook) {
      try {
        const bitrixComments = telegramText;

        await fetch(`${webhook}/crm.lead.add.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              TITLE: `Nomad Cargo | ${hasValue(direction) ? direction : "Новый лид"}`,
              NAME: name,
              COMMENTS: bitrixComments,
              SOURCE_ID: "WEB",
              PHONE: phone
                ? [
                    {
                      VALUE: phone,
                      VALUE_TYPE: "WORK",
                    },
                  ]
                : undefined,
            },
            params: {
              REGISTER_SONET_EVENT: "Y",
            },
          }),
        });
      } catch (bitrixError) {
        console.log("BITRIX OPTIONAL ERROR:", bitrixError);
      }
    }

    return NextResponse.json({ success: true, telegram: telegramData });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Server error",
      },
      { status: 500 }
    );
  }
}