/* Shared between the contact form and the API route so both validate the same way. */

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  fleetSize: string;
  vehicles: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const cities = ["Pune", "Mumbai", "Nagpur", "Another city"] as const;
export const fleetSizes = ["1 to 20 vehicles", "21 to 100 vehicles", "101 to 500 vehicles", "More than 500 vehicles"] as const;
export const vehicleTypes = ["Two wheelers", "Three wheelers", "Both"] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Indian mobile numbers, with or without +91 / 0 prefix and spaces
const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = "Enter your name.";
  if (!input.company.trim()) errors.company = "Enter your company name.";
  if (!input.email.trim()) errors.email = "Enter your work email.";
  else if (!EMAIL.test(input.email.trim())) errors.email = "That email looks incomplete. Check it and try again.";
  const phone = input.phone.replace(/[\s()]/g, "");
  if (!phone) errors.phone = "Enter a phone number so our team can call you.";
  else if (!PHONE.test(phone)) errors.phone = "Enter a 10 digit Indian mobile number.";
  if (!cities.includes(input.city as (typeof cities)[number])) errors.city = "Choose the city your fleet runs in.";
  if (!fleetSizes.includes(input.fleetSize as (typeof fleetSizes)[number])) errors.fleetSize = "Choose your fleet size.";
  if (!vehicleTypes.includes(input.vehicles as (typeof vehicleTypes)[number])) errors.vehicles = "Choose the vehicles you run.";
  if (input.message.length > 2000) errors.message = "Keep the message under 2,000 characters.";
  return errors;
}
