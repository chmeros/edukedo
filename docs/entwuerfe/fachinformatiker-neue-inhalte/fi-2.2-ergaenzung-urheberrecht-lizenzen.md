# Entwurf Fachinformatiker (vier Kurse), Software-Urheberrecht, Open-Source-Compliance, Creative Commons und KI-Code: Ergänzung im Thema 2.2

Stand 23.10.2026, **Entwurf (R4, rechtsnah), nicht eingespielt.** Teil K des Pakets P-AY Fachinformatiker (Auftrag `docs/entwuerfe/fachinformatiker-neue-inhalte/auftrag.md`; Auswertung `docs/entwuerfe/fachinformatiker-r4-auswertung.md`, Lücke L-FI-09, dort „P-AX im Einzelnen“ Teil D). Einzufügen in `content/<kurs>/fu2/2.2-betriebssysteme-software-lizenzen.md` (identisch in allen vier Fachinformatiker-Kursen; geprüft: bis auf `kurs_slug` gleich): Abschnitt A **vor der Überschrift „### Virtualisierung als Grundkonzept“** (Anker; die Theorie steht damit hinter „### Open Source und proprietäre Software“), B an die Karteikarten hinter K-2.2-20, C an das Quiz hinter Q-2.2-14. Bestand gezählt (Stand 23.10.2026, in allen vier Kursen gleich): 20 Karteikarten (K-2.2-01 bis -20, lückenlos), 14 Quizfragen (Q-2.2-01 bis -14, lückenlos); `git log -S` auf K-2.2-21, Q-2.2-15 und F-FU2-04 ergibt in den vier Fachinformatiker-Kursen keine entfernten IDs (Treffer von K-2.2-21 und Q-2.2-15 betreffen andere Kurse). Die neuen IDs sind K-2.2-21 bis -30 (10 Karten) und Q-2.2-15 bis -26 (12 Quizfragen, davon 1 Kurzantwort). Die Fallaufgabe F-FU2-04 (Bestand F-FU2-01 bis -03; das Fach `fu2` hat keine `fachgespraech.md`, daher kein Fachgespräch) steht in `fi-faelle-k.md`, die Rechtsangaben in `rechtsangaben-k.md`, die Ersetzungen im Bestand in `ersetzungen-k.json` (identisch in allen vier Kursen). Der `rechtsstand` der berührten Dateien (`fu2/2.2`, `fu2/fallaufgaben.md`) setzt der Auftraggeber beim Einspielen.

**Zweck.** Der Bestand behandelt Urheberrecht und Open Source in je einem kurzen Abschnitt: Software ist urheberrechtlich geschützt, die Lizenz räumt Rechte ein, Open Source ist nicht rechtsfrei, Copyleft verlangt Quellcode bei Weitergabe. Offen bleibt, wer an Programmen Rechte hat, die Beschäftigte oder Auftragnehmer:innen schreiben, welche Rechte ein Kundenprojekt einräumen kann, welche Pflichten die gängigen Open-Source-Lizenzen konkret auslösen und wann Lizenzen nicht zusammenpassen, was Creative-Commons-Lizenzen verlangen, und wie sich Künstliche Intelligenz auswirkt: Wem gehört KI-erzeugter Code, wer haftet für fremde Teile darin, und unter welchen Voraussetzungen dürfen Werke zum Training verwendet werden. Die Ergänzung nimmt die Sicht einer Fachinformatiker:in in Projekt und Betrieb ein, die Bibliotheken einsetzt, Software an Kundschaft liefert und KI-Assistenten nutzt, nicht die der Rechtsabteilung. **Nicht Gegenstand** (hier nur Verweis): Datenschutz und Auftragsverarbeitung (Thema 6.2), Pflichten der Hersteller nach dem Cyber Resilience Act einschließlich Software-Stückliste und Open-Source-Verwaltern (Thema 6.7), die KI-Verordnung, Offenlegung, Kontrolle der Ergebnisse und Datenschutz beim KI-Einsatz (Thema 6.8), Werk- und Dienstvertrag, Mängelrechte und Haftung (Thema 1.3), Patente und Marken, Datenbankschutz, Lizenzmodelle und Lizenzmanagement (bleiben im Bestand dieses Themas), Lizenzen für Daten und Datensätze, Gebrauchtsoftware, Vergütungsfragen.

**Rechtsnah (R4).** Paragrafen und Artikel stehen nur als Stützangabe in der Theorie, nie in Karten, Quiz und Fall (auch keine Gesetzesnamen dort; Lizenznamen wie GPL, MIT oder Creative Commons sind Fachbegriffe und stehen dort). Rechtsgrundlagen am Rohtext gelesen (Urheberrechtsgesetz und Geschäftsgeheimnisgesetz von `gesetze-im-internet.de`; Richtlinie (EU) 2019/790 und Verordnung (EU) 2024/1689 mit Änderungsverordnung (EU) 2026/1744 über `publications.europa.eu`; die Lizenztexte GNU GPL 2 und 3, LGPL 3, AGPL 3, MIT, BSD-3-Clause, Apache 2.0, MPL 2.0 und Creative Commons BY, BY-SA, BY-NC 4.0 und CC0 im Original; Einzelheiten und Stufe der Sicherheit in `rechtsangaben-k.md`). Zeitkritisch (mit „Stand Oktober 2026, vor Verwendung prüfen“): der Urheberrechtsschutz von KI-Ergebnissen (keine höchstrichterliche Entscheidung), die Reichweite der Regel zum Text und Data Mining für das Training von KI-Modellen (erste Instanzentscheidungen, Klärung durch den Europäischen Gerichtshof und die Bundesgerichte steht aus), die Anwendung der Arbeitnehmerregel auf Auszubildende, die Linking-Frage bei der GPL und die Verträglichkeitseinschätzungen der Lizenzgeber:innen. Gerichtsentscheidungen stehen nirgends im Lerntext. Annahmen zur Fallfirma stehen im Fall.

---

# Thema 2.2

## A. Theorie-Ergänzung 2.2 (einfügen vor „### Virtualisierung als Grundkonzept“)

### Software als Werk: Urheberschaft, Nutzungsrechte und gesetzliche Schranken

Ein **Computerprogramm** ist ein geschütztes Sprachwerk (Stützangabe § 2 Abs. 1 Nr. 1 UrhG). Es ist geschützt, wenn es ein individuelles Werk ist, also das Ergebnis der eigenen geistigen Schöpfung seiner Urheber:in; qualitative oder ästhetische Maßstäbe gelten dafür nicht. Der Schutz erfasst alle Ausdrucksformen (Quellcode, Objektcode, Entwurfsmaterial), nicht aber die zugrunde liegenden Ideen und Grundsätze, auch nicht die der Schnittstellen (Stützangabe § 69a Abs. 1 bis 3 UrhG).

**Urheber:in** ist der Schöpfer des Werkes (Stützangabe § 7 UrhG), das kann nur ein Mensch sein; ein Unternehmen kann Inhaberin von Rechten sein, aber nicht Urheberin. Das Urheberrecht selbst ist nicht übertragbar, außer durch Erbfall; zulässig ist die **Einräumung von Nutzungsrechten** (Stützangabe § 29 Abs. 1, 2 UrhG). Ein Nutzungsrecht ist **einfach** (andere dürfen daneben ebenfalls nutzen) oder **ausschließlich** (Nutzung unter Ausschluss aller anderen, mit der Befugnis, weitere Rechte einzuräumen) und kann räumlich, zeitlich oder inhaltlich beschränkt sein (Stützangabe § 31 Abs. 1 bis 3 UrhG). Fehlt die ausdrückliche Bezeichnung der Nutzungsarten, richtet sich der Umfang nach dem Vertragszweck (Zweckübertragungsregel, Stützangabe § 31 Abs. 5 UrhG).

Die Rechtsinhaber:in hat bei Programmen das ausschließliche Recht, sie zu vervielfältigen, zu bearbeiten, zu verbreiten und öffentlich zugänglich zu machen (Stützangabe § 69c UrhG). Gesetzliche Schranken: Wer zur Verwendung berechtigt ist, darf, soweit keine besonderen vertraglichen Bestimmungen vorliegen, das Programm bestimmungsgemäß benutzen, einschließlich der Fehlerberichtigung (Stützangabe § 69d Abs. 1 UrhG). Eine **Sicherungskopie** darf nicht vertraglich untersagt werden, wenn sie für die Sicherung künftiger Benutzung erforderlich ist. Eine Vertragsklausel, die dem entgegensteht, ist nichtig (Stützangabe § 69d Abs. 2, § 69g Abs. 2 UrhG). Bei Nutzung ohne Erlaubnis bestehen Ansprüche auf Beseitigung und Unterlassung; Schadensersatz schuldet, wer vorsätzlich oder fahrlässig handelt; vorsätzliche unerlaubte Verwertung ist strafbar (Stützangabe § 97, § 106 UrhG). Stand Oktober 2026, vor Verwendung prüfen.

### Programme im Arbeitsverhältnis und im Kundenprojekt

Wird ein Programm von einem Arbeitnehmer **in Wahrnehmung seiner Aufgaben oder nach den Anweisungen des Arbeitgebers** geschaffen, ist ausschließlich der Arbeitgeber zur Ausübung aller vermögensrechtlichen Befugnisse berechtigt, sofern nichts anderes vereinbart ist; für Dienstverhältnisse gilt das entsprechend (Stützangabe § 69b UrhG). Die Arbeitnehmer:innen bleiben Urheber:innen; geregelt sind nur die vermögensrechtlichen Befugnisse (Folgerung aus dem Wortlaut). Verlangt wird ein enger Zusammenhang mit den arbeitsvertraglichen Pflichten (Auslegung): Ein Programm, das jemand in der Freizeit ohne Bezug zu den Aufgaben und ohne Anweisung schreibt, fällt nicht darunter, kann aber arbeitsvertragliche Pflichten zu Nebentätigkeit und Geheimhaltung berühren. Folge: Code, an dem der Arbeitgeber die Rechte hält, dürfen sie nicht auf eigene Faust veröffentlichen (Folgerung). Das Gesetz nennt Arbeitnehmer; ob und wie weit es auf **Auszubildende, Umschüler:innen und Praktikant:innen** übertragen wird, ist Auslegung, und für selbstständige Auftragnehmer:innen gilt es nach dem Wortlaut nicht (Folgerung). Die Rechte werden deshalb vorab ausdrücklich geklärt (Praxis).

Im **Kundenprojekt** räumt Brevanta der Kundschaft Nutzungsrechte ein; Urheberin ist sie nicht. Fehlt eine ausdrückliche Regelung, bestimmt der Vertragszweck, was die Kundschaft erhält. Üblicherweise geregelt werden (Praxis): einfaches oder ausschließliches Recht, Umfang, Bearbeitung durch Dritte, Weitergabe, Herausgabe des Quellcodes und der Umgang mit Fremdbestandteilen. Ein Unternehmen kann nur Rechte einräumen, die es selbst hat. An fremden Bestandteilen kann Brevanta deshalb keine ausschließlichen Rechte einräumen, sondern nur weitergeben, was die jeweilige Lizenz erlaubt; Zusagen wie „ausschließlich“ oder „frei von Rechten Dritter“ passen dann nur für die eigenen Teile. Eine Fremdkomponente ohne ausreichende Lizenz kann einen Rechtsmangel begründen (Thema 1.3 „Leistungserbringung, Dokumentation und Auftragsabschluss“ im Fachgebiet „Projekt- und Auftragsabwicklung“). Stand Oktober 2026, vor Verwendung prüfen.

### Open-Source-Compliance: Pflichten und Lizenzverträglichkeit

Eine Open-Source-Lizenz ist eine Erlaubnis unter Bedingungen. Wer die Bedingungen nicht erfüllt, nutzt ohne Erlaubnis: Die GPL beendet die Rechte bei einem Verstoß automatisch (GPL 3 Abschnitt 8), die Creative-Commons-Lizenzen ebenso; es drohen dann die oben genannten Folgen. Öffentlich einsehbarer Code ist nicht frei nutzbar: Wo keine Lizenz angegeben ist, fehlt grundsätzlich die Erlaubnis zur Übernahme (Folgerung). Die Pflichten knüpfen meist an die **Weitergabe** an, etwa die Auslieferung an Kundschaft; wer Software nur innerhalb derselben rechtlichen Einheit nutzt oder ändert (eine Konzerngesellschaft ist in der Regel schon eine andere Person), ohne sie weiterzugeben, hat bei der GPL keine Zusatzpflichten (GPL 3 Abschnitt 2).

- **Permissive Lizenzen.** MIT: Der Urheberrechts- und der Lizenzhinweis müssen in allen Kopien oder wesentlichen Teilen enthalten bleiben. Apache 2.0: Lizenzkopie beilegen, geänderte Dateien kennzeichnen, Hinweise erhalten und den Inhalt einer mitgelieferten NOTICE-Datei weitergeben; die enthaltene Patentlizenz endet für Nutzer:innen, die wegen der Software selbst eine Patentklage erheben. Keine dieser Lizenzen verlangt, den eigenen Quellcode offenzulegen.
- **Schwaches Copyleft.** Bei der LGPL darf das einbindende Programm eigenen Bedingungen unterliegen, solange Änderung und Austausch der Bibliothek möglich bleiben und die Hinweise beiliegen; Änderungen der Bibliothek selbst bleiben unter der LGPL. Bei der MPL 2.0 gilt das Copyleft nur für die lizenzierten Dateien, deren Quelltext bereitzustellen ist; ein größeres Werk darf anderen Bedingungen unterliegen.
- **Starkes Copyleft.** Wer ein Werk weitergibt, das auf einem GPL-Programm beruht, muss das Gesamtwerk als Ganzes unter der GPL lizenzieren, Lizenztext und Änderungsvermerke beifügen und den vollständigen Quelltext bereitstellen (bei Objektcode etwa mit der Lieferung, durch Zugang zum Quelltext an derselben Stelle wie zum Programm oder bei Lieferung auf einem Datenträger über ein mindestens drei Jahre gültiges schriftliches Angebot; GPL 3 Abschnitte 5 und 6). Getrennte Programme, die nur nebeneinander ausgeliefert werden, lösen das Copyleft nicht aus. Ob das **Einbinden einer Bibliothek durch Linken** ein abgeleitetes Werk schafft, ist umstritten (Auslegung; Lizenzgeber:innen vertreten oft die weite Sicht).
- **Netzdienste.** Nach dem Wortlaut der GPL ist die bloße Interaktion über ein Netz ohne Überlassung einer Kopie keine Weitergabe; die Quelltextpflichten greifen dann nicht. Die AGPL verlangt dagegen von der Betreiber:in einer geänderten Version, den Quelltext auch den Nutzer:innen über das Netz anzubieten.

**Lizenzverträglichkeit** bedeutet, dass die Bedingungen aller Komponenten eines Produkts gleichzeitig erfüllbar sind. Code unter MIT- oder BSD-Lizenz darf in ein GPL-Werk übernommen werden, die Hinweise bleiben; für Apache 2.0 gilt der übernächste Satz. Eine GPL-Komponente, die in ein weitergegebenes proprietäres Produkt eingebunden wird, geht nur mit einer anderen Lizenz der Rechteinhaber:in (Zweitlizenz) oder nach Ersatz der Komponente. Apache-2.0-Code darf nach Auskunft der Apache Software Foundation in GPL-3-Projekte aufgenommen werden, nicht umgekehrt; zu Programmen nur unter GPL 2 gilt Apache 2.0 als unverträglich (Auslegung der Lizenzgeber:innen).

Ablauf im Projekt (Praxis, kein Gesetz): alle Komponenten samt transitiver Abhängigkeiten erfassen (Software-Stückliste, siehe Thema 6.7 „Cyber Resilience Act“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“), die Lizenz je Komponente feststellen und mit einer betrieblichen Richtlinie abgleichen, die Verträglichkeit mit Auslieferungsform und Vertrag bewerten, vor der Auslieferung Hinweisdatei, Lizenztexte und gegebenenfalls Quelltext bereitstellen und alles dokumentieren; im Zweifel entscheidet die Rechtsabteilung. Bei einem Verstoß: Nutzung beenden oder ersetzen. Die GPL 3 lässt die Rechte nach Ende des Verstoßes zunächst vorläufig wieder aufleben; dauerhaft werden sie, wenn die Rechteinhaber:in nicht binnen 60 Tagen mitteilt oder wenn ein erstmals mitgeteilter Verstoß binnen 30 Tagen nach Zugang der Mitteilung beseitigt wird (GPL 3 Abschnitt 8). Stand Oktober 2026, vor Verwendung prüfen.

### Creative Commons für Inhalte

Creative-Commons-Lizenzen (CC) sind standardisierte Lizenzen für Texte, Bilder, Grafiken, Dokumentation und Medien; für Software raten die Lizenzgeber:innen selbst ab (Auslegung der Lizenzgeber:innen). Die Bausteine: **BY** Namensnennung, **SA** Weitergabe von Bearbeitungen unter denselben oder kompatiblen Bedingungen, **NC** nur nicht kommerzielle Nutzung, **ND** keine Weitergabe von Bearbeitungen. NC erlaubt nur Nutzungen, die nicht in erster Linie auf kommerziellen Vorteil oder Vergütung gerichtet sind; ein bezahltes Kundenprojekt erfüllt das in der Regel nicht (Auslegung). Bei Version 4.0 verlangt BY, soweit der Lizenzgeber sie angegeben hat, die Urheber:in, den Urheberrechtsvermerk, den Hinweis auf den Haftungsausschluss und einen Link zum Material (soweit zumutbar); in jedem Fall den Hinweis auf die Lizenz (mit Text oder Link) und den Hinweis auf eigene Änderungen. Bei einem Verstoß enden die Rechte automatisch und leben wieder auf, wenn der Verstoß binnen 30 Tagen nach Entdeckung beseitigt wird (CC 4.0 Abschnitt 6). **CC0** ist eine Widmung ohne Bedingungen für das Werk (Patent- und Markenrechte bleiben unberührt), ersatzweise eine umfassende Lizenz. Stand Oktober 2026, vor Verwendung prüfen.

### KI-Ergebnisse, KI-Code und Trainingsdaten

**Schutz von KI-Ergebnissen.** Werke sind nur persönliche geistige Schöpfungen (Stützangabe § 2 Abs. 2, § 7, § 69a Abs. 3 UrhG). Nach überwiegender Auffassung fehlt bei Text, Bild und Code, den ein KI-System ohne prägenden menschlichen Beitrag erzeugt, ein Werk (Auslegung; abschließend geklärt ist das nicht). Ein kurzer Auftrag („Prompt“) genügt dafür in der Regel nicht; Schutz kommt für Teile in Betracht, die Menschen selbst schaffen oder deren Gestaltung sie hinreichend prägen, etwa eigener Code, Architektur, Auswahl und Bearbeitung (Auslegung). Folgen: An ungeschützten Teilen lassen sich keine ausschließlichen Rechte einräumen, und eine Open-Source-Lizenz wirkt nur, soweit Rechte bestehen. Anderer Schutz bleibt möglich, etwa durch Vertrag und den Schutz von Geschäftsgeheimnissen (Stützangabe § 69g Abs. 1 UrhG, § 2 Nr. 1 GeschGehG). Praxis: KI-Einsatz und eigenen Anteil dokumentieren (Thema 6.8 „KI-Verordnung und KI-Einsatz im Projekt“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“) und Zusagen an Kundschaft nicht pauschal als „ausschließlich“ formulieren.

**Fremde Rechte in KI-Ergebnissen.** KI-Ausgaben können Teile Dritter enthalten, etwa wörtlich übernommenen Open-Source-Code. Sind sie geschützt, kann auf Unterlassung in Anspruch genommen werden, wer sie ohne Erlaubnis verwendet; die Herkunft aus einem KI-System entlastet nicht (Folgerung aus den allgemeinen Regeln; Schadensersatz setzt Verschulden voraus). Praxis: Ausgaben wie fremden Code prüfen, vor der Übernahme einen Lizenz- und Treffer-Scan laufen lassen, die Nutzungsbedingungen des Anbieters lesen (Rechte an Ausgaben, Verwendung der Eingaben, Freistellung); zur Eingabe von Kundencode und Kundendaten siehe das genannte Thema 6.8.

**Trainingsdaten und Text und Data Mining.** Zum Training werden Werke vervielfältigt. **Text und Data Mining** ist die automatisierte Analyse von Werken, um Muster, Trends und Korrelationen zu gewinnen. Zulässig sind dafür Vervielfältigungen **rechtmäßig zugänglicher** Werke, die zu löschen sind, wenn sie nicht mehr erforderlich sind; das gilt nur, wenn die Rechtsinhaber:in sich die Nutzung nicht vorbehalten hat; bei online zugänglichen Werken ist ein Vorbehalt nur wirksam, wenn er **maschinenlesbar** erfolgt (Stützangabe § 44b Abs. 1 bis 3 UrhG, umgesetzt aus Art. 4 der Richtlinie (EU) 2019/790). Das gilt auch für Computerprogramme (Stützangabe § 69d Abs. 4 UrhG); die weitergehende Forschungsregel steht Unternehmen im Regelfall nicht offen und gilt nicht für Programme (Stützangabe § 60d Abs. 2, § 69d Abs. 6 UrhG). Offen sind (Auslegung, Stand Oktober 2026): ob ein Vorbehalt in Nutzungsbedingungen in natürlicher Sprache genügt, ob die Regel das Training großer generativer Modelle ganz abdeckt und ob ein trainiertes Modell selbst Kopien enthält; Ausgaben, die geschützte Werke aus dem Training wiedergeben, deckt sie nicht. Erste Gerichtsentscheidungen liegen vor, eine höchstrichterliche Klärung steht aus. Wer ein Modell trainiert oder feinjustiert, dokumentiert Herkunft und Lizenz der Daten (etwa eine CC-Lizenz mit NC), beachtet erkennbare Vorbehalte (Praxis) und prüft den Personenbezug (Thema 6.2 „Datenschutz: Grundlagen, Pflichten und Kundenberatung“ im Fachgebiet „IT-Sicherheit, Datenschutz und Qualitätssicherung“). Anbieter von KI-Modellen mit allgemeinem Verwendungszweck müssen nach der KI-Verordnung eine Strategie zur Einhaltung des Urheberrechts einführen, insbesondere zur Beachtung solcher Vorbehalte, und eine Zusammenfassung der Trainingsinhalte veröffentlichen (Stützangabe Art. 53 Abs. 1 Buchst. c, d der Verordnung (EU) 2024/1689); das trifft die Anbieter der Modelle, nicht die Nutzer:innen eines fremden Modells (Rollen: Thema 6.8). Stand Oktober 2026, vor Verwendung prüfen.

## B. Karteikarten 2.2 (anhängen)

#### K-2.2-21
**Frage:** Wer ist Urheber:in eines Programms, und kann ein Unternehmen Urheberin sein?
**Antwort:** Urheber:in ist der Mensch, der das Werk geschaffen hat. Ein Unternehmen kann Inhaberin von Nutzungs- oder Verwertungsrechten sein, aber nicht Urheberin.
`tags: urheberrecht, urheber` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-2.2-22
**Frage:** Worin unterscheiden sich Urheberrecht und Nutzungsrecht, und welche Nutzungsrechte gibt es?
**Antwort:** Das Urheberrecht ist nicht übertragbar (außer durch Erbfall); eingeräumt werden Nutzungsrechte. Sie sind einfach (andere dürfen auch nutzen) oder ausschließlich und können räumlich, zeitlich oder inhaltlich beschränkt sein.
`tags: urheberrecht, nutzungsrecht` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.2-23
**Frage:** Wem stehen die Verwertungsrechte an einem Programm zu, das Arbeitnehmer:innen in Erfüllung ihrer Aufgaben schreiben?
**Antwort:** Dem Arbeitgeber, ausschließlich, sofern nichts anderes vereinbart ist; sie bleiben Urheber:innen. Voraussetzung ist, dass das Programm in Wahrnehmung der Aufgaben oder nach Anweisung entstand.
`tags: urheberrecht, arbeitsverhaeltnis` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.2-24
**Frage:** Wann entstehen die Pflichten der GPL, und wann nicht?
**Antwort:** Bei Weitergabe eines Werkes, das auf einem GPL-Programm beruht: Das Gesamtwerk muss unter der GPL stehen und der Quelltext bereitgestellt werden. Bei rein interner Nutzung ohne Weitergabe an Dritte entstehen sie nicht.
`tags: open-source, copyleft, gpl` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-2.2-25
**Frage:** Wie unterscheiden sich die Pflichten bei MIT-Lizenz und Apache-Lizenz 2.0?
**Antwort:** MIT: Urheberrechts- und Lizenzhinweis bleiben in allen Kopien. Apache 2.0 zusätzlich: Lizenzkopie beilegen, Änderungen kennzeichnen, NOTICE-Hinweise weitergeben. Der eigene Code muss nicht offengelegt werden.
`tags: open-source, lizenzen, permissiv` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.2-26
**Frage:** Warum löst ein Software-Dienst im Netz die Quelltextpflicht der GPL meist nicht aus, und was ändert die AGPL?
**Antwort:** Beim Dienst wird keine Kopie weitergegeben; reine Nutzung über das Netz ist nach dem Lizenzwortlaut keine Weitergabe. Die AGPL verlangt von der Betreiber:in einer geänderten Version, den Quelltext auch den Netznutzer:innen anzubieten.
`tags: open-source, agpl, netzdienst` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-2.2-27
**Frage:** Was bedeutet Lizenzverträglichkeit, und welches Beispiel ist problematisch?
**Antwort:** Die Bedingungen aller eingebundenen Komponenten müssen gleichzeitig erfüllbar sein. Problematisch ist eine GPL-Komponente in einem weitergegebenen proprietären Produkt, wenn keine andere Lizenz der Rechteinhaber:in vorliegt.
`tags: open-source, lizenzvertraeglichkeit` · `schwierigkeit: schwer` · `bloom: analysieren`

#### K-2.2-28
**Frage:** Was bedeuten die Kürzel BY, SA, NC und ND bei Creative-Commons-Lizenzen?
**Antwort:** BY: Urheber:in nennen. SA: Bearbeitungen unter gleichen oder kompatiblen Bedingungen weitergeben. NC: nur nicht kommerzielle Nutzung. ND: keine Bearbeitungen weitergeben.
`tags: creative-commons, lizenzen` · `schwierigkeit: mittel` · `bloom: erinnern`

#### K-2.2-29
**Frage:** Ist Code urheberrechtlich geschützt, den eine KI ohne prägenden menschlichen Beitrag erzeugt hat?
**Antwort:** Nach überwiegender Auffassung nein, denn Urheber:in kann nur ein Mensch sein. Schutz kommt für Teile in Betracht, die Menschen selbst schaffen oder prägen. Abschließend geklärt ist das nicht (Stand Oktober 2026).
`tags: ki, urheberrecht, code` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-2.2-30
**Frage:** Unter welchen Bedingungen darf man Werke nach der gesetzlichen Regel zum Text und Data Mining automatisiert auswerten, etwa für ein Klassifikationsmodell?
**Antwort:** Rechtmäßig zugängliche Werke, kein Vorbehalt der Rechtsinhaber:in (online nur maschinenlesbar wirksam), Kopien löschen, sobald nicht mehr nötig. Ob das auch das Training großer generativer Modelle abdeckt, ist offen (Stand Oktober 2026).
`tags: ki, trainingsdaten, text-und-data-mining` · `schwierigkeit: schwer` · `bloom: anwenden`

## C. Quiz 2.2 (anhängen)

#### Q-2.2-15 · Multiple Choice
**Frage:** Eine Systemadministratorin schreibt am Wochenende auf ihrem privaten Rechner ein Hilfsprogramm für ihr Hobby. Es hat keinen Bezug zu ihren Aufgaben im Betrieb, der Arbeitgeber hat nichts angewiesen, und eine besondere Vereinbarung besteht nicht. Was gilt für die Rechte an dem Programm?
- [ ] Der Arbeitgeber erhält automatisch alle Verwertungsrechte, weil sie bei ihm angestellt ist.
- [x] Sie bleibt Inhaberin der Rechte, weil die Voraussetzungen für den Arbeitgeber fehlen.
- [ ] Das Programm ist gemeinfrei, weil es privat entstand.
- [ ] Die Rechte stehen ihr und dem Arbeitgeber je zur Hälfte zu.
**Erklärung:** Die Regel zugunsten des Arbeitgebers verlangt, dass das Programm in Wahrnehmung der Aufgaben oder nach Anweisung geschaffen wurde. Fehlt das, bleiben die Rechte bei der Urheberin; arbeitsvertragliche Pflichten wie Geheimhaltung bleiben unberührt. 
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-16 · Zuordnung
**Anweisung:** Ordne jeden Begriff der passenden Beschreibung zu.
- Einfaches Nutzungsrecht ↔ Nutzung erlaubt, andere dürfen daneben ebenfalls nutzen
- Ausschließliches Nutzungsrecht ↔ Nutzung unter Ausschluss aller anderen Personen
- Urheber:in ↔ Natürliche Person, die das Werk geschaffen hat
- Zweckübertragungsregel ↔ Bei unklarer Vereinbarung bestimmt der Vertragszweck die eingeräumten Rechte
**Erklärung:** Nutzungsrechte unterscheiden sich darin, ob andere daneben nutzen dürfen. Die Zweckübertragungsregel füllt Lücken im Vertrag, und Urheber:in kann nur ein Mensch sein, kein Unternehmen.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-2.2-17 · Wahr/Falsch
**Aussage:** Ein Lizenzvertrag kann der Kundschaft nicht wirksam verbieten, eine Sicherungskopie anzulegen, die sie zur Sicherung künftiger Benutzung des Programms braucht.
- [x] Wahr
- [ ] Falsch
**Erklärung:** Eine erforderliche Sicherungskopie durch eine zur Benutzung berechtigte Person darf vertraglich nicht untersagt werden; eine solche Klausel wäre nichtig. Das gilt für die Sicherung künftiger Benutzung, nicht für beliebig viele Kopien.
`schwierigkeit: mittel` · `bloom: erinnern`

#### Q-2.2-18 · Multiple Choice
**Frage:** Ein Team baut eine Bibliothek unter GPL in ein Auswertungswerkzeug ein. Das Werkzeug läuft nur auf Servern des eigenen Unternehmens und wird niemandem außerhalb überlassen. Muss das Team den Quelltext veröffentlichen?
- [ ] Ja, denn jedes Programm, das eine GPL-Komponente enthält, muss veröffentlicht werden.
- [ ] Ja, aber nur den Quelltext der eingebundenen Bibliothek, nicht den des Werkzeugs selbst.
- [ ] Nein, weil die GPL nur für Betriebssysteme und nicht für Bibliotheken gilt.
- [x] Nein, die Pflichten entstehen erst bei Weitergabe, nicht bei rein interner Nutzung.
**Erklärung:** Die GPL knüpft ihre Bedingungen an die Weitergabe an Dritte. Wer das Programm nur intern nutzt, muss nichts veröffentlichen; würde das Werkzeug später an Kundschaft ausgeliefert, gälten die Pflichten.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-19 · Mehrfachauswahl
**Frage:** Eine Anwendung wird an die Kundschaft ausgeliefert und enthält eine Bibliothek unter Apache-Lizenz 2.0. Einige Dateien der Bibliothek wurden geändert, und sie bringt eine NOTICE-Datei mit. Welche Pflichten bestehen?
- [x] Eine Kopie der Lizenz beilegen
- [x] Die geänderten Dateien als geändert kennzeichnen
- [ ] Den gesamten Quelltext der eigenen Anwendung offenlegen
- [x] Die Hinweise aus der NOTICE-Datei weitergeben
- [ ] Die Anwendung ebenfalls unter die Apache-Lizenz stellen
**Erklärung:** Die Apache-Lizenz verlangt Lizenzkopie, Änderungsvermerke und die Weitergabe der Zuordnungshinweise. Eine Pflicht, den eigenen Code offenzulegen oder die Anwendung unter dieselbe Lizenz zu stellen, besteht nicht.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-20 · Sortieren
**Anweisung:** Bringe die Schritte einer Open-Source-Prüfung vor der Auslieferung in eine sinnvolle Reihenfolge.
1. Alle Komponenten samt transitiver Abhängigkeiten erfassen
2. Die Lizenz jeder Komponente feststellen
3. Verträglichkeit mit Auslieferungsform und Vertrag bewerten
4. Pflichten wie Hinweisdatei oder Quelltext erfüllen und dokumentieren
**Erklärung:** Erst wenn bekannt ist, was enthalten ist und unter welcher Lizenz es steht, lässt sich bewerten, ob die Bedingungen passen; die Pflichten werden zuletzt erfüllt und festgehalten.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-21 · Multiple Choice
**Frage:** Eine Entwicklerin findet auf einer Code-Plattform eine Funktion, die genau das Gewünschte tut. Das Repository enthält weder eine Lizenzdatei noch einen Lizenzhinweis. Sie will die Funktion in ein Kundenprojekt kopieren. Wie ist das einzuschätzen?
- [ ] Ja, denn Funktionen aus wenigen Zeilen sind nie urheberrechtlich geschützt.
- [ ] Nein, weil öffentlich einsehbarer Code grundsätzlich nur zu Lehrzwecken genutzt werden darf.
- [x] Nein, ohne Lizenz braucht sie die Zustimmung der Rechteinhaber:in oder eine Alternative.
- [ ] Ja, wenn sie den Namen der Autorin im Quelltext erwähnt und die Fundstelle im Projekt angibt.
**Erklärung:** Ohne Lizenz fehlt grundsätzlich die Erlaubnis, Code zu vervielfältigen und weiterzugeben; dass er öffentlich einsehbar ist, ändert daran nichts. Auch kurze Funktionen können geschützt sein, wenn sie individuell gestaltet sind.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-22 · Kurzantwort
**Frage:** Welcher Baustein der Creative-Commons-Lizenzen (Kürzel aus zwei Buchstaben) verpflichtet dazu, Bearbeitungen unter denselben oder kompatiblen Bedingungen weiterzugeben?
**Akzeptierte Antworten:** SA; BY-SA; BY SA; CC BY-SA; CC BY SA; CC-BY-SA; CC BY-SA 4.0; ShareAlike; Share-Alike; Weitergabe unter gleichen Bedingungen
**Erklärung:** SA steht für ShareAlike (Weitergabe unter gleichen Bedingungen). BY verlangt die Namensnennung, NC schließt kommerzielle Nutzung aus, ND verbietet Bearbeitungen.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-2.2-23 · Mehrfachauswahl
**Frage:** Ein Team verwendet in einer ausgelieferten App Icons, die unter CC BY 4.0 stehen und unverändert übernommen wurden. Der Lizenzgeber hat Namen, Urheberrechtsvermerk und einen Link zum Material angegeben. Was gehört zu den Pflichten?
- [x] Die angegebene Urheber:in und den Urheberrechtsvermerk nennen
- [ ] Die gesamte App unter dieselbe Creative-Commons-Lizenz stellen
- [x] Auf die Lizenz hinweisen, mit Lizenztext oder Link
- [ ] Die Icons nur in unentgeltlichen Apps verwenden
- [x] Den angegebenen Link beibehalten, soweit zumutbar
**Erklärung:** BY verlangt den Lizenzhinweis immer, Namensnennung, Urheberrechtsvermerk und Link zum Material (soweit zumutbar) dann, wenn der Lizenzgeber sie angegeben hat; die Form darf dem Medium angepasst werden. Weitergabe unter gleichen Bedingungen wäre SA, die Beschränkung auf nicht kommerzielle Nutzung NC.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-2.2-24 · Multiple Choice
**Frage:** Eine Entwicklerin gibt einem KI-Assistenten nur den Auftrag „Schreibe eine Funktion, die Zeitzonen umrechnet“ und übernimmt die erzeugte Funktion unverändert. Was gilt nach überwiegender Auffassung (Stand Oktober 2026)?
- [ ] Die Entwicklerin ist Urheberin der Funktion, weil sie die Aufgabe formuliert und angestoßen hat.
- [ ] Die Anbieterin des KI-Assistenten ist automatisch Urheberin.
- [x] Der kurze Auftrag allein begründet in der Regel kein Urheberrecht an der Funktion.
- [ ] Die Funktion ist geschützt, weil sie technisch einwandfrei arbeitet.
**Erklärung:** Urheber:in kann nur ein Mensch sein, und Schutz setzt eine persönliche geistige Schöpfung voraus. Ein kurzer Arbeitsauftrag prägt das Ergebnis in der Regel nicht ausreichend; endgültig geklärt ist die Frage aber nicht.
`schwierigkeit: schwer` · `bloom: bewerten`

#### Q-2.2-25 · Multiple Choice
**Frage:** Ein Unternehmen will Fachbeiträge von drei Websites automatisiert laden, um ein Klassifikationsmodell zu trainieren. Portal A ist frei zugänglich und enthält keinerlei Nutzungsvorbehalt. Portal B ist frei zugänglich und erklärt maschinenlesbar einen Vorbehalt gegen Text und Data Mining. Portal C ist nur gegen Abonnement zugänglich, das Unternehmen hat keines. Für welche Portale greift die gesetzliche Erlaubnis zum Text und Data Mining?
- [ ] Für alle drei Portale
- [x] Nur für Portal A
- [ ] Für A und B
- [ ] Für A und C
**Erklärung:** Die Erlaubnis gilt nur für rechtmäßig zugängliche Werke und nur, wenn die Rechtsinhaber:in sich die Nutzung nicht vorbehalten hat. B hat einen wirksamen maschinenlesbaren Vorbehalt erklärt, C ist ohne Abonnement nicht rechtmäßig zugänglich.
`schwierigkeit: schwer` · `bloom: anwenden`

#### Q-2.2-26 · Wahr/Falsch
**Aussage:** Dass ein KI-Assistent den Code erzeugt hat, schließt Unterlassungsansprüche Dritter wegen darin enthaltener fremder Werkteile aus.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Wer fremde geschützte Teile verwendet, kann auf Unterlassung in Anspruch genommen werden, unabhängig davon, wie sie in den Code gelangt sind. Schadensersatz setzt zusätzlich Vorsatz oder Fahrlässigkeit voraus.
`schwierigkeit: mittel` · `bloom: bewerten`
