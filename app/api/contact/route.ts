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

    const webhook = process.env.BITRIX_WEBHOOK_URL;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!webhook) {
      return NextResponse.json(
        { success: false, message: "Webhook not found" },
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
    const utmSource = clean(body.utmSource);
    const utmMedium = clean(body.utmMedium);
    const utmCampaign = clean(body.utmCampaign);

    const isCalculatorLead =
      hasValue(deliveryType) || hasValue(weight) || hasValue(volume) || hasValue(density);

    const leadTitle = isCalculatorLead
      ? `Nomad Cargo | ${deliveryType} | ${hasValue(direction) ? direction : country}${
          hasValue(weight) ? ` | ${weight} кг` : ""
        }`
      : `Nomad Cargo | ${hasValue(direction) ? direction : "Новый лид"} | Новый лид`;

    const comments = [
      "🔥 ЗАЯВКА NOMAD CARGO",
      "",
      addLine("👤 Имя", name),
      addLine("📞 Телефон", phone),
      "",
      addLine("📦 Тип груза", cargoType),
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
      "",
      addLine("UTM Source", utmSource),
      addLine("UTM Medium", utmMedium),
      addLine("UTM Campaign", utmCampaign),
    ]
      .filter(Boolean)
      .join("\n");

    const fields: Record<string, unknown> = {
      TITLE: leadTitle,
      NAME: name,
      COMMENTS: comments,
      SOURCE_ID: "WEB",
    };

    if (phone) {
      fields.PHONE = [
        {
          VALUE: phone,
          VALUE_TYPE: "WORK",
        },
      ];
    }

    const payload = {
      fields,
      params: {
        REGISTER_SONET_EVENT: "Y",
      },
    };

    const bitrixResponse = await fetch(`${webhook}/crm.lead.add.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const bitrixData = await bitrixResponse.json();

    if (!bitrixResponse.ok || bitrixData.error) {
      return NextResponse.json(
        { success: false, message: "Bitrix error", data: bitrixData },
        { status: 500 }
      );
    }

    if (telegramBotToken && telegramChatId) {
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
        `🔗 Bitrix lead ID: ${bitrixData.result}`,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✅ Взять в работу",
                  callback_data: `take_lead_${bitrixData.result}`,
                },
              ],
            ],
          },
        }),
      });
    }

    return NextResponse.json({ success: true, data: bitrixData });
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