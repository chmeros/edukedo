import type { BugHuntPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Bug-Hunt: Skripte und Konfigurationsdateien“ (setKey "skripte-konfiguration") für den Kurs
 * Fachinformatiker/in Systemintegration (12 kurze Ausschnitte in Bash, PowerShell, Python sowie sshd_config,
 * nginx und ufw, in jedem steckt genau ein Fehler in genau einer Zeile). Die Schwierigkeit steigt über die
 * Aufgaben hinweg an. Alle Pfade, Namen und Adressen sind erfunden und harmlos (Beispieladressen aus den
 * Dokumentationsbereichen), es kommen bewusst keine löschenden oder formatierenden Befehle vor.
 */
export const bugHuntSkripteKonfiguration: BugHuntPayload = {
  aufgaben: [
    {
      nummer: 1,
      titel: "Pfad mit Leerzeichen",
      sprache: "Bash",
      aufgabe:
        "Das Skript soll den Ordner „Projekt Alpha“ (mit Leerzeichen im Namen) in ein Sicherungsverzeichnis kopieren. Beim Lauf meldet cp aber, dass es „/srv/daten/Projekt“ und „Alpha“ nicht findet.",
      zeilen: [
        "#!/bin/bash",
        "quelle=\"/srv/daten/Projekt Alpha\"",
        "ziel=\"/srv/backup/projekte\"",
        "mkdir -p \"$ziel\"",
        "cp -r $quelle \"$ziel\"",
        "echo \"Sicherung nach $ziel abgeschlossen\"",
      ],
      fehlerZeile: 5,
      tipp: "Vergleiche, wie die Variable ziel und wie die Variable quelle im Befehl verwendet werden. Was macht die Shell mit einem Leerzeichen im Wert, wenn nichts es schützt?",
      korrektur: "cp -r \"$quelle\" \"$ziel\"",
      erklaerung:
        "Ohne Anführungszeichen zerlegt die Shell den Inhalt von $quelle an jedem Leerzeichen in zwei Wörter. cp bekommt dann „/srv/daten/Projekt“ und „Alpha“ als zwei getrennte Quellen und findet beide nicht. Variablen, die Pfade oder Benutzereingaben enthalten können, gehören in Bash immer in doppelte Anführungszeichen: \"$quelle\". Die übrigen Zeilen sind korrekt, ziel ist schon richtig gequotet.",
    },
    {
      nummer: 2,
      titel: "Anmeldung nur mit Schlüssel",
      sprache: "sshd_config",
      aufgabe:
        "Ein Server soll ausschließlich Anmeldungen per SSH-Schlüssel zulassen. Der Root-Login ist verboten, Anmeldungen mit Kennwort sollen es ebenfalls sein. Eine Zeile der Konfiguration widerspricht dieser Vorgabe.",
      zeilen: [
        "Port 22",
        "PermitRootLogin no",
        "PasswordAuthentication yes",
        "PubkeyAuthentication yes",
        "MaxAuthTries 3",
        "AllowUsers admin wartung",
      ],
      fehlerZeile: 3,
      tipp: "Suche die Direktive, die steuert, ob ein Kennwort als Anmeldeverfahren akzeptiert wird. Welchen Wert hat sie hier, und welchen Wert verlangt die Vorgabe?",
      korrektur: "PasswordAuthentication no",
      erklaerung:
        "PasswordAuthentication yes erlaubt die Anmeldung per Kennwort. Dann bleibt der Server für Brute-Force- und Wörterbuchangriffe auf Kennwörter offen, auch wenn Schlüssel erlaubt sind. Mit no werden nur noch Schlüssel akzeptiert. Wichtig ist die Reihenfolge der Arbeitsschritte: Erst prüfen, dass ein Schlüssel für die erlaubten Konten funktioniert, dann das Kennwortverfahren abschalten, sonst sperrt man sich selbst aus.",
    },
    {
      nummer: 3,
      titel: "Verbindungsversuche zählen",
      sprache: "Python",
      aufgabe:
        "Das Skript soll genau dreimal einen Verbindungsversuch melden und danach enden. Beim Start läuft es aber endlos weiter und meldet immer wieder „Verbindungsversuch 2 von 3“.",
      zeilen: [
        "import time",
        "versuch = 0",
        "while versuch < 3:",
        "    print(f\"Verbindungsversuch {versuch + 1} von 3\")",
        "    time.sleep(1)",
        "    versuch =+ 1",
        "print(\"Abbruch nach drei Versuchen\")",
      ],
      fehlerZeile: 6,
      tipp: "Gib dir nach jedem Durchlauf den Wert von versuch aus. Verändert sich der Zähler tatsächlich? Lies den Operator in der Zeile ganz genau, Zeichen für Zeichen.",
      korrektur: "    versuch += 1",
      erklaerung:
        "versuch =+ 1 ist keine Erhöhung, sondern eine Zuweisung: Der Zähler wird auf +1 gesetzt, also immer auf 1. Die Bedingung versuch < 3 bleibt dadurch ewig wahr, die Schleife hat kein Ende. Die vertauschten Zeichen sind leicht zu übersehen. Gemeint ist der Operator += (zu versuch 1 addieren).",
    },
    {
      nummer: 4,
      titel: "Schlüsseldatei erzeugen",
      sprache: "Bash",
      aufgabe:
        "Das Skript legt eine zufällige Schlüsseldatei für die Datensicherung an. Nur der Besitzer darf sie lesen und schreiben, alle anderen Konten sollen keinerlei Zugriff haben.",
      zeilen: [
        "#!/bin/bash",
        "schluessel=\"/srv/daten/schluessel/backup.key\"",
        "umask 077",
        "openssl rand -hex 32 > \"$schluessel\"",
        "chmod 777 \"$schluessel\"",
        "echo \"Schlüssel erzeugt\"",
      ],
      fehlerZeile: 5,
      tipp: "Die Zifferngruppe bei chmod steht für Besitzer, Gruppe und Andere. Welche Rechte erhält jede Gruppe bei dieser Zahl?",
      korrektur: "chmod 600 \"$schluessel\"",
      erklaerung:
        "chmod 777 gibt jedem Konto auf dem System Lese-, Schreib- und Ausführungsrechte und hebt damit sogar den Schutz der zuvor gesetzten umask 077 wieder auf. Ein geheimer Schlüssel darf aber nur vom Besitzer lesbar sein. 600 bedeutet lesen und schreiben für den Besitzer, nichts für Gruppe und Andere. Ausführungsrechte braucht eine Schlüsseldatei nie.",
    },
    {
      nummer: 5,
      titel: "Webserver startet nicht",
      sprache: "nginx",
      aufgabe:
        "Nach dem Eintragen dieses Server-Blocks meldet der Konfigurationstest von nginx einen Syntaxfehler und der Webserver lädt die Konfiguration nicht. In genau einer Zeile fehlt etwas.",
      zeilen: [
        "server {",
        "    listen 80;",
        "    server_name intranet.example.test;",
        "    root /srv/daten/web",
        "    index index.html;",
        "    location / {",
        "        try_files $uri $uri/ =404;",
        "    }",
        "}",
      ],
      fehlerZeile: 4,
      tipp: "In nginx endet jede einfache Direktive mit einem bestimmten Zeichen, Blöcke mit geschweiften Klammern dagegen nicht. Prüfe Zeile für Zeile, ob jede Direktive ordentlich abgeschlossen ist.",
      korrektur: "    root /srv/daten/web;",
      erklaerung:
        "Einfache Direktiven wie listen, root oder index müssen in nginx mit einem Semikolon abgeschlossen werden. Fehlt es, liest nginx die folgende Zeile noch als weitere Argumente von root mit und meldet eine ungültige Zahl von Argumenten. Dieser Fehler wird beim Test mit nginx -t gefunden, bevor ein Neuladen den Dienst beeinträchtigt. Deshalb wird nach jeder Änderung zuerst nginx -t ausgeführt.",
    },
    {
      nummer: 6,
      titel: "Ein Konto zu viel",
      sprache: "PowerShell",
      aufgabe:
        "Das Skript soll für jeden der drei Namen genau eine Zeile ausgeben. Tatsächlich erscheint eine vierte, leere Zeile „Konto 4:“. Eine Fehlermeldung gibt es nicht.",
      zeilen: [
        "$namen = @(\"Anna\", \"Ben\", \"Cem\")",
        "Write-Host \"Es werden $($namen.Count) Konten geprüft.\"",
        "for ($i = 0; $i -le $namen.Count; $i++) {",
        "    Write-Host \"Konto $($i + 1): $($namen[$i])\"",
        "}",
        "Write-Host \"Prüfung beendet.\"",
      ],
      fehlerZeile: 3,
      tipp: "Ein Array mit drei Elementen hat die Indizes 0, 1 und 2. Bis zu welchem Wert läuft i in dieser Schleife, und welchen Wert hat Count?",
      korrektur: "for ($i = 0; $i -lt $namen.Count; $i++) {",
      erklaerung:
        "Die Zählung beginnt bei 0, der letzte gültige Index ist also Count minus 1. Mit -le läuft die Schleife zusätzlich mit i = 3, und $namen[3] ist in PowerShell einfach $null, ohne Fehlermeldung. Das ist ein klassischer Off-by-one-Fehler an der Obergrenze: Bei Start bei 0 gehört -lt statt -le in die Bedingung.",
    },
    {
      nummer: 7,
      titel: "Falscher Alarm bei der Platte",
      sprache: "Bash",
      aufgabe:
        "Das Skript soll warnen, wenn das Datenverzeichnis zu mehr als 80 Prozent belegt ist. Bei einer Belegung von nur 9 Prozent erscheint die Warnung aber trotzdem, bei 100 Prozent bleibt sie dagegen aus.",
      zeilen: [
        "#!/bin/bash",
        "belegung=$(df --output=pcent /srv/daten | tail -n 1 | tr -dc '0-9')",
        "if [[ \"$belegung\" > 80 ]]; then",
        "    echo \"Warnung: Datenplatte zu ${belegung} Prozent belegt\"",
        "fi",
      ],
      fehlerZeile: 3,
      tipp: "Das Zeichen > ist in [[ ... ]] ein Textvergleich, kein Zahlenvergleich. Wie sortiert man „9“ und „80“, wenn man sie wie Wörter im Wörterbuch behandelt?",
      korrektur: "if [[ \"$belegung\" -gt 80 ]]; then",
      erklaerung:
        "In [[ ]] vergleicht > die Werte als Text, Zeichen für Zeichen. „9“ kommt dabei hinter „80“, weil „9“ größer als „8“ ist, und die Warnung erscheint zu Unrecht. Für Zahlen gibt es in Bash die Operatoren -eq, -ne, -lt, -le, -gt und -ge. Mit einfachen Klammern [ ] käme es noch schlimmer: Dort würde > als Umleitung gelesen und eine Datei namens 80 angelegt.",
    },
    {
      nummer: 8,
      titel: "Kopieren und Fehler abfangen",
      sprache: "PowerShell",
      aufgabe:
        "Das Skript kopiert einen Bericht in den Sicherungsordner. Schlägt das Kopieren fehl, soll der catch-Block eine Fehlermeldung ausgeben. Bei einer fehlenden Quelldatei erscheint aber zuerst eine rote Fehlermeldung, dann die Erfolgsmeldung.",
      zeilen: [
        "$quelle = \"C:\\Daten\\Berichte\\Monat.xlsx\"",
        "$ziel = \"D:\\Sicherung\\Berichte\"",
        "try {",
        "    Copy-Item -Path $quelle -Destination $ziel",
        "    Write-Host \"Kopie erfolgreich: $quelle\"",
        "}",
        "catch {",
        "    Write-Host \"Fehler beim Kopieren: $($_.Exception.Message)\"",
        "}",
      ],
      fehlerZeile: 4,
      tipp: "Ein catch-Block fängt nur Fehler, die als abbrechend gelten. Viele Cmdlets melden Probleme aber nur als nicht abbrechende Fehler und machen einfach weiter. Wie lässt sich das für diesen einen Aufruf ändern?",
      korrektur: "    Copy-Item -Path $quelle -Destination $ziel -ErrorAction Stop",
      erklaerung:
        "Copy-Item meldet einen Fehler standardmäßig als nicht abbrechend: Die Meldung erscheint, das Skript läuft aber weiter, und der catch-Block wird nie erreicht. Deshalb folgt sogar die Erfolgsmeldung. Mit -ErrorAction Stop wird der Fehler zu einer abbrechenden Ausnahme, die try/catch fängt. Alternativ setzt man $ErrorActionPreference = \"Stop\" für das ganze Skript.",
    },
    {
      nummer: 9,
      titel: "Einstellung nur einmal eintragen",
      sprache: "Bash",
      aufgabe:
        "Das Skript trägt eine Einstellung in eine Konfigurationsdatei ein. Es wird von der Automatisierung täglich ausgeführt und soll dabei idempotent sein: Die Zeile darf nach beliebig vielen Läufen genau einmal in der Datei stehen.",
      zeilen: [
        "#!/bin/bash",
        "konfig=\"/srv/daten/app/app.conf\"",
        "mkdir -p \"$(dirname \"$konfig\")\"",
        "echo \"max_verbindungen=50\" >> \"$konfig\"",
        "echo \"Konfiguration angepasst\"",
      ],
      fehlerZeile: 4,
      tipp: "Führe das Skript im Kopf dreimal hintereinander aus und sieh dir an, was am Ende in der Datei steht. Was müsste das Skript vor dem Anhängen prüfen?",
      korrektur: "grep -qsx \"max_verbindungen=50\" \"$konfig\" || echo \"max_verbindungen=50\" >> \"$konfig\"",
      erklaerung:
        ">> hängt bei jedem Lauf eine weitere Zeile an, nach drei Läufen steht die Einstellung dreimal in der Datei. Ein idempotentes Skript prüft zuerst, ob der Soll-Zustand schon erreicht ist, und handelt nur, wenn nicht: grep -qsx sucht still (-q, -s) nach der exakt passenden Zeile (-x), und nur wenn sie fehlt (||), wird sie angehängt. Die Zeile mkdir -p ist dagegen schon idempotent, denn -p erzeugt das Verzeichnis nur, falls es fehlt.",
    },
    {
      nummer: 10,
      titel: "Zähler im Funktionsbereich",
      sprache: "PowerShell",
      aufgabe:
        "Das Skript zählt, wie viele der geprüften Dienste auf dem Rechner fehlen. Der Dienst „GibtEsNicht“ existiert nicht, deshalb soll am Ende „Fehlende Dienste: 1“ stehen. Ausgegeben wird aber immer 0.",
      zeilen: [
        "$fehler = 0",
        "function Test-Dienst {",
        "    param([string]$Name)",
        "    if (-not (Get-Service -Name $Name -ErrorAction SilentlyContinue)) {",
        "        $fehler++",
        "    }",
        "}",
        "Test-Dienst -Name \"Spooler\"",
        "Test-Dienst -Name \"GibtEsNicht\"",
        "Write-Host \"Fehlende Dienste: $fehler\"",
      ],
      fehlerZeile: 5,
      tipp: "Eine Funktion hat in PowerShell einen eigenen Gültigkeitsbereich (Scope). Wenn sie eine Variable aus dem übergeordneten Bereich hochzählt, was wird dabei tatsächlich verändert?",
      korrektur: "        $script:fehler++",
      erklaerung:
        "Lesen kann die Funktion den Wert des übergeordneten $fehler, zuweisen aber nicht: $fehler++ erzeugt in der Funktion eine neue lokale Variable mit dem Wert 1, die am Ende der Funktion verschwindet. Die Variable im Skriptbereich bleibt bei 0. Mit dem Scope-Präfix $script:fehler wird gezielt die Variable des Skripts verändert. Besser noch: Die Funktion gibt ihr Ergebnis zurück, statt globalen Zustand zu ändern.",
    },
    {
      nummer: 11,
      titel: "Hostname-Prüfung mit Shell",
      sprache: "Python",
      aufgabe:
        "Die Funktion prüft mit ping, ob ein vom Benutzer eingegebener Host erreichbar ist. Gibt jemand statt eines Namens etwas wie „x; echo fremd“ ein, wird der zweite Befehl ebenfalls ausgeführt.",
      zeilen: [
        "import subprocess",
        "def erreichbar(host):",
        "    ergebnis = subprocess.run(f\"ping -c 1 {host}\", shell=True)",
        "    return ergebnis.returncode == 0",
        "print(erreichbar(input(\"Hostname: \")))",
      ],
      fehlerZeile: 3,
      tipp: "Der gesamte Befehl wird als ein Text zusammengebaut und an eine Shell übergeben. Welche Zeichen hat die Shell außer dem Namen noch zu deuten? Wie lässt sich ein Programm mit Argumenten aufrufen, ohne dass eine Shell den Text auswertet?",
      korrektur: "    ergebnis = subprocess.run([\"ping\", \"-c\", \"1\", host])",
      erklaerung:
        "Mit shell=True und einem zusammengesetzten Text interpretiert die Shell Sonderzeichen wie ; | & und $(...) in der Eingabe: Ein Angreifer schleust so eigene Befehle ein (Command Injection). Übergibt man den Aufruf als Liste ohne shell=True, startet Python das Programm direkt, und host bleibt ein einzelnes Argument, egal was darin steht. Eingaben sollte man zusätzlich auf erlaubte Zeichen prüfen.",
    },
    {
      nummer: 12,
      titel: "Gesperrte Adresse kommt durch",
      sprache: "ufw",
      aufgabe:
        "Die Firewall soll SSH für alle erlauben, nur die Adresse 203.0.113.50 soll sich nicht per SSH verbinden können. Nach dem Aktivieren kann sich diese Adresse trotzdem anmelden. Die Regeln werden in der Reihenfolge ausgewertet, in der sie angelegt wurden.",
      zeilen: [
        "ufw default deny incoming",
        "ufw default allow outgoing",
        "ufw allow 22/tcp",
        "ufw deny from 203.0.113.50 to any port 22",
        "ufw allow 443/tcp",
        "ufw --force enable",
      ],
      fehlerZeile: 4,
      tipp: "ufw wertet Regeln von oben nach unten aus, die erste passende Regel entscheidet. Welche Regel trifft bei einer Verbindung von 203.0.113.50 auf Port 22 zuerst zu?",
      korrektur: "ufw insert 1 deny from 203.0.113.50 to any port 22",
      erklaerung:
        "Die allgemeine Freigabe ufw allow 22/tcp steht schon weiter oben und trifft auf jede Verbindung zu Port 22 zu, auch auf die der gesperrten Adresse. Die Sperrregel dahinter kommt nie zum Zug. Die spezifischere Regel muss vor der allgemeinen stehen: ufw insert 1 setzt sie an Position 1 der Regelliste. Die Reihenfolge von Regeln, bei denen die erste Übereinstimmung gilt, ist bei Firewalls ein häufiger Fehler.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zwölf Fehlerzeilen in Skripten und Konfigurationsdateien aufgespürt: fehlende Anführungszeichen, Zahlen- statt Textvergleich, zu weite Dateirechte, Off-by-one und eine endlose Schleife, fehlende Fehlerbehandlung, verletzte Idempotenz, den falschen Variablenbereich, eingeschleuste Befehle, ein fehlendes Semikolon sowie falsche Regelreihenfolge und Kennwort-Anmeldung in der Konfiguration. Wer Skripte und Konfigurationen vor dem Einsatz mit Syntaxprüfung und Testlauf prüft, findet solche Fehler, bevor sie im Betrieb Schaden anrichten.",
};
