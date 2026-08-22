import { Alert, Linking, Platform } from 'react-native';
import type { Address, Church } from '../types';

/**
 * Parish contact details used until a church record is loaded from the API.
 * Mirrors what the Contact screen shows.
 */
export const PARISH_FALLBACK = {
  name: "St. Mary's Basilica",
  phone: '+914425341234',
  email: 'office@stmarysbasilica.com',
  address: "St. Mary's Basilica, George Town, Chennai 600001",
};

async function open(url: string, failureMessage: string): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Unavailable', failureMessage);
  }
}

/** Strips spaces/dashes so `tel:` gets a dialable number. */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function callParish(phone?: string): void {
  const number = normalizePhone(phone || PARISH_FALLBACK.phone);
  void open(`tel:${number}`, 'No phone app is available on this device.');
}

export function emailParish(email?: string, subject?: string): void {
  const address = email || PARISH_FALLBACK.email;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  void open(
    `mailto:${address}${query}`,
    'No email app is set up on this device.',
  );
}

/** Formats a church address into a single line for maps/search. */
export function formatAddress(address?: Address): string {
  if (!address) return PARISH_FALLBACK.address;
  return [address.street, address.area, address.city, address.state, address.pincode]
    .filter(Boolean)
    .join(', ');
}

/**
 * Opens the platform maps app at the parish. Uses coordinates when the church
 * record has them, otherwise falls back to a text search on the address.
 */
export function openDirections(church?: Church | null): void {
  const coords = church?.address?.coordinates;
  const label = church?.name ?? PARISH_FALLBACK.name;
  const query = coords
    ? `${coords.lat},${coords.lng}`
    : formatAddress(church?.address);

  const url = coords
    ? Platform.select({
        ios: `maps://?daddr=${query}&q=${encodeURIComponent(label)}`,
        default: `geo:${query}?q=${query}(${encodeURIComponent(label)})`,
      })!
    : Platform.select({
        ios: `maps://?q=${encodeURIComponent(query)}`,
        default: `geo:0,0?q=${encodeURIComponent(query)}`,
      })!;

  Linking.openURL(url).catch(() => {
    // No maps app registered (common on emulators) — fall back to the web.
    void open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      'No maps app is available on this device.',
    );
  });
}
