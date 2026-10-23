# Prüfung P-AY Teil B (Fachinformatiker, vier Kurse): neues Thema `fu6/6.7` „Cyber Resilience Act“, Fall F-FU6-06

Stand 23.10.2026. Geprüft: `fi-6.7-cyber-resilience-act.md`, `fi-faelle-b.md`, `rechtsangaben-b.md`, `ersetzungen-b.json` (`[]`). Maßstab: `auftrag.md`, `fachinformatiker-r4-auswertung.md` (Teil B), Prüfberichte früherer Pakete. Nichts geändert, nichts eingespielt, nichts committet.

## Gesamturteil

**Überarbeiten, dann freigabefähig.** Das Thema ist rechtlich insgesamt sauber und gut abgesichert; ich habe in Theorie, Karten und Quiz **keinen erfundenen Rechtssatz und keinen Zahlenfehler** gefunden. Die Schwächen liegen im **Fall** (Musterlösung wendet die eigene Altprodukt-Regel nicht durchgängig an; Bewertung „kein schwerwiegender Vorfall“ stützt sich auf einen Prüfmaßstab, den Art. 14 Abs. 5 so nicht setzt; Abschlussbericht-Beginn nicht festgelegt) und in einigen Stellen, an denen Zeitbezug (Pflichten erst ab 11.12.2027) oder Hedging fehlt.

Befunde: **1 hoch, 11 mittel, 14 niedrig.**

## Methode und Quellen

- **Rohtext selbst gelesen:** VO (EU) 2024/2847 vollständig deutsch (publications.europa.eu, CELEX 32024R2847, per `curl` als XHTML; Text: Scratchpad `prf-fi-b-cra.txt`): Erwägungsgründe 9 bis 20, Art. 1 bis 8, 13 bis 24, 26, 27, 28 bis 33, 35, 52 bis 54, 64, 69, 71, Anhang I, II, III, IV, VII. Durchführungsverordnung (EU) 2025/2392 (CELEX 32025R2392): Kopf (vom 28.11.2025, ABl. 01.12.2025), Erwägungsgründe zu Kernfunktion/Router mit Firewall, Kategoriebeschreibungen, Inkrafttreten.
- **Sekundärquellen (nur zur Plausibilität):** Seite der Kommission „CRA reporting“ (Plattform „operational as of 11 September 2026“; Verwalter-Meldepflichten laut Kommission ab 11.12.2027), Websuche zum Bundestagsbeschluss (Beschlussempfehlung Drs. 21/8623 vom 14.10.2026; Beschluss 15.10.2026 laut Fachpresse; Bundesrat und Verkündung nicht belegt) und zu den Kommissionsleitlinien vom 27.07.2026 (über 80 Seiten, unverbindlich). Das passt zu den Hedges im Entwurf. Ein Kommentar vom 09.09.2026 meldete die Plattform noch nicht live; das ist durch die Kommissionsseite überholt, aber ein Grund für „Wiedervorlage“ (siehe Befund 24).
- **Nachrechnen:** Skript `prf-fi-b-rechnen.cjs` im Scratchpad (Wochentage, +24/+72 Stunden, +14 Tage, 456 Tage, Inkrafttreten). **Alle Daten, Wochentage und Fristen im Thema (Rechenbeispiele 1 bis 4, Q-06, Q-07, Q-10), in der Fallaufgabe (09.11. + 24 h = Di 10.11.2026 16:40; + 72 h = Do 12.11.2026 16:40; 20.11. + 14 Tage = Fr 04.12.2026) und im Zeitplan stimmen** (11.09.2026 Freitag; 11.12.2027 Samstag; 456 Tage; 20.11.2024 + 20 Tage = 10.12.2024; 11.06.2026 Donnerstag; 11.12.2026 Freitag). Kein Endtag fällt auf ein Wochenende, außer der Stundenfrist (Sa 21.11.2026 im Beispiel 1), die nach der gesetzten Zählweise nicht verschoben wird.
- **Werkzeug:** `node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` mit eigener Config (`prf-fi-b-test-anwendungsentwicklung`, `prf-fi-b-test-systemintegration`, `neueThemen`, `kurs_slug` wird gesetzt, `faelle` Ziel `fu6`): in beiden Kursen **ok**, `validate-content` 0 Verstöße, Karten 12, Quizblöcke 14 (Kurzantworten 4), Fall F-FU6-06 mit 4 Teilaufgaben, 20 Punkten, 5 Lösungszeilen. `siebenwort` (n = 7): nur erwartbare Formel-/Konventionstreffer (Zählregel-Satz, Verweisformeln, Stand-Hinweis); `zahlen`: keine Kollision der Beispielzahlen (nur 2.392/2.847/2,5 als Verordnungs- bzw. Prozentzahlen).

## Was ich am Rohtext bestätigt habe (keine Beanstandung)

Art. 1 bis 3 (Begriffe Nr. 1, 2, 12 bis 17, 20 bis 22, 30, 39 bis 42, 48), Art. 2 Ausnahmen (Abs. 2 bis 4, 6, 7), Art. 5 Abs. 2 (Beschaffung; Erwägungsgrund 13 für private Einrichtungen), Art. 13 Abs. 2 bis 9, 12, 13, 15 bis 19, 22, 24, Art. 14 Abs. 1 bis 8 (24 h / 72 h / 14 Tage nach Verfügbarkeit einer Korrektur- **oder Risikominderungsmaßnahme** bzw. ein Monat nach Übermittlung der 72-Stunden-Meldung; „ab Kenntnis“; gleichzeitig an Koordinator-CSIRT und ENISA über die Plattform am Endpunkt der Hauptniederlassung; Nutzerinformation), Art. 15 (freiwillig, auch Dritte), Art. 17 Abs. 4, Art. 18 Abs. 2, Art. 19 bis 22, Art. 24, 27 Abs. 1, 28 Abs. 4, 30 Abs. 1, 32 Abs. 1 bis 5, 33 Abs. 5, 35 Abs. 2, 52, 53, 54, Art. 64 Abs. 2 bis 5 und 10, Art. 69 Abs. 2 und 3, Art. 71 Abs. 1 und 2, Anhang I Teil I Nr. 2 Buchst. a bis m und Teil II Nr. 1 bis 8, Anhang II Nr. 1 bis 9, Anhang III Klasse I/II, Anhang IV, Anhang VII Nr. 2 Buchst. b und Nr. 8, Durchführungsverordnung (Kernfunktion; „Router mit integrierter Firewall-Funktion“). Mindest-Unterstützungszeitraum fünf Jahre (Art. 13 Abs. 8): richtig. Bußgeldrahmen nur als Prozentsätze (2,5 % / 2 % / 1 %), keine Euro-Beträge: richtig. Zeitplan 10.12.2024 / 11.06.2026 / 11.09.2026 / 11.12.2027: richtig. Keine Minderjährigen, keine Euro-Beträge, Doppelpunkt-Gendern, Stand-Hinweis in jedem Rechtsabschnitt (alle 13 Abschnitte geprüft): erfüllt. Der Entwurf verschweigt nichts Wesentliches bei Open Source (Geschäftstätigkeit, Beitragende, Verwalter) und Ausnahmen (Medizinprodukte, Fahrzeuge, Luftfahrt, Schiffsausrüstung, Ersatzteile, Verteidigung).

---

## Befunde HOCH

### 1. Fallaufgabe, Musterlösung Teilaufgabe 3: Altprodukt-Regel wird nicht angewandt, Fakten außerhalb des Sachverhalts
`fi-faelle-b.md:27` (mit `:21`)

Teilaufgabe 1 lehrt (richtig): Für die zwischen März 2025 und Juni 2026 in Verkehr gebrachten Gateways gelten derzeit **nur** die Pflichten nach Art. 14 (Meldungen, Nutzerinformation), alle übrigen Anforderungen erst ab 11.12.2027 und nur nach wesentlicher Änderung (Art. 69 Abs. 2, 3). Die Musterlösung zu Teilaufgabe 3 behandelt dann aber als geltende Pflichten bzw. als Maßstab, was zu den **noch nicht anwendbaren** Pflichten gehört:
- „Die Schwachstelle in der Bibliothek wird den Betreuenden … gemeldet“ (Art. 13 Abs. 6), „die Sorgfaltspflicht gilt auch für Open-Source-Komponenten“ (Art. 13 Abs. 5), „Der Vorgang wird … dokumentiert“ (Art. 13 Abs. 7), „über einen sicheren Verteilweg ausgeliefert“ (Anhang I Teil II Nr. 7): alles Pflichten, die für diese Exemplare nach Art. 69 Abs. 2 noch nicht gelten.
- „Mithilfe der **Software-Stückliste** wird geprüft …“: Eine Stückliste kommt im Sachverhalt nicht vor, und ihre Pflicht gilt für diese Altgeräte nicht (Anhang I Teil II Nr. 1). Verstoß gegen „Musterlösung nutzt nur Fakten aus dem Sachverhalt“.
- Die Aufgabenstellung („muss oder sollte“) trennt Pflicht und Empfehlung nicht, das Raster (je 1 Punkt für Betreuende, weitere Produkte, Update/Verteilung, Dokumentation) belohnt auch Nicht-Pflichten ohne Kennzeichnung. Teilaufgabe 3 widerspricht damit der eigenen Lehre aus Teilaufgabe 1 und dem Kernpunkt, den der Auftrag ausdrücklich prüfen lässt.

**Vorschlag:** Musterlösung in zwei Sätzen gliedern: (a) *Rechtlich schon verpflichtend:* Nutzerinformation über Schwachstelle und Gegenmaßnahmen (Art. 14 Abs. 8), die drei Meldestufen. (b) *Nicht verpflichtend für diese Altgeräte, aber sachgerecht oder ab 11.12.2027 Pflicht:* Meldung an die Betreuenden der Bibliothek, Prüfung weiterer betroffener Produkte (bei Vorhandensein einer Stückliste mit deren Hilfe, sonst über Build-Unterlagen: im Sachverhalt ergänzen „Brevanta führt für die Firmware eine Liste der eingebundenen Bibliotheken“ oder die Stückliste streichen), zügiges, sicher verteiltes Update, Dokumentation. Raster entsprechend beschriften („Pflicht heute“ / „sachgerecht“) und die Aufgabe auf „…ableiten, welche Schritte schon rechtlich geboten sind und welche sachgerecht sind“ umstellen. Der Satz „der Verweis auf das Drittprojekt entlastet nicht“ bleibt richtig (Hersteller des Gesamtprodukts), die Begründung über die Sorgfaltspflicht nach Art. 13 Abs. 5 aber nur als „ab 11.12.2027 ausdrücklich verpflichtend“. Dasselbe gilt für den Satz „damit die Abschlussfrist beginnen kann“ (siehe Befund 4): Das Update wird zur Gefahrenabwehr bereitgestellt, nicht um eine Frist zu starten.

---

## Befunde MITTEL

### 2. Fall Teilaufgabe 2: Begründung „kein schwerwiegender Sicherheitsvorfall“ setzt falschen Maßstab; Alternativfall unvollständig
`fi-faelle-b.md:26` (mit `:13`)

Die Musterlösung begründet „nicht festgestellt“ mit „keine Änderung von Konfigurationen oder Daten“. Art. 14 Abs. 5 Buchst. a stellt aber auf die Fähigkeit des Produkts ab, Verfügbarkeit, Authentizität, Integrität oder Vertraulichkeit sensibler oder wichtiger Daten oder Funktionen zu schützen, und zwar auch, wenn der Vorfall sich so **auswirken kann** („auswirkt oder auswirken kann“); Buchst. b erfasst die Einführung böswilligen Codes, die eintreten **kann**. Eine unbefugte Anmeldung über einen Fehler in der Anmeldefunktion eines Fernwartungsportals für Industrie-Gateways berührt die Authentizität/Zugangskontrolle des Produkts schon dem Muster nach; ob die abgerufenen Statusdaten „sensibel oder wichtig“ sind, ist offen. Die Bewertung ist also **Auslegung**, nicht „nicht festgestellt, weil nichts geändert wurde“. Zudem sagt die Musterlösung bei der akzeptierten Alternative nur, die Fristen 24 und 72 Stunden seien „dieselben“; der **Abschlussbericht** wäre dann ein Monat nach der 72-Stunden-Meldung (Meldung spätestens Do 12.11.2026 16:40 Uhr, also bis 12.12.2026, ein Samstag), nicht 04.12.2026. Das Raster „Abschlussbericht 1 Punkt“ und die Folgefehlerzeile decken diese Variante nicht ab.

**Vorschlag:** Entweder (a) Sachverhalt so schärfen, dass die Frage eindeutig ist (z. B. „abgerufen wurden nur Statusmeldungen ohne Bezug zu Personen oder Produktionsdaten; Konfigurationsrechte bestehen über die Anmeldefunktion nicht“ und den Vorfall dennoch als Auslegung kennzeichnen), oder (b) Musterlösung umformulieren: „Ob zusätzlich ein schwerwiegender Sicherheitsvorfall vorliegt, ist Auslegung (Art. 14 Abs. 5 stellt auch darauf ab, ob sich der Vorfall negativ auswirken kann). Beide Bewertungen werden mit Begründung akzeptiert. Wer einen Vorfall annimmt, ermittelt den Abschlussbericht mit einem Monat nach Übermittlung der 72-Stunden-Meldung (bei Meldung zum spätesten Zeitpunkt: 12.12.2026)“, und im Raster/Folgefehler ergänzen, dass der Abschlussbericht in der Vorfall-Variante am Meldezeitpunkt bewertet wird. Im Lerntext Abschnitt 8 zusätzlich den Begriff „Sicherheitsvorfall mit Auswirkungen auf die Sicherheit des Produkts“ (Art. 3 Nr. 44) in einem Satz erklären (siehe Befund 8).

### 3. Fall Teilaufgabe 4 und Lerntext Abschnitt 12: „kann beim nächsten Kauf verlangen“ ohne Zeitbezug und ohne Rechtsgrundlage
`fi-faelle-b.md:28`, `fi-6.7-cyber-resilience-act.md:129`

- Die Musterlösung zählt auf, was Tannberg „beim nächsten Kauf … verlangen kann“ (Konformitätserklärung, CE, Enddatum, Kontaktstelle, kostenlose Updates, Stückliste). Das gilt als gesetzliche Ausstattung nur für Produkte, die **ab 11.12.2027** in Verkehr gebracht werden (Art. 69 Abs. 2). Ein Kauf vor diesem Tag fällt unter die Altprodukt-Regel aus Teilaufgabe 1; der Fall nennt keinen Kaufzeitpunkt. Außerdem ist „verlangen“ missverständlich: Aus dem CRA ergibt sich für Betreiber kein Anspruch auf diese Dinge, sondern Pflichten des Herstellers gegenüber Marktüberwachung und Nutzer:innen; als Käufer:in kann die Kundschaft sie **zur Vertragsbedingung machen** (Art. 5 und Erwägungsgrund 13 lassen zusätzliche Anforderungen ausdrücklich zu).
- Lerntext 129: „Nutzer:innen erhalten Anleitungen und Kontaktstelle, ein Enddatum …, in der Regel kostenlose Sicherheitsupdates“ ohne den Zusatz „für Produkte, die ab dem 11.12.2027 in Verkehr gebracht werden“; „Beim Einkauf kann die Kundschaft diese Nachweise verlangen“ ist Praxis, nicht Rechtsregel.

**Vorschlag:** Teilaufgabe 4 Sachverhalt: „…was sie beim Kauf weiterer Gateways **nach dem 11.12.2027** erwarten und in Verträge aufnehmen kann“; Musterlösung: „Zusätzlich kann Tannberg vor 2027 schon vertraglich vereinbaren: …“. Lerntext 129: „Für Produkte, die ab dem 11.12.2027 in Verkehr gebracht werden, erhalten Nutzer:innen …; beim Einkauf kann die Kundschaft diese Angaben als Vertragsbestandteil verlangen (Praxis)“. Auch Q-6.7-09 (Befund 5) und K-6.7-06 sind davon betroffen.

### 4. Fall: Beginn der 14-Tage-Frist nicht festgelegt (Risikominderungsmaßnahme)
`fi-faelle-b.md:13, 15, 26, 27`

Art. 14 Abs. 2 Buchst. c: 14 Tage nach Verfügbarkeit einer **Korrektur- oder Risikominderungsmaßnahme**. Die Musterlösung zu Teilaufgabe 3 empfiehlt Nutzer:innen sofort als Gegenmaßnahmen „Zugang zum Portal einschränken, Zugangsdaten ändern“; wer das ernst nimmt, kann argumentieren, dass die Risikominderungsmaßnahme schon ab 09./10.11.2026 zur Verfügung stand und der Abschlussbericht früher fällig ist. Die Rechenregeln nennen nur „Tag des auslösenden Ereignisses zählt nicht mit“, aber nicht, welches Ereignis der Abschlussbericht-Frist auslöst; der Sachverhalt sagt nur, ein Update „kann am Freitag, 20.11.2026, bereitgestellt werden“.

**Vorschlag:** In die Rechtsannahmen: „Für die Frist des Abschlussberichts gilt die Bereitstellung des Updates am 20.11.2026 als Verfügbarkeit der Korrekturmaßnahme; vorläufige Hinweise zu Gegenmaßnahmen bleiben dafür außer Betracht (Festlegung dieser Aufgabe).“ Und die Musterlösung Teilaufgabe 2 um den Satz ergänzen „Eine früher verfügbare Risikominderungsmaßnahme würde die Frist früher auslösen“, ohne Punktabzug für den 04.12.2026. Außerdem im Lerntext Abschnitt 8 Rechenbeispiel 2 („Steht … ein Update zur Verfügung“) um „oder eine Risikominderungsmaßnahme“ ergänzen.

### 5. Q-6.7-09 (und K-6.7-06): „Nein, Sicherheitsupdates sind grundsätzlich kostenlos“ ohne Zeitbezug
`fi-6.7-cyber-resilience-act.md:271-276`, `:174`

Die Pflicht zur kostenlosen Verbreitung (Anhang I Teil II Nr. 8) gilt für Produkte ab 11.12.2027 bzw. nach wesentlicher Änderung; die Aufgabe selbst (Q-10, K-11, Fall) lehrt diese Staffelung. „Ein Hersteller verkauft ein Standard-Gateway in Serie. Darf er für ein Sicherheitsupdate … ein Entgelt verlangen?“ liest sich als Aussage über das heutige Recht und kollidiert mit Fall Teilaufgabe 4 („verlangt der CRA vor dem 11.12.2027 weder … kostenlose Updates“). Lernende, die Q-09 und Fall zusammen sehen, bekommen widersprüchliche Signale.

**Vorschlag:** Frage: „Ein Hersteller bringt **nach dem 11.12.2027** ein Standard-Gateway in Serie in Verkehr. Darf er …“. Erklärung entsprechend. K-6.7-06 braucht den Zusatz nicht zwingend, aber „…ab Geltung der Produktpflichten (11.12.2027)“ wäre klarer.

### 6. Kleinst-/Kleinunternehmen: Ausnahme von Geldbußen bei Versäumen der 24-Stunden-Frist fehlt
`fi-6.7-cyber-resilience-act.md:123`; `rechtsangaben-b.md:72` (Nr. 62)

Art. 64 Abs. 10 Buchst. a nimmt Kleinst- und Kleinunternehmen als Hersteller bei Nichteinhaltung der 24-Stunden-Fristen (Art. 14 Abs. 2 Buchst. a, Abs. 4 Buchst. a) von den Geldbußen aus; Buchst. b nimmt Verwalter bei jedem Verstoß aus. Der Lerntext bringt Buchst. b, lässt Buchst. a aber bewusst weg und begründet das nur im Rechtsangaben-Blatt mit der Auslegungsfrage („Absätze 3 bis 9“, Meldepflichten stehen in Abs. 2). Das ist im Blatt sauber dokumentiert, im Lerntext aber eine **fehlende Ausnahme** gerade bei den Meldefristen, dem Kernthema. Für Brevanta (rund 220 Beschäftigte) greift sie nicht, für viele Kund:innen schon.

**Vorschlag:** Ein Satz in Abschnitt 11: „Für Hersteller, die Kleinst- oder Kleinunternehmen sind, sieht die Verordnung eine Ausnahme von Geldbußen vor, wenn sie die 24-Stunden-Frist der Frühwarnung versäumen; wie weit sie im Verhältnis zur höchsten Bußgeldstufe reicht, ist auslegungsbedürftig. Die Meldepflicht selbst bleibt bestehen.“ Das Rechtsangaben-Blatt (Nr. 62) entsprechend von „nicht dargestellt“ auf „vorsichtig dargestellt“ ändern.

### 7. Fristzählung: Verschiebung bei Fristende auf Wochenende/Feiertag nicht festgelegt, Abstimmung mit Teil A
`fi-6.7-cyber-resilience-act.md:99, 135`; `fi-faelle-b.md:15`; vgl. Teil A (`fi-faelle-a.md:17`)

Das Thema legt fest: Stunden durchlaufend, Ereignistag zählt nicht mit (Tagesfristen), „ein Monat“ endet am gleichen Kalendertag des Folgemonats. Teil A ergänzt ausdrücklich „Verschiebungen wegen Wochenenden bleiben außer Betracht“. Teil B sagt das weder im Lerntext noch im Fall. Die Fall- und Quizdaten sind so gewählt, dass kein Tagesfristende auf ein Wochenende fällt (geprüft), aber die Regel fehlt. Rechtsangaben Nr. 45 räumt zudem ein, dass die Fristenverordnung (EWG, Euratom) Nr. 1182/71 nicht gelesen wurde. Sie kennt für nicht in Stunden bemessene Fristen eine Verschiebung auf den nächsten Arbeitstag; ob sie für die CRA-Fristen gilt, ist hier nicht zu klären, aber der Lerntext sagt „Die Verordnung regelt nicht ausdrücklich, wie … gezählt werden“, was für die Stundenzählung so bleiben kann, für Tages-/Monatsfristen nicht belegt ist.

**Vorschlag:** Lerntext 99 und 135 sowie Fall-Rechenregel: „…Verschiebungen des Fristendes wegen Wochenenden oder Feiertagen bleiben außer Betracht; die Daten sind so gewählt, dass keine Frist an einem Wochenende endet (Festlegung)“ (gleiche Formel wie Teil A) und im Satz zu den Verordnungen: „Wie die allgemeinen Fristenregeln der Union auf diese Meldefristen anzuwenden sind, ist hier nicht Gegenstand; die Aufgaben legen die Zählweise fest.“ Rechenbeispiel (1) endet bewusst am Samstag 21.11.2026 (Stundenfrist): bleibt so.

### 8. Abschnitt 8: Begriffe „Sicherheitsvorfall“, „schwerwiegend“ gegen „erheblich“ (NIS2), „Hauptniederlassung“ fehlen
`fi-6.7-cyber-resilience-act.md:89, 101, 103`

- Die Abgrenzung zu Thema 6.6 bleibt abstrakt („eigene Auslöser, Fristen und Empfänger“). Teil A (`fi-6.6…`, Z. 67) verwendet für NIS2 den Begriff **„erheblicher Sicherheitsvorfall“**, Teil B für den CRA **„schwerwiegender Sicherheitsvorfall mit Auswirkungen auf die Sicherheit des Produkts“**; beide Teile nennen das nirgends nebeneinander. Das ist die typische Verwechslung im Fachgespräch.
- „Sicherheitsvorfall“ wird nicht erklärt (Art. 3 Nr. 43/44, verweist auf die NIS2-Richtlinie), und „Hauptniederlassung“ (Art. 14 Abs. 7 Unterabsatz 2: Mitgliedstaat, in dem die Cybersicherheitsentscheidungen überwiegend getroffen werden; ersatzweise Niederlassung mit den meisten Beschäftigten) wird in Lerntext, Karte K-10 und Fall verwendet, aber nicht erklärt.
- „…haben eigene Auslöser, Fristen und Empfänger“: Für Deutschland nennt Teil A als Empfänger der NIS2-Meldung die gemeinsame Meldestelle von BSI und BBK, Teil B (nach Presse) das BSI als CSIRT-Koordinator. Die Empfänger sind teilweise dieselbe Behörde, nur andere Meldekanäle.

**Vorschlag:** In Abschnitt 8 einen Absatz: „Begriffe nicht verwechseln: Das Recht der Einrichtungen (Thema 6.6) knüpft an einen *erheblichen* Sicherheitsvorfall bei der Einrichtung und ihren Diensten an, der CRA an einen *schwerwiegenden* Sicherheitsvorfall mit Auswirkungen auf die Sicherheit eines *Produkts*; dieselbe Schwachstelle in einem Produkt kann beides auslösen. Die Meldewege (Meldestelle für Einrichtungen, Plattform für Produkte) sind getrennt, auch wenn in Deutschland dieselbe Behörde beteiligt sein kann.“ Plus je ein Halbsatz zu „Sicherheitsvorfall“ und „Hauptniederlassung“.

### 9. Reine Cloud-Dienste „sind keine Produkte“ als feste Regel
`fi-6.7-cyber-resilience-act.md:31`; `rechtsangaben-b.md:16` (Nr. 6)

Das Blatt selbst nennt den Satz „Folgerung“: Erwägungsgrund 12 sagt nur, die NIS2-Richtlinie gelte für Cloud-Computing-Dienste und die vom Hersteller selbst entwickelte Fernsteuerungs-Cloud falle in den CRA. Im Lerntext steht er als Regel („Reine Cloud-Dienste … sind keine Produkte im Sinne des CRA“). Auch Q-6.7-02 trägt das als Erklärung („Reine Cloud-Dienste ohne diesen Produktbezug fallen dagegen nicht unter den CRA“).

**Vorschlag:** „Reine Cloud-Dienste (Software, Plattform oder Infrastruktur als Dienst) sind nach den Erwägungsgründen Gegenstand des Rechts der Einrichtungen (Thema 6.6) und werden, soweit sie nicht Datenfernverarbeitung eines Produkts sind, vom CRA nicht erfasst (Auslegung; Einzelfälle klären die Leitlinien).“ Q-02-Erklärung ähnlich abschwächen.

### 10. Theorielänge über dem Rahmen
`fi-6.7-cyber-resilience-act.md:17-143`

Zählung mit eigenem Skript (`prf-fi-b-zaehlen.cjs`, Wörter durch Leerzeichen getrennt, ab `## Theorie` bis vor `## Karteikarten`, Überschriften und Tabelle eingeschlossen): **3.904 Wörter** (ohne Rechenbeispiele 3.658), 13 Abschnitte; der Autor gibt 3.860 an. Rahmen laut Auftrag „rund 3.000 bis 3.800“. Abschnitt 8 hat 520 Wörter. Geringe Überschreitung (rund 100 Wörter), mit den Ergänzungen aus den Befunden 3, 6, 8 und 9 kämen etwa 150 hinzu.

**Vorschlag:** Kürzen, bevor ergänzt wird: Abschnitt 1 (Rollenerklärung „werden hier als Rollenbegriffe verwendet“), die Aufzählung der Informationen und Anleitungen in Abschnitt 6 (Anhang II) und die Dopplung zwischen Abschnitt 9 („Ein Gateway, das 2025 verkauft wurde …“) und Abschnitt 12/Beispiel 4 straffen. Ziel höchstens 3.800 Wörter.

### 11. Q-6.7-05: Fragetext zirkulär
`fi-6.7-cyber-resilience-act.md:245`

„Wie viele Jahre beträgt der Unterstützungszeitraum mindestens, wenn das Produkt voraussichtlich **länger als diese Zeit** genutzt wird?“ „Diese Zeit“ ist die gesuchte Größe; ohne Kenntnis ist die Frage nicht auflösbar, mit Kenntnis verrät sie sich selbst. Die Karte K-6.7-07 fragt unproblematisch.

**Vorschlag:** „…beträgt der Unterstützungszeitraum nach dem CRA grundsätzlich mindestens, wenn das Produkt voraussichtlich deutlich länger im Betrieb sein wird? Gib die Zahl der Jahre an.“

### 12. Fall: Sachverhalt unklar, wo die Bibliothek steckt; Kundin nicht als Annahme gekennzeichnet
`fi-faelle-b.md:13`

Ausgenutzt wird die Schwachstelle „in der Anmeldefunktion“ des **Portals**; die Ursache liegt „in der quelloffenen Bibliothek“, die laut Satz davor aber in der **Firmware** steckt und „auch in der Auswertungssoftware“. Dass das Portal dieselbe Bibliothek nutzt, steht nicht da. Teilaufgabe 3 (weitere betroffene Produkte) hängt davon ab. Ferner ist die Tannberg Kältetechnik GmbH (anders als in Teil A die Baumgart) im Aufgabentext nicht als Annahme markiert; das Register verlangt „neue Personen und Zahlen als Annahme kennzeichnen“.

**Vorschlag:** „…in der quelloffenen Netzwerkbibliothek, die Brevanta im Portal und in der Firmware einsetzt und die auch in der Auswertungssoftware … steckt.“ Und „Tannberg Kältetechnik GmbH (Annahme)“.

---

## Befunde NIEDRIG

### 13. Klasse-I-Liste: falsche Wiedergabe von Nr. 9
`fi-6.7-cyber-resilience-act.md:83`; `rechtsangaben-b.md:47` (Nr. 37)
Anhang III Klasse I Nr. 9 lautet „Public-Key-Infrastrukturen und Software für die Ausstellung digitaler Zertifikate“. Der Lerntext schreibt „Systeme zur Verwaltung digitaler Zertifikate“ (das Blatt schreibt richtig „Software zur Ausstellung“). **Vorschlag:** „Public-Key-Infrastrukturen und Software zur Ausstellung digitaler Zertifikate“.

### 14. Einführer: „in der Union ansässig“ fehlt
`fi-6.7-cyber-resilience-act.md:39`, `:228` (Q-6.7-03)
Art. 3 Nr. 16: in der Union ansässige oder niedergelassene Person. Lerntext und Zuordnung lassen das Merkmal weg; in der Zuordnung unterscheidet es aber gerade Einführer und Bevollmächtigten. **Vorschlag:** „In der EU ansässig, bringt ein Produkt mit Namen oder Marke eines Unternehmens außerhalb der EU in der EU in Verkehr“ (Q-03) und im Lerntext ergänzen.

### 15. Datumsdopplung mit Bestand
`fi-faelle-b.md:5, 13, 27`; Bestand `content/fachinformatiker-*/fu6/fallaufgaben.md:91` (F-FU6-04: Ablauf eines Zertifikats am 20.11.2026), `content/…/fu6/6.5-zertifikate-pki.md:308` (14.12.2026)
Der Kopf von `fi-faelle-b.md` behauptet, alle Daten seien unabhängig von F-FU6-01 bis -04; der 20.11.2026 kommt in F-FU6-04 (Tabelle, Zeile 91) vor, der 14.12.2026 (Rechenbeispiel 2) als Akzeptierte Antwort in einem Quiz von 6.5 desselben Fachgebiets. Bedeutung jeweils anders, aber Lernende erinnern Daten. **Vorschlag:** Fall: Update am Montag, 23.11.2026, Abschlussbericht dann Montag, 07.12.2026 (selbst nachrechnen, kein Wochenendende); Rechenbeispiel 2: Update am Dienstag, 01.12.2026 → Dienstag, 15.12.2026. Der Kopf von `fi-faelle-b.md` ist danach anzupassen. (14.12.2026 kommt außerdem in Teil I vor.)

### 16. Q-6.7-04: längste Option ist richtig
`fi-6.7-cyber-resilience-act.md:236-240`
Optionslängen 59, 61, **93 (richtig)**, 86, 83. In einer Mehrfachauswahl fällt die längste (richtige) Option als Muster auf. **Vorschlag:** „Sicherheitsupdates unverzüglich und, außer bei vereinbarter Ausnahme, kostenlos verbreiten“ (kürzer) oder die Distraktoren etwas länger formulieren.

### 17. Akzeptierte Antworten Q-6.7-06 und -07 lückenhaft
`fi-6.7-cyber-resilience-act.md:252, 258`
Es fehlen gängige Schreibungen ohne führende Null (`25.1.2027`, `25.1.27`) und mit Wochentag (`Montag, 25.01.2027`) sowie `30.12.2026` mit Wochentag (`Mittwoch, 30.12.2026`). **Vorschlag:** `25.1.2027; 25.1.27; Montag, 25.01.2027; Mo 25.01.2027` bzw. `Mittwoch, 30.12.2026; Mi 30.12.2026` ergänzen.

### 18. K-6.7-08: Antwort beantwortet „wann ist eine notifizierte Stelle nötig“ nur halb
`fi-6.7-cyber-resilience-act.md:182-185`
Die Antwort nennt Klasse II (stets), nicht den Klasse-I-Fall (nur wenn Normen/Schema nicht vollständig angewandt werden). Lerntext hat beides. **Vorschlag:** „…bei Klasse I, wenn keine passenden Normen angewandt werden; bei Klasse II stets.“ (Zeichenrahmen 300 reicht: derzeit 255.)

### 19. Inverkehrbringen je Exemplar: Hinweis fehlt
`fi-6.7-cyber-resilience-act.md:109`
„Altprodukte“ werden als Modell-Stichtag dargestellt. Maßgeblich ist das Inverkehrbringen des einzelnen Produkts; Exemplare derselben Baureihe, die nach dem 11.12.2027 erstmals bereitgestellt werden, unterliegen allen Pflichten (Rechtsangaben Nr. 55 nennt die Auslegungsfrage selbst). **Vorschlag:** ein Satz „Maßgeblich ist, wann das einzelne Produkt erstmals auf dem Markt bereitgestellt wurde (Auslegung); später gelieferte Exemplare einer älteren Baureihe sind neu zu beurteilen.“

### 20. Fall: Widerspruch „vertreibt seit März 2025“ gegen „bis Juni 2026 in Verkehr gebracht“
`fi-faelle-b.md:13, 15`
Die Ausgangssituation lässt den Vertrieb laufen, die Sachverhaltsvereinfachung begrenzt „die betroffenen Gateways“ auf März 2025 bis Juni 2026, ohne zu erklären, warum (Vertriebsstopp? Hardwarewechsel?). **Vorschlag:** „…vertreibt seit März 2025 … bis Juni 2026“ oder Satz „Ab Juli 2026 wird eine neue Hardwareversion ausgeliefert, die hier außer Betracht bleibt“.

### 21. Fall: Rechtsannahmen nehmen Teile des Prüfpunkts vorweg
`fi-faelle-b.md:15`
„seither nicht wesentlich geändert“ und „im Rahmen einer Geschäftstätigkeit“ sind sachlich nötig, entscheiden aber Prüfpunkte von Teilaufgabe 1 (wesentliche Änderung, Geschäftstätigkeit). Vertretbar, da sonst nicht lösbar; kein Handlungsbedarf, nur Hinweis. Die Aussage „andere Meldewege … außer Betracht“ ist mit Musterlösung Teilaufgabe 4 („gesondert zu prüfen“) verträglich.

### 22. Quiz-Qualität (Einzelheiten)
`fi-6.7-cyber-resilience-act.md:278-285, 301-308`
- Q-10: Distraktor D („nur melden, wenn die Geräte nach dem 11.12.2027 geändert wurden“) ist am 15.03.2027 gar nicht möglich und daher leicht auszuschließen; Optionslängen 85 / **113 (richtig)** / 124 / 71: richtige nicht die längste, aber zweitlängste. **Vorschlag:** D ersetzen durch „Er muss nur melden, wenn die Geräte mit der CE-Kennzeichnung nach dem CRA versehen sind“ (Länge ähnlich A).
- Q-13: genau eine falsche Aussage, Länge unauffällig (102/105/103/**94**); Aussage 2 („meldet sie den Betreuenden der Komponente“) gilt als Pflicht erst ab 11.12.2027 (Art. 13 Abs. 6), konsistent mit Befund 1: Frage ergänzen „…nach Geltungsbeginn der Produktpflichten“.
- Sortieren Q-08: Reihenfolge zwingend (Kenntnis, 24 h, 72 h, Abschlussbericht); in Ordnung.

### 23. Auslegung des Auftrags „keine Gesetzesnamen in Karten und Quiz“ (Empfehlung)
Karten und Quiz enthalten „Cyber Resilience Act“ bzw. „CRA“ (K-01, -03, -10, -11, -12; Q-02, -09, -10, -12/-13 nicht), aber keine Paragrafen, Artikel, Verordnungsnummern oder Anhänge (geprüft per Suche). **Empfehlung:** zulässig. „CRA“ ist der Themenname (`thema_title`), und der Bestand nennt etwa „DSGVO“ und „Art. 33 DSGVO“ selbst in Karten (`fu6/6.2`, Z. 10, 29, 85). Beibehalten, aber in Q-02/-09/-10 bei Erstnennung „CRA (EU-Regeln für Produkte mit digitalen Elementen)“ nur dort verwenden, wo die Frage ohne den Namen nicht verständlich wäre.

### 24. Zeitkritische Aussagen (Wiedervorlage, kein Mangel)
`fi-6.7-cyber-resilience-act.md:101, 111, 117`; `rechtsangaben-b.md:58-59, 67`
- Plattform „seit 11.09.2026 in Betrieb“: Die Kommission schreibt „operational as of 11 September 2026“; ein Kommentar vom 09.09.2026 zweifelte. Formulierung „nach Angaben der Behörden“ ist angemessen; Wiedervorlage an der ENISA-Seite.
- BSI als Koordinator-CSIRT und Durchführungsgesetz (Bundestag 15.10.2026, Beschlussempfehlung 14.10.2026): „nach Presseberichten“ im Lerntext vorsichtig genug; ob der Bundesrat zugestimmt hat und ob das Gesetz verkündet ist, ist nicht belegt. Wiedervorlage nach Verkündung.
- Verwalter quelloffener Software: Nach der Kommissionsseite gelten deren Meldepflichten (Art. 24 Abs. 3 mit Art. 14) erst ab 11.12.2027, der Lerntext (Abschnitt 10) nennt keinen Zeitpunkt, Abschnitt 9 sagt „Meldepflichten gelten … für alle Produkte“ (gemeint: Hersteller). Ein Halbsatz in Abschnitt 10 genügt: „…Meldepflichten der Verwalter gelten nach Angaben der Kommission erst ab 11.12.2027.“

### 25. Rechtsangaben-Blatt: Abgleich
`rechtsangaben-b.md`
73 Zeilen (Nr. 1 bis 73) plus Abschnitte „Reformen“ und „Bestandsstellen“; die Zeilen stimmen mit dem Rohtext überein, bis auf Nr. 37 (Befund 13) und die zu ergänzenden Nr. 62 (Befund 6) und neue Zeilen für die Änderungen aus den Befunden 3, 4, 8, 9. Die Angabe „Stütz: Art. 5 und Erwägungsgründe“ für private Beschaffer in Nr. 64 ist richtig (Erwägungsgrund 13). `ersetzungen-b.json` = `[]`: Ich habe keinen widersprechenden einzeiligen Bestandstext gefunden (Suche nach „Cyber Resilience“, „Cyberresilienz“, „2024/2847“, „CE-Kennzeichnung“ in `content/fachinformatiker-*`: keine Treffer; Technischer Fachwirt `hq3/10.1` behandelt Produktsicherheit in anderem Zusammenhang, keine Doppelung).

### 26. Fachgespräch (2 Fragen)
`fi-faelle-b.md:35-48`
Inhaltlich richtig; Überschriftenmuster `### 6.7 …` passt zum Bestand (`### 6.1`, `### 6.2`). Frage 2, Erwartung 2 („wird behandelt, ein Update bereitgestellt …“) beschreibt Herstellerpflichten, die für Altprodukte erst ab 11.12.2027 gelten; in der Erwartung ein „(für nach dem 11.12.2027 in Verkehr gebrachte Produkte Pflicht)“ ergänzen, passend zu Befund 1.

---

## Abgleich mit Nachbarthemen und Teilen

- **fu6/6.2 (Datenpanne), 6.6 (Teil A), ae2/9.1 (SBOM), fu2/2.2 (Herstellersupport), dv3/10.4, dv4/11.3, si5/12.2:** keine inhaltliche Doppelung, nur Verweise mit Titel und Fachgebiet (Titel stimmen mit den `thema_title` überein: „Datenschutz: Grundlagen, Pflichten und Kundenberatung“, „NIS2, KRITIS und Meldepflichten“, „Betriebssysteme, Software und Lizenzen“ im Fachgebiet „IT-Systeme beurteilen und IT-Arbeitsplatz einrichten“). Begriffsunterschied erheblich/schwerwiegend: Befund 8.
- **Teil A:** Stichtage und Zählweise widerspruchsfrei (Stunden durchlaufend, ab Kenntnis); Brevanta „wichtige Einrichtung“ und „Hersteller von Software und Gateways (Thema 6.7)“ konsistent; Fall F-FU6-05 (Ransomware bei Managed Service) und F-FU6-06 (Schwachstelle in Produkt) sind keine Klone. Nur der Satz zur Verschiebung der Fristenden fehlt in B (Befund 7).
- **Teil F (`fi-6.8`):** Rolle Anbieter/Hersteller: gemeinsame Formel „unter eigenem Namen oder eigener Marke“ ist Gesetzesformulierung (beide Verordnungen), im Übrigen umformuliert; kein CRA-Bezug in Teil F nötig. Tool-Treffer (Verweisformeln, Zählregel-Satz) erwartbar.
- **Schwesterkurse (Technischer Fachwirt `hq3/10.1`, Produktsicherheit):** keine wörtliche Nähe.
- **Fälle F-FU6-01 bis -04:** kein Strukturklon; Dopplung nur der Daten (Befund 15).

## Zusammenfassung der Änderungswünsche vor Freigabe

1. Fall Teilaufgabe 3 neu fassen: Pflichten heute gegen sachgerechte Maßnahmen trennen, Stückliste streichen oder im Sachverhalt belegen (Befund 1).
2. Teilaufgabe 2: Vorfall-Bewertung als Auslegung formulieren, Abschlussbericht der Variante ergänzen, Beginn der 14-Tage-Frist festlegen (Befunde 2, 4).
3. Teilaufgabe 4, Lerntext Abschnitt 12, Q-09: Zeitbezug 11.12.2027 und „vertraglich verlangen“ statt „verlangen können“ (Befunde 3, 5).
4. Abschnitt 8: Begriffsabgrenzung zu NIS2, Hauptniederlassung, Sicherheitsvorfall (Befund 8); Kleinunternehmen-Satz bei Sanktionen (Befund 6); Fristenzählung angleichen (Befund 7); Cloud-Satz abschwächen (Befund 9); auf höchstens 3.800 Wörter kürzen (Befund 10).
5. Kleinigkeiten 11 bis 22 nach Gelegenheit.
