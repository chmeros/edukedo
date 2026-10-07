import type { PhishingElement, PhishingPayload } from "@edukedo/shared";

/**
 * F-196 (Betrugs-Detektiv "Fake-Spedition und Frachtbetrug", 07.10.2026, S-LOG-04): Content-Set für den vorhandenen
 * Phishing-Detektiv im Kurs Transport/Logistik. Sechs Nachrichten aus dem Speditionsalltag: vier Betrugsversuche
 * (Phantomfrachtführer, geänderte Bankverbindung, unbekannter Abholer, Zollgebühr-Falle) und zwei echte Mails.
 * Alle Firmen und Adressen sind frei erfunden (Domains .example und .test), es werden keine realen Unternehmen
 * nachgeahmt. Die Hinweise sind Erfahrungsregeln aus dem Alltag, keine Rechtsaussagen. Entwurf, Prüfblatt 22.
 */
function el(id: string, ort: PhishingElement["ort"], text: string, verdaechtig: boolean, erklaerung: string): PhishingElement {
  return { id, ort, text, verdaechtig, erklaerung };
}

export const phishingFrachtBetrug: PhishingPayload = {
  mails: [
    {
      nummer: 1,
      istPhishing: true,
      elemente: [
        el("a", "absender", "Disposition <dispo@schnell-fracht-ag.test>", true, "Verdächtig: Die Firma ist unbekannt und hat bisher keinen Auftrag mit euch. Eine neue Adresse mit angeblich großer Spedition ist ohne Prüfung kein Beleg für Echtheit."),
        el("b", "betreff", "DRINGEND: Komplettladung Hamburg - Mailand, Abholung morgen", true, "Verdächtig: Zeitdruck und eine lukrative Komplettladung sollen zu einer schnellen Zusage drängen, bevor jemand den Auftraggeber prüft."),
        el("c", "text", "Wir suchen kurzfristig einen Frachtführer für 24 t Elektronik. Wir zahlen 30 % über Marktpreis und bitten um sofortige Zusage.", true, "Verdächtig: Ein Preis weit über Markt ist ein klassischer Köder. Wer ungewöhnlich viel zahlt, will meist nicht fahren lassen, sondern Ware oder Geld abgreifen."),
        el("d", "text", "Als Sicherheit bitten wir um eine Vorabzahlung von 1.500 € für die Abwicklung der Frachtpapiere.", true, "Verdächtig: Ein Auftraggeber verlangt kein Geld vom Frachtführer. Eine Vorauszahlung für Papiere ist ein typischer Betrugstrick."),
        el("e", "link", "Auftragsdetails → http://frachtboerse-auftrag.test/login", true, "Verdächtig: Das Ziel ist eine unbekannte Seite mit Anmeldung, nicht die bekannte Frachtbörse. Zugangsdaten würden dort abgegriffen."),
      ],
      aufloesung: "Das ist ein Betrugsversuch: unbekannter Auftraggeber, Zeitdruck, Preis weit über Markt, Vorauszahlung und eine gefälschte Anmeldeseite. Neue Auftraggeber werden vor einer Zusage geprüft (Handelsregister, Rückruf über die öffentlich bekannte Nummer).",
    },
    {
      nummer: 2,
      istPhishing: true,
      elemente: [
        el("a", "absender", "Buchhaltung Nordlog <rechnungswesen@nordlog-transporte-gmbh.test>", true, "Verdächtig: Der bekannte Frachtführer schreibt sonst von nordlog-transporte.example. Diese Domain ist ähnlich, aber nicht dieselbe."),
        el("b", "betreff", "Wichtig: neue Bankverbindung ab sofort", true, "Verdächtig: Änderungen von Bankdaten per Mail sind der häufigste Weg zum Rechnungsbetrug."),
        el("c", "text", "Bitte überweisen Sie alle offenen Rechnungen ab sofort auf unser neues Konto bei einer anderen Bank. Die IBAN finden Sie im Anhang.", true, "Verdächtig: Die neue IBAN steht nur in dieser Mail. Eine echte Änderung wird über einen zweiten Weg bestätigt, zum Beispiel per Rückruf."),
        el("d", "text", "Bitte bestätigen Sie die Änderung bis heute Abend, damit es zu keinen Zahlungsverzögerungen kommt.", true, "Verdächtig: Eine knappe Frist verhindert, dass die Änderung in Ruhe geprüft wird."),
        el("e", "anhang", "Neue_Bankverbindung.pdf.exe", true, "Verdächtig: Eine Datei mit der Endung .exe hinter .pdf ist ein Programm und kein Dokument."),
        el("f", "text", "Mit freundlichen Grüßen\nBuchhaltung", false, "Unauffällig: Eine Grußformel sagt nichts über die Echtheit, sie lässt sich leicht kopieren."),
      ],
      aufloesung: "Das ist Rechnungsbetrug: ähnliche Domain, neue Bankdaten per Mail, Frist und ein getarntes Programm im Anhang. Bankdaten ändert man nur nach Rückruf unter der bekannten Nummer, nicht nach einer Mail.",
    },
    {
      nummer: 3,
      istPhishing: true,
      elemente: [
        el("a", "absender", "Disposition Rhein-Main <disposition.rhein.main@mailbox-gratis.test>", true, "Verdächtig: Eine Spedition schreibt von der eigenen Firmendomain, nicht von einem Gratis-Postfach."),
        el("b", "betreff", "Abholung Sendung 4711 morgen früh", false, "Unauffällig: Der Betreff ist sachlich und beschreibt einen normalen Vorgang."),
        el("c", "text", "Unser Fahrer holt die Sendung morgen um 6:00 Uhr bei Ihnen ab. Er kommt mit einem anderen Fahrzeug als sonst.", true, "Verdächtig: Ein Wechsel von Fahrzeug und Fahrer ohne Vorankündigung ist ein Warnsignal bei Ladungsdiebstahl."),
        el("d", "text", "Bitte übergeben Sie die Ware ohne Abholschein, die Papiere reichen wir nach.", true, "Verdächtig: Ware ohne Papiere und ohne Prüfung zu übergeben, öffnet dem Diebstahl die Tür. Abholer werden immer geprüft."),
        el("e", "text", "Bei Rückfragen erreichen Sie uns nur per Mail, da unsere Telefonanlage gestört ist.", true, "Verdächtig: Der Weg zur Rückfrage wird versperrt, damit niemand unter der bekannten Nummer nachfragt."),
      ],
      aufloesung: "Das ist ein Versuch, Ware abzugreifen: Gratis-Postfach, unbekannter Fahrer, keine Papiere und keine Rückfragemöglichkeit. Abholer werden mit Auftrag und Ausweis geprüft und bei Zweifeln wird unter der bekannten Nummer nachgefragt.",
    },
    {
      nummer: 4,
      istPhishing: false,
      elemente: [
        el("a", "absender", "Anna Weber, Disposition Kontor Nord <disposition@kontor-nord.example>", false, "Unauffällig: Eine bekannte Kundin und eine bekannte Domain, genau wie in früheren Aufträgen."),
        el("b", "betreff", "Auftrag 2024-118: Termin für die Abholung bestätigen", false, "Unauffällig: Der Betreff nennt eine bekannte Auftragsnummer."),
        el("c", "text", "Guten Tag, wie telefonisch besprochen bitten wir um Bestätigung der Abholung am Donnerstag zwischen 8 und 10 Uhr.", false, "Unauffällig: Der Bezug zu einem Telefonat lässt sich nachprüfen, die Bitte ist sachlich."),
        el("d", "text", "Die Ladepapiere liegen am Tor bereit. Rückfragen gern unter der bekannten Durchwahl.", false, "Unauffällig: Der Rückfrageweg bleibt offen und bekannt."),
      ],
      aufloesung: "Das ist eine echte Nachricht: bekannter Absender, bekannte Auftragsnummer, sachlicher Ton und ein offener Rückfrageweg.",
    },
    {
      nummer: 5,
      istPhishing: true,
      elemente: [
        el("a", "absender", "Paket-Zustellung <info@zustell-service-zoll.test>", true, "Verdächtig: Der Absender ist keiner bekannten Zustellfirma zuzuordnen."),
        el("b", "betreff", "Ihre Sendung wurde angehalten: Zollgebühr offen", true, "Verdächtig: Die Meldung nennt keine Sendung, keine Auftragsnummer und keinen Absender."),
        el("c", "text", "Zur Freigabe Ihrer Sendung ist eine Gebühr von 2,99 € zu zahlen. Andernfalls wird sie zurückgeschickt.", true, "Verdächtig: Eine kleine Summe senkt die Hemmschwelle, die Drohung erzeugt Druck. Gesammelt werden dabei Kartendaten."),
        el("d", "link", "Jetzt Gebühr zahlen → http://zustell-gebuehr-zahlen.test/pay", true, "Verdächtig: Die Seite gehört zu keinem bekannten Zusteller und fragt Zahlungsdaten ab."),
      ],
      aufloesung: "Das ist Phishing: unbekannter Absender, keine konkrete Sendung, kleine Gebühr als Köder und eine Zahlungsseite, die nicht zu einem bekannten Zusteller gehört.",
    },
    {
      nummer: 6,
      istPhishing: false,
      elemente: [
        el("a", "absender", "Rechnungswesen Nordlog <rechnungswesen@nordlog-transporte.example>", false, "Unauffällig: Dieselbe Domain wie in allen früheren Rechnungen dieses Frachtführers."),
        el("b", "betreff", "Rechnung 2024-0933 zu Auftrag 2024-118", false, "Unauffällig: Rechnungs- und Auftragsnummer lassen sich im eigenen System finden."),
        el("c", "text", "Anbei die Rechnung zu Ihrem Transportauftrag Hamburg - Kassel. Die Bankverbindung ist unverändert.", false, "Unauffällig: Es gibt keine Änderung der Bankdaten und keinen Zeitdruck."),
        el("d", "anhang", "Rechnung_2024-0933.pdf", false, "Unauffällig: Ein PDF mit einer erwarteten Rechnungsnummer ist der normale Fall."),
      ],
      aufloesung: "Das ist eine echte Rechnung: bekannte Domain, zu einem eigenen Auftrag passende Nummern, unveränderte Bankdaten und ein normaler Anhang. Trotzdem wird die Rechnung inhaltlich gegen Auftrag und Lieferung geprüft.",
    },
  ],
  abschlussmeldung: "Geschafft! Du erkennst Betrugsmaschen in der Lieferkette: neue Auftraggeber prüfen, Bankdaten nur nach Rückruf ändern und Abholer immer kontrollieren.",
};
