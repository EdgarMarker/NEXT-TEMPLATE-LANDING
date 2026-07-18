import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/app/common/lib/resend/resend";
import { ContactEmail } from "@/app/common/components/mail/ContactEmail";

const resendContactSchema = z.object({
  firstname: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  lastname: z.string().trim().min(2, "El apellido debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Por favor ingresa un email válido").max(254),
  phone: z.string().trim().min(10, "El teléfono debe tener al menos 10 dígitos").max(20),
  city: z.string().trim().min(2, "La ciudad debe tener al menos 2 caracteres").max(100),
  interest: z.enum(["option_1", "option_2", "option_3"], "Por favor selecciona una opción"),
  message: z.string().trim().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = resendContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    const { firstname, lastname, email, phone, city, interest, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: `Contacto <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.RESEND_TO_EMAIL as string],
      replyTo: email,
      subject: `Nuevo contacto: ${firstname} ${lastname}`,
      react: ContactEmail({ firstname, lastname, email, phone, city, interest, message }),
    });

    if (error) {
      console.error("[Resend] Error al enviar:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Resend] Excepción en route:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
