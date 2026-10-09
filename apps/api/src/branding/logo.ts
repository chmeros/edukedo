/**
 * Logo-Upload für Unternehmensbranding und Sponsoren (Entscheidung 09.10.2026, siehe Entwicklungsplan Iteration 23 und
 * Architekturplanung Abschnitt 13). Dieses Modul prüft eine hochgeladene Bilddatei ausschließlich anhand ihrer Bytes; es
 * hat bewusst keine Abhängigkeit zu Datenbank oder Umgebung und ist deshalb ohne Infrastruktur testbar.
 *
 * Erlaubt sind PNG, JPEG und WebP bis 200 KB und 1024 x 1024 Pixel. SVG ist ausgeschlossen, weil es Skripte und Verweise auf
 * Fremdserver enthalten kann. Der Inhaltstyp wird nie aus Angaben des Absenders übernommen, sondern aus den ersten Bytes
 * bestimmt; die Datei muss außerdem Aufbau und Ende des jeweiligen Formats einhalten (PNG mit IEND-Block, JPEG mit
 * EOI-Marke, WebP mit stimmiger RIFF-Länge). Das Bild wird nicht neu kodiert; eingebettete Metadaten (z. B. EXIF) bleiben
 * erhalten, deshalb weist die Oberfläche darauf hin, dass das Logo öffentlich sichtbar ist.
 */

export const MAX_LOGO_BYTES = 200 * 1024;
export const MIN_LOGO_SIDE = 16;
export const MAX_LOGO_SIDE = 1024;

export type LogoContentType = "image/png" | "image/jpeg" | "image/webp";

export interface ValidatedLogo {
  contentType: LogoContentType;
  data: Buffer;
  width: number;
  height: number;
}

/** Fehler mit einem Text, der den Lernenden/Verwaltenden direkt angezeigt werden darf. */
export class LogoError extends Error {}

const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/;

/** Strenge Base64-Dekodierung: reines Base64 ohne Zeilenumbrüche und ohne "data:"-Präfix; die Größe wird vorab begrenzt. */
export function decodeLogoBase64(input: string): Buffer {
  const maxEncodedLength = Math.ceil((MAX_LOGO_BYTES * 4) / 3) + 4;
  if (input.length > maxEncodedLength) {
    throw new LogoError(`Das Logo ist zu groß (höchstens ${Math.round(MAX_LOGO_BYTES / 1024)} KB).`);
  }
  if (input.length === 0 || input.length % 4 !== 0 || !BASE64_PATTERN.test(input)) {
    throw new LogoError("Die Bilddaten sind ungültig.");
  }
  return Buffer.from(input, "base64");
}

function isPng(data: Buffer): boolean {
  return data.length > 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
}

function isJpeg(data: Buffer): boolean {
  return data.length > 4 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
}

function isWebp(data: Buffer): boolean {
  return data.length > 16 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP";
}

function parsePng(data: Buffer): { width: number; height: number } {
  // Erster Block muss IHDR sein (Länge 13), der letzte der IEND-Block samt festem CRC.
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
  if (data.length < 33 || data.readUInt32BE(8) !== 13 || data.toString("ascii", 12, 16) !== "IHDR") {
    throw new LogoError("Die PNG-Datei ist beschädigt.");
  }
  if (!data.subarray(data.length - 12).equals(iend)) {
    throw new LogoError("Die PNG-Datei ist unvollständig oder enthält zusätzliche Daten.");
  }
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

function parseJpeg(data: Buffer): { width: number; height: number } {
  if (data[data.length - 2] !== 0xff || data[data.length - 1] !== 0xd9) {
    throw new LogoError("Die JPEG-Datei ist unvollständig oder enthält zusätzliche Daten.");
  }
  let i = 2;
  while (i + 4 <= data.length) {
    if (data[i] !== 0xff) {
      throw new LogoError("Die JPEG-Datei ist beschädigt.");
    }
    while (data[i] === 0xff && i + 1 < data.length) i++; // Füllbytes überspringen
    const marker = data[i]!;
    i++;
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue; // Marken ohne Länge
    }
    if (i + 2 > data.length) break;
    const segmentLength = data.readUInt16BE(i);
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      if (i + 7 > data.length) break;
      return { height: data.readUInt16BE(i + 3), width: data.readUInt16BE(i + 5) };
    }
    if (marker === 0xda) break; // Bilddaten beginnen, ohne dass Maße gefunden wurden
    i += segmentLength;
  }
  throw new LogoError("Die Maße der JPEG-Datei konnten nicht gelesen werden.");
}

function parseWebp(data: Buffer): { width: number; height: number } {
  if (data.readUInt32LE(4) !== data.length - 8) {
    throw new LogoError("Die WebP-Datei ist unvollständig oder enthält zusätzliche Daten.");
  }
  const chunk = data.toString("ascii", 12, 16);
  if (chunk === "VP8X" && data.length >= 30) {
    return { width: data.readUIntLE(24, 3) + 1, height: data.readUIntLE(27, 3) + 1 };
  }
  if (chunk === "VP8L" && data.length >= 25 && data[20] === 0x2f) {
    const bits = data.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8 " && data.length >= 30 && data[23] === 0x9d && data[24] === 0x01 && data[25] === 0x2a) {
    return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
  }
  throw new LogoError("Die WebP-Datei ist beschädigt oder hat ein nicht unterstütztes Format.");
}

/** Prüft die Bytes einer Bilddatei und liefert Inhaltstyp und Maße; wirft sonst einen `LogoError`. */
export function validateLogoBytes(data: Buffer): ValidatedLogo {
  if (data.length === 0) {
    throw new LogoError("Die Bilddatei ist leer.");
  }
  if (data.length > MAX_LOGO_BYTES) {
    throw new LogoError(`Das Logo ist zu groß (höchstens ${Math.round(MAX_LOGO_BYTES / 1024)} KB).`);
  }

  let contentType: LogoContentType;
  let size: { width: number; height: number };
  if (isPng(data)) {
    contentType = "image/png";
    size = parsePng(data);
  } else if (isJpeg(data)) {
    contentType = "image/jpeg";
    size = parseJpeg(data);
  } else if (isWebp(data)) {
    contentType = "image/webp";
    size = parseWebp(data);
  } else {
    throw new LogoError("Erlaubt sind nur PNG-, JPEG- und WebP-Bilder (kein SVG).");
  }

  const { width, height } = size;
  if (width < MIN_LOGO_SIDE || height < MIN_LOGO_SIDE) {
    throw new LogoError(`Das Logo ist zu klein (mindestens ${MIN_LOGO_SIDE} x ${MIN_LOGO_SIDE} Pixel).`);
  }
  if (width > MAX_LOGO_SIDE || height > MAX_LOGO_SIDE) {
    throw new LogoError(`Das Logo ist zu groß (höchstens ${MAX_LOGO_SIDE} x ${MAX_LOGO_SIDE} Pixel).`);
  }
  return { contentType, data, width, height };
}

/** Dekodiert und prüft in einem Schritt. */
export function validateLogoBase64(input: string): ValidatedLogo {
  return validateLogoBytes(decodeLogoBase64(input));
}
