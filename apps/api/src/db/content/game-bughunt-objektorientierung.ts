import type { BugHuntPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Bug-Hunt: Objektorientierung" (setKey "objektorientierung") für den Kurs
 * Fachinformatiker/in Anwendungsentwicklung (11 kurze Codeausschnitte in Python, JavaScript, Java und C#
 * zu Sichtbarkeit, Vererbung, statischen und Instanz-Membern, Konstruktoren und Objektvergleich, in jedem
 * steckt genau ein Fehler in genau einer Zeile). Die Schwierigkeit steigt über die Aufgaben hinweg an.
 */
export const bugHuntObjektorientierung: BugHuntPayload = {
  aufgaben: [
    {
      nummer: 1,
      titel: "Kontostand ausgeben",
      sprache: "Python",
      aufgabe:
        "Das Konto hält seinen Saldo bewusst als privates Attribut (doppelter Unterstrich). Das Hauptprogramm soll nach der Einzahlung den Kontostand 50 ausgeben.",
      zeilen: [
        "class Konto:",
        "    def __init__(self):",
        "        self.__saldo = 0",
        "    def einzahlen(self, betrag):",
        "        self.__saldo += betrag",
        "    def saldo(self):",
        "        return self.__saldo",
        "konto = Konto()",
        "konto.einzahlen(50)",
        "print(konto.__saldo)",
      ],
      fehlerZeile: 10,
      tipp: "Das Attribut ist privat gedacht. Wie kommt Code außerhalb der Klasse an den Wert, ohne das Attribut selbst anzufassen?",
      korrektur: "print(konto.saldo())",
      erklaerung:
        "Attribute mit führendem doppeltem Unterstrich sind für die Klasse gedacht. Python benennt sie intern um (Name-Mangling zu _Konto__saldo), von außen gibt es konto.__saldo nicht, es entsteht ein AttributeError. Gelesen wird der Wert über die öffentliche Methode saldo(). Das Prinzip dahinter heißt Kapselung: Zugriff auf den Zustand nur über die Schnittstelle der Klasse.",
    },
    {
      nummer: 2,
      titel: "Bruttopreis berechnen",
      sprache: "JavaScript",
      aufgabe:
        "Die Methode brutto ist bewusst static, weil sie keinen Objektzustand braucht. Das Hauptprogramm soll den Bruttopreis für netto = 100 und 19 % Steuer ausgeben, also 119.",
      zeilen: [
        "class Preisrechner {",
        "  static brutto(netto, steuersatz) {",
        "    return netto * (1 + steuersatz);",
        "  }",
        "}",
        "const preis = new Preisrechner().brutto(100, 0.19);",
        "console.log(preis);",
      ],
      fehlerZeile: 6,
      tipp: "Statische Methoden gehören zu einer bestimmten Sache, nicht zu den Objekten. Worüber muss man sie aufrufen?",
      korrektur: "const preis = Preisrechner.brutto(100, 0.19);",
      erklaerung:
        "Eine static-Methode gehört zur Klasse, nicht zu ihren Instanzen. Auf einem mit new erzeugten Objekt existiert sie nicht, der Aufruf endet mit einem TypeError (brutto is not a function). Aufgerufen wird sie direkt über den Klassennamen: Preisrechner.brutto(...). Ein Objekt braucht man dafür gar nicht.",
    },
    {
      nummer: 3,
      titel: "Kunde nach Namen suchen",
      sprache: "Java",
      aufgabe:
        "Die Methode soll den Kunden mit dem gesuchten Namen liefern. Der Suchname stammt aus einer Benutzereingabe, ist also ein zur Laufzeit erzeugter String.",
      zeilen: [
        "public static Kunde sucheNachName(List<Kunde> kunden, String name) {",
        "    for (Kunde kunde : kunden) {",
        "        if (kunde.getName() == name) {",
        "            return kunde;",
        "        }",
        "    }",
        "    return null;",
        "}",
      ],
      fehlerZeile: 3,
      tipp: "Was vergleicht der Operator == bei zwei Objekten wie Strings: die Zeichen oder die Speicherstellen, auf die sie zeigen?",
      korrektur: "        if (kunde.getName().equals(name)) {",
      erklaerung:
        "Bei Objekten vergleicht == nur die Referenzen, also ob beide Variablen auf dasselbe Objekt zeigen. Ein eingegebener Text ist ein eigenes String-Objekt, auch wenn er dieselben Zeichen enthält, und der Vergleich liefert false. Die Methode findet dann nie einen Kunden und gibt null zurück. Den Inhalt vergleicht equals.",
    },
    {
      nummer: 4,
      titel: "Kunden zählen",
      sprache: "Python",
      aufgabe:
        "Das Klassenattribut anzahl soll mitzählen, wie viele Kunden insgesamt angelegt wurden. Nach dem Anlegen von zwei Kunden soll Kunde.anzahl den Wert 2 haben.",
      zeilen: [
        "class Kunde:",
        "    anzahl = 0",
        "    def __init__(self, name):",
        "        self.name = name",
        "        anzahl += 1",
      ],
      fehlerZeile: 5,
      tipp: "Innerhalb einer Methode ist anzahl zunächst nur ein ganz gewöhnlicher Variablenname. Wie spricht man ein Attribut der Klasse an?",
      korrektur: "        Kunde.anzahl += 1",
      erklaerung:
        "Das Klassenattribut ist in der Methode nicht ohne Weiteres sichtbar. anzahl += 1 behandelt anzahl als lokale Variable, die noch keinen Wert hat, und löst einen UnboundLocalError aus. Das Attribut wird über den Klassennamen angesprochen: Kunde.anzahl += 1. Mit self.anzahl += 1 würde stattdessen ein eigenes Instanzattribut entstehen, und der gemeinsame Zähler bliebe bei 0.",
    },
    {
      nummer: 5,
      titel: "Doppelte Kunden vermeiden",
      sprache: "JavaScript",
      aufgabe:
        "Zwei Kundenobjekte gelten als derselbe Kunde, wenn sie dieselbe id haben. Wird ein Kunde mit bereits vorhandener id übergeben, auch als neu erzeugtes Objekt, darf er nicht ein zweites Mal aufgenommen werden.",
      zeilen: [
        "function kundeAufnehmen(kunden, neuerKunde) {",
        "  const bekannt = kunden.some((kunde) => kunde === neuerKunde);",
        "  if (!bekannt) {",
        "    kunden.push(neuerKunde);",
        "  }",
        "}",
      ],
      fehlerZeile: 2,
      tipp: "Zwei Objekte können dieselben Daten haben und trotzdem zwei verschiedene Objekte sein. Was prüft === bei Objekten?",
      korrektur: "  const bekannt = kunden.some((kunde) => kunde.id === neuerKunde.id);",
      erklaerung:
        "=== vergleicht bei Objekten die Identität, also ob es dasselbe Objekt im Speicher ist, nicht den Inhalt. Ein neu erzeugtes Objekt mit gleicher id ist ein anderes Objekt, \"bekannt\" bleibt false, und der Kunde wird doppelt aufgenommen. Gefragt ist die Gleichheit der Kundennummer, also der Vergleich der Felder: kunde.id === neuerKunde.id.",
    },
    {
      nummer: 6,
      titel: "Zuladung im Konstruktor speichern",
      sprache: "Java",
      aufgabe:
        "Der Konstruktor soll Kennzeichen und Zuladung des Lieferwagens speichern. new Lieferwagen(\"HH-AB 123\", 800).getZuladung() soll 800 liefern.",
      zeilen: [
        "public class Lieferwagen {",
        "    private final String kennzeichen;",
        "    private int zuladung;",
        "    public Lieferwagen(String kennzeichen, int zuladung) {",
        "        this.kennzeichen = kennzeichen;",
        "        zuladung = zuladung;",
        "    }",
        "    public int getZuladung() {",
        "        return zuladung;",
        "    }",
        "}",
      ],
      fehlerZeile: 6,
      tipp: "Parameter und Attribut heißen gleich. Welche der beiden Variablen meint der Name zuladung innerhalb des Konstruktors?",
      korrektur: "        this.zuladung = zuladung;",
      erklaerung:
        "Innerhalb des Konstruktors verdeckt der Parameter zuladung das gleichnamige Attribut. Die Zeile weist dem Parameter seinen eigenen Wert zu, das Attribut behält den Standardwert 0, und getZuladung() liefert 0 statt 800. Mit this.zuladung wird das Attribut des Objekts angesprochen. Der Compiler meldet dazu keinen Fehler.",
    },
    {
      nummer: 7,
      titel: "Rechnung mit Steuer",
      sprache: "C#",
      aufgabe:
        "Brutto soll aus dem Nettobetrag des jeweiligen Rechnungsobjekts den Bruttobetrag mit 19 % Steuer berechnen. new Rechnung(100m).Brutto() soll 119 ergeben.",
      zeilen: [
        "public class Rechnung",
        "{",
        "    private decimal netto;",
        "    public Rechnung(decimal netto) { this.netto = netto; }",
        "    public static decimal Brutto() { return netto * 1.19m; }",
        "}",
      ],
      fehlerZeile: 5,
      tipp: "Zu welchem Rechnungsobjekt gehört der Wert netto, wenn die Methode zur Klasse und nicht zu einem Objekt gehört?",
      korrektur: "    public decimal Brutto() { return netto * 1.19m; }",
      erklaerung:
        "Eine static-Methode gehört zur Klasse und läuft ohne konkretes Objekt. Sie kann deshalb nicht auf das Instanzfeld netto zugreifen, denn es gibt keinen Rechnungsbetrag, der gemeint sein könnte (Compilerfehler CS0120). Weil der Betrag zum jeweiligen Objekt gehört, muss die Methode eine Instanzmethode sein, also ohne static.",
    },
    {
      nummer: 8,
      titel: "Techniker erweitert Mitarbeiter",
      sprache: "Python",
      aufgabe:
        "Techniker erweitert Mitarbeiter und ergänzt eine Qualifikation. Der Name soll von der Basisklasse gespeichert werden: Techniker(\"Eva\", \"Netzwerk\").name soll \"Eva\" liefern.",
      zeilen: [
        "class Mitarbeiter:",
        "    def __init__(self, name):",
        "        self.name = name",
        "class Techniker(Mitarbeiter):",
        "    def __init__(self, name, qualifikation):",
        "        super().__init__()",
        "        self.qualifikation = qualifikation",
      ],
      fehlerZeile: 6,
      tipp: "Schau dir an, welche Argumente der Konstruktor der Basisklasse verlangt und welche der Aufruf mit super() übergibt.",
      korrektur: "        super().__init__(name)",
      erklaerung:
        "Der Konstruktor der Basisklasse erwartet einen Namen. super().__init__() ruft ihn ohne Argument auf, Python meldet einen TypeError (missing 1 required positional argument: 'name'). Die Unterklasse muss die benötigten Werte an die Basisklasse weiterreichen: super().__init__(name).",
    },
    {
      nummer: 9,
      titel: "Beschreibung eines Druckers",
      sprache: "JavaScript",
      aufgabe:
        "Drucker erweitert Geraet und hängt an die Beschreibung des Geräts den Zusatz \" (Drucker)\" an. new Drucker(\"Laser 3000\").beschreibung() soll \"Gerät: Laser 3000 (Drucker)\" liefern.",
      zeilen: [
        "class Geraet {",
        "  constructor(name) { this.name = name; }",
        "  beschreibung() { return \"Gerät: \" + this.name; }",
        "}",
        "class Drucker extends Geraet {",
        "  beschreibung() {",
        "    return this.beschreibung() + \" (Drucker)\";",
        "  }",
        "}",
      ],
      fehlerZeile: 7,
      tipp: "Welche Methode ruft this.beschreibung() in einem Drucker auf, die der Basisklasse oder die der Unterklasse selbst?",
      korrektur: "    return super.beschreibung() + \" (Drucker)\";",
      erklaerung:
        "this verweist auf das Drucker-Objekt, und dort findet this.beschreibung() die überschreibende Methode der Unterklasse, also sich selbst. Die Methode ruft sich endlos selbst auf, bis JavaScript mit einem RangeError (Maximum call stack size exceeded) abbricht. Die Methode der Basisklasse erreicht man mit super.beschreibung().",
    },
    {
      nummer: 10,
      titel: "Fortlaufende Auftragsnummern",
      sprache: "Java",
      aufgabe:
        "Jeder neu angelegte Auftrag soll eine fortlaufende Nummer erhalten: der erste die 1, der zweite die 2 und so weiter.",
      zeilen: [
        "public class Auftrag {",
        "    private int anzahl = 0;",
        "    private final int nummer;",
        "    public Auftrag() {",
        "        anzahl++;",
        "        nummer = anzahl;",
        "    }",
        "    public int getNummer() {",
        "        return nummer;",
        "    }",
        "}",
      ],
      fehlerZeile: 2,
      tipp: "Lege in Gedanken zwei Aufträge an und überlege, wie viele Variablen anzahl dabei insgesamt existieren.",
      korrektur: "    private static int anzahl = 0;",
      erklaerung:
        "Ohne static besitzt jedes Auftrag-Objekt eine eigene Variable anzahl, die bei 0 beginnt. Jeder neue Auftrag zählt also von vorn und erhält die Nummer 1. Ein gemeinsamer Zähler über alle Objekte muss zur Klasse gehören, also static sein: Es gibt dann genau eine Variable, die jeder Konstruktoraufruf weiterzählt.",
    },
    {
      nummer: 11,
      titel: "Polymorphe Beschreibung",
      sprache: "C#",
      aufgabe:
        "Eine Variable vom Typ Geraet, die auf ein Drucker-Objekt zeigt (Geraet g = new Drucker();), soll bei g.Beschreibung() den Text \"Drucker\" liefern.",
      zeilen: [
        "public class Geraet",
        "{",
        "    public virtual string Beschreibung() { return \"Gerät\"; }",
        "}",
        "public class Drucker : Geraet",
        "{",
        "    public string Beschreibung() { return \"Drucker\"; }",
        "}",
      ],
      fehlerZeile: 7,
      tipp: "Die Basisklasse erlaubt das Überschreiben der Methode. Was muss die Unterklasse angeben, damit sie sie wirklich überschreibt?",
      korrektur: "    public override string Beschreibung() { return \"Drucker\"; }",
      erklaerung:
        "Ohne override verdeckt die Methode der Unterklasse die der Basisklasse nur (Hiding, der Compiler warnt mit CS0114). Welche Methode läuft, bestimmt dann der Typ der Variablen: g.Beschreibung() ruft die Version der Basisklasse auf und liefert \"Gerät\". Polymorphie braucht das Paar virtual in der Basisklasse und override in der Unterklasse.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast elf Fehlerzeilen aus der objektorientierten Programmierung aufgespürt: Kapselung und Sichtbarkeit, static gegen Instanz, Konstruktoren und die gleichnamigen Parameter, Vererbung mit super und override sowie den Unterschied zwischen Referenz- und Inhaltsvergleich. Wer bei Objekten immer fragt, wem ein Wert gehört (Klasse oder Objekt) und was ein Vergleich wirklich vergleicht, vermeidet viele dieser Stolpersteine.",
};
