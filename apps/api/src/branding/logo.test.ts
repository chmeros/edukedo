import { describe, expect, it } from "vitest";
import { jpeg, png, webpExtended, webpLossless, webpLossy } from "./test-images";
import { LogoError, MAX_LOGO_BYTES, decodeLogoBase64, validateLogoBase64, validateLogoBytes } from "./logo";

describe("validateLogoBytes", () => {
  it("erkennt PNG, JPEG und WebP (alle drei Kodierungen) samt Maßen am Dateiaufbau", () => {
    expect(validateLogoBytes(png(120, 40))).toMatchObject({ contentType: "image/png", width: 120, height: 40 });
    expect(validateLogoBytes(jpeg(300, 90))).toMatchObject({ contentType: "image/jpeg", width: 300, height: 90 });
    expect(validateLogoBytes(webpExtended(200, 60))).toMatchObject({ contentType: "image/webp", width: 200, height: 60 });
    expect(validateLogoBytes(webpLossless(64, 32))).toMatchObject({ contentType: "image/webp", width: 64, height: 32 });
    expect(validateLogoBytes(webpLossy(100, 50))).toMatchObject({ contentType: "image/webp", width: 100, height: 50 });
  });

  it("lehnt SVG und andere Formate ab, auch wenn sie sich als Bild ausgeben", () => {
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><script>alert(1)</script></svg>');
    expect(() => validateLogoBytes(svg)).toThrow(/kein SVG/);
    expect(() => validateLogoBytes(Buffer.from("GIF89a" + "x".repeat(40)))).toThrow(LogoError);
    expect(() => validateLogoBytes(Buffer.from("<html><body>PNG</body></html>"))).toThrow(LogoError);
    expect(() => validateLogoBytes(Buffer.alloc(0))).toThrow(/leer/);
  });

  it("lehnt Dateien ab, die über das Dateiende hinaus Daten mitführen oder abgeschnitten sind", () => {
    expect(() => validateLogoBytes(Buffer.concat([png(100, 40), Buffer.from("<script>alert(1)</script>")]))).toThrow(/zusätzliche Daten/);
    expect(() => validateLogoBytes(Buffer.concat([jpeg(100, 40), Buffer.from("<script>")]))).toThrow(/zusätzliche Daten/);
    expect(() => validateLogoBytes(jpeg(100, 40).subarray(0, 40))).toThrow(LogoError);
    expect(() => validateLogoBytes(Buffer.concat([webpExtended(100, 40), Buffer.from("zusatz")]))).toThrow(/zusätzliche Daten/);
  });

  it("lehnt zu kleine, zu große und zu schwere Bilder ab", () => {
    expect(() => validateLogoBytes(png(1, 1))).toThrow(/zu klein/);
    expect(() => validateLogoBytes(png(15, 200))).toThrow(/zu klein/);
    expect(() => validateLogoBytes(png(2000, 100))).toThrow(/Pixel/);
    expect(() => validateLogoBytes(png(100, 40, MAX_LOGO_BYTES))).toThrow(/zu groß/);
    expect(() => validateLogoBytes(png(1024, 1024))).not.toThrow();
    expect(() => validateLogoBytes(png(1025, 1024))).toThrow(/Pixel/);
  });
});

describe("decodeLogoBase64 und validateLogoBase64", () => {
  it("dekodiert nur reines Base64 und lehnt data:-Präfixe, Zeilenumbrüche und Müll ab", () => {
    const b64 = png(100, 40).toString("base64");
    expect(decodeLogoBase64(b64).equals(png(100, 40))).toBe(true);
    expect(() => decodeLogoBase64(`data:image/png;base64,${b64}`)).toThrow(LogoError);
    expect(() => decodeLogoBase64(`${b64.slice(0, 8)}\n${b64.slice(8)}`)).toThrow(LogoError);
    expect(() => decodeLogoBase64("")).toThrow(LogoError);
    expect(() => decodeLogoBase64("abc")).toThrow(LogoError);
  });

  it("begrenzt die Größe schon vor dem Dekodieren", () => {
    expect(() => decodeLogoBase64("A".repeat(400_000))).toThrow(/zu groß/);
  });

  it("prüft Base64 und Bild in einem Schritt", () => {
    expect(validateLogoBase64(png(120, 40).toString("base64"))).toMatchObject({ contentType: "image/png", width: 120, height: 40 });
    expect(() => validateLogoBase64(Buffer.from("kein bild, aber lang genug fuer eine pruefung").toString("base64"))).toThrow(LogoError);
  });
});
