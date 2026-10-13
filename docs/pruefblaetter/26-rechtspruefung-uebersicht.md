# Prüfblatt 26 — Rechtsprüfung: Übersicht und Auftrag (Iteration 22, Paket P8, Öffnung für Minderjährige)

Stand 13.10.2026 · Zweck: Grundlage, um die förmliche Rechtsprüfung zu beauftragen. Das Blatt beschreibt, **was** geprüft werden muss, **was bereits (nur durch KI) vorgeprüft** ist und **was bis zur Prüfung gesperrt bleibt**. Es ist keine Rechtsberatung und ersetzt keine. Alle Aussagen über Normen sind Orientierung für die prüfende Person, nach unserem Verständnis und ohne Gewähr.

## 1. Was gesperrt bleibt, bis die Prüfung vorliegt

| Bereich | Sperre | Wer prüft | Wo steht es |
| --- | --- | --- | --- |
| Förmliche Prüfung der rechtsnahen Theorie (alle Kurse) | Inhalte sind im Kurs, tragen aber den Vermerk `rechtsstand` im Dateikopf („vor Verwendung durch echte Lernende prüfen“) | Fachanwältin oder Fachanwalt, je Rechtsgebiet; für Rechnungswesen siehe Prüfblatt 25 | Entwicklungsplan, Iteration 22 |
| Paket P8 (neue rechtsnahe Inhalte im Technischen Fachwirt) | Nichts davon geschrieben oder eingespielt | Arbeitsschutz- und Umweltrechtskundige Person | `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md` |
| Öffnung für Minderjährige (Kohorten, AGB/Datenschutz, Mathe-Kurs) | Registrierung nur ab 18 Jahren (`ALLOW_MINORS=false`) | Datenschutz- und Jugendschutzrecht | Entwicklungsplan, Iteration 22, „Vor Öffnung für Minderjährige“ |

## 2. Was bereits geprüft ist (nur KI, keine Rechtsberatung)

- **Theorie weiterer Kurse gegen die Normtexte (11.10.2026):** 131 Stellen in vier Bereichen geprüft, davon 24 falsch oder veraltet, 69 ungenau, 31 richtig, 7 nicht prüfbar. 93 Stellen sind korrigiert (169 Ersetzungsblöcke in Theorie, Karteikarten, Quizfragen, Fallaufgaben und Fachgespräch-Erwartungen), siehe `docs/entwuerfe/theorie-rechtspruefung.md` und die Teilentwürfe A bis D.
- **Immobilien-Theorie (11.10.2026):** vier Zweifelsstellen, siehe `docs/entwuerfe/immobilien-rechtspruefung.md`.
- **Grenzen dieser Prüfung:** Die Normtexte wurden teils nur sinngemäß gelesen. **Nicht im Primärtext gelesen:** DSGVO (Spiegelung statt EUR-Lex), CISG, CMR, Art. 97 EGAO, einzelne BGB-Normen, § 48 HGB, Versicherungsvermittlungsverordnung. **Rechtsstand nach Juli 2026 nur aus Zweitquellen:** Reform des Produkthaftungsgesetzes (Bundestag 08.10.2026, Verkündung unbestätigt), Pflichten nach dem Lieferkettensorgfaltspflichtengesetz, geplante Aufhebung von § 38 Abs. 1 BDSG bis Ende 2026, Zweites Betriebsrentenstärkungsgesetz.

## 3. Offene Punkte der förmlichen Prüfung (Iteration 22)

Auftragsumfang laut Entwicklungsplan. Je Punkt: Was zu lesen oder zu bestätigen ist.

| Nr. | Gegenstand | Aufgabe der prüfenden Person |
| --- | --- | --- |
| 3.1 | DSGVO, CISG, CMR | Zweitlesung der Theorietexte gegen den Primärtext (EUR-Lex bzw. UN-Text) |
| 3.2 | Produkthaftungsgesetz-Reform | Bestätigen, ob die Reform verkündet und in Kraft ist; Theorie in `3.1` des Technischen Fachwirts (vier Nennungen des ProdHaftG) und der übrigen Kurse an den Stand anpassen |
| 3.3 | Lieferkettensorgfaltspflichtengesetz | Rechtsstand und Anwendungsbereich nach Januar 2026 bestätigen |
| 3.4 | § 38 BDSG (Datenschutzbeauftragte) | Bestätigen, ob die Aufhebung beschlossen ist; Theorie Datenschutz anpassen |
| 3.5 | Riester-Reform und Betriebsrentenstärkungsgesetz | Rechtsstand für Versicherungs- und Vorsorgekurs bestätigen (Altersvorsorgereformgesetz BGBl. 2026 I Nr. 156 wurde im Volltext gelesen, die Folgegesetze nicht) |
| 3.6 | Landesheimrecht | Prüfung der übrigen 15 Länder (ein Land ist geprüft); betrifft den Kurs Gesundheit und Soziales |
| 3.7 | `rechtsstand`-Felder | Nach der Prüfung in allen Dateiköpfen auf das Prüfdatum setzen (das erledigen wir) |

## 4. Technischer Fachwirt: wo Rechtsvorschriften vorkommen

Gezählt in den Theorietexten (`content/technischer-fachwirt/*/`, Abschnitt „Theorie“): Nennungen von „§“ und der meistgenannten Gesetze. Themen ohne Nennung von Rechtsvorschriften sind nicht aufgeführt.

| Thema | „§“ | Meistgenannte Rechtsvorschriften | Status |
| --- | --- | --- | --- |
| WQ3 3.1 Bürgerliches Recht und Handelsrecht | 32 | BGB (15), HGB (10), ProdHaftG (4), GmbHG (1) | KI-geprüft und korrigiert 11.10.2026 (Teil B); ProdHaftG-Reform offen (3.2) |
| WQ3 3.2 Arbeitsrecht Grundlagen | 22 | BetrVG (9), AÜG (4), KSchG (3), ArbZG (3), BGB (2) | KI-geprüft und korrigiert (Teil A: Leiharbeit, Nachweisgesetz); förmliche Prüfung offen |
| WQ3 3.3 Vertragsgestaltung | 17 | BGB (15), CISG (3) | KI-geprüft; CISG nicht im Primärtext gelesen (3.1) |
| WQ3 3.4 Unternehmensrelevantes Steuerrecht | 3 | KStG (2), UStG (1) | KI-geprüft (Teil B) |
| WQ2 2.1 Finanzbuchhaltung und Jahresabschluss | 12 | HGB (10), AO (1) | **Prüfblatt 25** (vier Abschnitte und vier Fachgesprächsfragen) |
| WQ1 1.4 Unternehmenszusammenschlüsse | 1 | GWB (2) | nicht gesondert geprüft; Kartellrecht kurz |
| HQ3 10.3 Arbeitsschutz und Arbeitssicherheit | 1 | ArbSchG (2) | nicht gesondert geprüft; Arbeitsschutzrecht ist Teil von P8 |

**Zu 10.2 (Umweltmanagement) und 10.3:** Die Verordnung nennt als Prüfungsinhalt „Umweltschutztechniken und deren rechtliche Grundlagen kennen“ sowie „Arbeitsschutz und Arbeitssicherheit unter Berücksichtigung der rechtlichen Grundlagen sicherstellen“ (§ 6 Abs. 3 TechFachwPrV). Der Kurs behandelt beides bisher nur im Überblick; die Vertiefung ist Paket P8.

## 5. Paket P8 (Rechtsnahes im Technischen Fachwirt)

Geplanter Umfang laut Entwurf (`tf-rahmenplan-weitere-pakete.md`): Bundes-Immissionsschutzgesetz, Gefahrstoffe und GHS im Detail, Betriebssicherheitsverordnung, Maschinenrichtlinie und CE-Kennzeichnung, Brandschutz, Erste Hilfe, Unterweisung nach § 12 ArbSchG, Lärm- und Vibrationsschutz, Ausbildungsplanung. Aus den Ergänzungsentwürfen kommen hinzu (bewusst ausgeklammert): Zulässigkeit von Akkordarbeit, Mindestlohn, Tarifverträge und Mitbestimmung bei Entgeltsystemen (HQ2), Gefahrstoffe und Schutzmaßnahmen bei Beizen, Eloxieren, Verzinken und Salzbädern (TQ2), Prüfpflichten für Druckbehälter, Kondensatentsorgung, Arbeitsschutz bei Hydraulik und Druckluft, Maschinensicherheit (TQ3), Berufsbildungsrecht für die Ausbildungsplanung (HQ4, § 6 Abs. 4 Nr. 5).

**Vorschlag, damit die Prüfung später nicht bei null beginnt:** Wir schreiben die Entwürfe für P8 **nur als Entwurf** unter `docs/entwuerfe/` (nichts davon in `content/`, nichts für Lernende sichtbar), mit Normfundstellen und Quellen, sodass die prüfende Person die Texte gleich mit der Vorlage prüft. Eingespielt wird erst nach Freigabe. Das kostet keine Freigabe vorab.

## 6. Öffnung für Minderjährige: Prüfauftrag

Heute gilt: Registrierung und Anmeldung nur ab 18 Jahren (Schalter `ALLOW_MINORS`, Standard aus); der Eltern-Einwilligungsablauf ist im Code vorhanden. Vor einer Öffnung zu klären:

| Nr. | Frage | Art |
| --- | --- | --- |
| 6.1 | Kohorten: Die Leitung wird nicht geprüft, jede eingeschriebene Person kann eine anlegen. Zulässig, wenn Minderjährige beitreten? | Rechtlich (Jugendschutz) |
| 6.2 | Kohorten: Der Beitritt befreundet automatisch mit allen Mitgliedern, auch zwischen Erwachsenen und Minderjährigen (mit Elternfreigabe). Zulässig? | Rechtlich (Jugendschutz) |
| 6.3 | Kohorten: Die Leitung sieht Anzeigename, Beitrittsdatum und Kennzahlen der Gruppe; die Datenschutzerklärung nennt Kohorten noch nicht. | Rechtlich (Datenschutz) und Text |
| 6.4 | Reicht die allgemeine Elternfreigabe für soziale Funktionen, oder braucht es eine eigene Freigabe für Kohorten? | Rechtlich (Einwilligung) |
| 6.5 | Angepasste AGB- und Datenschutz-Formulierungen (Altersgrenze 18) prüfen. | Rechtlich |
| 6.6 | Bei Bestandsnutzern bestehende Sitzungen minderjähriger Konten widerrufen. | Technisch, erledigen wir |
| 6.7 | Mathematik-Kurs (Klasse 9) erst nach produktivem Eltern-Einwilligungsablauf freigeben (Reihenfolge laut Projektregeln). | Technisch und organisatorisch |
| 6.8 | Zugang minderjähriger Auszubildender zu den IHK-Kursen (Eltern-Einwilligungsablauf, Fachinformatiker-Kurse). | Produktentscheidung, zurückgestellt |

Mögliche Maßnahmen, die die prüfende Person bewerten kann (aus dem Entscheidungsprotokoll vom 10.10.2026): Kohorten für Minderjährige nur mit eigener Elternfreigabe oder nur mit geprüften Leitungen; keine automatische Freundschaft zwischen Erwachsenen und Minderjährigen.

## 7. Was wir von Ihnen brauchen

1. **Wer prüft?** Je Rechtsgebiet eine Person (Arbeitsrecht, Handels- und Steuerrecht, Datenschutz und Jugendschutz, Arbeits- und Umweltschutzrecht, Versicherungsrecht). Für das Rechnungswesen genügt eine Fachlehrkraft oder Bilanzbuchhalter:in (Prüfblatt 25).
2. **Was liefern wir?** Je Rechtsgebiet eine Datei mit Stellen, Wortlaut, Normfundstellen und Prüffragen im Format von Prüfblatt 25 (kann ich erzeugen).
3. **Frist und Form der Rückmeldung:** „frei“ oder „Änderung: …“ je Stelle; wir arbeiten ein und aktualisieren die `rechtsstand`-Felder.

Rückmeldung zu diesem Blatt: Freigabe der Entwürfe für P8 (Abschnitt 5) ☐ ja ☐ nein ☐ später
