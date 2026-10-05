import type { PhishingPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Phishing-Detektiv: E-Mails im IT-Alltag" für die Fachinformatiker/in-Kurse
 * (acht E-Mails mit steigender Schwierigkeit: fünf Phishing-Mails und drei echte Mails).
 *
 * Alle Adressen und Domains sind fiktiv bzw. reserviert (.example, .test); es werden keine realen
 * Marken oder Firmen nachgeahmt. Die legitimen Mails stammen von der fiktiven „Brevanta IT-Systemhaus GmbH"
 * (brevanta-it.example) bzw. dem fiktiven Lieferanten „Lieferant Nord" (lieferant-nord.example).
 */
export const phishingItAlltag: PhishingPayload = {
  mails: [
    // 1 — Phishing, offensichtlich: „Ihre Bank" droht mit Kontosperrung
    {
      nummer: 1,
      istPhishing: true,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Ihre Bank Kundenservice <service@sicherheit-kontopruefung.test>",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Eine Bank schreibt von ihrer eigenen, bekannten Domain. Hier steht ein beliebiger Domainname wie „sicherheit-kontopruefung“, der zu keiner dir bekannten Bank gehört. Der Anzeigename lässt sich beliebig wählen, entscheidend ist die Adresse dahinter.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "!!! WICHTIG !!! Ihr Konto wird GESPERRT !!!",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Großbuchstaben, viele Ausrufezeichen und eine Drohung sollen Druck aufbauen. Seriöse Absender formulieren sachlich. Typisch für Phishing ist der Versuch, dich zu einer schnellen, unüberlegten Reaktion zu drängen.",
        },
        {
          id: "c",
          ort: "text",
          text: "Sehr geehrter Kunde,",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Die Anrede ist unpersönlich. Deine Bank kennt deinen Namen und spricht dich damit an. Eine unpersönliche Anrede ist allein kein Beweis, aber zusammen mit anderen Merkmalen ein deutliches Warnsignal.",
        },
        {
          id: "d",
          ort: "text",
          text: "wir haben ungewöhnliche Aktivitäten auf Ihrem Konto festgestellt. Wenn Sie Ihre Daten nicht innerhalb von 12 Stunden bestätigen, wird Ihr Konto dauerhaft gesperrt. Bitte schicken Sie uns dazu Ihre Kontonummer, PIN und TAN per Antwort auf diese Mail.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Zwei klassische Merkmale auf einmal. Erstens die Drohung mit einer kurzen Frist. Zweitens die Aufforderung, vertrauliche Zugangsdaten (PIN, TAN) per Mail zu senden. Banken fragen solche Daten niemals per E-Mail ab.",
        },
        {
          id: "e",
          ort: "text",
          text: "Mit freundlichen Grüßen\nIhr Kundenservice",
          verdaechtig: false,
          erklaerung:
            "Unauffällig: Eine höfliche Grußformel ist völlig normal. Sie sagt aber nichts über die Echtheit aus, denn Grußformeln und Signaturen lassen sich leicht kopieren.",
        },
        {
          id: "f",
          ort: "link",
          text: "Konto jetzt entsperren → https://kundenportal-sicher.test/entsperren",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Das sichtbare Linkziel gehört zu einer Fantasiedomain und nicht zur Bank. Prüfe das Ziel, bevor du klickst, indem du mit der Maus über den Link fährst. Im Zweifel rufst du die Webseite deiner Bank selbst über ein Lesezeichen oder durch Eintippen der Adresse auf.",
        },
      ],
      aufloesung:
        "Das ist Phishing. Die wichtigsten Merkmale: eine Absenderadresse, die nicht zur Bank gehört, ein Drohszenario mit kurzer Frist, die unpersönliche Anrede, die Abfrage von PIN und TAN per Mail und ein Link auf eine fremde Domain. Antworte nicht, klicke nicht auf den Link und gib keine Daten ein. Melde die Mail an die IT-Sicherheit oder deine Vorgesetzten und lösche sie anschließend.",
    },

    // 2 — echt: Newsletter mit Abmeldelink
    {
      nummer: 2,
      istPhishing: false,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Brevanta IT-Systemhaus <newsletter@brevanta-it.example>",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Domain brevanta-it.example ist die bekannte Domain des Systemhauses, bei dem du dich für den Newsletter angemeldet hast. Anzeigename und Adresse passen zusammen und es gibt keine Abweichungen oder Zusätze.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Dein Oktober-Newsletter: neue Workshops und Tipps zur Passwortsicherheit",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Dass im Betreff das Wort „Passwort“ vorkommt, ist kein Warnsignal. Verdächtig wäre erst, wenn jemand dein Passwort abfragt oder dich unter Druck setzt. Hier geht es nur um Tipps.",
        },
        {
          id: "c",
          ort: "text",
          text: "Hallo Jonas, im Oktober starten zwei neue Workshops: „Netzwerkgrundlagen“ am 21.10. und „Sicher im Homeoffice“ am 28.10. Die Details findest du auf unserer Webseite.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Persönliche Anrede und ein Inhalt, der zum abonnierten Newsletter passt. Es werden keine Zugangsdaten und keine Zahlungen verlangt.",
        },
        {
          id: "d",
          ort: "text",
          text: "Für den Workshop „Sicher im Homeoffice“ sind nur noch wenige Plätze frei. Melde dich am besten bis zum 14.10. an.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Eine Frist wirkt auf den ersten Blick wie Zeitdruck. Hier ist sie aber ein normaler Anmeldeschluss in der Werbung. Es gibt keine Drohung und keine negativen Folgen, wenn du nicht reagierst.",
        },
        {
          id: "e",
          ort: "text",
          text: "Du erhältst diese Mail, weil du dich für unseren Newsletter angemeldet hast. Viele Grüße, dein Brevanta-Team",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Seriöse Newsletter erklären, warum du die Mail bekommst, und bieten eine Abmeldemöglichkeit an. Das ist sogar gesetzlich vorgesehen.",
        },
        {
          id: "f",
          ort: "link",
          text: "Newsletter abbestellen → https://brevanta-it.example/newsletter/abmelden",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Das Linkziel liegt auf derselben Domain wie der Absender und der Linktext passt zum Ziel. Ein Abmeldelink in einem Newsletter ist üblich. Bei Spam-Mails von unbekannten Absendern solltest du ihn dagegen nicht anklicken, weil er bestätigt, dass deine Adresse aktiv ist.",
        },
      ],
      aufloesung:
        "Das ist eine echte Mail. Absenderdomain und Linkziel stimmen mit der bekannten Domain des Systemhauses überein, du hast den Newsletter selbst abonniert, und es werden weder Zugangsdaten noch Zahlungen verlangt. Die Frist ist ein normaler Anmeldeschluss. Trotzdem gilt: Im Zweifel gibst du die Adresse der Webseite selbst im Browser ein, statt dich blind auf Links zu verlassen.",
    },

    // 3 — Phishing: Paketdienst, Gebühr per Link
    {
      nummer: 3,
      istPhishing: true,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Paketdienst Zustellung <zustellung@paket-info-status.test>",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Der Name ist allgemein gehalten („Paketdienst“) und die Adresse stammt von einer Domain, die zu keinem dir bekannten Zustelldienst gehört. Echte Paketdienste schreiben von ihrer eigenen Firmendomain.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Ihr Paket konnte nicht zugestellt werden – Aktion erforderlich",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Solche Betreffzeilen gibt es auch in echten Zustellbenachrichtigungen. Wichtig ist, ob du überhaupt ein Paket erwartest, und vor allem, was in der Mail verlangt wird. Das entscheidet die Beurteilung.",
        },
        {
          id: "c",
          ort: "text",
          text: "Lieber Kunde,",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Eine unpersönliche Anrede, obwohl der Paketdienst deine Lieferung mit Empfängernamen führen müsste. Massenmails an unbekannte Empfänger verwenden häufig solche Floskeln.",
        },
        {
          id: "d",
          ort: "text",
          text: "Sendung: 4821-7730-19 | Zustellversuch: heute, 10:42 Uhr",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Eine Sendungsnummer und eine Uhrzeit sehen glaubwürdig aus, lassen sich aber leicht erfinden. Solche Details sind kein Beweis für die Echtheit.",
        },
        {
          id: "e",
          ort: "text",
          text: "Wir konnten Ihr Paket heute nicht zustellen. Für einen erneuten Zustellversuch ist eine Gebühr von 1,99 EUR zu zahlen. Andernfalls wird die Sendung an den Absender zurückgeschickt.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Du wirst unaufgefordert zu einer Zahlung per Link gedrängt und mit einer Folge bedroht. Seriöse Paketdienste verlangen für einen erneuten Zustellversuch keine Zahlung auf einer unbekannten Seite. Kleine Beträge sollen die Hemmschwelle senken, außerdem werden dabei oft Zahlungsdaten abgegriffen.",
        },
        {
          id: "f",
          ort: "link",
          text: "Gebühr jetzt bezahlen → https://paket-info-status.test/zahlen?ref=48217730",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Das Linkziel führt auf dieselbe Fantasiedomain wie die Absenderadresse und nicht auf die Webseite eines dir bekannten Paketdienstes. Eine Bezahlseite, die du über einen Link in einer unerwarteten Mail erreichst, ist ein typischer Weg, um Zahlungsdaten zu stehlen.",
        },
        {
          id: "g",
          ort: "text",
          text: "Ihr Zustellteam",
          verdaechtig: false,
          erklaerung:
            "Unauffällig: Eine knappe Grußformel ohne Angaben, die sich prüfen ließen. Sie ist weder verdächtig noch ein Echtheitsbeweis.",
        },
      ],
      aufloesung:
        "Das ist Phishing, ein sogenanntes „Paket-Phishing“. Die wichtigsten Merkmale: eine unbekannte Absenderdomain, die unpersönliche Anrede, die unaufgeforderte Gebührenforderung mit Androhung der Rücksendung und ein Link auf eine Bezahlseite einer fremden Domain. Klicke nicht, zahle nichts und gib keine Zahlungsdaten ein. Wenn du ein Paket erwartest, rufst du die Sendungsverfolgung über die dir bekannte Webseite des Paketdienstes selbst auf. Melde die Mail an die IT-Sicherheit.",
    },

    // 4 — echt: interner IT-Helpdesk zum Wartungsfenster
    {
      nummer: 4,
      istPhishing: false,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "IT-Helpdesk Brevanta <helpdesk@brevanta-it.example>",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Absenderadresse nutzt exakt die Firmendomain brevanta-it.example, ohne Zusätze oder Buchstabendreher. Der Helpdesk ist dir als Absender bekannt.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Wartungsfenster am Samstag: E-Mail und Dateiserver zeitweise nicht erreichbar",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Eine sachliche Ankündigung ohne Drohung und ohne Aufforderung, Zugangsdaten preiszugeben. Geplante Wartungen werden üblicherweise vorab per Rundmail mitgeteilt.",
        },
        {
          id: "c",
          ort: "text",
          text: "Hallo zusammen,",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Eine Sammelanrede ist bei einer Rundmail an alle Beschäftigten ganz normal. Anders als bei einer angeblichen Einzelfall-Mail ist hier gar kein persönlicher Bezug zu erwarten.",
        },
        {
          id: "d",
          ort: "text",
          text: "am Samstag, 10.10., zwischen 22:00 und 02:00 Uhr spielen wir Updates auf den Mailserver und den Dateiserver ein. In dieser Zeit sind beide Dienste nicht erreichbar. Bitte speichere offene Dateien bis Samstag, 18:00 Uhr, und schließe die Anwendungen.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Mail enthält eine konkrete Bitte mit Termin. Das wirkt auf den ersten Blick wie eine Handlungsaufforderung, ist aber eine praktische Hilfe und keine Drohung. Es werden keine Zugangsdaten verlangt und es drohen keine Folgen.",
        },
        {
          id: "e",
          ort: "text",
          text: "Wir fragen dich im Zusammenhang mit der Wartung nie nach deinem Kennwort. Wenn dich jemand angeblich im Auftrag des Helpdesks danach fragt, melde dich bitte bei uns.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Ein ausdrücklicher Hinweis, dass Zugangsdaten nicht abgefragt werden, entspricht den Empfehlungen zur Sensibilisierung für Phishing. Er passt zu einem seriösen Absender.",
        },
        {
          id: "f",
          ort: "link",
          text: "Details im Intranet → https://intranet.brevanta-it.example/wartung/2026-10",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Das Linkziel ist eine Unterseite der Firmendomain brevanta-it.example, die die Absenderadresse ebenfalls verwendet. Eine Subdomain wie „intranet.“ links davon gehört dem Domaininhaber. Zusätzliche Sicherheit gibt dir, wenn du die Adresse selbst eintippst oder das Intranet über dein Lesezeichen öffnest.",
        },
        {
          id: "g",
          ort: "text",
          text: "Viele Grüße, dein IT-Helpdesk (Tel. 100)",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Durchwahl führt zum bekannten internen Helpdesk. Bei Unsicherheit rufst du dort an, aber immer unter einer Nummer, die du bereits kennst. Nicht unter einer Nummer, die erst in einer fraglichen Mail steht.",
        },
      ],
      aufloesung:
        "Das ist eine echte Mail. Die Absenderdomain stimmt exakt mit der Firmendomain überein, die Sammelanrede passt zu einer Rundmail, das Linkziel liegt auf der Firmendomain, und es wird weder ein Kennwort verlangt noch gedroht. Die Frist ist eine praktische Bitte zur Wartung. Trotzdem ist Vorsicht sinnvoll: Im Zweifel öffnest du das Intranet über dein Lesezeichen oder rufst beim Helpdesk unter der dir bekannten Nummer an.",
    },

    // 5 — Phishing: Rechnung mit Doppel-Endung .pdf.exe
    {
      nummer: 5,
      istPhishing: true,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Büroversand Hansen Rechnungswesen <hansen.rechnung@freemail-postfach.example>",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Eine Firma schickt Rechnungen von ihrer eigenen Firmendomain und nicht von einer allgemeinen Freemail-Adresse. Der Anzeigename klingt seriös, die Adresse dahinter passt aber nicht dazu.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Rechnung Nr. 2026-10443, zahlbar bis 09.10.",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Ein sachlicher Betreff, wie er bei Rechnungen üblich ist. Entscheidend ist, ob die Rechnung zu einer dir bekannten Bestellung gehört und was in der Mail und im Anhang verlangt wird.",
        },
        {
          id: "c",
          ort: "text",
          text: "Guten Tag,",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Rechnungen gehen oft an allgemeine Postfächer, eine neutrale Anrede ist dort nicht ungewöhnlich. Allein darauf solltest du dein Urteil nicht stützen.",
        },
        {
          id: "d",
          ort: "text",
          text: "anbei erhalten Sie die Rechnung über 1.249,00 EUR für Ihre Bestellung vom 17.09. Bitte überweisen Sie den Betrag bis zum 09.10.",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Ein üblicher Rechnungstext. Gerade das macht diesen Angriff gefährlich, denn Rechnungsmails wirken alltäglich. Du solltest prüfen, ob du tatsächlich eine Bestellung bei dieser Firma ausgelöst hast.",
        },
        {
          id: "e",
          ort: "text",
          text: "Falls beim Öffnen des Dokuments eine Sicherheitswarnung erscheint, bestätigen Sie diese bitte mit „Ausführen“, damit die Rechnung vollständig angezeigt wird.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Eine Rechnung braucht keine Freigabe von Sicherheitswarnungen. Wer dich auffordert, Warnungen zu ignorieren oder etwas auszuführen, will Schutzmechanismen umgehen. Ein Dokument, das angezeigt werden soll, wird nicht „ausgeführt“.",
        },
        {
          id: "f",
          ort: "text",
          text: "Mit freundlichen Grüßen\nRechnungswesen",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Eine kurze Grußformel ohne konkrete Angaben. Sie lässt sich leicht fälschen und beweist nichts. Dass keine Ansprechperson und keine Kontaktdaten genannt sind, ist allerdings nicht beruhigend.",
        },
        {
          id: "g",
          ort: "anhang",
          text: "Rechnung_2026-10443.pdf.exe",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Das ist eine ausführbare Datei (.exe) mit einem vorgetäuschten Dokumentnamen davor (Doppel-Endung). Weil Windows bekannte Dateiendungen standardmäßig ausblendet, würde dir nur „Rechnung_2026-10443.pdf“ angezeigt. Eine echte PDF-Datei endet auf .pdf und nicht auf .exe.",
        },
      ],
      aufloesung:
        "Das ist Phishing mit Schadsoftware im Anhang. Die wichtigsten Merkmale: Eine Firma schreibt von einer Freemail-Adresse, der Anhang hat die Doppel-Endung .pdf.exe und du sollst Sicherheitswarnungen bestätigen. Öffne den Anhang nicht, antworte nicht und leite die Mail nicht weiter. Melde sie der IT-Sicherheit. Dort wird sie geprüft. Wenn du mit der Firma wirklich Geschäfte machst, fragst du unter einer dir bekannten Telefonnummer nach. Zusätzlich kannst du die Anzeige von Dateiendungen im Explorer aktivieren.",
    },

    // 6 — echt: Terminbestätigung eines Lieferanten mit PDF-Anhang
    {
      nummer: 6,
      istPhishing: false,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Lena Brandt, Lieferant Nord GmbH <l.brandt@lieferant-nord.example>",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Absender ist die dir bekannte Ansprechpartnerin, und die Domain lieferant-nord.example entspricht der Firmendomain des Lieferanten, mit dem du schon schreibst. Name und Adresse sind stimmig.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Terminbestätigung: Lieferung und Einrichtung der Switches am 14.10.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Der Betreff bezieht sich auf eine konkrete Vereinbarung, die du erwartest, und enthält keine Drohung oder Dringlichkeit.",
        },
        {
          id: "c",
          ort: "text",
          text: "Guten Tag Herr Maurer,",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Eine persönliche, förmliche Anrede mit dem richtigen Namen. Das allein beweist keine Echtheit, passt hier aber zum restlichen Bild einer laufenden Geschäftsbeziehung.",
        },
        {
          id: "d",
          ort: "text",
          text: "wie gestern telefonisch besprochen, bestätigen wir den Termin: Lieferung von 12 Switches am Mittwoch, 14.10.2026, zwischen 8 und 12 Uhr an Ihr Lager. Bitte bestätigen Sie den Termin bis morgen, 12 Uhr, damit wir die Fahrer einplanen können.",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Mail knüpft an ein Telefonat an, das du kennst, und die Bitte um Bestätigung mit Frist ist in der Lieferplanung üblich. Es gibt keine Drohung und keine Abfrage von Zugangsdaten oder Zahlungsdaten.",
        },
        {
          id: "e",
          ort: "link",
          text: "Lieferstatus ansehen → https://lieferant-nord.example/sendung/48213",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Das Linkziel liegt auf der Domain des Lieferanten, die auch die Absenderadresse nutzt. Wenn du dich trotzdem absichern willst, öffnest du die Webseite des Lieferanten selbst und suchst dort die Sendung.",
        },
        {
          id: "f",
          ort: "text",
          text: "Mit freundlichen Grüßen\nLena Brandt, Disposition, Lieferant Nord GmbH, Tel. 0123 456789",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Die Signatur enthält Name, Funktion und Telefonnummer. Du kannst sie mit den bekannten Daten aus früheren Kontakten abgleichen. Rufe im Zweifel unter der dir bereits bekannten Nummer an.",
        },
        {
          id: "g",
          ort: "anhang",
          text: "Terminbestaetigung_Lieferung_2026-10-14.pdf",
          verdaechtig: false,
          erklaerung:
            "Unbedenklich: Der Anhang wurde erwartet, der Dateiname passt zum Inhalt und die Endung ist eine einfache .pdf ohne Doppel-Endung. Völlige Sicherheit gibt es dennoch nicht, deshalb gehören auch solche Anhänge in ein aktuelles System mit Virenschutz. Im Zweifel fragst du beim Absender nach.",
        },
      ],
      aufloesung:
        "Das ist eine echte Mail. Du kennst die Ansprechpartnerin und das Telefonat, die Absenderdomain und das Linkziel passen zum Lieferanten, der Anhang war zu erwarten und hat eine unauffällige Endung. Die Frist zur Bestätigung ist in der Lieferplanung normal. Trotzdem bleibt Vorsicht richtig: Klicke Links nicht blind an, öffne Anhänge nur in einer aktuellen, geschützten Umgebung und frage bei Auffälligkeiten telefonisch unter der dir bekannten Nummer nach.",
    },

    // 7 — Phishing: gefälschte Kennwortablauf-Mail, ähnliche Fantasiedomain
    {
      nummer: 7,
      istPhishing: true,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "IT-Support Brevanta <support@brevanta-it-support.example>",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Der Anzeigename sieht vertraut aus, aber die Domain brevanta-it-support.example ist nicht die Firmendomain brevanta-it.example. Der Zusatz „-support“ macht aus ihr eine ganz andere Domain, die jeder registrieren kann. Solche ähnlich aussehenden Domains sind ein Standardtrick.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Kennwortablauf: Bitte jetzt aktualisieren",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Auch echte IT-Abteilungen verschicken Hinweise zu Kennwörtern. Ein solcher Betreff reicht allein nicht für ein Urteil. Entscheidend ist, was die Mail dann von dir verlangt.",
        },
        {
          id: "c",
          ort: "text",
          text: "Hallo Jonas,",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Die Anrede ist persönlich. Das ist aber kein Echtheitsbeweis, denn Namen und Mailadressen von Beschäftigten sind für Angreifer leicht zu beschaffen, zum Beispiel aus der Webseite oder aus früheren Datenlecks.",
        },
        {
          id: "d",
          ort: "text",
          text: "dein Kennwort läuft in 24 Stunden ab. Wenn du es nicht rechtzeitig aktualisierst, wird dein Konto gesperrt und du kannst nicht mehr auf E-Mails und Dateien zugreifen.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Eine Frist von 24 Stunden und die Drohung mit einer Kontosperrung sollen Druck erzeugen. Dahinter steht der Wunsch, dass du schnell und ohne Nachdenken klickst. Bei Unsicherheit fragst du auf einem bekannten Weg beim echten Helpdesk nach.",
        },
        {
          id: "e",
          ort: "text",
          text: "Klicke dazu auf den Link und gib auf der Seite dein aktuelles Kennwort und dein neues Kennwort ein.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Dein aktuelles Kennwort wird über einen Link abgefragt. Seriöse IT-Abteilungen verlangen Kennwörter weder per Mail noch über eingebettete Links. Eine Kennwortänderung machst du in dem System selbst, das du über deinen gewohnten Weg öffnest.",
        },
        {
          id: "f",
          ort: "link",
          text: "Kennwort jetzt aktualisieren → https://login.brevanta-it-support.example/kennwort",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Das sichtbare Linkziel führt auf dieselbe nachgemachte Domain wie die Absenderadresse, nicht auf die Domain brevanta-it.example. Die Anmeldeseite sieht vermutlich echt aus, liest aber deine Eingaben mit. Rufe die Anmeldeseite stattdessen über dein Lesezeichen auf.",
        },
        {
          id: "g",
          ort: "text",
          text: "Dein IT-Support-Team",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Eine knappe Grußformel, die niemand prüfen kann. Signaturen und Logos lassen sich ohne Aufwand kopieren und sind deshalb kein Echtheitsbeweis.",
        },
      ],
      aufloesung:
        "Das ist Phishing. Die wichtigsten Merkmale: eine Absenderdomain, die der Firmendomain nur ähnlich sieht, die Drohung mit Kontosperrung nach 24 Stunden, die Abfrage des aktuellen Kennworts über einen Link und ein Linkziel auf dieselbe nachgemachte Domain. Die persönliche Anrede macht die Mail nicht echt. Klicke nicht auf den Link und gib nichts ein. Melde die Mail an die IT-Sicherheit. Wenn du bereits etwas eingegeben hast, ändere dein Kennwort sofort über den gewohnten Weg und informiere die IT.",
    },

    // 8 — Phishing: CEO-Fraud / Vorstandsanweisung mit Dringlichkeit
    {
      nummer: 8,
      istPhishing: true,
      elemente: [
        {
          id: "a",
          ort: "absender",
          text: "Dr. Katrin Vogel (Geschäftsführung) <k.vogel@brevanta-it.example-konto.test>",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Name und Funktion sind echt wirkend, aber die Domain lautet example-konto.test. „brevanta-it“ steht hier nur als frei wählbare Subdomain davor, die der Domaininhaber beliebig anlegen kann. Die eigentliche Domain liest du von rechts: zuerst die Endung, dann der Name davor.",
        },
        {
          id: "b",
          ort: "betreff",
          text: "Kurze Rückmeldung bitte",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Ein knapper, harmlos klingender Betreff, wie ihn auch Vorgesetzte verwenden. Gerade gezielte Angriffe vermeiden auffällige Betreffzeilen, damit die Mail nicht gleich ins Auge sticht.",
        },
        {
          id: "c",
          ort: "text",
          text: "Hallo Jonas,",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Die Anrede ist persönlich und wirkt vertraut. Bei gezielten Angriffen („Spear-Phishing“) recherchieren die Täter Namen und Funktionen im Vorfeld, daher beweist sie nichts.",
        },
        {
          id: "d",
          ort: "text",
          text: "ich sitze bis heute Abend in einem Termin und bin telefonisch nicht erreichbar. Wir müssen heute noch eine Überweisung über 18.400 EUR an einen neuen Dienstleister freigeben. Die Kontodaten schicke ich dir gleich. Bitte veranlasse die Zahlung bis 15 Uhr.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Das ist die typische Struktur von CEO-Fraud: eine hohe Summe, ein neuer Empfänger, eine knappe Frist und die Begründung, warum du nicht nachfragen kannst. Dieser Zeitdruck soll verhindern, dass du den üblichen Freigabeprozess einhältst.",
        },
        {
          id: "e",
          ort: "text",
          text: "Das Ganze ist streng vertraulich. Sprich bitte mit niemandem darüber, auch nicht mit der Buchhaltung, und antworte nur auf diese Mail.",
          verdaechtig: true,
          erklaerung:
            "Verdächtig: Du sollst Kolleg:innen und Kontrollen umgehen und nur über diesen Kanal kommunizieren. Das Ziel ist, dass niemand den Betrug bemerkt. Vorgesetzte würden das Vier-Augen-Prinzip und die Buchhaltung nicht ausschließen.",
        },
        {
          id: "f",
          ort: "text",
          text: "Viele Grüße, Katrin\nGesendet von meinem Smartphone",
          verdaechtig: false,
          erklaerung:
            "Für sich genommen unauffällig: Der Smartphone-Hinweis ist weit verbreitet. Er wird aber auch gern genutzt, um Kürze und fehlende Details zu erklären. Eine Signatur lässt sich leicht nachbauen und ist daher kein Echtheitsbeweis.",
        },
      ],
      aufloesung:
        "Das ist Phishing in der Form von CEO-Fraud (Vorstandsanweisung). Die wichtigsten Merkmale: eine Absenderdomain, die nur mit „brevanta-it“ beginnt und in Wahrheit auf example-konto.test endet, hoher Zeitdruck, eine ungewöhnliche Zahlung an einen neuen Empfänger und die Aufforderung zur Geheimhaltung. Führe die Zahlung nicht aus und antworte nicht. Melde die Mail an die IT-Sicherheit und rufe die Geschäftsführung unter einer dir bekannten Nummer an. Wichtig: Bei Zahlungen gilt immer der festgelegte Freigabeprozess, auch bei vermeintlichen Anweisungen von ganz oben.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast acht E-Mails geprüft, drei echte und fünf Phishing-Mails. Achte immer auf die Absenderadresse (die Domain, nicht den Anzeigenamen), auf das tatsächliche Linkziel, auf Druck, Drohungen und Fristen, auf unpersönliche Anreden und Rechtschreibung sowie auf unerwartete Anhänge mit Doppel-Endungen. Gib Zugangsdaten nie per Mail oder über Links preis. Im Zweifel fragst du auf einem bekannten Weg nach und meldest verdächtige Mails an die IT-Sicherheit.",
};
