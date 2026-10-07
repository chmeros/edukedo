import type { BelegPayload } from "@edukedo/shared";

/**
 * F-220 (Daten-Detektiv, 07.10.2026, Phase 3 der Kursprofile, S-DPA-02): Datenqualität in kleinen Tabellenauszügen. Der Spieltyp ist der
 * Beleg-Detektiv (Angaben antippen, dann „in Ordnung“ oder „beanstanden“); jede Zeile eines Auszugs ist ein Feld, die Erklärung nennt die
 * betroffene Qualitätsdimension nach der Kurstheorie dp4 11.1 (Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität, dazu
 * Konsistenz). **Alle Namen, Adressen und Werte sind frei erfunden** (E-Mail-Adressen mit der reservierten Endung .test, keine echten
 * Personen). Jeder Fall hat genau die genannten Auffälligkeiten; die Situation legt die Regel fest, nach der geprüft wird, damit es keine
 * zweite Deutung gibt. Entwurf, Prüfblatt 24, im Kurs noch nicht sichtbar.
 */
export const datenDetektivQualitaet: BelegPayload = {
  belege: [
    {
      nummer: 1,
      titel: "Kundenliste nach dem Import",
      situation: "Aus einem Altsystem wurden vier Kundenzeilen importiert. Jede Kundennummer soll nur einmal vorkommen. Markiere die Zeile, die eine bereits vorhandene Zeile wiederholt.",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "K-1042 · Anna Berger · anna.berger@example.test · 50667 Köln", auffaellig: false, erklaerung: "Erste und einzige Zeile zu dieser Kundennummer, alle Angaben sind befüllt und formal gültig." },
        { id: "z2", ort: "Zeile 2", text: "K-1043 · Jan Meier · jan.meier@example.test · 20095 Hamburg", auffaellig: false, erklaerung: "Erste Zeile zu dieser Kundennummer; sie ist das Original." },
        { id: "z3", ort: "Zeile 3", text: "K-1043 · Jan Meier · jan.meier@example.test · 20095 Hamburg", auffaellig: true, erklaerung: "Redundanz: Die Zeile wiederholt Zeile 2 vollständig (Dublette). Zählungen und Summen würden verfälscht, ein späteres Ändern nur einer Kopie führt zu Widersprüchen." },
        { id: "z4", ort: "Zeile 4", text: "K-1044 · Sara Koç · sara.koc@example.test · 40213 Düsseldorf", auffaellig: false, erklaerung: "Eigene Kundennummer, vollständig und gültig." },
      ],
      hatFehler: true,
      aufloesung: "Zeile 3 ist eine exakte Dublette von Zeile 2 (Redundanz). Exakte Dubletten findet man durch Gruppieren nach den Identifikationsmerkmalen.",
    },
    {
      nummer: 2,
      titel: "Pflichtfeld E-Mail",
      situation: "Für den Versand der Auftragsbestätigung ist die E-Mail-Adresse eine Pflichtangabe. Prüfe vier importierte Zeilen: Fehlende Angaben und Platzhalter zählen als nicht befüllt.",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "K-2010 · Mia Hoffmann · mia.hoffmann@example.test · 50667 Köln", auffaellig: false, erklaerung: "Die Pflichtangabe ist befüllt." },
        { id: "z2", ort: "Zeile 2", text: "K-2011 · Lukas Braun · (leer) · 70173 Stuttgart", auffaellig: true, erklaerung: "Vollständigkeit: Das Pflichtfeld E-Mail ist leer." },
        { id: "z3", ort: "Zeile 3", text: "K-2012 · Paul Neumann · k. A. · 80331 München", auffaellig: true, erklaerung: "Vollständigkeit: „k. A.“ ist ein Platzhalter und keine E-Mail-Adresse; das Feld gilt als nicht befüllt." },
        { id: "z4", ort: "Zeile 4", text: "K-2013 · Julia Roth · julia.roth@example.test · 45127 Essen", auffaellig: false, erklaerung: "Die Pflichtangabe ist befüllt." },
      ],
      hatFehler: true,
      aufloesung: "Zeile 2 (leer) und Zeile 3 (Platzhalter „k. A.“) haben keine E-Mail-Adresse. Vollständigkeit heißt: Alle für den Zweck nötigen Felder sind wirklich befüllt, nicht nur irgendwie ausgefüllt.",
    },
    {
      nummer: 3,
      titel: "Postleitzahlen",
      situation: "Eine deutsche Postleitzahl besteht aus genau fünf Ziffern. Prüfe die Postleitzahlen der vier Zeilen auf diese Formatregel.",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "K-3001 · Berlin · PLZ 10115", auffaellig: false, erklaerung: "Fünf Ziffern, formal gültig." },
        { id: "z2", ort: "Zeile 2", text: "K-3002 · Köln · PLZ 5067", auffaellig: true, erklaerung: "Validität: Die Postleitzahl hat nur vier Ziffern und verletzt die Formatregel (vermutlich ging eine führende Null oder eine Ziffer verloren)." },
        { id: "z3", ort: "Zeile 3", text: "K-3003 · Leipzig · PLZ 4109A", auffaellig: true, erklaerung: "Validität: Eine Postleitzahl enthält nur Ziffern; „A“ verletzt die Formatregel." },
        { id: "z4", ort: "Zeile 4", text: "K-3004 · Dresden · PLZ 01067", auffaellig: false, erklaerung: "Fünf Ziffern; die führende Null gehört zur Postleitzahl und ist gültig." },
      ],
      hatFehler: true,
      aufloesung: "Zeile 2 (vier Ziffern) und Zeile 3 (Buchstabe) verletzen die Formatregel. Die 01067 ist dagegen gültig: Postleitzahlen müssen als Text gespeichert werden, sonst geht die führende Null verloren.",
    },
    {
      nummer: 4,
      titel: "Geburtsjahre",
      situation: "In einer Kundendatei vom 7. Oktober 2026 stehen Geburtsjahre. Prüfe, ob sie als Geburtsjahr einer lebenden Person glaubwürdig sind (Format: vierstellige Jahreszahl, alle vier haben das richtige Format).",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "K-4001 · Geburtsjahr 1985", auffaellig: false, erklaerung: "Glaubwürdig." },
        { id: "z2", ort: "Zeile 2", text: "K-4002 · Geburtsjahr 1850", auffaellig: true, erklaerung: "Plausibilität: Die Angabe wäre über 170 Jahre alt. Das Format ist gültig, der Wert inhaltlich aber unmöglich." },
        { id: "z3", ort: "Zeile 3", text: "K-4003 · Geburtsjahr 2031", auffaellig: true, erklaerung: "Plausibilität: Das Jahr liegt in der Zukunft." },
        { id: "z4", ort: "Zeile 4", text: "K-4004 · Geburtsjahr 1962", auffaellig: false, erklaerung: "Glaubwürdig." },
      ],
      hatFehler: true,
      aufloesung: "1850 und 2031 haben das richtige Format (Validität), sind als Geburtsjahre aber unmöglich (Plausibilität). Eine Wertebereichsprüfung findet solche Ausreißer schnell.",
    },
    {
      nummer: 5,
      titel: "Temperatur im Serverraum",
      situation: "Ein Sensor im klimatisierten Serverraum meldet jede Minute die Raumtemperatur. Hier ein Auszug.",
      felder: [
        { id: "z1", ort: "10:01", text: "21,3 °C", auffaellig: false, erklaerung: "Passt zu einem klimatisierten Raum." },
        { id: "z2", ort: "10:02", text: "21,5 °C", auffaellig: false, erklaerung: "Kleine Schwankung, normal." },
        { id: "z3", ort: "10:03", text: "850,0 °C", auffaellig: true, erklaerung: "Plausibilität: 850 °C sind in einem klimatisierten Raum unmöglich. Das ist ein Messfehler oder ein Übertragungsfehler, aber kein echter Wert." },
        { id: "z4", ort: "10:04", text: "21,4 °C", auffaellig: false, erklaerung: "Passt zur Reihe." },
      ],
      hatFehler: true,
      aufloesung: "Der Wert 850,0 °C ist ein Ausreißer, den Fachwissen sofort als unmöglich erkennt (Plausibilität). Eine Wertebereichsprüfung mit Mindest- und Höchstwert hätte ihn abgefangen.",
    },
    {
      nummer: 6,
      titel: "Bestelldaten",
      situation: "Prüfe fünf Bestellungen (keine Gutschriften) auf Gültigkeit und Plausibilität. Das Datumsformat ist JJJJ-MM-TT. Eine noch nicht gelieferte Bestellung ist kein Fehler.",
      felder: [
        { id: "z1", ort: "Bestellung 7001", text: "bestellt 2026-02-10 · geliefert 2026-02-12 · 89,90 €", auffaellig: false, erklaerung: "Die Lieferung liegt nach der Bestellung, Datum und Betrag sind gültig." },
        { id: "z2", ort: "Bestellung 7002", text: "bestellt 2026-02-10 · geliefert 2026-02-08 · 310,00 €", auffaellig: true, erklaerung: "Plausibilität: Die Lieferung liegt vor der Bestellung. Beide Daten sind einzeln gültig, nur im Zusammenhang unmöglich." },
        { id: "z3", ort: "Bestellung 7003", text: "bestellt 2026-13-01 · geliefert 2026-03-04 · 59,00 €", auffaellig: true, erklaerung: "Validität: Der Monat 13 gibt es nicht. Das Format JJJJ-MM-TT ist eingehalten, der Inhalt ist aber kein gültiges Datum." },
        { id: "z4", ort: "Bestellung 7004", text: "bestellt 2026-03-02 · geliefert (noch offen) · 75,25 €", auffaellig: false, erklaerung: "Eine noch nicht gelieferte Bestellung ist fachlich in Ordnung." },
        { id: "z5", ort: "Bestellung 7005", text: "bestellt 2026-03-05 · geliefert 2026-03-08 · −45,00 €", auffaellig: true, erklaerung: "Plausibilität: Eine Bestellung (keine Gutschrift) hat keinen negativen Betrag." },
      ],
      hatFehler: true,
      aufloesung: "Drei Zeilen sind auffällig: Lieferung vor Bestellung (Plausibilität), Monat 13 (Validität) und negativer Betrag (Plausibilität). Die offene Lieferung in 7004 ist dagegen erlaubt.",
    },
    {
      nummer: 7,
      titel: "Statusfeld",
      situation: "Das Feld Status darf nur die Werte „aktiv“ oder „inaktiv“ enthalten. Prüfe vier Kunden.",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "K-5001 · Status: aktiv", auffaellig: false, erklaerung: "Zulässiger Wert." },
        { id: "z2", ort: "Zeile 2", text: "K-5002 · Status: inaktiv", auffaellig: false, erklaerung: "Zulässiger Wert." },
        { id: "z3", ort: "Zeile 3", text: "K-5003 · Status: vielleicht", auffaellig: true, erklaerung: "Validität: „vielleicht“ steht nicht in der Liste der zulässigen Werte." },
        { id: "z4", ort: "Zeile 4", text: "K-5004 · Status: aktiv", auffaellig: false, erklaerung: "Zulässiger Wert." },
      ],
      hatFehler: true,
      aufloesung: "„vielleicht“ verletzt die Regel für das Statusfeld (Validität). Eine Prüfung gegen die Liste der zulässigen Werte findet solche Einträge.",
    },
    {
      nummer: 8,
      titel: "Mengenabgleich nach der Übertragung",
      situation: "Nach der Übertragung von Kundendaten in ein neues System wird die Datenmenge verglichen. Alle Datensätze des Quellsystems sollen im Zielsystem ankommen.",
      felder: [
        { id: "z1", ort: "Quellsystem", text: "2.500 Datensätze exportiert", auffaellig: false, erklaerung: "Die Sollmenge für den Vergleich." },
        { id: "z2", ort: "Zielsystem", text: "2.463 Datensätze importiert", auffaellig: true, erklaerung: "Quantität: Es fehlen 37 Datensätze (2.500 − 2.463). Der Mengenabgleich von Soll und Ist zeigt die Lücke." },
        { id: "z3", ort: "Importprotokoll", text: "Import abgeschlossen, keine Fehlermeldung", auffaellig: false, erklaerung: "Das Protokoll selbst ist nicht der Fehler, aber „keine Fehlermeldung“ beweist keine Vollständigkeit; erst der Mengenabgleich deckt die fehlenden Zeilen auf." },
        { id: "z4", ort: "Schlüsselprüfung", text: "Kundennummern im Zielsystem eindeutig", auffaellig: false, erklaerung: "Eine Prüfung auf Eindeutigkeit der Schlüssel ist in Ordnung und ersetzt den Mengenabgleich nicht." },
      ],
      hatFehler: true,
      aufloesung: "Im Zielsystem fehlen 37 von 2.500 Datensätzen (Quantität). Ohne Mengenabgleich wäre das trotz fehlerfreiem Importprotokoll unbemerkt geblieben.",
    },
    {
      nummer: 9,
      titel: "Adressen in zwei Systemen",
      situation: "Webshop und Abrechnung führen Kundenadressen getrennt. Die Abrechnung soll mit dem Webshop übereinstimmen; markiere, was von der Gegenseite abweicht.",
      felder: [
        { id: "z1", ort: "Webshop", text: "K-6001 · Hauptstraße 5 · 50667 Köln", auffaellig: false, erklaerung: "Vergleichsbasis." },
        { id: "z2", ort: "Abrechnung", text: "K-6001 · Hauptstraße 5 · 50668 Köln", auffaellig: true, erklaerung: "Konsistenz: Die Postleitzahl weicht vom Webshop ab (50668 statt 50667). Beide sind für sich gültig; welche stimmt, lässt sich nur durch Nachfragen oder einen Referenzvergleich klären (Richtigkeit)." },
        { id: "z3", ort: "Webshop", text: "K-6002 · Lindenallee 12 · 20095 Hamburg", auffaellig: false, erklaerung: "Vergleichsbasis." },
        { id: "z4", ort: "Abrechnung", text: "K-6002 · Lindenallee 12 · 20095 Hamburg", auffaellig: false, erklaerung: "Stimmt mit dem Webshop überein." },
      ],
      hatFehler: true,
      aufloesung: "Bei K-6001 widersprechen sich die Systeme in der Postleitzahl (Konsistenz). Validität und Konsistenz sind getrennte Fragen: Beide Werte sind formal gültig, nur einer kann stimmen.",
    },
    {
      nummer: 10,
      titel: "Lieferantenliste",
      situation: "Eine Lieferantenliste soll vor dem Einlesen geprüft werden. Regeln: Nummer eindeutig, Postleitzahl fünf Ziffern, Status aktiv oder inaktiv, alle Felder befüllt.",
      felder: [
        { id: "z1", ort: "Zeile 1", text: "L-100 · Nordlicht Logistik AG · 20095 Hamburg · aktiv", auffaellig: false, erklaerung: "Alle Regeln erfüllt." },
        { id: "z2", ort: "Zeile 2", text: "L-101 · Hartmann Metallbau GmbH · 50667 Köln · aktiv", auffaellig: false, erklaerung: "Alle Regeln erfüllt." },
        { id: "z3", ort: "Zeile 3", text: "L-102 · Rheinwerk Maschinen GmbH · 40213 Düsseldorf · inaktiv", auffaellig: false, erklaerung: "Alle Regeln erfüllt." },
        { id: "z4", ort: "Zeile 4", text: "L-103 · Kaufhaus Brandt · 01067 Dresden · aktiv", auffaellig: false, erklaerung: "Die führende Null der Postleitzahl ist gültig; alle Regeln erfüllt." },
      ],
      hatFehler: false,
      aufloesung: "Nummern sind verschieden, Postleitzahlen haben fünf Ziffern, der Status ist zulässig, kein Feld ist leer: Die Liste kann eingelesen werden.",
    },
    {
      nummer: 11,
      titel: "Temperaturreihe im Lager",
      situation: "Ein Sensor im Lager (Sollbereich 15 bis 25 °C) meldet jede Minute die Temperatur. Prüfe den Auszug.",
      felder: [
        { id: "z1", ort: "14:01", text: "18,2 °C", auffaellig: false, erklaerung: "Im Sollbereich." },
        { id: "z2", ort: "14:02", text: "18,4 °C", auffaellig: false, erklaerung: "Im Sollbereich, kleine Schwankung." },
        { id: "z3", ort: "14:03", text: "18,9 °C", auffaellig: false, erklaerung: "Im Sollbereich; ein langsamer Anstieg ist bei einem Lager normal." },
        { id: "z4", ort: "14:04", text: "19,1 °C", auffaellig: false, erklaerung: "Im Sollbereich." },
      ],
      hatFehler: false,
      aufloesung: "Alle Werte liegen im Sollbereich und folgen einem glaubwürdigen Verlauf. Nicht jeder Datenauszug hat einen Fehler: Auch „in Ordnung“ ist ein Prüfergebnis.",
    },
  ],
  abschlussmeldung: "Fall gelöst! Redundanz, Vollständigkeit, Validität, Plausibilität, Quantität und Konsistenz sind die Dimensionen, an denen jede Datenqualitätsprüfung ansetzt.",
};
