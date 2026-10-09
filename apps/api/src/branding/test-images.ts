/** Minimal aufgebaute Bilddateien für Tests (nur die Struktur, die die Logo-Prüfung liest; sie müssen nicht dekodierbar sein). */
export function png(width: number, height: number, padding = 0): Buffer {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0);
  ihdr.write("IHDR", 4, "ascii");
  ihdr.writeUInt32BE(width, 8);
  ihdr.writeUInt32BE(height, 12);
  ihdr.set([8, 0, 0, 0, 0], 16); // Bit-Tiefe, Farbtyp, Kompression, Filter, Verschachtelung
  const idat = Buffer.concat([Buffer.from([0, 0, 0, 4]), Buffer.from("IDAT", "ascii"), Buffer.alloc(4 + padding), Buffer.alloc(4)]);
  const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
  return Buffer.concat([signature, ihdr, idat, iend]);
}

export function jpeg(width: number, height: number): Buffer {
  const app0 = Buffer.concat([Buffer.from([0xff, 0xe0, 0x00, 0x10]), Buffer.from("JFIF\0", "ascii"), Buffer.alloc(9)]);
  const sof0 = Buffer.alloc(19);
  sof0.set([0xff, 0xc0, 0x00, 0x11, 0x08], 0);
  sof0.writeUInt16BE(height, 5);
  sof0.writeUInt16BE(width, 7);
  sof0.set([0x03, 0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01], 9);
  const sos = Buffer.from([0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00]);
  return Buffer.concat([Buffer.from([0xff, 0xd8]), app0, sof0, sos, Buffer.alloc(8, 0x11), Buffer.from([0xff, 0xd9])]);
}

function riff(chunkType: string, chunkBody: Buffer): Buffer {
  const chunkSize = Buffer.alloc(4);
  chunkSize.writeUInt32LE(chunkBody.length, 0);
  const inner = Buffer.concat([Buffer.from("WEBP", "ascii"), Buffer.from(chunkType, "ascii"), chunkSize, chunkBody]);
  const size = Buffer.alloc(4);
  size.writeUInt32LE(inner.length, 0);
  return Buffer.concat([Buffer.from("RIFF", "ascii"), size, inner]);
}

export function webpExtended(width: number, height: number): Buffer {
  const body = Buffer.alloc(10);
  body.writeUIntLE(width - 1, 4, 3);
  body.writeUIntLE(height - 1, 7, 3);
  return riff("VP8X", body);
}

export function webpLossless(width: number, height: number): Buffer {
  const body = Buffer.alloc(10);
  body[0] = 0x2f;
  body.writeUInt32LE(((width - 1) & 0x3fff) | (((height - 1) & 0x3fff) << 14), 1);
  return riff("VP8L", body);
}

export function webpLossy(width: number, height: number): Buffer {
  const body = Buffer.alloc(16);
  body.set([0x00, 0x00, 0x00, 0x9d, 0x01, 0x2a], 0);
  body.writeUInt16LE(width, 6);
  body.writeUInt16LE(height, 8);
  return riff("VP8 ", body);
}
