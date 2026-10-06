import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit): Kreuzworträtsel-Pool für den Kurs „Geprüfter Fachwirt für Gesundheits- und
 * Sozialwesen". 34 kurze, alltagsnahe Wörter aus allen sechs Handlungsbereichen der Kurstheorie
 * (content/fachwirt-gesundheit-soziales/, Rechtsstand dort: 29.09.2026). Der Server zieht bei jedem Start zehn
 * Wörter und legt das Gitter selbst an (Generator `kreuzwort-generator.ts`); darum gibt es hier keine
 * Gitterpositionen.
 *
 * Bewusst keine Rechtsdetails: keine Paragrafen, Zahlenwerte, Fristen, Beitragssätze oder Leistungsansprüche.
 * Entwurf — vor Verwendung durch echte Lernende fachlich prüfen (siehe Hinweise in den Kursdateien).
 */
export const kreuzwortraetselGesundheitSoziales: KreuzwortraetselPayload = {
  wortzahl: 10,
  woerter: [
    // Handlungsbereich 1: Planen, Steuern und Organisieren
    {
      nummer: 1,
      hinweis: "Beschreibt Zweck und Werte einer Organisation und ist die Basis für alle Ziele.",
      tipp: "Steht am Anfang der Zielentwicklung. Beginnt mit L.",
      loesung: "LEITBILD",
      bestaetigung: "Richtig! Aus dem Leitbild leiten Einrichtungen ihre strategischen und operativen Ziele ab.",
    },
    {
      nummer: 2,
      hinweis: "Vierfeld-Analyse aus Stärken, Schwächen, Chancen und Risiken.",
      tipp: "Englische Abkürzung mit vier Buchstaben.",
      loesung: "SWOT",
      bestaetigung: "Genau! Die SWOT-Analyse trennt interne Faktoren (Stärken, Schwächen) von externen (Chancen, Risiken).",
    },
    {
      nummer: 3,
      hinweis: "Stelle mit Leitungsbefugnis, die anderen Stellen Weisungen erteilen darf.",
      tipp: "Eine einfache Stelle darf das nicht. Beginnt mit I.",
      loesung: "INSTANZ",
      bestaetigung: "Genau! Eine Instanz ist eine Stelle mit Weisungsbefugnis gegenüber anderen Stellen.",
    },
    {
      nummer: 4,
      hinweis: "Berät die Leitung fachlich, darf aber keine Weisungen erteilen.",
      tipp: "Beispiel: die Qualitätsmanagement-Beauftragte.",
      loesung: "STABSSTELLE",
      bestaetigung: "Richtig! Stabsstellen unterstützen die Leitung beratend und ergänzen das Einliniensystem zum Stabliniensystem.",
    },
    {
      nummer: 5,
      hinweis: "Ablehnende Reaktion auf eine Veränderung, offen oder verdeckt.",
      tipp: "Wenn Beteiligte früh einbezogen werden, wird er oft kleiner.",
      loesung: "WIDERSTAND",
      bestaetigung: "Genau! Widerstand kann auch berechtigte Hinweise auf Schwachstellen im Vorhaben enthalten.",
    },
    {
      nummer: 6,
      hinweis: "Merkhilfe für gute Ziele: spezifisch, messbar, akzeptiert, realistisch, terminiert.",
      tipp: "Englisches Wort für „klug“ oder „schlau“, fünf Buchstaben.",
      loesung: "SMART",
      bestaetigung: "Richtig! Nach den SMART-Kriterien sind Ziele eindeutig, überprüfbar und mit einem Termin versehen.",
    },
    // Handlungsbereich 2: Qualität, Risiko und Selbstmanagement
    {
      nummer: 7,
      hinweis: "Systematische, unabhängige Prüfung, ob festgelegte Anforderungen erfüllt werden.",
      tipp: "Kann intern oder durch eine externe Stelle erfolgen.",
      loesung: "AUDIT",
      bestaetigung: "Genau! Ein Audit prüft systematisch und dokumentiert, ob Anforderungen eingehalten werden.",
    },
    {
      nummer: 8,
      hinweis: "Kreislauf aus Planen, Umsetzen, Überprüfen und Anpassen.",
      tipp: "Vier englische Anfangsbuchstaben.",
      loesung: "PDCA",
      bestaetigung: "Richtig! Der PDCA-Zyklus dient der laufenden Verbesserung von Prozessen.",
    },
    {
      nummer: 9,
      hinweis: "Geäußerte Unzufriedenheit, aus der eine Einrichtung lernen kann.",
      tipp: "Sie sollte leicht und ohne Hürden angenommen werden.",
      loesung: "BESCHWERDE",
      bestaetigung: "Genau! Gut ausgewertete Beschwerden zeigen wiederkehrende Schwachstellen auf.",
    },
    {
      nummer: 10,
      hinweis: "Mögliches Ereignis mit Schaden, bewertet nach Wahrscheinlichkeit und Ausmaß.",
      tipp: "Eine Matrix hilft, es sichtbar zu machen.",
      loesung: "RISIKO",
      bestaetigung: "Richtig! Risiken werden erkannt, bewertet, gesteuert und überwacht.",
    },
    {
      nummer: 11,
      hinweis: "Faktor, der Arbeitszeit unproduktiv bindet, z. B. ständige Unterbrechungen.",
      tipp: "Auch Perfektionismus gehört dazu. Beginnt mit Z.",
      loesung: "ZEITDIEB",
      bestaetigung: "Genau! Wer seine Zeitdiebe kennt, kann sie gezielt abstellen.",
    },
    // Handlungsbereich 3: Kommunikation, Team und Projekte
    {
      nummer: 12,
      hinweis: "Rückmeldung zu beobachtetem Verhalten, am besten als Ich-Botschaft formuliert.",
      tipp: "Englisches Wort, beginnt mit F.",
      loesung: "FEEDBACK",
      bestaetigung: "Richtig! Gutes Feedback beschreibt Verhalten, statt die Person zu bewerten.",
    },
    {
      nummer: 13,
      hinweis: "Phase der Teamentwicklung mit ersten offenen Konflikten und Streit um Rollen.",
      tipp: "Folgt auf das Kennenlernen (Forming).",
      loesung: "STORMING",
      bestaetigung: "Genau! In der Storming-Phase ringt das Team um Rollen und Aufgaben, bevor es gemeinsame Regeln findet.",
    },
    {
      nummer: 14,
      hinweis: "Einmaliges, zeitlich begrenztes Vorhaben mit festem Ziel und begrenzten Mitteln.",
      tipp: "Das Gegenteil einer wiederkehrenden Routineaufgabe.",
      loesung: "PROJEKT",
      bestaetigung: "Richtig! Ein Projekt ist einmalig und befristet und hat eine eigene Organisation.",
    },
    {
      nummer: 15,
      hinweis: "Wichtiges, terminiertes Zwischenergebnis auf dem Weg durch ein Vorhaben.",
      tipp: "Endet auf -stein. Beginnt mit M.",
      loesung: "MEILENSTEIN",
      bestaetigung: "Genau! Meilensteine machen den Fortschritt eines Projekts überprüfbar.",
    },
    {
      nummer: 16,
      hinweis: "Freiwillige, unbezahlte Mitarbeit, zum Beispiel bei Besuchsdiensten.",
      tipp: "Ersetzt keine ausgebildete Fachkraft. Beginnt mit E.",
      loesung: "EHRENAMT",
      bestaetigung: "Richtig! Ehrenamtliche ergänzen das Team, übernehmen aber keine fachpflegerischen Aufgaben.",
    },
    {
      nummer: 17,
      hinweis: "Balkendiagramm, das Arbeitspakete und ihre zeitliche Lage zeigt.",
      tipp: "Benannt nach seinem Erfinder, fünf Buchstaben.",
      loesung: "GANTT",
      bestaetigung: "Genau! Das Gantt-Diagramm stellt Arbeitspakete und ihre Dauer anschaulich dar.",
    },
    // Handlungsbereich 4: Finanzierung, Rechnungswesen und Controlling
    {
      nummer: 18,
      hinweis: "Stichtagsbezogene Gegenüberstellung von Mittelverwendung und Mittelherkunft.",
      tipp: "Zusammen mit der GuV bildet sie den Jahresabschluss.",
      loesung: "BILANZ",
      bestaetigung: "Richtig! Die Bilanz zeigt Aktiva und Passiva zu einem bestimmten Stichtag.",
    },
    {
      nummer: 19,
      hinweis: "Bestandsaufnahme aller Vermögensgegenstände und Schulden zu einem Stichtag.",
      tipp: "Das daraus entstehende Verzeichnis heißt Inventar.",
      loesung: "INVENTUR",
      bestaetigung: "Genau! Die Inventur ist der Vorgang, das Inventar das Ergebnis.",
    },
    {
      nummer: 20,
      hinweis: "Ab dieser Menge decken die Deckungsbeiträge die Fixkosten (Gewinnschwelle).",
      tipp: "Englisch für Gewinnschwelle, neun Buchstaben.",
      loesung: "BREAKEVEN",
      bestaetigung: "Richtig! Ab dem Break-even-Punkt entsteht Gewinn.",
    },
    {
      nummer: 21,
      hinweis: "Verdichtete Zahl, die vor allem im Zeitvergleich Entwicklungen zeigt.",
      tipp: "Beispiele: Auslastung oder Fachkraftanteil.",
      loesung: "KENNZAHL",
      bestaetigung: "Genau! Kennzahlen entfalten ihren Nutzen im Zeitvergleich und im Soll-Ist-Vergleich.",
    },
    {
      nummer: 22,
      hinweis: "Fähigkeit, Zahlungen jederzeit rechtzeitig leisten zu können.",
      tipp: "Ein Gewinn allein sichert sie nicht.",
      loesung: "LIQUIDITAET",
      bestaetigung: "Richtig! Gerade wenn Zahlungseingänge sich verzögern, ist die Liquiditätsplanung wichtig.",
    },
    {
      nummer: 23,
      hinweis: "Geplanter Wert, der im Controlling mit dem tatsächlichen Wert verglichen wird.",
      tipp: "Gegenstück zum „Ist“. Vier Buchstaben.",
      loesung: "SOLL",
      bestaetigung: "Genau! Im Soll-Ist-Vergleich werden geplante und tatsächliche Werte gegenübergestellt.",
    },
    {
      nummer: 24,
      hinweis: "Versicherungsträger, mit dem Einrichtungen erbrachte Leistungen abrechnen.",
      tipp: "Gibt es als Kranken- und als Pflege-Variante.",
      loesung: "KASSE",
      bestaetigung: "Richtig! Kranken- und Pflegekassen sind zentrale Kostenträger für Einrichtungen.",
    },
    // Handlungsbereich 5: Personal
    {
      nummer: 25,
      hinweis: "Erfahrene Fachkraft begleitet neue Kolleginnen und Kollegen eher informell.",
      tipp: "Ein Mentor oder eine Mentorin steht dabei zur Seite.",
      loesung: "MENTORING",
      bestaetigung: "Genau! Mentoring ist eine informelle Begleitung durch erfahrene Fachkräfte.",
    },
    {
      nummer: 26,
      hinweis: "Meist professionelle, individuelle Begleitung bei der beruflichen Entwicklung.",
      tipp: "Kennt man auch aus dem Sport. Beginnt mit C.",
      loesung: "COACHING",
      bestaetigung: "Richtig! Coaching begleitet einzelne Personen gezielt bei ihrer Weiterentwicklung.",
    },
    {
      nummer: 27,
      hinweis: "Geregelter Weg in einen Beruf mit Praxis im Betrieb und Unterricht in der Schule.",
      tipp: "Wer sie macht, heißt Azubi.",
      loesung: "AUSBILDUNG",
      bestaetigung: "Genau! In der Pflege verbindet die Ausbildung betriebliche Praxis mit schulischem Lernen.",
    },
    {
      nummer: 28,
      hinweis: "Aufgaben samt Verantwortung an andere Personen übergeben.",
      tipp: "Ein klassisches Führungsinstrument. Beginnt mit D.",
      loesung: "DELEGATION",
      bestaetigung: "Richtig! Delegieren entlastet die Führung und stärkt die Eigenverantwortung im Team.",
    },
    {
      nummer: 29,
      hinweis: "Klärung eines Konflikts mit Hilfe einer neutralen dritten Person.",
      tipp: "Die Parteien finden die Lösung selbst. Beginnt mit M.",
      loesung: "MEDIATION",
      bestaetigung: "Genau! In der Mediation hilft eine neutrale Person, damit die Beteiligten selbst eine Lösung finden.",
    },
    {
      nummer: 30,
      hinweis: "Etwas, das zu Leistung und Bindung motiviert, z. B. flexible Dienstpläne.",
      tipp: "Auch nicht-monetäre gibt es. Beginnt mit A.",
      loesung: "ANREIZ",
      bestaetigung: "Richtig! Nicht-monetäre Anreize wie Fortbildung stärken die Bindung an die Einrichtung.",
    },
    // Handlungsbereich 6: Marketing
    {
      nummer: 31,
      hinweis: "Ausrichtung des Angebots an Bedarf und Markt, im Sozialwesen mit ethischen Grenzen.",
      tipp: "Dazu gehören Marktanalyse, Ziele und Instrumente-Mix.",
      loesung: "MARKETING",
      bestaetigung: "Genau! Im Gesundheits- und Sozialwesen zählen wirtschaftliche Tragfähigkeit und bedarfsgerechte Versorgung gleichermaßen.",
    },
    {
      nummer: 32,
      hinweis: "Teilgruppe eines Gesamtmarkts mit ähnlichen Merkmalen.",
      tipp: "Man bildet sie durch Einteilen, z. B. nach Alter.",
      loesung: "SEGMENT",
      bestaetigung: "Richtig! Marktsegmente ermöglichen eine Kommunikation, die zu den jeweiligen Erwartungen passt.",
    },
    {
      nummer: 33,
      hinweis: "Bezahlte, zielgerichtete Kommunikation zur Förderung des Absatzes.",
      tipp: "Zielt anders als PR direkt auf den Absatz.",
      loesung: "WERBUNG",
      bestaetigung: "Genau! Werbung im Gesundheits- und Sozialwesen muss sachlich und nachweisbar bleiben.",
    },
    {
      nummer: 34,
      hinweis: "Personenkreis, den eine Einrichtung mit ihrem Angebot erreichen will.",
      tipp: "Oft mehr als nur die Person selbst, z. B. auch Angehörige.",
      loesung: "ZIELGRUPPE",
      bestaetigung: "Richtig! Im Pflegebereich sind leistungsnehmende und entscheidende Personen oft nicht dieselben.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis noch einmal und achte auch auf die Länge des Wortes.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Begriffe aus dem Gesundheits- und Sozialwesen wiederholt, von Organisation und Qualität über Finanzen bis zu Personal und Marketing. Jedes Rätsel ist anders — spiel gern noch eins!",
};
