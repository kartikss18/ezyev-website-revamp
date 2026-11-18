"use client";

import { useRef, useState, type FormEvent } from "react";
import { RollText } from "./RollText";
import {
  cities,
  fleetSizes,
  validateContact,
  vehicleTypes,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";

const empty: ContactInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  fleetSize: "",
  vehicles: "",
  message: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "failed"; message: string };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof ContactInput) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };

  const blur = (key: keyof ContactInput) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus({
          kind: "failed",
          message: data.error ?? "We could not send your message. Email info@ezyev.in instead.",
        });
        return;
      }
      setStatus({ kind: "sent", email: values.email.trim() });
    } catch {
      setStatus({
        kind: "failed",
        message: "Your message did not send because the connection dropped. Check your connection and try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="panel-well flex flex-col items-start p-8">
        <span className="font-mono text-xs tracking-wider text-accent uppercase">Enquiry logged</span>
        <h3 className="mt-3 text-2xl font-light tracking-tight text-fg">
          Thanks, {values.name.trim().split(" ")[0]}. We have your fleet details.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Our operations team will review your routes and reply to {status.email} with next steps and a monthly plan outline.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setTouched({});
            setErrors({});
            setStatus({ kind: "idle" });
          }}
          className="btn-secondary mt-6"
        >
          <RollText text="Send another enquiry" />
        </button>
      </div>
    );
  }

  const show = (k: keyof ContactInput) => (touched[k] ? errors[k] : undefined);
  const sending = status.kind === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={show("name")}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="field"
            placeholder="Rohan Kulkarni"
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            aria-invalid={!!show("name")}
            aria-describedby={show("name") ? "name-error" : undefined}
            required
          />
        </Field>
        <Field id="company" label="Company" error={show("company")}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className="field"
            placeholder="Deccan Express Logistics"
            value={values.company}
            onChange={set("company")}
            onBlur={blur("company")}
            aria-invalid={!!show("company")}
            aria-describedby={show("company") ? "company-error" : undefined}
            required
          />
        </Field>
        <Field id="email" label="Work email" error={show("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field"
            placeholder="rohan@deccanexpress.in"
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            aria-invalid={!!show("email")}
            aria-describedby={show("email") ? "email-error" : undefined}
            required
          />
        </Field>
        <Field id="phone" label="Mobile number" error={show("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="field"
            placeholder="98220 41736"
            value={values.phone}
            onChange={set("phone")}
            onBlur={blur("phone")}
            aria-invalid={!!show("phone")}
            aria-describedby={show("phone") ? "phone-error" : undefined}
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="city" label="City" error={show("city")}>
          <select
            id="city"
            name="city"
            className="field"
            value={values.city}
            onChange={set("city")}
            onBlur={blur("city")}
            aria-invalid={!!show("city")}
            aria-describedby={show("city") ? "city-error" : undefined}
            required
          >
            <option value="" disabled>
              Choose a city
            </option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="fleetSize" label="Fleet size" error={show("fleetSize")}>
          <select
            id="fleetSize"
            name="fleetSize"
            className="field"
            value={values.fleetSize}
            onChange={set("fleetSize")}
            onBlur={blur("fleetSize")}
            aria-invalid={!!show("fleetSize")}
            aria-describedby={show("fleetSize") ? "fleetSize-error" : undefined}
            required
          >
            <option value="" disabled>
              Choose a size
            </option>
            {fleetSizes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="vehicles" label="Vehicles" error={show("vehicles")}>
          <select
            id="vehicles"
            name="vehicles"
            className="field"
            value={values.vehicles}
            onChange={set("vehicles")}
            onBlur={blur("vehicles")}
            aria-invalid={!!show("vehicles")}
            aria-describedby={show("vehicles") ? "vehicles-error" : undefined}
            required
          >
            <option value="" disabled>
              Choose a type
            </option>
            {vehicleTypes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Routes and daily kilometres" hint="Optional" error={show("message")}>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field min-h-[112px] resize-y"
          placeholder="Around 60 riders in Hadapsar and Kharadi, about 90 km a day each."
          value={values.message}
          onChange={set("message")}
          onBlur={blur("message")}
          aria-invalid={!!show("message")}
          aria-describedby={show("message") ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "failed" && (
        <p role="alert" className="rounded-md border border-danger/40 bg-raised px-4 py-3 text-sm text-danger">
          {status.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn-primary" disabled={sending}>
          <RollText text={sending ? "Sending fleet details..." : "Partner with us"} />
        </button>
        <p className="font-mono text-xs text-subtle">Replies from info@ezyev.in</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{label}</span>
        {hint && <span className="text-[11px] text-subtle">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
