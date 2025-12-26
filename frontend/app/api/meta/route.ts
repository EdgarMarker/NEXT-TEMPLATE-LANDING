import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { eventName, eventId, url, pixelId, testCode, externalId, fbc, fbp } =
      body;

    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

    if (!ACCESS_TOKEN || !pixelId) {
      console.error("Meta CAPI: Faltan configuraciones (Token o Pixel ID)");
      return NextResponse.json(
        { error: "Configuración incompleta" },
        { status: 400 }
      );
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: url,
          event_id: eventId,
          user_data: {
            client_ip_address:
              request.headers.get("x-forwarded-for")?.split(",")[0] ||
              "127.0.0.1",
            client_user_agent: request.headers.get("user-agent"),
            external_id: externalId,
            fbc: fbc,
            fbp: fbp,
          },
        },
      ],
      ...(testCode && { test_event_code: testCode }),
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (result.error) {
      console.log(
        "❌ DETALLE DEL ERROR DE META:",
        JSON.stringify(result.error, null, 2)
      );
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    console.log("🏁 RESPUESTA DE META:", result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Meta CAPI Catch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
