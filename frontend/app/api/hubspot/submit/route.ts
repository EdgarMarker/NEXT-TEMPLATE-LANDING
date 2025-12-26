import { type NextRequest, NextResponse } from "next/server";
import { FORM_INSTANCES } from "@/app/common/utils/helper-hubspot";

type InstanceMap = {
  id: string;
  formid?: string | undefined;
  portalid?: string | undefined;
};

const INSTANCES: InstanceMap[] = [
  {
    id: FORM_INSTANCES.CONTACT.id,
    formid: process.env.HUBSPOT_FORM_ID,
    portalid: process.env.HUBSPOT_PORTAL_ID,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    // honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const formId = (body._formId ?? body.formId) as string | undefined;
    if (!formId) {
      return NextResponse.json(
        { success: false, error: "Missing formId (_formId or formId)" },
        { status: 400 }
      );
    }

    // find form config (for validation & fields)
    const availableForms = [FORM_INSTANCES.CONTACT];
    const formConfig = availableForms.find((f) => f.id === formId);
    if (!formConfig) {
      return NextResponse.json(
        { success: false, error: `Unknown form id: ${formId}` },
        { status: 400 }
      );
    }

    // build object with expected keys
    const dataToValidate: Record<string, unknown> = {};
    for (const fld of formConfig.fields) {
      dataToValidate[fld.name] =
        body[fld.name] ?? body[fld.hubspotName] ?? null;
    }

    // validate
    let validated: Record<string, unknown>;
    try {
      validated = formConfig.schema.parse(dataToValidate) as Record<
        string,
        unknown
      >;
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: (err as any).issues ?? err,
          payload: dataToValidate,
        },
        { status: 422 }
      );
    }

    // find mapping for env-provided portal/form ids
    const mapping = INSTANCES.find((m) => m.id === formId);
    if (!mapping || !mapping.portalid || !mapping.formid) {
      return NextResponse.json(
        {
          success: false,
          error: `No portal/form mapping for form id: ${formId}`,
        },
        { status: 400 }
      );
    }

    // build fields array for HubSpot Forms API
    const fields = formConfig.fields
      .map((f) => {
        const v = validated[f.name];
        if (v === undefined || v === null || String(v).trim() === "")
          return null;
        return { name: f.hubspotName ?? f.name, value: String(v) };
      })
      .filter(Boolean);

    const hutk = request.cookies.get("hubspotutk")?.value;
    const context: Record<string, unknown> = {
      ...(hutk ? { hutk } : {}),
      pageUri: (body.pageUri as string) ?? "",
      pageName: (body.pageName as string) ?? "",
    };

    const payload = { fields, context };

    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${mapping.portalid}/${mapping.formid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const hubResp = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "HubSpot Forms error",
          hubspotResponse: hubResp,
          payload,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, hubspotResponse: hubResp });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
