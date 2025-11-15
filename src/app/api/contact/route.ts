import { NextResponse } from "next/server";
import { contactFormSchema } from "@/types/forms";
import type {
  ContactFormErrorDetail,
  ContactFormErrorResponse,
  ContactFormSuccessResponse,
} from "@/types/forms";
import { escapeMarkdown, sendTelegramMessage } from "@/lib/telegram";

type ContactResponse = ContactFormSuccessResponse | ContactFormErrorResponse;

function formatTelegramMessage(data: { name: string; email: string; phone?: string; message: string; service: "legal" | "tech" }) {
  const serviceLabel = data.service === "legal" ? "Legal" : "Tech";
  const parts = [
    "*Новая заявка Uralliance*",
    "",
    `*Имя:* ${escapeMarkdown(data.name)}`,
    `*Email:* ${escapeMarkdown(data.email)}`,
    data.phone ? `*Телефон:* ${escapeMarkdown(data.phone)}` : null,
    `*Направление:* ${serviceLabel}`,
    "",
    "*Сообщение:*",
    escapeMarkdown(data.message),
  ].filter(Boolean);

  return parts.join("\n");
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ContactResponse>(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    const details: ContactFormErrorDetail[] = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json<ContactResponse>(
      { success: false, error: "Validation failed", details },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.honeypot) {
    return NextResponse.json<ContactResponse>(
      { success: false, error: "Spam detected" },
      { status: 400 }
    );
  }

  try {
    await sendTelegramMessage({ text: formatTelegramMessage(data) });
    return NextResponse.json<ContactResponse>({ success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json<ContactResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
