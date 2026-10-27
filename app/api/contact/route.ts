import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/*
  Lead capture. Set CONTACT_WEBHOOK_URL (Zapier, Make, Slack, Google Apps Script,
  or your CRM's inbound webhook) to forward each enquiry as JSON.
  Without it, development logs the lead and production refuses, so leads are never silently dropped.
*/
export async function POST(req: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data could not be read. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (body.website) return NextResponse.json({ ok: true });

  const input: ContactInput = {
    name: String(body.name ?? "").slice(0, 200),
    company: String(body.company ?? "").slice(0, 200),
    email: String(body.email ?? "").slice(0, 200),
    phone: String(body.phone ?? "").slice(0, 40),
    city: String(body.city ?? ""),
    fleetSize: String(body.fleetSize ?? ""),
    vehicles: String(body.vehicles ?? ""),
    message: String(body.message ?? "").slice(0, 2000),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Some fields need attention.", errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set. Lead received in development:", input);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Our form is not accepting messages right now. Email info@ezyev.in and we will reply from there." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: "ezyev.in/contact", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] forwarding failed", err);
    return NextResponse.json(
      { error: "We could not send your message. Try again in a minute, or email info@ezyev.in." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
