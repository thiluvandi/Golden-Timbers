// Placeholder contact details — swap for the real business number, email, address and GSTIN before launch.
export const CONTACT = {
  companyName: "Golden Timbers",
  tagline: "Timber Yard & Sawmill",
  whatsappNumber: "919845012345", // placeholder — country code + number, no symbols
  whatsappDisplay: "+91 98450 12345",
  phoneDisplay: "+91 80 2672 4310",
  phoneHref: "+918026724310",
  email: "trade@goldentimbers.in",
  addressLines: [
    "Golden Timbers Yard",
    "Mysore Road, New Timberyard Layout",
    "Bengaluru, Karnataka 560026",
  ],
  hours: [
    { days: "Monday – Saturday", time: "8:30 AM – 7:00 PM" },
    { days: "Sunday", time: "9:00 AM – 2:00 PM" },
  ],
  gstin: "29XXXXX0000X1Z5",
  since: 1985,
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encoded}`;
}
