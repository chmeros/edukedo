# Prüfblatt Anwendungsentwicklung — neue Inhalte (Kursprofile Phase 1)

Stand 06.10.2026 · erzeugt aus `content/fachinformatiker-anwendungsentwicklung/` (F-177). **Alle Inhalte sind Entwürfe.** Die neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (`kurs-angebot.ts`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.

## 1. Zonen-Instrumente (Begriffe den Zonen zuordnen)

### Entwurfs- und Architekturmuster (4 Fragen) — Zonen: Singleton · Fabrikmethode (Factory) · Beobachter (Observer) · MVC

**Besonders prüfen:**
- ⚠ GoF-Entwurfsmuster (Singleton, Fabrikmethode, Beobachter) und MVC (Architekturmuster) sind verschiedene Kategorien — wird das in Erklärung und Zonen sauber ausgewiesen?

#### Q-8.2-15 · Entwurfs- und Architekturmuster (Leicht)

*Ordne die Beschreibungen dem passenden Muster zu.*

| Begriff | Zone |
| --- | --- |
| Genau eine Instanz der Konfiguration im ganzen Programm | Singleton |
| Änderungen automatisch an alle angemeldeten Anzeigen melden | Beobachter (Observer) |
| Oberfläche, Fachlogik und Daten trennen | MVC |
| Unterklassen entscheiden, welches konkrete Objekt erzeugt wird | Fabrikmethode (Factory) |
| Zweiter Aufruf von getInstance() liefert dasselbe Objekt wie der erste | Singleton |
| Der Controller nimmt Eingaben entgegen und wählt die passende View | MVC |
| Rechnungsexport liefert je nach Format einen CSV- oder PDF-Exporter | Fabrikmethode (Factory) |
| Kursticker informiert alle Abonnenten, sobald ein neuer Kurs vorliegt | Beobachter (Observer) |

**Erklärung (so sehen Lernende sie):**

> Singleton, Fabrikmethode und Beobachter sind GoF-Entwurfsmuster: Sie lösen ein Detailproblem im Zusammenspiel weniger Klassen (eine Instanz sichern, Erzeugung auslagern, Abhängige benachrichtigen). MVC ist dagegen ein Architekturmuster und gliedert den Grundaufbau einer Anwendung in Model, View und Controller. Typische Verwechslung: „Es gibt nur eine Instanz" (Singleton) mit „eine Methode erzeugt die Objekte" (Fabrikmethode) gleichzusetzen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-16 · Entwurfs- und Architekturmuster (Mittel)

*Ordne die Situationen dem Muster zu, das sie beschreibt.*

| Begriff | Zone |
| --- | --- |
| Ein gemeinsamer Protokollierer (Logger), den alle Klassen verwenden | Singleton |
| Der private Konstruktor verhindert, dass andere Klassen neue Objekte anlegen | Singleton |
| Listener melden sich an und werden bei einem Ereignis automatisch aufgerufen | Beobachter (Observer) |
| Das Subjekt kennt seine Beobachter nur über eine gemeinsame Schnittstelle | Beobachter (Observer) |
| Je nach Dateityp erzeugt eine überschreibbare Methode das passende Objekt | Fabrikmethode (Factory) |
| Neue Zahlungsart: nur eine weitere Unterklasse des Erzeugers anlegen | Fabrikmethode (Factory) |
| Dieselben Daten erscheinen in Tabelle und Diagramm, die Fachlogik bleibt gleich | MVC |
| Die View zeigt Daten an und enthält keine Geschäftsregeln | MVC |

**Erklärung (so sehen Lernende sie):**

> Beim Singleton geht es um die Anzahl der Instanzen (genau eine), bei der Fabrikmethode um die Auswahl der konkreten Klasse beim Erzeugen, beim Beobachter um die automatische Benachrichtigung abhängiger Objekte. MVC trennt Daten, Darstellung und Steuerung; es ist ein Architekturmuster, kein GoF-Entwurfsmuster. Häufige Verwechslung: Der Beobachter wird mit MVC vermischt, weil Views oft das Model beobachten — das sind aber zwei Ebenen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-17 · Entwurfs- und Architekturmuster (Mittel)

*Welches Muster passt zu welchem Anwendungsfall? Ordne zu.*

| Begriff | Zone |
| --- | --- |
| Ein Verbindungspool, den alle Programmteile des Portals gemeinsam nutzen | Singleton |
| Die Anwendung darf nie zwei verschiedene Lizenzverwalter gleichzeitig besitzen | Singleton |
| Statuswechsel eines Auftrags lässt Dashboard und Mailversand reagieren | Beobachter (Observer) |
| Eine Messwert-Anzeige abonniert den Sensor und aktualisiert sich selbst | Beobachter (Observer) |
| Der Erzeuger-Code kennt nur die Schnittstelle Exporter, nicht CSV oder PDF | Fabrikmethode (Factory) |
| Welche Berichtsklasse entsteht, entscheidet die jeweilige Unterklasse | Fabrikmethode (Factory) |
| Modell, Ansicht und Steuerung bilden den Grundaufbau der Webanwendung | MVC |
| Die Oberfläche ist austauschbar, ohne die Fachlogik anzufassen | MVC |

**Erklärung (so sehen Lernende sie):**

> Achte auf das Signalwort: „einzige/nie zwei" weist auf Singleton, „abonniert/reagiert automatisch" auf den Beobachter, „kennt nur die Schnittstelle, Unterklasse entscheidet" auf die Fabrikmethode, „Grundaufbau/Trennung von Daten, Darstellung, Steuerung" auf MVC. MVC steht auf einer anderen Ebene (Architektur) als die drei übrigen Entwurfsmuster.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-18 · Entwurfs- und Architekturmuster (Schwer)

*Ordne die Eigenschaften, Vor- und Nachteile dem Muster zu, auf das sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Verdeckte globale Abhängigkeit, die Modultests erschwert | Singleton |
| Der Zustand der einzigen Instanz muss bei mehreren Threads abgesichert werden | Singleton |
| Ein nicht abgemeldeter Beobachter bleibt im Speicher hängen | Beobachter (Observer) |
| Das Subjekt ruft bei Änderung eine update-Methode aller Angemeldeten auf | Beobachter (Observer) |
| Der Aufrufer ruft eine Erzeugungsmethode statt new auf eine konkrete Klasse auf | Fabrikmethode (Factory) |
| Neue Produktvariante ergänzen, ohne den bestehenden Aufrufer zu ändern | Fabrikmethode (Factory) |
| Zählt zu den Architekturmustern, nicht zu den klassischen GoF-Mustern | MVC |
| Neues Layout für die Webseite, das Model bleibt unverändert | MVC |

**Erklärung (so sehen Lernende sie):**

> Beim Singleton drohen versteckte Abhängigkeit und Nebenläufigkeitsprobleme; beim Beobachter das „vergessene" Abmelden; die Fabrikmethode entkoppelt Aufrufer und konkrete Klasse (offen für Erweiterung, geschlossen für Änderung). MVC unterscheidet sich als Architekturmuster in der Kategorie von den drei GoF-Entwurfsmustern. Wichtige Abgrenzung: Singleton, Fabrikmethode und Beobachter beschreiben das Zusammenspiel weniger Klassen, MVC die Gesamtstruktur.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### UML-Klassenbeziehungen (4 Fragen) — Zonen: Assoziation · Aggregation · Komposition · Vererbung (Generalisierung) · Abhängigkeit

**Besonders prüfen:**
- ⚠ Aggregation und Komposition nach der Prüfungslesart (Komposition = Teil existiert nicht ohne Ganzes). Strittige Begriffe: „Ordner und Dateien“, „Warenkorb und Artikel“.

#### Q-8.2-19 · UML-Klassenbeziehungen (Leicht)

*Ordne die Sachverhalte der passenden Beziehung im Klassendiagramm zu.*

| Begriff | Zone |
| --- | --- |
| Ein Kunde erteilt Aufträge, ein Auftrag gehört zu genau einem Kunden | Assoziation |
| Ein Team besteht aus Mitarbeitenden, die auch ohne das Team existieren | Aggregation |
| Ein Warenkorb verweist auf Artikel, die auch ohne ihn im Sortiment bleiben | Aggregation |
| Ein Raum existiert nicht ohne sein Gebäude | Komposition |
| Wird die Rechnung gelöscht, verschwinden auch ihre Positionen | Komposition |
| Die Unterklasse erbt von der Oberklasse | Vererbung (Generalisierung) |
| Techniker ist ein Spezialfall von Mitarbeiter | Vererbung (Generalisierung) |
| Klasse A nutzt Klasse B nur kurz als Parameter einer Methode | Abhängigkeit |

**Erklärung (so sehen Lernende sie):**

> Die Assoziation ist die allgemeine, dauerhafte Beziehung zwischen Klassen. Aggregation und Komposition sind Teil-Ganzes-Beziehungen: Bei der Komposition ist das Teil existenzabhängig und wird mit dem Ganzen gelöscht, bei der Aggregation kann es unabhängig existieren. Vererbung beschreibt „ist ein"-Beziehungen, die Abhängigkeit eine nur kurzzeitige Nutzung. Typische Verwechslung: Aggregation und Komposition — entscheidend ist, ob das Teil ohne das Ganze weiterlebt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-20 · UML-Klassenbeziehungen (Mittel)

*Ordne die beschriebenen Situationen der passenden Klassenbeziehung zu.*

| Begriff | Zone |
| --- | --- |
| Die Klasse Bestellung enthält ein Attribut, das auf genau einen Kunden verweist | Assoziation |
| Zwei Klassen kennen sich dauerhaft, keine ist Teil der anderen | Assoziation |
| Ein Fuhrpark umfasst Fahrzeuge, die nach seiner Auflösung weiter genutzt werden | Aggregation |
| Eine Playlist enthält Titel, die nach dem Löschen der Playlist weiterbestehen | Aggregation |
| Ein Menü besteht aus Menüeinträgen, die mit dem Menü gelöscht werden | Komposition |
| Mietwagen und Lieferwagen teilen sich die Attribute der Klasse Fahrzeug | Vererbung (Generalisierung) |
| Eine Methode ruft kurz einen Hilfsdienst auf, hält ihn aber nicht als Attribut | Abhängigkeit |
| Eine Dokumentklasse verwendet eine Formatierungsklasse nur in einer lokalen Variable | Abhängigkeit |

**Erklärung (so sehen Lernende sie):**

> Ein dauerhafter Verweis (Attribut) ist eine Assoziation, eine nur flüchtige Verwendung (Parameter, lokale Variable) lediglich eine Abhängigkeit. Ob ein Teil das Ganze überlebt, entscheidet über Aggregation (ja) oder Komposition (nein). Die gemeinsame Basisklasse bildet die Vererbung ab. Typische Verwechslung: Abhängigkeit und Assoziation — die Assoziation ist stärker und dauerhaft.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-21 · UML-Klassenbeziehungen (Mittel)

*Ordne die Aussagen der Beziehung zu, auf die sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Eine Klasse wirft eine Ausnahme einer anderen Klasse, speichert aber keinen Verweis | Abhängigkeit |
| Eine Änderung an Klasse B kann Klasse A betreffen, obwohl A B nicht als Attribut hält | Abhängigkeit |
| Die Klasse Konto erbt Attribute und Methoden von Bankprodukt | Vererbung (Generalisierung) |
| Die Oberklasse Fahrzeug wird durch PKW und LKW spezialisiert | Vererbung (Generalisierung) |
| Eine Bestellung erzeugt ihre Positionen selbst und löscht sie beim eigenen Löschen | Komposition |
| Eine Adresse, die nur zu einem Kundenkonto gehört und mit ihm gelöscht wird | Komposition |
| Mitarbeitende einer aufgelösten Abteilung wechseln in andere Abteilungen | Aggregation |
| Ein Student belegt mehrere Kurse, ein Kurs hat mehrere Studierende | Assoziation |

**Erklärung (so sehen Lernende sie):**

> Bei Vererbung wird eine Eigenschaft der Oberklasse an die Unterklasse weitergegeben („ist ein"). Eine Abhängigkeit besteht schon, wenn eine Klasse eine andere nur verwendet — sie wirkt auch ohne Attribut. Komposition meint existenzabhängige Teile, Aggregation unabhängig existierende Teile, die Assoziation die allgemeine dauerhafte Beziehung mit Multiplizitäten (hier n:m). Häufiger Fehler: „besteht aus" automatisch als Komposition zu zeichnen, ohne die Existenzabhängigkeit zu prüfen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-22 · UML-Klassenbeziehungen (Schwer)

*Entscheide anhand der Details, welche Beziehung vorliegt, und ordne zu.*

| Begriff | Zone |
| --- | --- |
| Ein Zug besteht aus Waggons, die zwischen Zügen getauscht werden können | Aggregation |
| Mitglieder eines aufgelösten Vereins bestehen als Privatpersonen weiter | Aggregation |
| Der Konstruktor von Auftrag erzeugt die Positionen; ohne Auftrag keine Position | Komposition |
| Wird der Ordner gelöscht, werden alle enthaltenen Dateien mitgelöscht | Komposition |
| Eine Methode, die Fahrzeug erwartet, akzeptiert auch jedes Auto-Objekt | Vererbung (Generalisierung) |
| Die Unterklasse überschreibt die geerbte Methode berechnePreis() | Vererbung (Generalisierung) |
| Ein Dozent unterrichtet mehrere Gruppen, jede Gruppe hat genau einen Dozenten | Assoziation |
| Eine Lieferklasse ruft eine statische Hilfsmethode einer Utility-Klasse auf | Abhängigkeit |

**Erklärung (so sehen Lernende sie):**

> Entscheidend sind die Signalwörter: „kann getauscht werden / bleibt bestehen" spricht für Aggregation, „ohne … keine …/mitgelöscht" für Komposition. Eine Methode, die ein Fahrzeug erwartet und ein Auto akzeptiert, nutzt die Ersetzbarkeit durch Unterklassen (Vererbung). Der Aufruf einer statischen Hilfsmethode begründet nur eine Abhängigkeit, Multiplizitäten zwischen Dozent und Gruppe kennzeichnen eine Assoziation. In Prüfungen gilt die hier verwendete Lesart; in der Fachliteratur wird die Abgrenzung von Aggregation und Komposition teils weicher gezogen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### UML-Diagramme (3 Fragen) — Zonen: Klassendiagramm · Use-Case-Diagramm · Sequenzdiagramm · Aktivitätsdiagramm · Zustandsdiagramm

**Besonders prüfen:**
- ⚠ Neue Zone „Zustandsdiagramm“ — nur die Fragen ab Q-8.2-23 enthalten sie.

#### Q-8.2-23 · UML-Diagramme (Leicht)

*Ordne die Fragestellungen dem UML-Diagramm zu, das sie hauptsächlich beantwortet.*

| Begriff | Zone |
| --- | --- |
| Welche Zustände durchläuft eine Bestellung von „neu" bis „geliefert"? | Zustandsdiagramm |
| Welche Attribute und Methoden hat die Klasse Kunde? | Klassendiagramm |
| Welche Klasse erbt von welcher anderen Klasse? | Klassendiagramm |
| Wer darf im System Rechnungen stornieren? | Use-Case-Diagramm |
| Welche Anwendungsfälle bietet das System der Disponentin? | Use-Case-Diagramm |
| In welcher Reihenfolge ruft die App Backend und Datenbank beim Speichern auf? | Sequenzdiagramm |
| Wie läuft die Prüfung einer Bestellung Schritt für Schritt samt Entscheidungen ab? | Aktivitätsdiagramm |

**Erklärung (so sehen Lernende sie):**

> Jedes Diagramm beantwortet eine eigene Leitfrage: Aufbau der Klassen (Klassendiagramm), Akteure und Funktionen (Use-Case), zeitliche Nachrichtenfolge (Sequenz), Ablauf eines Vorgangs (Aktivität) und Lebenszyklus eines Objekts (Zustand). Typische Verwechslung: Aktivitätsdiagramm (Ablauf eines Vorgangs) und Zustandsdiagramm (Zustände eines Objekts).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-24 · UML-Diagramme (Mittel)

*Ordne die Fragestellungen dem passenden UML-Diagramm zu.*

| Begriff | Zone |
| --- | --- |
| Auf welches Ereignis hin wechselt ein Konto von „aktiv" zu „gesperrt"? | Zustandsdiagramm |
| Unter welcher Bedingung darf ein Dokument in den Zustand „veröffentlicht" wechseln? | Zustandsdiagramm |
| Welche Nachrichten gehen zwischen Browser, Server und Zahlungsdienst hin und her? | Sequenzdiagramm |
| Wie lange ist ein Objekt aktiv, während es auf eine Antwort wartet? | Sequenzdiagramm |
| Welche Schritte laufen parallel, bevor das Paket verschickt wird? | Aktivitätsdiagramm |
| Wer ist für welche Aktion zuständig (Bahnen für Vertrieb und Lager)? | Aktivitätsdiagramm |
| Wie viele Aufträge kann ein Kunde höchstens haben? | Klassendiagramm |
| Welche Akteure außer dem Techniker nutzen die Wartungs-App? | Use-Case-Diagramm |

**Erklärung (so sehen Lernende sie):**

> Zustandsdiagramme zeigen Zustände und Transitionen mit Ereignis und Bedingung, Sequenzdiagramme die zeitliche Nachrichtenfolge samt Aktivierungsbalken, Aktivitätsdiagramme Abläufe mit Parallelität (Fork/Join) und Bahnen (Partitionen), das Klassendiagramm Multiplizitäten an Assoziationen und das Use-Case-Diagramm die Akteure. Typische Verwechslung: Bedingungen (Wächter) gibt es sowohl im Aktivitäts- als auch im Zustandsdiagramm — entscheidend ist, ob es um Zustände eines Objekts oder um Schritte eines Ablaufs geht.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-8.2-25 · UML-Diagramme (Schwer)

*Ordne die Fragestellungen dem Diagramm zu, mit dem sie sich am besten beantworten lassen.*

| Begriff | Zone |
| --- | --- |
| Darf ein bereits geschlossenes Ticket wieder geöffnet werden? | Zustandsdiagramm |
| Was passiert beim Betreten und Verlassen des Zustands „in Bearbeitung" (entry/exit)? | Zustandsdiagramm |
| Welche Teilfunktion wird per include immer in die Wartungsplanung eingebunden? | Use-Case-Diagramm |
| Welches Fremdsystem ist an der Rechnungsstellung beteiligt? | Use-Case-Diagramm |
| Welche Schnittstelle realisiert die Klasse, und welche Methoden implementiert sie? | Klassendiagramm |
| Wie hängen Rechnung und Rechnungsposition über eine Komposition zusammen? | Klassendiagramm |
| Welche Aufrufe laufen in einer Schleife (loop) zwischen Client und Server? | Sequenzdiagramm |
| Wo teilt sich der Ablauf in parallele Äste (Fork) und führt sie wieder zusammen (Join)? | Aktivitätsdiagramm |

**Erklärung (so sehen Lernende sie):**

> Die Fachbegriffe geben die Richtung vor: entry/exit und Wiedereröffnung gehören zum Zustandsdiagramm, include und Akteure zum Use-Case-Diagramm, Realisierung und Komposition zum Klassendiagramm, loop und alt-Fragmente zum Sequenzdiagramm, Fork und Join zum Aktivitätsdiagramm. Schwierig wird es, wenn mehrere Diagramme Elemente teilen (z. B. Bedingungen oder Entscheidungen): Dann entscheidet der Gegenstand der Frage — Struktur, Funktionsumfang, Nachrichtenfolge, Ablauf oder Lebenszyklus.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Testverfahren (4 Fragen) — Zonen: Statische Verfahren · Dynamisch: Black-Box · Dynamisch: White-Box

**Besonders prüfen:**
- ⚠ Zyklomatische Komplexität gilt als statische Analyse; Kontrollflussgraph für Zweigüberdeckung als White-Box (Q-9.2-16).

#### Q-9.2-14 · Testverfahren (Leicht)

*Ordne die Situationen dem passenden Testverfahren zu.*

| Begriff | Zone |
| --- | --- |
| Eine Kollegin liest den Code der Rabattfunktion im Code-Review | Statische Verfahren |
| Mit Papier und Beispielwerten den Programmablauf Schritt für Schritt nachvollziehen | Statische Verfahren |
| Für Menge 9 und 10 prüfen, ob der Rabatt wie in der Spezifikation springt | Dynamisch: Black-Box |
| Eingabewerte in gültige und ungültige Klassen einteilen, je Klasse einen Wert testen | Dynamisch: Black-Box |
| Prüfen, dass jede Anweisung der Methode mindestens einmal ausgeführt wurde | Dynamisch: White-Box |
| Testfälle so wählen, dass if- und else-Zweig durchlaufen werden | Dynamisch: White-Box |

**Erklärung (so sehen Lernende sie):**

> Statische Verfahren führen den Prüfling nicht aus (Review, Schreibtischtest, Codeanalyse). Dynamische Verfahren führen ihn aus: Black-Box wählt die Testfälle aus der Spezifikation (Äquivalenzklassen, Grenzwerte), White-Box aus der Programmstruktur (Anweisungs- und Zweigüberdeckung). Typische Verwechslung: Der Schreibtischtest „spielt" das Programm zwar durch, führt es aber nicht auf dem Rechner aus — er zählt zu den statischen Verfahren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-15 · Testverfahren (Mittel)

*Ordne die Beschreibungen dem passenden Testverfahren zu.*

| Begriff | Zone |
| --- | --- |
| Ein Werkzeug meldet nicht benutzte Variablen, ohne das Programm zu starten | Statische Verfahren |
| Eine Spezifikation wird in einem Walkthrough gemeinsam auf Widersprüche geprüft | Statische Verfahren |
| Eine Entscheidungstabelle legt Kombinationen aus Kundenstatus und Bestellwert fest | Dynamisch: Black-Box |
| Aus einem Anwendungsfall des Kunden wird ein Testfall abgeleitet | Dynamisch: Black-Box |
| Der Tester kennt den Quelltext und misst, welche Zweige durchlaufen wurden | Dynamisch: White-Box |
| Jede Teilbedingung einer zusammengesetzten Bedingung wird einmal wahr, einmal falsch | Dynamisch: White-Box |
| Der Build-Bericht weist 85 % Zweigüberdeckung aus | Dynamisch: White-Box |

**Erklärung (so sehen Lernende sie):**

> Review, Walkthrough und Werkzeuganalyse prüfen ohne Ausführung. Entscheidungstabellen und Anwendungsfälle liefern Testfälle aus der Spezifikation (Black-Box), Überdeckungsmaße wie Zweig- und Bedingungsüberdeckung setzen die Kenntnis des Codes voraus (White-Box). Typische Verwechslung: Die Entscheidungstabelle ähnelt einer Verzweigung im Code, ist aber ein spezifikationsbasiertes Verfahren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-16 · Testverfahren (Mittel)

*Ordne die Vorgehensweisen dem Testverfahren zu, zu dem sie gehören.*

| Begriff | Zone |
| --- | --- |
| Ein Team prüft in einer Inspektion die Anforderungen vor Programmierbeginn | Statische Verfahren |
| Ein Linter markiert unerreichbaren Code und fehlende Initialisierungen | Statische Verfahren |
| Ein Werkzeug berechnet die zyklomatische Komplexität, ohne die Methode auszuführen | Statische Verfahren |
| Grenzwerte 17, 18, 65 und 66 für ein Altersfeld von 18 bis 65 wählen | Dynamisch: Black-Box |
| Testfälle allein aus der Spezifikation ableiten, ohne den Code zu kennen | Dynamisch: Black-Box |
| Alle Kombinationen aus Rolle und Berechtigung als Regeln einer Tabelle prüfen | Dynamisch: Black-Box |
| Alle Pfade durch zwei verschachtelte Schleifen auf Überdeckung auswerten | Dynamisch: White-Box |
| Aus dem Kontrollflussgraphen Testfälle für 100 % Zweigüberdeckung ableiten | Dynamisch: White-Box |

**Erklärung (so sehen Lernende sie):**

> Alles, was den Prüfling nicht ausführt (Inspektion, Linter, Metriken), ist statisch. Grenzwerte, spezifikationsbasierte Ableitung und Entscheidungstabellen sind Black-Box, Pfade und Kontrollflussgraph gehören zur White-Box. Typische Verwechslung: Metriken wie die zyklomatische Komplexität wirken wie White-Box, werden aber ohne Testausführung berechnet — also statisch.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.2-17 · Testverfahren (Schwer)

*Ordne die Aussagen dem Testverfahren zu, auf das sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Ein Fehlerzustand wird gefunden, noch bevor es ein lauffähiges Programm gibt | Statische Verfahren |
| Zwei Entwickler prüfen im Merge-Request gegenseitig ihre Änderungen | Statische Verfahren |
| Datenbankskripte werden ohne Ausführung auf Syntax und Namensregeln geprüft | Statische Verfahren |
| Mehrere Eingaben derselben Äquivalenzklasse sollen dasselbe Verhalten zeigen | Dynamisch: Black-Box |
| Tester ohne Programmierkenntnisse leiten Testfälle aus den Fachanforderungen ab | Dynamisch: Black-Box |
| Unerlaubte Zustandswechsel einer Bestellung sollen vom System abgelehnt werden | Dynamisch: Black-Box |
| Die Zweige einer Methode werden ausgezählt, um daraus Testfälle zu bestimmen | Dynamisch: White-Box |
| Alle Anweisungen sind überdeckt, aber der Falsch-Zweig der Bedingung fehlt noch | Dynamisch: White-Box |

**Erklärung (so sehen Lernende sie):**

> Statische Verfahren finden Fehlerzustände direkt und früh, schon an Dokumenten und Code ohne Ausführung. Black-Box-Tester benötigen keine Codekenntnis: Äquivalenzklassen, fachliche Anforderungen und Zustandsübergänge liefern die Testfälle. White-Box misst, wie viel der Programmstruktur die Tests abdecken; 100 % Anweisungsüberdeckung bedeuten noch keine Zweigüberdeckung. Gemeinsamer Fehler: „Das Programm wird gelesen" mit „das Programm wird ausgeführt" zu verwechseln.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Git-Bereiche (4 Fragen) — Zonen: Arbeitsverzeichnis · Staging-Bereich (Index) · Lokales Repository · Remote-Repository

**Besonders prüfen:**
- ⚠ `git fetch` liegt bei „Lokales Repository“ (Commits landen dort, Dateien bleiben unverändert); `git pull` kommt bewusst nicht als Begriff vor (Q-9.3-14).

#### Q-9.3-13 · Git-Bereiche (Leicht)

*Ordne die Situationen dem Bereich zu, in dem sich die Änderung gerade befindet.*

| Begriff | Zone |
| --- | --- |
| Datei bearbeitet und gespeichert, aber noch nicht vorgemerkt | Arbeitsverzeichnis |
| Neue Datei, die Git noch nicht verfolgt, liegt im Projektordner | Arbeitsverzeichnis |
| Die Änderung ist für den nächsten Commit vorgemerkt | Staging-Bereich (Index) |
| Die Datei erscheint in git status unter „Zum Commit vorgemerkt" | Staging-Bereich (Index) |
| Änderung ist committet, aber noch nicht hochgeladen | Lokales Repository |
| Der Commit lässt sich offline mit git log ansehen | Lokales Repository |
| Die Kolleginnen können den Commit erst jetzt abrufen | Remote-Repository |
| Der Stand liegt auf dem Server und dient als gemeinsame Anlaufstelle | Remote-Repository |

**Erklärung (so sehen Lernende sie):**

> Der Weg einer Änderung führt vom Arbeitsverzeichnis über den Staging-Bereich (git add) ins lokale Repository (git commit) und von dort zum Remote (git push). Typische Verwechslung: „Gespeichert" heißt nur, dass die Datei im Arbeitsverzeichnis liegt — Git hat damit noch nichts festgehalten. Und ein Commit ist lokal gesichert, aber für das Team erst nach dem Push sichtbar.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-14 · Git-Bereiche (Mittel)

*Ordne jeden Befehl dem Bereich zu, den er hauptsächlich verändert bzw. in dem sein Ergebnis landet.*

| Begriff | Zone |
| --- | --- |
| git add . (alle geänderten Dateien vormerken) | Staging-Bereich (Index) |
| git restore --staged rechnung.py (Datei aus der Vormerkung nehmen) | Staging-Bereich (Index) |
| git restore rechnung.py (Änderungen an der Datei verwerfen) | Arbeitsverzeichnis |
| git commit -m "Rabatt ergänzt" (vorgemerkte Änderungen festhalten) | Lokales Repository |
| git fetch origin (neue Commits holen, Dateien bleiben unverändert) | Lokales Repository |
| git push origin main (lokale Commits übertragen) | Remote-Repository |
| git push origin v1.2.0 (Tag zum Server übertragen) | Remote-Repository |

**Erklärung (so sehen Lernende sie):**

> add und restore --staged wirken auf den Index, restore auf die Dateien im Arbeitsverzeichnis, commit und fetch schreiben in das lokale Repository und push in das Remote. git pull kommt bewusst nicht vor: Es ist fetch plus merge und berührt deshalb mehrere Bereiche. Typische Verwechslung: fetch lädt zwar vom Remote, ändert aber nicht das Arbeitsverzeichnis.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-15 · Git-Bereiche (Mittel)

*Ordne die Situationen dem Bereich zu, in dem sich die genannte Änderung bzw. der genannte Stand befindet.*

| Begriff | Zone |
| --- | --- |
| Nach git add wurde die Datei erneut geändert: Diese zweite Änderung steckt nur hier | Arbeitsverzeichnis |
| Der Test läuft gegen die Dateien im Projektordner, auch mit uncommitteten Änderungen | Arbeitsverzeichnis |
| Die vorgemerkte Fassung einer Datei, die beim nächsten Commit übernommen wird | Staging-Bereich (Index) |
| Von einer Datei sollen mit git add -p nur zwei von fünf Änderungen in den Commit | Staging-Bereich (Index) |
| Git meldet: Dein Zweig ist 2 Commits vor origin/main — diese 2 Commits liegen hier | Lokales Repository |
| Ein halbfertiger Stand wird gesichert, ohne ihn anderen zu zeigen | Lokales Repository |
| Drei neue Commits von Kolleg:innen, die noch nicht heruntergeladen wurden | Remote-Repository |
| Der Merge-Request wird auf Basis dieser Fassung des Zweigs geprüft | Remote-Repository |

**Erklärung (so sehen Lernende sie):**

> Ein Merge-Request setzt voraus, dass der Zweig bereits auf dem Remote liegt; nur dort kann er geprüft werden. Wer nach git add noch weiterarbeitet, hat eine Fassung im Index und eine neuere im Arbeitsverzeichnis — der Commit enthält nur die vorgemerkte. Wichtig: „2 Commits vor origin/main" bezieht sich auf das lokale Repository, „3 Commits dahinter" auf Commits, die erst per fetch geholt werden müssen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-9.3-16 · Git-Bereiche (Schwer)

*Ordne die Aktionen dem Bereich zu, in dem die betroffene Änderung bzw. der betroffene Stand danach liegt.*

| Begriff | Zone |
| --- | --- |
| git reset --soft HEAD~1: Letzter Commit zurückgenommen, Änderungen bleiben vorgemerkt | Staging-Bereich (Index) |
| Die Datei mit Konfliktmarkierungen wird im Editor bereinigt | Arbeitsverzeichnis |
| git reset --mixed HEAD~1: Commit zurückgenommen, Änderungen nur noch in den Dateien | Arbeitsverzeichnis |
| Die bereinigte Konfliktdatei wurde mit git add als gelöst markiert | Staging-Bereich (Index) |
| git revert <hash>: Ein neuer Commit macht eine frühere Änderung rückgängig | Lokales Repository |
| Der Tag v1.2.0 existiert, wurde aber noch nicht mit git push übertragen | Lokales Repository |
| git push --force überschreibt die Historie, die Kolleg:innen bereits geholt haben | Remote-Repository |
| Die CI-Pipeline startet automatisch, sobald hier ein neuer Commit eintrifft | Remote-Repository |

**Erklärung (so sehen Lernende sie):**

> reset --soft lässt die Änderungen im Staging-Bereich, reset --mixed (Standard) im Arbeitsverzeichnis, reset --hard würde sie verwerfen. git revert erzeugt einen neuen Commit im lokalen Repository und erhält die Historie. Tags liegen zunächst nur lokal und werden gesondert gepusht. Ein erzwungener Push überschreibt die gemeinsame Historie im Remote und ist deshalb auf geteilten Zweigen tabu. Typische Verwechslung: reset und revert — reset verschiebt den Zweigzeiger, revert fügt einen neuen Commit hinzu.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Authentifizierungsfaktoren (3 Fragen) — Zonen: Wissen · Besitz · Eigenschaft (Biometrie)

**Besonders prüfen:**
- ⚠ Biometrie als eigene Zone „Eigenschaft“: Die Theorie 6.1 nennt Wissen, Besitz und Eigenschaft (Biometrie). Die Fragen enthalten keine Aussagen zur Fehlerrate oder zum Datenschutz biometrischer Daten.
- ⚠ Einmalcode per SMS gilt hier als Besitz (Gerät mit der registrierten Nummer); in der Praxis wird SMS als schwächere Variante eingestuft — ist die Zuordnung so vertretbar?
- ⚠ Sicherheitsfrage zählt als Wissen; viele Stellen raten davon ab, weil die Antworten erratbar sind. Die Frage stellt nur die Einordnung dar.

#### Q-6.1-17 · Authentifizierungsfaktoren (Leicht)

*Ordne die Anmeldemethoden dem Faktor zu, den sie abfragen.*

| Begriff | Zone |
| --- | --- |
| Das Passwort für das Firmenkonto | Wissen |
| Die PIN der Bankkarte | Wissen |
| Der Einmalcode aus der Authenticator-App auf dem Smartphone | Besitz |
| Ein USB-Sicherheitsschlüssel (Hardware-Token) | Besitz |
| Der Fingerabdruck am Laptop | Eigenschaft (Biometrie) |
| Die Gesichtserkennung am Smartphone | Eigenschaft (Biometrie) |
| Die Antwort auf eine Sicherheitsfrage | Wissen |

**Erklärung (so sehen Lernende sie):**

> Wissen ist, was man sich merkt (Passwort, PIN, Antwort auf eine Frage), Besitz ist ein Gegenstand, den man hat (Token, Smartphone), Eigenschaft ist ein körperliches Merkmal (Biometrie).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-18 · Authentifizierungsfaktoren (Mittel)

*Welcher Faktor wird in diesen Situationen jeweils geprüft?*

| Begriff | Zone |
| --- | --- |
| Der VPN-Zugang verlangt ein Kennwort | Wissen |
| Beim Login erscheint eine Bestätigungsanfrage auf dem registrierten Smartphone | Besitz |
| Das Rechenzentrum lässt Personen nur mit der Zutrittskarte ein | Besitz |
| Der Zugang zum Serverraum öffnet sich nach einem Irisscan | Eigenschaft (Biometrie) |
| Die Support-Hotline fragt nach dem Geburtsnamen der Mutter | Wissen |
| Im Authenticator erzeugt eine App alle 30 Sekunden einen neuen Einmalcode | Besitz |
| Das Notebook entsperrt sich per Fingerabdruckleser | Eigenschaft (Biometrie) |

**Erklärung (so sehen Lernende sie):**

> Maßgeblich ist, was nachgewiesen wird: ein gemerktes Geheimnis (Wissen), ein Gegenstand (Besitz) oder ein körperliches Merkmal (Eigenschaft). Der Einmalcode zeigt, dass jemand das registrierte Gerät besitzt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-19 · Authentifizierungsfaktoren (Schwer)

*Mehrfaktor-Authentifizierung kombiniert mindestens zwei verschiedene Faktoren. Ordne die zweite Hälfte der Aussage dem passenden Faktor zu.*

| Begriff | Zone |
| --- | --- |
| Passwort plus Code aus der Authenticator-App: Der zweite Faktor ist | Besitz |
| Passwort plus Fingerabdruck: Der zweite Faktor ist | Eigenschaft (Biometrie) |
| Hardware-Sicherheitsschlüssel plus PIN: Die PIN gehört zum Faktor | Wissen |
| Chipkarte plus Fingerabdruck: Die Chipkarte gehört zum Faktor | Besitz |
| Passwort plus Sicherheitsfrage: Beides gehört zum selben Faktor, also kein zweiter Faktor, nämlich | Wissen |
| Fingerabdruck plus Gesichtserkennung: Beides gehört zum selben Faktor, also kein zweiter Faktor, nämlich | Eigenschaft (Biometrie) |
| Code per SMS auf das registrierte Handy: Der Code bestätigt den | Besitz |

**Erklärung (so sehen Lernende sie):**

> Zwei Passwörter oder zwei biometrische Merkmale sind kein zweiter Faktor, weil beide zur selben Kategorie gehören. Ein echter zweiter Faktor kommt aus einer anderen Kategorie: Wissen, Besitz oder Eigenschaft. Dann schützt die Anmeldung auch noch, wenn ein Passwort abgegriffen wurde.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### Kryptografie-Bausteine (3 Fragen) — Zonen: Symmetrische Verschlüsselung · Asymmetrische Verschlüsselung · Hashverfahren

**Besonders prüfen:**
- ⚠ Der Salt ist nur in der Theorie 6.1 als „zufälliger Zusatz“ erwähnt; die Fragen nennen keine konkreten Verfahren für Passwörter (Argon2, bcrypt).
- ⚠ Eine digitale Signatur ist in der Frage dem asymmetrischen Verfahren zugeordnet (Hash plus asymmetrisches Verfahren); als Kombination wäre auch „Hashverfahren“ vertretbar — Zuordnung prüfen.
- ⚠ TLS: asymmetrisch beim Verbindungsaufbau, symmetrisch für die Nutzdaten — wie in der Theorie.

#### Q-6.1-20 · Kryptografie-Bausteine (Leicht)

*Ordne die Eigenschaften dem passenden Verfahren zu.*

| Begriff | Zone |
| --- | --- |
| Sender und Empfänger nutzen denselben geheimen Schlüssel | Symmetrische Verschlüsselung |
| Jeder Beteiligte hat ein Schlüsselpaar aus öffentlichem und privatem Schlüssel | Asymmetrische Verschlüsselung |
| Aus beliebigen Daten entsteht ein Prüfwert fester Länge | Hashverfahren |
| AES ist ein Beispiel | Symmetrische Verschlüsselung |
| RSA ist ein Beispiel | Asymmetrische Verschlüsselung |
| Das Verfahren ist nicht umkehrbar | Hashverfahren |
| Schnell, aber der Schlüssel muss sicher ausgetauscht werden | Symmetrische Verschlüsselung |

**Erklärung (so sehen Lernende sie):**

> Symmetrisch heißt: ein gemeinsamer geheimer Schlüssel (z. B. AES). Asymmetrisch heißt: Schlüsselpaar (z. B. RSA). Eine Hashfunktion bildet einen Prüfwert fester Länge und lässt sich nicht umkehren.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-21 · Kryptografie-Bausteine (Mittel)

*Welches Verfahren passt zur Aufgabe?*

| Begriff | Zone |
| --- | --- |
| Prüfen, ob eine heruntergeladene Datei verändert wurde | Hashverfahren |
| Passwörter in einer Datenbank ablegen (mit Salt und einem dafür geeigneten Verfahren) | Hashverfahren |
| Die eigentlichen Daten einer HTTPS-Verbindung nach dem Verbindungsaufbau übertragen | Symmetrische Verschlüsselung |
| Eine Nachricht so verschlüsseln, dass nur der Empfänger sie mit seinem privaten Schlüssel lesen kann | Asymmetrische Verschlüsselung |
| Eine große Datenmenge schnell verschlüsseln, wenn beide Seiten den Schlüssel bereits sicher besitzen | Symmetrische Verschlüsselung |
| Beim Aufbau einer TLS-Verbindung helfen, ohne vorher ein gemeinsames Geheimnis zu kennen | Asymmetrische Verschlüsselung |
| Die Integrität feststellen, ohne etwas zu verschlüsseln | Hashverfahren |

**Erklärung (so sehen Lernende sie):**

> Hashes prüfen Integrität und speichern Passwörter. Asymmetrische Verfahren helfen beim sicheren Verbindungsaufbau, die eigentlichen Daten werden bei TLS symmetrisch verschlüsselt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### Q-6.1-22 · Kryptografie-Bausteine (Schwer)

*Ordne die Aussagen zu Verwechslungen und Zusammenspiel dem Verfahren zu, auf das sie zutreffen.*

| Begriff | Zone |
| --- | --- |
| Beim Login wird der Prüfwert des eingegebenen Passworts neu berechnet und mit dem gespeicherten verglichen, nie entschlüsselt | Hashverfahren |
| Der Schlüssel muss vor der Kommunikation sicher zum Empfänger gelangen | Symmetrische Verschlüsselung |
| Der eine Schlüssel darf allen bekannt sein, der andere muss geheim bleiben | Asymmetrische Verschlüsselung |
| Das Ergebnis lässt sich nicht in die ursprünglichen Daten zurückverwandeln | Hashverfahren |
| Wird bei TLS für HTTPS beim Verbindungsaufbau eingesetzt | Asymmetrische Verschlüsselung |
| Wird bei TLS für HTTPS für die übertragenen Daten eingesetzt | Symmetrische Verschlüsselung |
| Eine digitale Signatur kombiniert dieses Verfahren mit einem Hashverfahren | Asymmetrische Verschlüsselung |

**Erklärung (so sehen Lernende sie):**

> Passwörter werden nicht reversibel verschlüsselt abgelegt, sondern gehasht. In der Praxis arbeiten die Verfahren zusammen: asymmetrisch beim Verbindungsaufbau und für Signaturen, symmetrisch für die Nutzdaten, Hashes für Prüfwerte.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 2. Neue Theorieabschnitte

### AE1 · Drei Entwurfsmuster im Detail: Singleton, Fabrikmethode, Beobachter

> ### Drei Entwurfsmuster im Detail: Singleton, Fabrikmethode, Beobachter
>
> Die bekanntesten Sammlungen solcher Lösungsschablonen stammen von der „Gang of Four" (GoF, Buch „Design Patterns", 1994). Drei dieser **GoF-Entwurfsmuster** begegnen Entwickelnden besonders oft:
>
> - **Singleton** (Erzeugungsmuster): Von einer Klasse gibt es **genau eine Instanz**, auf die über einen globalen Zugriffspunkt zugegriffen wird. Üblich sind ein privater Konstruktor und eine statische Methode wie `getInstance()`, die immer dasselbe Objekt liefert. Beispiel bei der Brevanta IT-Systemhaus GmbH: Die Konfiguration des Kundenportals (Datenbankadresse, Mailserver) wird einmal geladen und von allen Programmteilen gemeinsam genutzt. Nachteile: Das Singleton ist eine versteckte globale Abhängigkeit, erschwert Modultests und braucht bei Nebenläufigkeit besondere Vorsicht.
> - **Fabrikmethode (Factory Method)** (Erzeugungsmuster): Eine Oberklasse legt fest, **dass** ein Objekt erzeugt wird, die Unterklassen entscheiden **welches konkrete Objekt** entsteht. Der aufrufende Code arbeitet nur mit der gemeinsamen Schnittstelle und kennt die konkrete Klasse nicht. Beispiel: Der Rechnungsexport des Portals bekommt von einer Fabrikmethode je nach Format einen CSV- oder PDF-Exporter; ein neues Format erfordert nur eine weitere Unterklasse. Im Alltag wird „Factory" auch für einfache Hilfsfunktionen gesagt, die Objekte erzeugen (Simple Factory); das ist streng genommen nicht dasselbe Muster.
> - **Beobachter (Observer)** (Verhaltensmuster): Ein **Subjekt** führt eine Liste angemeldeter **Beobachter** und benachrichtigt sie automatisch, sobald sich sein Zustand ändert. Das Subjekt kennt die Beobachter nur über eine gemeinsame Schnittstelle, die Kopplung bleibt lose. Beispiel: Wechselt ein Wartungsauftrag den Status, aktualisieren sich das Dashboard der Disponenten, die Techniker-App und der Benachrichtigungsdienst, ohne dass der Auftrag sie einzeln kennt.
>
> **MVC** (Model-View-Controller) gehört **nicht** in diese Reihe, sondern ist ein **Architekturmuster**: Es gliedert den Grundaufbau einer ganzen Anwendung oder Oberfläche in Daten und Fachlogik (Model), Darstellung (View) und Steuerung (Controller). Entwurfsmuster regeln dagegen das Zusammenspiel weniger Klassen. Beide Ebenen ergänzen sich: In MVC beobachten die Views häufig das Model — dort steckt also ein Beobachter-Muster. MVC wird ausführlich in Thema 8.4 behandelt. Merkregel: Entwurfsmuster lösen ein Detailproblem im Entwurf, Architekturmuster legen die Grobstruktur fest.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ MVC wird hier als Architekturmuster geführt, in Thema 8.4 als „Entwurfsmuster“ — Literatur uneinheitlich; welche Bezeichnung soll gelten?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### AE2 · Testverfahren: statisch und dynamisch — und wie sie sich von Teststufe und Testart abgrenzen

> ### Testverfahren: statisch und dynamisch — und wie sie sich von Teststufe und Testart abgrenzen
>
> Drei Begriffe werden leicht verwechselt, weil sie drei verschiedene Fragen beantworten:
>
> - **Teststufe:** Auf welcher **Ebene** wird getestet? (Modul-, Integrations-, System-, Abnahmetest)
> - **Testart:** Welche **Eigenschaft** steht im Fokus oder welchen **Anlass** gibt es? (funktional, nicht-funktional, Regressionstest, Fehlernachtest, Smoke-Test)
> - **Testverfahren:** **Wie** werden Prüfgegenstand und Testfälle gewählt bzw. geprüft? Man unterscheidet **statische** und **dynamische** Verfahren.
>
> Ein Test lässt sich daher mehrfach einordnen: Ein Regressionstest (Art) kann als Modultest (Stufe) mit Äquivalenzklassen (Verfahren) laufen. Der Abschnitt „Testarten" oben nennt Black-Box und White-Box nach der Vorgehensweise; im Sprachgebrauch ist das uneinheitlich — hier werden sie, wie in der Fachliteratur üblich, als Testverfahren geführt.
>
> **Statische Verfahren** führen den Prüfling **nicht aus**. Sie finden Fehlerzustände direkt im Text oder Code und sind schon sehr früh möglich, auch für Anforderungen und Entwürfe:
>
> - **Review:** Menschen lesen Arbeitsergebnisse kritisch gegen. Dazu zählen die informelle Durchsicht durch eine Kollegin, der Walkthrough, die formale Inspektion und das Code-Review im Merge-Request (siehe Thema 9.3).
> - **Schreibtischtest:** Ein Algorithmus wird mit Beispielwerten von Hand durchgespielt, etwa in einer Tabelle, die die Variablenwerte Schritt für Schritt mitführt.
> - **Statische Codeanalyse:** Ein Werkzeug untersucht den Quelltext, ohne ihn zu starten — Compilerwarnungen, Linter, Metriken wie die zyklomatische Komplexität. Es findet z. B. nicht initialisierte Variablen, unerreichbaren Code oder unsichere Funktionsaufrufe.
>
> **Dynamische Verfahren** führen den Prüfling mit konkreten Eingaben aus und vergleichen das Verhalten mit der Erwartung. Sie gliedern sich in **Black-Box** (Testfälle aus der Spezifikation: Äquivalenzklassen, Grenzwerte, Entscheidungstabellen, Zustandsübergangstests, anwendungsfallbasierte Tests), **White-Box** (Testfälle aus der Programmstruktur: Anweisungs-, Zweig- und Bedingungsüberdeckung) und erfahrungsbasierte Verfahren (exploratives Testen).
>
> Die **Entscheidungstabelle** hält Bedingungen und die daraus folgenden Aktionen fest; jede Spalte (Regel) wird zu einem Testfall. Beispiel Auftragsverwaltung: Stammkunden erhalten 3 % Rabatt, Bestellungen ab 500 € weitere 2 % (unabhängig vom Kundenstatus).
>
> | Bedingung / Aktion | Regel 1 | Regel 2 | Regel 3 | Regel 4 |
> |---|---|---|---|---|
> | Stammkunde | ja | ja | nein | nein |
> | Bestellwert ab 500 € | ja | nein | ja | nein |
> | Rabatt | 5 % | 3 % | 2 % | 0 % |
>
> Vier Regeln ergeben vier Testfälle, die alle Kombinationen abdecken.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ Schreibtischtest gilt hier als statisches Verfahren (von Hand durchgespielt, nicht ausgeführt); manche Quellen nennen ihn „simulierte Ausführung“.
- ⚠ Der bestehende Abschnitt „Testarten“ nennt Black-Box/White-Box „Testart nach Vorgehensweise“ — hier „Testverfahren“; Abgrenzung stimmig?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

### AE2 · Die vier Bereiche und der Weg einer Änderung

> ### Die vier Bereiche und der Weg einer Änderung
>
> Eine Änderung durchläuft in Git vier Bereiche:
>
> 1. **Arbeitsverzeichnis:** die Dateien, wie sie im Projektordner liegen und bearbeitet werden. Hier entstehen Änderungen (geändert, neu, gelöscht), die Git noch nicht festgehalten hat.
> 2. **Staging-Bereich (Index):** Hier wird mit `git add` vorgemerkt, welche Änderungen in den nächsten Commit eingehen. So lässt sich ein Commit gezielt zusammenstellen, auch aus nur einem Teil der geänderten Dateien.
> 3. **Lokales Repository:** die Historie auf dem eigenen Rechner (Ordner `.git`). `git commit` schreibt die vorgemerkten Änderungen als Commit hinein. Commits sind hier gesichert, aber für andere noch unsichtbar.
> 4. **Remote-Repository:** das Repository auf einem Server (z. B. `origin`), über das das Team zusammenarbeitet. `git push` überträgt lokale Commits dorthin.
>
> ```
> Arbeitsverzeichnis --git add--> Staging-Bereich --git commit--> Lokales Repository --git push--> Remote-Repository
> Remote-Repository  --git fetch--> Lokales Repository --git merge--> Arbeitsverzeichnis
> ```
>
> `git fetch` holt neue Commits des Remotes in das lokale Repository, ohne das Arbeitsverzeichnis zu ändern. `git pull` ist die Kurzform für `git fetch` und anschließendes `git merge` und berührt deshalb mehrere Bereiche. Zurück geht es mit `git restore --staged <datei>` (aus dem Staging-Bereich zurück ins Arbeitsverzeichnis, die Änderung bleibt in der Datei) und `git restore <datei>` (verwirft Änderungen im Arbeitsverzeichnis, nicht rückholbar). Der Befehl `git status` zeigt, welche Änderungen in welchem Bereich liegen. Merksatz: **add** bereitet vor, **commit** sichert lokal, **push** teilt mit dem Team, **fetch** holt nur, **pull** holt und führt zusammen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?

**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**
- ⚠ `reset` kommt in der Theorie nur als `--hard` vor, in einer Quizfrage als `--soft`/`--mixed` (siehe Q-9.3-16).

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

## 3. Bug-Hunt-Sets (Spiel „Bug-Hunt“, Kurs Anwendungsentwicklung)

In jedem Ausschnitt steckt genau ein Fehler in genau einer Zeile; die Lernenden markieren die Zeile, danach sehen sie Korrektur und Erklärung. **Die Codeausschnitte wurden technisch geprüft** (korrigierte Fassung läuft wie beschrieben, fehlerhafte weicht ab — JavaScript, Python, Java, C#; SQL nur gegen SQLite, nicht gegen PostgreSQL). Zu prüfen bleibt die fachliche Eindeutigkeit der Fehlerzeile und die Erklärung.

### Bug-Hunt: Schleifen und Off-by-one (11 Ausschnitte, setKey `schleifen`)

#### schleifen · 1 — Jede zweite Protokollzeile (Python)

*Die Funktion soll aus den Zeilen eines Wartungsprotokolls jede zweite Zeile zurückgeben und dabei mit der ersten Zeile beginnen. Für ["A", "B", "C", "D", "E"] soll ["A", "C", "E"] herauskommen.*

```text
 1  def jede_zweite_zeile(zeilen):
 2      auswahl = []
 3      for i in range(1, len(zeilen), 2):
 4          auswahl.append(zeilen[i])
 5      return auswahl
```

**Fehlerzeile:** 3 · **Korrektur:** `for i in range(0, len(zeilen), 2):`

**Tipp:** Überlege, bei welchem Index das erste Element einer Liste liegt und mit welchem Index die Schleife tatsächlich startet.

**Erklärung:**

> Listen werden ab Index 0 gezählt. range(1, len(zeilen), 2) beginnt aber bei Index 1, also beim zweiten Element, und liefert ["B", "D"] statt ["A", "C", "E"]. Das ist ein Off-by-one-Fehler am Startwert: Die Schleife startet um eins zu spät. Mit range(0, len(zeilen), 2) beginnt die Auswahl bei der ersten Zeile.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 2 — Rechnungsbeträge addieren (JavaScript)

*Die Funktion soll die Beträge einer Liste addieren. Für [10, 20, 5] soll 35 herauskommen.*

```text
 1  function gesamtbetrag(betraege) {
 2    let summe = 0;
 3    for (const betrag in betraege) {
 4      summe += betrag;
 5    }
 6    return summe;
 7  }
```

**Fehlerzeile:** 3 · **Korrektur:** `for (const betrag of betraege) {`

**Tipp:** Schau dir an, was die Schleifenvariable bei for ... in tatsächlich enthält: die Werte der Liste oder etwas anderes?

**Erklärung:**

> for ... in läuft über die Schlüssel eines Objekts, bei einem Array also über die Indizes, und zwar als Text: "0", "1", "2". Die Addition 0 + "0" wird zur Textverkettung, am Ende steht "0012" statt 35. Für die Werte eines Arrays gehört for ... of in die Schleife.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 3 — Trennlinie für den Ausdruck (Java)

*Die Methode soll eine Trennlinie aus genau breite Bindestrichen liefern. Für breite = 5 soll "-----" herauskommen.*

```text
 1  public static String trennlinie(int breite)
 2  {
 3      StringBuilder linie = new StringBuilder();
 4      for (int i = 0; i < breite; i++);
 5      {
 6          linie.append('-');
 7      }
 8      return linie.toString();
 9  }
```

**Fehlerzeile:** 4 · **Korrektur:** `for (int i = 0; i < breite; i++)`

**Tipp:** Lies die Kopfzeile der Schleife ganz genau bis zum Ende. Welches Zeichen steht hinter der schließenden Klammer, und was gehört dann zur Schleife?

**Erklärung:**

> Das Semikolon hinter der Schleifenklammer ist bereits die komplette (leere) Anweisung der Schleife. Sie läuft breite-mal und tut nichts. Der folgende Block in geschweiften Klammern ist danach nur ein gewöhnlicher Block, der genau einmal ausgeführt wird, es entsteht also nur "-". Der Compiler meldet keinen Fehler, deshalb fällt so etwas leicht durch.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 4 — Einsatzstunden summieren (Python)

*Die Funktion soll die Stunden aller Wartungseinsätze addieren. Für [2, 3, 4] soll 9 herauskommen.*

```text
 1  def gesamtstunden(einsaetze):
 2      summe = 0
 3      for stunden in einsaetze:
 4          summe += stunden
 5          return summe
```

**Fehlerzeile:** 5 · **Korrektur:** `return summe`

**Tipp:** In Python entscheidet die Einrückung, welche Zeilen zur Schleife gehören. Wann wird die Funktion beendet?

**Erklärung:**

> Die Zeile return summe ist so weit eingerückt, dass sie zum Schleifenkörper gehört. Schon im ersten Durchlauf wird die Funktion verlassen, es ergibt sich 2 statt 9. Das return muss auf der Ebene der for-Zeile stehen, damit es erst nach der Schleife ausgeführt wird.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 5 — Gesperrte Kunden überspringen (C#)

*Die Methode soll die Namen aller Kunden ausgeben, die nicht gesperrt sind. Gesperrte Kunden werden übersprungen. Bei der Liste Anna, Bernd (gesperrt), Chris sollen Anna und Chris erscheinen.*

```text
 1  public static void GueltigeKundenAusgeben(List<Kunde> kunden)
 2  {
 3      foreach (var kunde in kunden)
 4      {
 5          if (kunde.Gesperrt)
 6          {
 7              break;
 8          }
 9          Console.WriteLine(kunde.Name);
10      }
11  }
```

**Fehlerzeile:** 7 · **Korrektur:** `continue;`

**Tipp:** Überlege, ob bei einem gesperrten Kunden die ganze Schleife enden oder nur dieser eine Durchlauf übersprungen werden soll.

**Erklärung:**

> break beendet die gesamte Schleife. Sobald Bernd gesperrt ist, bricht die Ausgabe ab, und Chris erscheint nie. Gewollt ist continue: Es überspringt nur den Rest des aktuellen Durchlaufs und macht mit dem nächsten Kunden weiter.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 6 — Namen rückwärts ausgeben (Java)

*Die Methode soll die Namen in umgekehrter Reihenfolge, durch Leerzeichen getrennt, zurückgeben. Für {"Anna", "Ben", "Cem"} soll "Cem Ben Anna" herauskommen.*

```text
 1  public static String rueckwaerts(String[] namen) {
 2      StringBuilder sb = new StringBuilder();
 3      for (int i = namen.length - 1; i >= 0; i++) {
 4          sb.append(namen[i]).append(" ");
 5      }
 6      return sb.toString().trim();
 7  }
```

**Fehlerzeile:** 3 · **Korrektur:** `for (int i = namen.length - 1; i >= 0; i--) {`

**Tipp:** Die Schleife startet am Ende des Arrays. In welche Richtung muss der Index laufen, und in welche Richtung läuft er hier?

**Erklärung:**

> Mit i++ wird der Index nach jedem Durchlauf größer statt kleiner. Aus i = 2 wird i = 3, die Bedingung i >= 0 bleibt wahr, und namen[3] löst eine ArrayIndexOutOfBoundsException aus. Eine Rückwärtsschleife muss den Index mit i-- verringern.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 7 — Verbindungsversuche begrenzen (JavaScript)

*Die Funktion ruft aktion höchstens maxVersuche-mal auf, bis sie true liefert, und gibt die Zahl der benötigten Versuche zurück (-1, wenn alle scheitern). Bei maxVersuche = 3 und einer Aktion, die nie gelingt, darf aktion genau dreimal aufgerufen werden.*

```text
 1  function mitWiederholung(aktion, maxVersuche) {
 2    let versuche = 0;
 3    while (versuche <= maxVersuche) {
 4      versuche++;
 5      if (aktion()) {
 6        return versuche;
 7      }
 8    }
 9    return -1;
10  }
```

**Fehlerzeile:** 3 · **Korrektur:** `while (versuche < maxVersuche) {`

**Tipp:** Spiele die Schleife mit maxVersuche = 3 durch und notiere, welchen Wert versuche zu Beginn jedes Durchlaufs hat.

**Erklärung:**

> Der Zähler startet bei 0. Mit <= hat versuche zu Beginn der Durchläufe die Werte 0, 1, 2 und 3, die Schleife läuft also viermal. Das ist ein Off-by-one-Fehler an der Obergrenze: Wer bei 0 zu zählen beginnt, muss mit < statt <= abbrechen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 8 — Text umkehren (C#)

*Die Methode soll die Zeichen eines Textes in umgekehrter Reihenfolge zurückgeben. Aus "Kunde" soll "ednuK" werden.*

```text
 1  public static string Umkehren(string text)
 2  {
 3      var sb = new StringBuilder();
 4      for (int i = text.Length; i >= 0; i--)
 5      {
 6          sb.Append(text[i]);
 7      }
 8      return sb.ToString();
 9  }
```

**Fehlerzeile:** 4 · **Korrektur:** `for (int i = text.Length - 1; i >= 0; i--)`

**Tipp:** Welches ist der höchste gültige Index eines Textes mit fünf Zeichen? Und mit welchem Wert beginnt die Schleife?

**Erklärung:**

> Der letzte gültige Index ist Length - 1, weil die Zählung bei 0 beginnt. Die Schleife startet mit i = text.Length und greift im ersten Durchlauf auf text[5] zu, was eine IndexOutOfRangeException auslöst. Der Startwert liegt um eins zu hoch (Off-by-one).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 9 — Zuwachs zwischen Messwerten (Python)

*Die Funktion soll für jedes Paar aufeinanderfolgender Messwerte den Zuwachs (späterer minus früherer Wert) berechnen. Für [10, 14, 15] soll [4, 1] herauskommen.*

```text
 1  def differenzen(werte):
 2      ergebnis = []
 3      for i in range(len(werte)):
 4          ergebnis.append(werte[i + 1] - werte[i])
 5      return ergebnis
```

**Fehlerzeile:** 3 · **Korrektur:** `for i in range(len(werte) - 1):`

**Tipp:** Im Schleifenkörper wird auf werte[i + 1] zugegriffen. Gibt es diesen Eintrag auch beim letzten Wert von i?

**Erklärung:**

> Jedes Paar braucht einen Nachfolger. Beim letzten i, also len(werte) - 1, existiert werte[i + 1] nicht, und Python wirft einen IndexError. Mit n Werten gibt es nur n - 1 Paare, die Schleife muss deshalb mit range(len(werte) - 1) um einen Durchlauf kürzer sein (Off-by-one).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 10 — Bubble-Sort (Java)

*Die Methode sortiert ein int-Array aufsteigend mit Bubble-Sort. Sie soll bei Arrays beliebiger Länge ohne Fehlermeldung durchlaufen.*

```text
 1  public static void sortiere(int[] werte) {
 2      for (int i = 0; i < werte.length - 1; i++) {
 3          for (int j = 0; j < werte.length - i; j++) {
 4              if (werte[j] > werte[j + 1]) {
 5                  int tausch = werte[j];
 6                  werte[j] = werte[j + 1];
 7                  werte[j + 1] = tausch;
 8              }
 9          }
10      }
11  }
```

**Fehlerzeile:** 3 · **Korrektur:** `for (int j = 0; j < werte.length - i - 1; j++) {`

**Tipp:** Die innere Schleife vergleicht werte[j] mit werte[j + 1]. Welchen Wert darf j höchstens annehmen, damit der Nachbar noch existiert?

**Erklärung:**

> Im ersten Durchgang (i = 0) läuft j bis werte.length - 1, und werte[j + 1] greift auf werte[werte.length] zu: ArrayIndexOutOfBoundsException. Die innere Schleife muss bei werte.length - i - 1 enden, denn j + 1 darf höchstens der letzte Index sein. Außerdem sind die i letzten Elemente nach i Durchgängen schon an ihrem Platz.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### schleifen · 11 — Funktionen pro Name erzeugen (JavaScript)

*Zu jedem Namen wird eine Funktion erzeugt, die genau diesen Namen zurückgibt. Bei ["Anna", "Ben"] soll anzeiger[0]() den Wert "Anna" und anzeiger[1]() den Wert "Ben" liefern.*

```text
 1  function erzeugeAnzeiger(namen) {
 2    const anzeiger = [];
 3    for (var i = 0; i < namen.length; i++) {
 4      anzeiger.push(() => namen[i]);
 5    }
 6    return anzeiger;
 7  }
```

**Fehlerzeile:** 3 · **Korrektur:** `for (let i = 0; i < namen.length; i++) {`

**Tipp:** Die erzeugten Funktionen werden erst nach der Schleife aufgerufen. Welchen Wert hat i dann, und wie viele Variablen i gibt es?

**Erklärung:**

> var gilt für die ganze Funktion, es gibt nur eine einzige Variable i. Alle erzeugten Funktionen teilen sie sich, und nach der Schleife steht darin 2. Jeder Aufruf liest also namen[2], das ist undefined. let legt dagegen für jeden Schleifendurchlauf eine neue Variable an, jede Funktion merkt sich ihren eigenen Wert.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

**Zum Set — besonders prüfen:**
- ⚠ Java Nr. 10 (Bubble-Sort): zwei gleichwertige Korrekturen der Grenze möglich (`length - i - 1` oder `j + 1 < length - i`); gemeint ist nur die Fehlerzeile 3.

### Bug-Hunt: Objektorientierung (11 Ausschnitte, setKey `objektorientierung`)

#### objektorientierung · 1 — Kontostand ausgeben (Python)

*Das Konto hält seinen Saldo bewusst als privates Attribut (doppelter Unterstrich). Das Hauptprogramm soll nach der Einzahlung den Kontostand 50 ausgeben.*

```text
 1  class Konto:
 2      def __init__(self):
 3          self.__saldo = 0
 4      def einzahlen(self, betrag):
 5          self.__saldo += betrag
 6      def saldo(self):
 7          return self.__saldo
 8  konto = Konto()
 9  konto.einzahlen(50)
10  print(konto.__saldo)
```

**Fehlerzeile:** 10 · **Korrektur:** `print(konto.saldo())`

**Tipp:** Das Attribut ist privat gedacht. Wie kommt Code außerhalb der Klasse an den Wert, ohne das Attribut selbst anzufassen?

**Erklärung:**

> Attribute mit führendem doppeltem Unterstrich sind für die Klasse gedacht. Python benennt sie intern um (Name-Mangling zu _Konto__saldo), von außen gibt es konto.__saldo nicht, es entsteht ein AttributeError. Gelesen wird der Wert über die öffentliche Methode saldo(). Das Prinzip dahinter heißt Kapselung: Zugriff auf den Zustand nur über die Schnittstelle der Klasse.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 2 — Bruttopreis berechnen (JavaScript)

*Die Methode brutto ist bewusst static, weil sie keinen Objektzustand braucht. Das Hauptprogramm soll den Bruttopreis für netto = 100 und 19 % Steuer ausgeben, also 119.*

```text
 1  class Preisrechner {
 2    static brutto(netto, steuersatz) {
 3      return netto * (1 + steuersatz);
 4    }
 5  }
 6  const preis = new Preisrechner().brutto(100, 0.19);
 7  console.log(preis);
```

**Fehlerzeile:** 6 · **Korrektur:** `const preis = Preisrechner.brutto(100, 0.19);`

**Tipp:** Statische Methoden gehören zu einer bestimmten Sache, nicht zu den Objekten. Worüber muss man sie aufrufen?

**Erklärung:**

> Eine static-Methode gehört zur Klasse, nicht zu ihren Instanzen. Auf einem mit new erzeugten Objekt existiert sie nicht, der Aufruf endet mit einem TypeError (brutto is not a function). Aufgerufen wird sie direkt über den Klassennamen: Preisrechner.brutto(...). Ein Objekt braucht man dafür gar nicht.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 3 — Kunde nach Namen suchen (Java)

*Die Methode soll den Kunden mit dem gesuchten Namen liefern. Der Suchname stammt aus einer Benutzereingabe, ist also ein zur Laufzeit erzeugter String.*

```text
 1  public static Kunde sucheNachName(List<Kunde> kunden, String name) {
 2      for (Kunde kunde : kunden) {
 3          if (kunde.getName() == name) {
 4              return kunde;
 5          }
 6      }
 7      return null;
 8  }
```

**Fehlerzeile:** 3 · **Korrektur:** `if (kunde.getName().equals(name)) {`

**Tipp:** Was vergleicht der Operator == bei zwei Objekten wie Strings: die Zeichen oder die Speicherstellen, auf die sie zeigen?

**Erklärung:**

> Bei Objekten vergleicht == nur die Referenzen, also ob beide Variablen auf dasselbe Objekt zeigen. Ein eingegebener Text ist ein eigenes String-Objekt, auch wenn er dieselben Zeichen enthält, und der Vergleich liefert false. Die Methode findet dann nie einen Kunden und gibt null zurück. Den Inhalt vergleicht equals.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 4 — Kunden zählen (Python)

*Das Klassenattribut anzahl soll mitzählen, wie viele Kunden insgesamt angelegt wurden. Nach dem Anlegen von zwei Kunden soll Kunde.anzahl den Wert 2 haben.*

```text
 1  class Kunde:
 2      anzahl = 0
 3      def __init__(self, name):
 4          self.name = name
 5          anzahl += 1
```

**Fehlerzeile:** 5 · **Korrektur:** `Kunde.anzahl += 1`

**Tipp:** Innerhalb einer Methode ist anzahl zunächst nur ein ganz gewöhnlicher Variablenname. Wie spricht man ein Attribut der Klasse an?

**Erklärung:**

> Das Klassenattribut ist in der Methode nicht ohne Weiteres sichtbar. anzahl += 1 behandelt anzahl als lokale Variable, die noch keinen Wert hat, und löst einen UnboundLocalError aus. Das Attribut wird über den Klassennamen angesprochen: Kunde.anzahl += 1. Mit self.anzahl += 1 würde stattdessen ein eigenes Instanzattribut entstehen, und der gemeinsame Zähler bliebe bei 0.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 5 — Doppelte Kunden vermeiden (JavaScript)

*Zwei Kundenobjekte gelten als derselbe Kunde, wenn sie dieselbe id haben. Wird ein Kunde mit bereits vorhandener id übergeben, auch als neu erzeugtes Objekt, darf er nicht ein zweites Mal aufgenommen werden.*

```text
 1  function kundeAufnehmen(kunden, neuerKunde) {
 2    const bekannt = kunden.some((kunde) => kunde === neuerKunde);
 3    if (!bekannt) {
 4      kunden.push(neuerKunde);
 5    }
 6  }
```

**Fehlerzeile:** 2 · **Korrektur:** `const bekannt = kunden.some((kunde) => kunde.id === neuerKunde.id);`

**Tipp:** Zwei Objekte können dieselben Daten haben und trotzdem zwei verschiedene Objekte sein. Was prüft === bei Objekten?

**Erklärung:**

> === vergleicht bei Objekten die Identität, also ob es dasselbe Objekt im Speicher ist, nicht den Inhalt. Ein neu erzeugtes Objekt mit gleicher id ist ein anderes Objekt, "bekannt" bleibt false, und der Kunde wird doppelt aufgenommen. Gefragt ist die Gleichheit der Kundennummer, also der Vergleich der Felder: kunde.id === neuerKunde.id.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 6 — Zuladung im Konstruktor speichern (Java)

*Der Konstruktor soll Kennzeichen und Zuladung des Lieferwagens speichern. new Lieferwagen("HH-AB 123", 800).getZuladung() soll 800 liefern.*

```text
 1  public class Lieferwagen {
 2      private final String kennzeichen;
 3      private int zuladung;
 4      public Lieferwagen(String kennzeichen, int zuladung) {
 5          this.kennzeichen = kennzeichen;
 6          zuladung = zuladung;
 7      }
 8      public int getZuladung() {
 9          return zuladung;
10      }
11  }
```

**Fehlerzeile:** 6 · **Korrektur:** `this.zuladung = zuladung;`

**Tipp:** Parameter und Attribut heißen gleich. Welche der beiden Variablen meint der Name zuladung innerhalb des Konstruktors?

**Erklärung:**

> Innerhalb des Konstruktors verdeckt der Parameter zuladung das gleichnamige Attribut. Die Zeile weist dem Parameter seinen eigenen Wert zu, das Attribut behält den Standardwert 0, und getZuladung() liefert 0 statt 800. Mit this.zuladung wird das Attribut des Objekts angesprochen. Der Compiler meldet dazu keinen Fehler.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 7 — Rechnung mit Steuer (C#)

*Brutto soll aus dem Nettobetrag des jeweiligen Rechnungsobjekts den Bruttobetrag mit 19 % Steuer berechnen. new Rechnung(100m).Brutto() soll 119 ergeben.*

```text
 1  public class Rechnung
 2  {
 3      private decimal netto;
 4      public Rechnung(decimal netto) { this.netto = netto; }
 5      public static decimal Brutto() { return netto * 1.19m; }
 6  }
```

**Fehlerzeile:** 5 · **Korrektur:** `public decimal Brutto() { return netto * 1.19m; }`

**Tipp:** Zu welchem Rechnungsobjekt gehört der Wert netto, wenn die Methode zur Klasse und nicht zu einem Objekt gehört?

**Erklärung:**

> Eine static-Methode gehört zur Klasse und läuft ohne konkretes Objekt. Sie kann deshalb nicht auf das Instanzfeld netto zugreifen, denn es gibt keinen Rechnungsbetrag, der gemeint sein könnte (Compilerfehler CS0120). Weil der Betrag zum jeweiligen Objekt gehört, muss die Methode eine Instanzmethode sein, also ohne static.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 8 — Techniker erweitert Mitarbeiter (Python)

*Techniker erweitert Mitarbeiter und ergänzt eine Qualifikation. Der Name soll von der Basisklasse gespeichert werden: Techniker("Eva", "Netzwerk").name soll "Eva" liefern.*

```text
 1  class Mitarbeiter:
 2      def __init__(self, name):
 3          self.name = name
 4  class Techniker(Mitarbeiter):
 5      def __init__(self, name, qualifikation):
 6          super().__init__()
 7          self.qualifikation = qualifikation
```

**Fehlerzeile:** 6 · **Korrektur:** `super().__init__(name)`

**Tipp:** Schau dir an, welche Argumente der Konstruktor der Basisklasse verlangt und welche der Aufruf mit super() übergibt.

**Erklärung:**

> Der Konstruktor der Basisklasse erwartet einen Namen. super().__init__() ruft ihn ohne Argument auf, Python meldet einen TypeError (missing 1 required positional argument: 'name'). Die Unterklasse muss die benötigten Werte an die Basisklasse weiterreichen: super().__init__(name).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 9 — Beschreibung eines Druckers (JavaScript)

*Drucker erweitert Geraet und hängt an die Beschreibung des Geräts den Zusatz " (Drucker)" an. new Drucker("Laser 3000").beschreibung() soll "Gerät: Laser 3000 (Drucker)" liefern.*

```text
 1  class Geraet {
 2    constructor(name) { this.name = name; }
 3    beschreibung() { return "Gerät: " + this.name; }
 4  }
 5  class Drucker extends Geraet {
 6    beschreibung() {
 7      return this.beschreibung() + " (Drucker)";
 8    }
 9  }
```

**Fehlerzeile:** 7 · **Korrektur:** `return super.beschreibung() + " (Drucker)";`

**Tipp:** Welche Methode ruft this.beschreibung() in einem Drucker auf, die der Basisklasse oder die der Unterklasse selbst?

**Erklärung:**

> this verweist auf das Drucker-Objekt, und dort findet this.beschreibung() die überschreibende Methode der Unterklasse, also sich selbst. Die Methode ruft sich endlos selbst auf, bis JavaScript mit einem RangeError (Maximum call stack size exceeded) abbricht. Die Methode der Basisklasse erreicht man mit super.beschreibung().

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 10 — Fortlaufende Auftragsnummern (Java)

*Jeder neu angelegte Auftrag soll eine fortlaufende Nummer erhalten: der erste die 1, der zweite die 2 und so weiter.*

```text
 1  public class Auftrag {
 2      private int anzahl = 0;
 3      private final int nummer;
 4      public Auftrag() {
 5          anzahl++;
 6          nummer = anzahl;
 7      }
 8      public int getNummer() {
 9          return nummer;
10      }
11  }
```

**Fehlerzeile:** 2 · **Korrektur:** `private static int anzahl = 0;`

**Tipp:** Lege in Gedanken zwei Aufträge an und überlege, wie viele Variablen anzahl dabei insgesamt existieren.

**Erklärung:**

> Ohne static besitzt jedes Auftrag-Objekt eine eigene Variable anzahl, die bei 0 beginnt. Jeder neue Auftrag zählt also von vorn und erhält die Nummer 1. Ein gemeinsamer Zähler über alle Objekte muss zur Klasse gehören, also static sein: Es gibt dann genau eine Variable, die jeder Konstruktoraufruf weiterzählt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### objektorientierung · 11 — Polymorphe Beschreibung (C#)

*Eine Variable vom Typ Geraet, die auf ein Drucker-Objekt zeigt (Geraet g = new Drucker();), soll bei g.Beschreibung() den Text "Drucker" liefern.*

```text
 1  public class Geraet
 2  {
 3      public virtual string Beschreibung() { return "Gerät"; }
 4  }
 5  public class Drucker : Geraet
 6  {
 7      public string Beschreibung() { return "Drucker"; }
 8  }
```

**Fehlerzeile:** 7 · **Korrektur:** `public override string Beschreibung() { return "Drucker"; }`

**Tipp:** Die Basisklasse erlaubt das Überschreiben der Methode. Was muss die Unterklasse angeben, damit sie sie wirklich überschreibt?

**Erklärung:**

> Ohne override verdeckt die Methode der Unterklasse die der Basisklasse nur (Hiding, der Compiler warnt mit CS0114). Welche Methode läuft, bestimmt dann der Typ der Variablen: g.Beschreibung() ruft die Version der Basisklasse auf und liefert "Gerät". Polymorphie braucht das Paar virtual in der Basisklasse und override in der Unterklasse.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

**Zum Set — besonders prüfen:**
- ⚠ Java/C#-Compilerverhalten (CS0114 nur Warnung, CS0120 Fehler) aus Kenntnis der Sprache, nicht in jeder Version geprüft.

### Bug-Hunt: SQL-Fehler (12 Ausschnitte, setKey `sql-fehler`)

#### sql-fehler · 1 — Kunden ohne Telefonnummer (SQL)

*Die Abfrage soll alle Kunden anzeigen, bei denen keine Telefonnummer hinterlegt ist (Feld telefon enthält NULL).*

```text
 1  SELECT name, ort
 2  FROM kunde
 3  WHERE telefon = NULL;
```

**Fehlerzeile:** 3 · **Korrektur:** `WHERE telefon IS NULL;`

**Tipp:** NULL steht für „unbekannt“, nicht für einen Wert wie eine Zahl oder einen Text. Wie prüft man in SQL auf diesen Zustand?

**Erklärung:**

> Ein Vergleich mit NULL über = ergibt nie wahr, sondern immer „unbekannt“, denn NULL ist kein Wert, der gleich sein könnte. Die Abfrage liefert deshalb keine einzige Zeile. Auf fehlende Werte prüft man mit IS NULL (bzw. IS NOT NULL).

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 2 — Messwerte einer Wartung löschen (SQL)

*Nach einer Korrektur sollen alle Messwerte der Wartung mit der ID 42 gelöscht werden. Die Messwerte aller anderen Wartungen müssen erhalten bleiben.*

```text
 1  BEGIN;
 2  DELETE FROM messwert;
 3  SELECT COUNT(*) AS verbleibend FROM messwert;
 4  COMMIT;
```

**Fehlerzeile:** 2 · **Korrektur:** `DELETE FROM messwert WHERE wartung_id = 42;`

**Tipp:** Überlege, welche Zeilen der Tabelle messwert von dieser Anweisung entfernt werden, wenn keine Einschränkung angegeben ist.

**Erklärung:**

> Ein DELETE ohne WHERE-Klausel löscht sämtliche Zeilen der Tabelle, hier also die Messwerte aller Wartungen. Erst die Bedingung wartung_id = 42 begrenzt die Löschung auf die gewünschte Wartung. Die Transaktion (BEGIN ... COMMIT) hilft nur, solange man den Fehler vor dem COMMIT bemerkt und mit ROLLBACK zurückgeht.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 3 — Die drei höchsten Bestellungen (SQL)

*Die Abfrage soll die drei Bestellungen mit den höchsten Beträgen ausgeben, die höchste zuerst.*

```text
 1  SELECT id, kunde_id, betrag
 2  FROM bestellung
 3  ORDER BY betrag ASC
 4  LIMIT 3;
```

**Fehlerzeile:** 3 · **Korrektur:** `ORDER BY betrag DESC`

**Tipp:** LIMIT schneidet nach der Sortierung ab. Welche drei Zeilen stehen bei dieser Sortierung ganz vorn?

**Erklärung:**

> ASC sortiert aufsteigend, die ersten drei Zeilen sind dann die niedrigsten Beträge. Für die höchsten Werte muss absteigend (DESC) sortiert werden, bevor LIMIT 3 die ersten drei Zeilen abschneidet.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 4 — Namen mit Anfangsbuchstaben suchen (SQL)

*Die Abfrage soll alle Kunden finden, deren Name mit „Mü“ beginnt, zum Beispiel Müller, Münch und Müllner.*

```text
 1  SELECT id, name
 2  FROM kunde
 3  WHERE name LIKE 'Mü'
 4  ORDER BY name;
```

**Fehlerzeile:** 3 · **Korrektur:** `WHERE name LIKE 'Mü%'`

**Tipp:** Ohne Platzhalter prüft LIKE auf vollständige Gleichheit. Welches Zeichen steht für „beliebig viele weitere Zeichen“?

**Erklärung:**

> LIKE 'Mü' ohne Platzhalter findet nur Kunden, die exakt „Mü“ heißen, also praktisch keinen. Das Prozentzeichen steht für beliebig viele beliebige Zeichen: 'Mü%' trifft alle Namen, die mit „Mü“ anfangen. Ein Unterstrich würde genau ein Zeichen ersetzen.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 5 — Kundenliste mit Ort und Status (SQL)

*Die Abfrage soll vier Spalten liefern: id, name, ort und status der Kunden, sortiert nach dem Namen.*

```text
 1  SELECT id,
 2         name
 3         ort,
 4         status
 5  FROM kunde
 6  ORDER BY name;
```

**Fehlerzeile:** 2 · **Korrektur:** `name,`

**Tipp:** Zähle die Spalten im Ergebnis: Das sind weniger als erwartet. Zwischen welchen Angaben der SELECT-Liste fehlt ein Trennzeichen?

**Erklärung:**

> Ohne Komma hinter name liest SQL das folgende ort als Spaltenalias, also als neuen Namen für die Spalte name (das Schlüsselwort AS ist optional). Die Abfrage läuft ohne Fehlermeldung, liefert aber nur drei Spalten, und die Ortsangabe fehlt. Die Einträge einer SELECT-Liste werden durch Kommas getrennt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 6 — Kunden automatisch deaktivieren (SQL)

*Kunden, die sich seit dem 01.01.2025 nicht mehr angemeldet haben, sollen den Status 'inaktiv' und die Bemerkung 'automatisch deaktiviert' erhalten.*

```text
 1  UPDATE kunde
 2  SET status = 'inaktiv' AND bemerkung = 'automatisch deaktiviert'
 3  WHERE letzter_login < '2025-01-01';
```

**Fehlerzeile:** 2 · **Korrektur:** `SET status = 'inaktiv', bemerkung = 'automatisch deaktiviert'`

**Tipp:** Wie trennt man in der SET-Klausel mehrere Zuweisungen voneinander? Ein logischer Operator ist dafür nicht gedacht.

**Erklärung:**

> In der SET-Klausel werden mehrere Zuweisungen durch Kommas getrennt. AND ist ein logischer Operator: Der Ausdruck 'inaktiv' AND bemerkung = '...' wird als eine einzige Bedingung gelesen, die als Wert für status keinen Sinn ergibt. PostgreSQL bricht mit einem Typfehler ab, andere Datenbanken schreiben ein unsinniges Ergebnis.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 7 — Kunden je Ort zählen (SQL)

*Die Abfrage soll je Ort die Anzahl aller Kunden ausgeben, auch derjenigen, bei denen keine Telefonnummer hinterlegt ist.*

```text
 1  SELECT ort, COUNT(telefon) AS kunden
 2  FROM kunde
 3  GROUP BY ort;
```

**Fehlerzeile:** 1 · **Korrektur:** `SELECT ort, COUNT(*) AS kunden`

**Tipp:** Wie behandelt COUNT eine Spalte, wenn in einer Zeile der Wert NULL ist?

**Erklärung:**

> COUNT(spalte) zählt nur die Zeilen, in denen die Spalte nicht NULL ist. Kunden ohne Telefonnummer fallen deshalb aus der Zählung, die Anzahl je Ort ist zu klein. COUNT(*) zählt alle Zeilen der Gruppe, unabhängig von NULL-Werten.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 8 — Bestellungen mit Kundennamen (SQL)

*Die Abfrage soll zu jeder Bestellung über 100 Euro den Namen des Kunden anzeigen, der sie aufgegeben hat, die größte Bestellung zuerst.*

```text
 1  SELECT b.id, k.name, b.betrag
 2  FROM bestellung b
 3  JOIN kunde k ON b.id = k.id
 4  WHERE b.betrag > 100
 5  ORDER BY b.betrag DESC;
```

**Fehlerzeile:** 3 · **Korrektur:** `JOIN kunde k ON b.kunde_id = k.id`

**Tipp:** Welche Spalte der Bestellung verweist auf den Kunden? Hier werden zwei Primärschlüssel miteinander verglichen.

**Erklärung:**

> Die Join-Bedingung verknüpft den Primärschlüssel der Bestellung (b.id) mit dem Primärschlüssel des Kunden (k.id). Das passt nur zufällig, wenn beide Nummern übereinstimmen, und ordnet Bestellungen sonst fremden Kunden zu oder lässt sie ganz weg. Richtig ist die Verbindung von Fremdschlüssel und Primärschlüssel: b.kunde_id = k.id.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 9 — Alle Kunden mit Bestellanzahl (SQL)

*Die Abfrage soll jeden Kunden mit der Zahl seiner Bestellungen auflisten. Kunden ohne Bestellung sollen ebenfalls erscheinen, mit der Anzahl 0.*

```text
 1  SELECT k.name, COUNT(b.id) AS bestellungen
 2  FROM kunde k
 3  INNER JOIN bestellung b ON b.kunde_id = k.id
 4  GROUP BY k.id, k.name
 5  ORDER BY k.name;
```

**Fehlerzeile:** 3 · **Korrektur:** `LEFT JOIN bestellung b ON b.kunde_id = k.id`

**Tipp:** Was passiert mit einem Kunden, zu dem es keine passende Bestellung gibt, wenn nur Paare mit Treffer im Ergebnis bleiben?

**Erklärung:**

> Ein INNER JOIN behält nur Kunden, für die es mindestens eine passende Bestellung gibt. Kunden ohne Bestellung verschwinden aus dem Ergebnis, statt mit 0 zu erscheinen. Ein LEFT JOIN behält alle Zeilen der linken Tabelle (kunde) und füllt fehlende Bestelldaten mit NULL, COUNT(b.id) zählt diese NULL-Werte nicht mit und ergibt 0.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 10 — Aktive Kunden aus zwei Städten (SQL)

*Die Abfrage soll alle aktiven Kunden aus Hamburg oder aus Bremen anzeigen. Inaktive Kunden dürfen in keiner der beiden Städte erscheinen.*

```text
 1  SELECT id, name, ort, status
 2  FROM kunde
 3  WHERE ort = 'Hamburg' OR ort = 'Bremen' AND status = 'aktiv'
 4  ORDER BY name;
```

**Fehlerzeile:** 3 · **Korrektur:** `WHERE (ort = 'Hamburg' OR ort = 'Bremen') AND status = 'aktiv'`

**Tipp:** AND und OR haben in SQL eine feste Rangfolge. Welcher der beiden Operatoren wird zuerst ausgewertet?

**Erklärung:**

> AND bindet stärker als OR. Die Bedingung wird als ort = 'Hamburg' OR (ort = 'Bremen' AND status = 'aktiv') gelesen: Alle Hamburger Kunden erscheinen, auch die inaktiven, und nur der Filter für Bremen berücksichtigt den Status. Erst die Klammer um den OR-Teil sorgt dafür, dass der Statusfilter für beide Städte gilt.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 11 — Durchschnittsgehalt je Abteilung und Standort (SQL)

*Die Abfrage soll das Durchschnittsgehalt je Kombination aus Abteilung und Standort ausgeben.*

```text
 1  SELECT abteilung, standort, AVG(gehalt) AS durchschnitt
 2  FROM mitarbeiter
 3  GROUP BY abteilung
 4  ORDER BY abteilung;
```

**Fehlerzeile:** 3 · **Korrektur:** `GROUP BY abteilung, standort`

**Tipp:** Jede Spalte der SELECT-Liste, die nicht in einer Aggregatfunktion steckt, muss zur Gruppierung gehören. Welche tut das hier nicht?

**Erklärung:**

> Nach GROUP BY abteilung gibt es eine Ergebniszeile je Abteilung. Wenn eine Abteilung an mehreren Standorten sitzt, wäre die Spalte standort nicht eindeutig. PostgreSQL verweigert die Abfrage mit dem Hinweis, dass standort in GROUP BY stehen oder aggregiert werden muss. Für Gruppen je Abteilung und Standort muss die Spalte in die Gruppierung aufgenommen werden.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

#### sql-fehler · 12 — Anlagen mit vielen Wartungen (SQL)

*Die Abfrage soll alle Anlagen ausgeben, an denen mindestens dreimal gewartet wurde, mit der Anzahl der Wartungen, die meisten zuerst.*

```text
 1  SELECT a.name, COUNT(w.id) AS wartungen
 2  FROM anlage a
 3  JOIN wartung w ON w.anlage_id = a.id
 4  GROUP BY a.name
 5  WHERE COUNT(w.id) >= 3
 6  ORDER BY wartungen DESC;
```

**Fehlerzeile:** 5 · **Korrektur:** `HAVING COUNT(w.id) >= 3`

**Tipp:** Die Bedingung bezieht sich auf das Ergebnis einer Aggregatfunktion, also auf die Gruppen. Welche Klausel filtert Gruppen?

**Erklärung:**

> WHERE filtert einzelne Zeilen vor der Gruppierung und kennt Aggregatfunktionen wie COUNT noch nicht. Außerdem steht WHERE nie hinter GROUP BY, die Abfrage wäre syntaktisch ungültig. Bedingungen auf Gruppen gehören nach GROUP BY in die HAVING-Klausel.

**Prüffragen:**
- ☐ Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?
- ☐ Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?
- ☐ Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?
- ☐ Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?
- ☐ Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?

**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________

**Zum Set — besonders prüfen:**
- ⚠ Nur gegen SQLite getestet; die im Text genannten PostgreSQL-Fehlermeldungen (Nr. 6 Typfehler, Nr. 11 „muss in GROUP BY stehen“) sind aus Dialektkenntnis geschrieben.
- ⚠ Nr. 11: man könnte auch `standort` aus der SELECT-Liste streichen — die Aufgabe verlangt aber ausdrücklich „je Abteilung und Standort“.
- ⚠ Nr. 8 und Nr. 12 ähneln dem bestehenden Set (JOIN-Bedingung, WHERE statt HAVING), anderes Szenario.
