import type { BelegPayload } from "@edukedo/shared";

/**
 * F-196 (Beleg-Detektiv, 07.10.2026, Phase 2 der Kursprofile): Wareneingang und Rechnungsprüfung im Einkauf.
 * Je Beleg stehen Bestellung, Lieferschein, Rechnung und Zahlungsbedingung nebeneinander; die Lernenden markieren
 * Abweichungen und entscheiden "in Ordnung" oder "beanstanden". Alle Firmen, Artikel und Beträge sind frei erfunden,
 * alle Summen sind nachgerechnet. Bewusst ohne Rechtsfragen (Mängelrüge, Fristen, Umsatzsteuersätze).
 * Entwurf, Prüfblatt 22.
 */
export const belegdetektivEinkauf: BelegPayload = {
  belege: [
    {
      nummer: 1,
      titel: "Aktenordner",
      situation: "Im Wareneingang liegen Bestellung, Lieferschein und Rechnung für Aktenordner vor. Vergleiche die Angaben.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "120 Aktenordner A4 zu 2,40 € je Stück, Lieferung bis 14.10.", auffaellig: false, erklaerung: "Die Bestellung ist die Vergleichsbasis für Menge und Preis." },
        { id: "b2", ort: "Lieferschein", text: "Geliefert: 100 Aktenordner A4 (5 Kartons zu je 20 Stück)", auffaellig: true, erklaerung: "Es wurden nur 100 statt 120 Stück geliefert." },
        { id: "b3", ort: "Rechnung", text: "120 Aktenordner A4 zu 2,40 € = 288,00 € netto", auffaellig: true, erklaerung: "Berechnet sind 120 Stück, geliefert wurden nur 100. Richtig wären 100 × 2,40 € = 240,00 €." },
        { id: "b4", ort: "Zahlungsbedingung", text: "Zahlbar innerhalb von 30 Tagen netto", auffaellig: false, erklaerung: "Die Zahlungsbedingung weicht nicht von der Vereinbarung ab." },
      ],
      hatFehler: true,
      aufloesung: "Geliefert wurden 100 Stück, berechnet 120. Die Rechnung muss auf 240,00 € netto korrigiert werden, oder die fehlenden 20 Stück müssen nachgeliefert werden.",
    },
    {
      nummer: 2,
      titel: "Kopierpapier",
      situation: "Für Kopierpapier gilt ein vereinbarter Rahmenvertragspreis. Prüfe, ob die Rechnung dazu passt.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "50 Packungen Kopierpapier 80 g zu 4,20 € je Packung (vereinbarter Preis)", auffaellig: false, erklaerung: "Vergleichsbasis: 4,20 € je Packung." },
        { id: "b2", ort: "Lieferschein", text: "50 Packungen Kopierpapier 80 g geliefert, Kartons unversehrt", auffaellig: false, erklaerung: "Die Liefermenge entspricht der Bestellung." },
        { id: "b3", ort: "Rechnung", text: "50 Packungen Kopierpapier 80 g zu 4,80 € = 240,00 € netto", auffaellig: true, erklaerung: "Der berechnete Stückpreis (4,80 €) liegt über dem vereinbarten (4,20 €). Die Rechnung rechnet in sich stimmig, aber mit dem falschen Preis." },
        { id: "b4", ort: "Zahlungsbedingung", text: "Zahlungsziel 14 Tage", auffaellig: false, erklaerung: "Kein Widerspruch zur Bestellung." },
      ],
      hatFehler: true,
      aufloesung: "Der Preis weicht ab: Richtig wären 50 × 4,20 € = 210,00 € netto statt 240,00 €. Die Rechnung wird beim Lieferanten beanstandet.",
    },
    {
      nummer: 3,
      titel: "Toner",
      situation: "Prüfe die Unterlagen zu einer Tonerlieferung, bevor die Rechnung zur Zahlung freigegeben wird.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "30 Toner schwarz zu 64,00 € je Stück", auffaellig: false, erklaerung: "Vergleichsbasis für Menge und Preis." },
        { id: "b2", ort: "Lieferschein", text: "30 Toner schwarz geliefert, Verpackung unversehrt", auffaellig: false, erklaerung: "Menge stimmt, kein Hinweis auf Schäden." },
        { id: "b3", ort: "Rechnung", text: "30 Toner schwarz zu 64,00 € = 1.920,00 € netto", auffaellig: false, erklaerung: "30 × 64,00 € = 1.920,00 €, Menge und Preis passen zur Bestellung." },
        { id: "b4", ort: "Zahlungsbedingung", text: "10 Tage 2 % Skonto, 30 Tage netto", auffaellig: false, erklaerung: "Eine übliche Skontoregelung, die mit der Rechnung nicht im Widerspruch steht." },
      ],
      hatFehler: false,
      aufloesung: "Menge, Preis und Summe stimmen überein, die Ware ist unversehrt. Die Rechnung kann zur Zahlung freigegeben werden.",
    },
    {
      nummer: 4,
      titel: "Skontoabzug",
      situation: "Eine Rechnung wurde bezahlt. Prüfe, ob der Skontoabzug in der Buchhaltung zur Zahlungsbedingung passt.",
      felder: [
        { id: "b1", ort: "Rechnung", text: "Rechnungsdatum 03.10., Rechnungsbetrag 2.000,00 € netto", auffaellig: false, erklaerung: "Ausgangspunkt für die Berechnung der Skontofrist." },
        { id: "b2", ort: "Zahlungsbedingung", text: "2 % Skonto bei Zahlung innerhalb von 10 Tagen, danach netto", auffaellig: false, erklaerung: "Die Skontofrist läuft vom 03.10. bis zum 13.10." },
        { id: "b3", ort: "Buchhaltung", text: "Zahlung am 17.10.", auffaellig: true, erklaerung: "Der 17.10. liegt nach dem Ende der Skontofrist (13.10.)." },
        { id: "b4", ort: "Buchhaltung", text: "Überweisung 1.960,00 € (2 % Skonto abgezogen)", auffaellig: true, erklaerung: "Das Skonto wurde abgezogen, obwohl die Frist verstrichen war. Zu zahlen waren 2.000,00 €." },
      ],
      hatFehler: true,
      aufloesung: "Die Skontofrist endete am 13.10., gezahlt wurde am 17.10. Der Abzug von 40,00 € entspricht nicht der vereinbarten Zahlungsbedingung; es sind 2.000,00 € zu zahlen.",
    },
    {
      nummer: 5,
      titel: "Bildschirme",
      situation: "Bei der Warenannahme fällt ein Karton auf. Prüfe die Unterlagen und die Wareneingangskontrolle.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "10 Bildschirme 24 Zoll zu 149,00 € je Stück", auffaellig: false, erklaerung: "Vergleichsbasis für Menge und Preis." },
        { id: "b2", ort: "Lieferschein", text: "10 Bildschirme geliefert. Karton 4 mit eingedrückter Ecke, bei der Annahme nicht vermerkt.", auffaellig: true, erklaerung: "Die sichtbare Beschädigung des Kartons wurde beim Quittieren nicht festgehalten." },
        { id: "b3", ort: "Wareneingangskontrolle", text: "Der Bildschirm aus Karton 4 hat einen Riss im Display.", auffaellig: true, erklaerung: "Ein Gerät ist beschädigt und nicht verwendbar." },
        { id: "b4", ort: "Rechnung", text: "10 Bildschirme 24 Zoll zu 149,00 € = 1.490,00 € netto", auffaellig: false, erklaerung: "Menge, Preis und Summe passen zur Bestellung (10 × 149,00 € = 1.490,00 €)." },
      ],
      hatFehler: true,
      aufloesung: "Menge und Preis stimmen, aber ein Gerät ist beschädigt. Der Schaden wird dokumentiert (Fotos, schriftlicher Vermerk) und beim Lieferanten reklamiert.",
    },
    {
      nummer: 6,
      titel: "Etiketten",
      situation: "Vergleiche Artikelnummern und Mengen in den drei Belegen.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "Artikel 4711: Ordnerrücken-Etiketten, 20 Packungen zu 3,10 €", auffaellig: false, erklaerung: "Bestellt wurde der Artikel 4711." },
        { id: "b2", ort: "Lieferschein", text: "Artikel 4712: Ordnerrücken-Etiketten, selbstklebend, 20 Packungen", auffaellig: true, erklaerung: "Geliefert wurde Artikel 4712, bestellt war 4711." },
        { id: "b3", ort: "Rechnung", text: "Artikel 4712, 20 Packungen zu 3,10 € = 62,00 € netto", auffaellig: true, erklaerung: "Berechnet ist ebenfalls der abweichende Artikel 4712." },
        { id: "b4", ort: "Zahlungsbedingung", text: "Zahlbar innerhalb von 14 Tagen netto", auffaellig: false, erklaerung: "Kein Widerspruch zur Bestellung." },
      ],
      hatFehler: true,
      aufloesung: "Geliefert und berechnet wurde Artikel 4712 statt 4711. Es ist zu klären, ob der Ersatzartikel gleichwertig ist und akzeptiert wird; sonst wird die Lieferung reklamiert.",
    },
    {
      nummer: 7,
      titel: "Büromöbel",
      situation: "Die Rechnung für Büromöbel hat mehrere Positionen. Prüfe jede Position und die Summe.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "2 Besprechungstische zu 380,00 € und 8 Stühle zu 95,00 €", auffaellig: false, erklaerung: "Vergleichsbasis: 2 Tische und 8 Stühle." },
        { id: "b2", ort: "Lieferschein", text: "2 Besprechungstische und 8 Stühle geliefert", auffaellig: false, erklaerung: "Die Liefermenge entspricht der Bestellung." },
        { id: "b3", ort: "Rechnung, Position 1", text: "2 Besprechungstische zu 380,00 € = 760,00 €", auffaellig: false, erklaerung: "2 × 380,00 € = 760,00 €." },
        { id: "b4", ort: "Rechnung, Position 2", text: "8 Stühle zu 95,00 € = 760,00 €", auffaellig: false, erklaerung: "8 × 95,00 € = 760,00 €." },
        { id: "b5", ort: "Rechnung, Position 3", text: "8 Stühle zu 95,00 € = 760,00 €", auffaellig: true, erklaerung: "Die Stühle stehen ein zweites Mal auf der Rechnung, geliefert wurden sie nur einmal." },
        { id: "b6", ort: "Rechnung, Summe", text: "Summe netto: 2.280,00 €", auffaellig: true, erklaerung: "Die Summe enthält die doppelte Position. Richtig wären 760,00 € + 760,00 € = 1.520,00 €." },
      ],
      hatFehler: true,
      aufloesung: "Die Stühle wurden doppelt berechnet. Richtig sind 1.520,00 € netto statt 2.280,00 €; die Rechnung wird zurückgewiesen.",
    },
    {
      nummer: 8,
      titel: "Kugelschreiber",
      situation: "Die Bestellung sieht zwei Teillieferungen vor. Prüfe, ob die Rechnung zur ersten Teillieferung passt.",
      felder: [
        { id: "b1", ort: "Bestellung", text: "200 Kugelschreiber zu 0,35 € je Stück, Lieferung in zwei Teilen zu je 100 Stück", auffaellig: false, erklaerung: "Vereinbart sind zwei Teillieferungen." },
        { id: "b2", ort: "Lieferschein", text: "Teillieferung 1: 100 Kugelschreiber geliefert", auffaellig: false, erklaerung: "Die erste Teillieferung entspricht der Vereinbarung." },
        { id: "b3", ort: "Rechnung", text: "Teillieferung 1: 100 Kugelschreiber zu 0,35 € = 35,00 € netto", auffaellig: false, erklaerung: "100 × 0,35 € = 35,00 €. Berechnet ist genau die gelieferte Menge." },
        { id: "b4", ort: "Rechnung", text: "Die zweite Teillieferung folgt und wird gesondert berechnet.", auffaellig: false, erklaerung: "Die offene Restmenge ist vereinbart und kein Fehler." },
      ],
      hatFehler: false,
      aufloesung: "Berechnet ist genau die gelieferte Menge zum vereinbarten Preis. Die zweite Teillieferung ist offen, aber so vereinbart. Die Rechnung ist in Ordnung.",
    },
  ],
  abschlussmeldung: "Geschafft! Du vergleichst Bestellung, Lieferschein und Rechnung jetzt mit geübtem Blick.",
};
