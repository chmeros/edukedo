import type { InstrumentLernpfadPayload } from "@edukedo/shared";

/**
 * F-168: Instrumenten-Lernpfad "Schutzziele der IT-Sicherheit" (Vertraulichkeit, Integrität, Verfügbarkeit,
 * Authentizität) für den Kurs Fachinformatiker/in, Fallbeispiel Brevanta IT-Systemhaus GmbH. Fachliche Grundlage:
 * `content/fachinformatiker-anwendungsentwicklung/fu6/6.1-it-sicherheit-bedrohungsszenarien.md` (Theorie und die
 * Zuordnungsfragen "Schutzziele der IT-Sicherheit"). Struktur und Feedback-Stil folgen dem BSC-Referenzpfad
 * (`instrument-lernpfad-bsc-nordstern.ts`). Bewusst nur eindeutig einem Schutzziel zuordenbare Vorfälle und Maßnahmen;
 * Grenzfälle (z. B. digitale Signatur, Man-in-the-Middle als Ganzes, Verbindlichkeit) werden nicht abgefragt.
 */
export const schutzzieleBrevantaLernpfad: InstrumentLernpfadPayload = {
  organisation: "Brevanta IT-Systemhaus GmbH",
  vision:
    "Wir schützen die Systeme und Daten unserer Kundschaft verlässlich: vertraulich, unverfälscht, jederzeit nutzbar und von nachprüfbar echten Absendern.",
  fallbeispielIntro:
    "Ich arbeite mit dem fiktiven Unternehmen Brevanta IT-Systemhaus GmbH. Es hat rund 220 Beschäftigte und arbeitet in vier Bereichen: Softwareentwicklung für Kunden, Systemintegration und Managed Services, Datenanalyse sowie IoT-Vernetzung. Zu den Kunden gehört die Sonnenhof Apotheken KG. Gemeinsam mit dem Sicherheitsteam um Lena, Tarek und Jonas ordne ich Sicherheitsvorfälle ein, zum Beispiel einen Verschlüsselungstrojaner auf einem Dateiserver, einen falsch versendeten Kundenexport oder manipulierte Messwerte. Alle Vorfälle sind erfunden und dienen nur zum Üben.",
  stationsnamen: {
    grundlagenfragen: "Grundlagen",
    strukturErkennen: "Schutzziele erkennen",
    zieleZuordnen: "Vorfälle zuordnen",
    messbareZieleZuordnen: "Zuordnen vertiefen",
    massnahmenWahl: "Maßnahmen wählen",
    zusammenhaenge: "Zusammenhänge",
    wirkungsketten: "Abläufe sortieren",
  },

  grundlagenfragen: {
    intro:
      'Ich sehe eine Frage nach der anderen. Oben steht zum Beispiel „Frage 1 von 3". Nach meiner Auswahl tippe ich auf „Antwort prüfen". Wenn meine Antwort noch nicht passt, lese ich eine Erklärung und kann erneut wählen.',
    questions: [
      {
        prompt: "Was bedeutet das Schutzziel Vertraulichkeit? Wähle genau eine Antwort.",
        options: [
          {
            text: "Nur Berechtigte dürfen Informationen einsehen.",
            isCorrect: true,
            feedback: "Genau! Vertraulichkeit schützt Informationen davor, dass Unbefugte sie lesen können.",
          },
          {
            text: "Daten bleiben korrekt und werden nicht unbemerkt verändert.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Das beschreibt die Integrität. Versuch es gern noch einmal.",
          },
          {
            text: "Systeme und Daten stehen bei Bedarf zur Verfügung.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das beschreibt die Verfügbarkeit. Schau dir die übrigen Antworten in Ruhe an.",
          },
          {
            text: "Die Echtheit einer Person oder Nachricht lässt sich nachprüfen.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Das beschreibt die Authentizität.",
          },
        ],
      },
      {
        prompt:
          'Ich lese im Handbuch des Sicherheitsteams von Brevanta: „Eine Ransomware-Attacke trifft vor allem die Verfügbarkeit." Ist diese Aussage wahr oder falsch?',
        options: [
          {
            text: "Wahr",
            isCorrect: true,
            feedback:
              "Genau! Ransomware verschlüsselt Daten und fordert Lösegeld für die Entschlüsselung. Die Daten sind dann nicht mehr nutzbar, also steht der Verlust der Verfügbarkeit im Vordergrund.",
          },
          {
            text: "Falsch",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Die verschlüsselten Daten lassen sich nicht mehr nutzen. Deshalb gilt Ransomware vor allem als Angriff auf die Verfügbarkeit. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        prompt: "Welche zwei Beispiele verletzen das Schutzziel Integrität? Wähle genau zwei Antworten.",
        options: [
          {
            text: "Die Messwerte einer Maschine werden manipuliert.",
            isCorrect: true,
            feedback: "Genau! Die Daten stimmen dann nicht mehr mit der Wirklichkeit überein, sie wurden unberechtigt verändert.",
          },
          {
            text: "In einer Rechnung wird unbemerkt die Kontonummer verändert.",
            isCorrect: true,
            feedback: "Genau! Der Inhalt der Rechnung wurde verändert, ohne dass es auffiel.",
          },
          {
            text: "Ein Hardware-Ausfall legt einen Server lahm.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ein Ausfall betrifft die Verfügbarkeit: Die Daten sind nicht erreichbar, aber nicht verändert.",
          },
          {
            text: "Gestohlene Zugangsdaten verschaffen Fremden Zugriff auf Informationen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Fremde, die Informationen einsehen können, verletzen die Vertraulichkeit.",
          },
        ],
      },
    ],
  },

  strukturErkennen: {
    prompt:
      "Welche vier Begriffe sind Schutzziele der IT-Sicherheit, wie wir sie bei Brevanta betrachten? Ziehe die passenden Begriffe in die freien Felder.",
    rounds: [
      {
        correctCount: 4,
        items: [
          { text: "Vertraulichkeit", correct: true, feedback: "Genau, dieses Schutzziel gehört dazu." },
          {
            text: "Wirtschaftlichkeit",
            correct: false,
            feedback:
              "Die Kosten einer Maßnahme sollte Brevanta im Blick behalten. Wirtschaftlichkeit ist aber kein Schutzziel der Informationssicherheit.",
          },
          { text: "Integrität", correct: true, feedback: "Genau, dieses Schutzziel gehört dazu." },
          {
            text: "Benutzerfreundlichkeit",
            correct: false,
            feedback:
              "Eine gute Bedienbarkeit ist bei Software wichtig. Sie ist aber eine Qualitätseigenschaft und kein Schutzziel.",
          },
          { text: "Verfügbarkeit", correct: true, feedback: "Genau, dieses Schutzziel gehört dazu." },
          {
            text: "Skalierbarkeit",
            correct: false,
            feedback:
              "Skalierbarkeit beschreibt, wie ein System mit wachsender Last umgehen kann. Das ist eine technische Eigenschaft, kein Schutzziel.",
          },
          { text: "Authentizität", correct: true, feedback: "Genau, dieses Schutzziel gehört dazu." },
          {
            text: "Wartbarkeit",
            correct: false,
            feedback:
              "Wartbarkeit beschreibt, wie leicht sich Software ändern lässt. Das ist eine Qualitätseigenschaft, kein Schutzziel.",
          },
        ],
      },
    ],
  },

  zieleZuordnen: {
    prompt: "Welches Schutzziel wurde bei diesen Vorfällen hauptsächlich verletzt? Ziehe jeden Vorfall unter das passende Schutzziel.",
    zones: [
      { key: "vertraulichkeit", label: "Vertraulichkeit" },
      { key: "integritaet", label: "Integrität" },
      { key: "verfuegbarkeit", label: "Verfügbarkeit" },
      { key: "authentizitaet", label: "Authentizität" },
    ],
    items: [
      { text: "Der Kundenexport der Sonnenhof Apotheken KG wird versehentlich an einen externen Verteiler geschickt.", zoneKey: "vertraulichkeit" },
      { text: "Ein Angreifer liest im offenen WLAN eines Kunden den Datenverkehr mit.", zoneKey: "vertraulichkeit" },
      { text: "Die Messwerte einer vernetzten Anlage werden nachträglich von Unbefugten verändert.", zoneKey: "integritaet" },
      { text: "In einer Rechnungs-E-Mail wird auf dem Übertragungsweg unbemerkt die Kontonummer ausgetauscht.", zoneKey: "integritaet" },
      { text: "Ein Verschlüsselungstrojaner legt den Dateiserver der Sonnenhof Apotheken KG lahm, niemand kann mehr arbeiten.", zoneKey: "verfuegbarkeit" },
      { text: "Ein DDoS-Angriff macht das Kundenportal für Stunden unerreichbar.", zoneKey: "verfuegbarkeit" },
      { text: "Eine Phishing-Mail gibt sich mit gefälschtem Absender als Geschäftsführer aus.", zoneKey: "authentizitaet" },
      { text: "Ein Anrufer gibt sich bei der Hotline als Geschäftsführer des Kunden aus, seine Identität lässt sich nicht prüfen.", zoneKey: "authentizitaet" },
    ],
    correctFeedback: "Genau, dieser Vorfall verletzt hauptsächlich dieses Schutzziel.",
    wrongFeedback:
      "Der Vorfall passt noch besser zu einem anderen Schutzziel. Frage dich: Wurde etwas eingesehen, verändert, unerreichbar gemacht oder war die Echtheit fraglich?",
  },

  messbareZieleZuordnen: {
    prompt: "Welches Schutzziel steht bei diesem Vorfall oder dieser Maßnahme im Vordergrund? Ordne die angezeigten Aussagen zu.",
    zones: [
      { key: "vertraulichkeit", label: "Vertraulichkeit" },
      { key: "integritaet", label: "Integrität" },
      { key: "verfuegbarkeit", label: "Verfügbarkeit" },
      { key: "authentizitaet", label: "Authentizität" },
    ],
    kernAnzahlProZone: 3,
    rundengroesse: 4,
    correctFeedback: "Genau. Bei dieser Aussage steht dieses Schutzziel im Vordergrund.",
    wrongFeedback:
      "Das passt hier noch nicht. Überlege, was im Vordergrund steht: unbefugte Einsicht, unbemerkte Veränderung, ein Ausfall oder Zweifel an der Echtheit.",
    pool: [
      { text: "Die Festplatte im Firmenlaptop eines Vertriebsmitarbeiters wird verschlüsselt.", zoneKey: "vertraulichkeit" },
      { text: "Zugriffsrechte werden nach dem Need-to-know-Prinzip vergeben.", zoneKey: "vertraulichkeit" },
      { text: "Ein ungeschützter Datenbank-Export ist ohne Anmeldung abrufbar.", zoneKey: "vertraulichkeit" },
      { text: "Entwicklungsunterlagen eines Kunden dürfen nicht an Wettbewerber gelangen.", zoneKey: "vertraulichkeit" },
      { text: "Kundendaten der Apotheke dürfen nur vom zuständigen Personal eingesehen werden.", zoneKey: "vertraulichkeit" },
      { text: "Ein Angreifer liest unbemerkt die Kommunikation zwischen zwei Systemen mit.", zoneKey: "vertraulichkeit" },
      { text: "Eine Kundenliste landet versehentlich bei einem unbeteiligten externen Empfänger.", zoneKey: "vertraulichkeit" },

      { text: "Der Hashwert einer heruntergeladenen Installationsdatei wird mit der Angabe des Herstellers verglichen.", zoneKey: "integritaet" },
      { text: "Datenbanktransaktionen und Constraints verhindern inkonsistente Datensätze.", zoneKey: "integritaet" },
      { text: "Messwerte einer IoT-Anlage werden von Unbefugten nachträglich verändert.", zoneKey: "integritaet" },
      { text: "Rechnungsbeträge dürfen nach der Freigabe nicht mehr verändert werden können.", zoneKey: "integritaet" },
      { text: "Archivierte Verträge sollen über Jahre unverändert vorliegen.", zoneKey: "integritaet" },
      { text: "Preise in der Artikeldatenbank eines Kunden werden unbemerkt überschrieben.", zoneKey: "integritaet" },
      { text: "Auf dem Übertragungsweg wird in einer Rechnungs-E-Mail unbemerkt die Kontonummer ausgetauscht.", zoneKey: "integritaet" },

      { text: "Redundante Server übernehmen bei einem Ausfall automatisch den Betrieb (Failover).", zoneKey: "verfuegbarkeit" },
      { text: "Ein Backup wird regelmäßig angelegt und die Wiederherstellung getestet.", zoneKey: "verfuegbarkeit" },
      { text: "Ein DDoS-Angriff legt den Webshop eines Kunden für Stunden lahm.", zoneKey: "verfuegbarkeit" },
      { text: "Ransomware verschlüsselt den Dateiserver, sodass niemand mehr arbeiten kann.", zoneKey: "verfuegbarkeit" },
      { text: "Ein Hardware-Ausfall legt das Warenwirtschaftssystem eines Kunden lahm.", zoneKey: "verfuegbarkeit" },
      { text: "Das Zeiterfassungsterminal soll auch bei Netzstörungen weitgehend durchgehend laufen.", zoneKey: "verfuegbarkeit" },
      { text: "Der Onlineshop soll auch bei den Lastspitzen der Weihnachtszeit erreichbar bleiben.", zoneKey: "verfuegbarkeit" },

      { text: "Die Anmeldung am Administrationsportal erfolgt mit Zwei-Faktor-Authentifizierung.", zoneKey: "authentizitaet" },
      { text: "Ein Server weist sich beim Verbindungsaufbau per Zertifikat als der echte Server der Bank aus.", zoneKey: "authentizitaet" },
      { text: "Ein gefälschter Webauftritt gibt sich als Kundenportal des Kunden aus, Besucher können die Echtheit nicht erkennen.", zoneKey: "authentizitaet" },
      { text: "Eine Phishing-Mail täuscht einen falschen Absender vor, der sich als Vorgesetzter ausgibt.", zoneKey: "authentizitaet" },
      { text: "Fernwartungszugänge werden nur mit Passwort und Token als zweitem Faktor freigegeben.", zoneKey: "authentizitaet" },
      { text: "Vor einem Passwort-Reset ruft die Hotline unter der hinterlegten Nummer zurück, um die Person zu prüfen.", zoneKey: "authentizitaet" },
    ],
  },

  massnahmenWahl: {
    prompt: "Ziehe für jeden Vorfall die zwei passenden Maßnahmen in die freien Felder.",
    rounds: [
      {
        context:
          "Schutzziel Vertraulichkeit — Tarek bemerkt, dass ein Kundenexport der Sonnenhof Apotheken KG an einen externen Verteiler gelangt ist. Was verringert das Risiko, dass Unbefugte solche Daten einsehen?",
        correctCount: 2,
        items: [
          {
            text: "Exporte mit Kundendaten verschlüsselt ablegen und versenden.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Wer die Datei ohne Schlüssel in die Hände bekommt, kann sie nicht lesen.",
          },
          {
            text: "Den Zugriff auf Kundenexporte nach dem Need-to-know-Prinzip einschränken.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Nur wer die Daten für die Aufgabe braucht, darf sie einsehen.",
          },
          {
            text: "Die Exportdateien täglich sichern und die Wiederherstellung testen.",
            correct: false,
            feedback:
              "Das war leider noch nicht die passende Maßnahme. Eine getestete Datensicherung dient der Verfügbarkeit, sie verhindert nicht, dass Unbefugte Daten einsehen.",
          },
          {
            text: "Die Hashwerte der Exportdateien vergleichen, um Veränderungen zu erkennen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Hashwerte machen Veränderungen sichtbar. Das dient der Integrität, nicht der Vertraulichkeit.",
          },
        ],
      },
      {
        context:
          "Schutzziel Integrität — Jonas stellt fest, dass Messwerte einer vernetzten Anlage nachträglich verändert wurden. Was hilft, Veränderungen an Daten zu erkennen?",
        correctCount: 2,
        items: [
          {
            text: "Prüfwerte der Messwertdateien beim Empfang mit den Ausgangswerten vergleichen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Stimmt der Hashwert nicht überein, wurde die Datei verändert.",
          },
          {
            text: "Rechnungsdokumente digital signieren, damit Manipulationen erkennbar werden.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Eine digitale Signatur macht eine nachträgliche Änderung am Inhalt erkennbar.",
          },
          {
            text: "Die Festplatten der Arbeitsgeräte verschlüsseln.",
            correct: false,
            feedback:
              "Das war leider noch nicht die passende Maßnahme. Verschlüsselte Festplatten schützen vor unbefugter Einsicht bei Geräteverlust, das ist Vertraulichkeit.",
          },
          {
            text: "Den Messwertserver redundant auslegen, damit er bei Ausfall weiterläuft.",
            correct: false,
            feedback: "Das passt hier noch nicht. Redundanz sichert, dass der Dienst erreichbar bleibt. Sie erkennt keine Veränderungen an Daten.",
          },
        ],
      },
      {
        context:
          "Schutzziel Verfügbarkeit — Der Dateiserver fiel am Montag drei Stunden aus: Niemand bei Brevanta kam an die Projektdaten. Was sichert, dass Systeme und Daten bei Bedarf zur Verfügung stehen?",
        correctCount: 2,
        items: [
          {
            text: "Den Server redundant auslegen, sodass bei einem Ausfall automatisch ein zweiter übernimmt.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! So bleiben die Daten auch bei einem Ausfall erreichbar.",
          },
          {
            text: "Datensicherungen regelmäßig anlegen und die Wiederherstellung testen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Nach einem Verlust lassen sich die Daten wieder nutzbar machen.",
          },
          {
            text: "Die Anmeldung am Server mit Zwei-Faktor-Authentifizierung absichern.",
            correct: false,
            feedback:
              "Das war leider noch nicht die passende Maßnahme. Zwei-Faktor-Authentifizierung belegt die Echtheit der Identität und gehört zur Authentizität.",
          },
          {
            text: "Zugriffsrechte nach dem Need-to-know-Prinzip vergeben.",
            correct: false,
            feedback: "Das passt hier noch nicht. Restriktive Rechte schützen vor unbefugter Einsicht. Das ist Vertraulichkeit, kein Schutz vor Ausfällen.",
          },
        ],
      },
      {
        context:
          "Schutzziel Authentizität — Lena meldet einen Anruf bei der Hotline: Jemand gab sich als Geschäftsführer eines Kunden aus und wollte mit gespielter Dringlichkeit ein neues Passwort. Was hilft, die Echtheit einer Person nachzuprüfen?",
        correctCount: 2,
        items: [
          {
            text: "Bei ungewöhnlichen Anweisungen die Person unter der hinterlegten Nummer zurückrufen.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! So prüft Brevanta, ob die Person wirklich die ist, für die sie sich ausgibt.",
          },
          {
            text: "Fernwartungszugänge nur mit Mehrfaktor-Authentifizierung freigeben.",
            correct: true,
            feedback: "Ja, diese Maßnahme passt! Mehrere Faktoren belegen die Identität, auch wenn ein Passwort in falsche Hände geraten ist.",
          },
          {
            text: "Kundendaten verschlüsselt speichern.",
            correct: false,
            feedback:
              "Das war leider noch nicht die passende Maßnahme. Verschlüsselung schützt vor unbefugter Einsicht (Vertraulichkeit), sie prüft aber nicht, wer anruft.",
          },
          {
            text: "Daten der Datenbank mit Prüfsummen auf Veränderungen kontrollieren.",
            correct: false,
            feedback: "Das passt hier noch nicht. Prüfsummen erkennen Veränderungen an Daten. Das gehört zur Integrität.",
          },
        ],
      },
    ],
  },

  zusammenhaenge: {
    intro:
      'Ich beantworte fünf Multiple-Choice-Fragen nacheinander. Die Zahl der richtigen Antworten wird bei jeder Frage angezeigt. Fehlt eine passende Antwort, lese ich: „Eine passende Aussage fehlt noch. Prüfe, welches Schutzziel im Vordergrund steht."',
    questions: [
      {
        prompt: "Ein Verschlüsselungstrojaner legt den Dateiserver der Sonnenhof Apotheken KG lahm. Welche zwei Aussagen sind richtig?",
        options: [
          {
            text: "Primär ist das Schutzziel Verfügbarkeit verletzt.",
            isCorrect: true,
            feedback: "Genau. Die Daten sind nicht mehr nutzbar, im Vordergrund steht der Verlust der Verfügbarkeit.",
          },
          {
            text: "Ein regelmäßig getestetes Backup kann helfen, die Daten wieder nutzbar zu machen.",
            isCorrect: true,
            feedback: "Genau. Eine Datensicherung mit geprüfter Wiederherstellung dient der Verfügbarkeit.",
          },
          {
            text: "Vor allem die Vertraulichkeit ist verletzt, weil die Dateien verschlüsselt wurden.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Die Verschlüsselung durch die Angreifer verhindert den Zugriff der Beschäftigten. Im Vordergrund steht daher nicht die unbefugte Einsicht.",
          },
          {
            text: "Ein stärkeres Passwort auf dem Server hätte den Angriff sicher verhindert.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Ein einzelnes Passwort garantiert keinen Schutz vor Schadsoftware, deshalb kombiniert man mehrere Maßnahmen.",
          },
        ],
      },
      {
        prompt:
          "In einer Rechnungs-E-Mail wird auf dem Übertragungsweg unbemerkt die Kontonummer ausgetauscht. Welches Schutzziel ist verletzt? Wähle eine Antwort.",
        options: [
          {
            text: "Vertraulichkeit",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Hier hat niemand Informationen eingesehen, die er nicht sehen durfte. Der Inhalt wurde verändert.",
          },
          {
            text: "Integrität",
            isCorrect: true,
            feedback: "Genau. Der Inhalt wurde unbemerkt verändert, also ist die Integrität verletzt.",
          },
          {
            text: "Verfügbarkeit",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Die Rechnung kam an, nur eben mit falschem Inhalt. Ein Ausfall liegt nicht vor.",
          },
          {
            text: "Kein Schutzziel, weil die E-Mail zugestellt wurde.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Dass die Nachricht ankam, heißt nicht, dass ihr Inhalt unverändert blieb.",
          },
        ],
      },
      {
        prompt: "Lena fasst die Schutzziele für das Team zusammen. Welche drei Aussagen treffen zu?",
        options: [
          {
            text: "Vertraulichkeit bedeutet: Nur Berechtigte dürfen Informationen einsehen.",
            isCorrect: true,
            feedback: "Genau. So lautet die Kurzdefinition der Vertraulichkeit.",
          },
          {
            text: "Integrität bedeutet: Daten und Systeme bleiben korrekt und unverändert, soweit keine berechtigte Änderung erfolgt.",
            isCorrect: true,
            feedback: "Genau. Berechtigte Änderungen sind erlaubt, unbemerkte oder unberechtigte nicht.",
          },
          {
            text: "Authentizität bedeutet: Die Echtheit einer Person, eines Systems oder einer Nachricht ist nachprüfbar.",
            isCorrect: true,
            feedback: "Genau. Es geht darum, dass sich die Echtheit überprüfen lässt.",
          },
          {
            text: "Verfügbarkeit bedeutet: Alle Daten sind für alle Beschäftigten jederzeit offen zugänglich.",
            isCorrect: false,
            feedback:
              "Das war leider noch nicht richtig. Verfügbarkeit heißt, dass Systeme und Daten bei Bedarf zur Verfügung stehen, nicht, dass jede Person alles einsehen darf.",
          },
        ],
      },
      {
        prompt: "Jonas erklärt, dass Schutzziele in Konflikt geraten können. Welche zwei Aussagen sind richtig?",
        options: [
          {
            text: "Eine sehr restriktive Zugriffskontrolle stärkt die Vertraulichkeit, kann aber die Verfügbarkeit im Störungsfall einschränken.",
            isCorrect: true,
            feedback: "Genau. Je strenger der Zugriff geregelt ist, desto schwerer kommen im Notfall auch Berechtigte schnell an die Daten.",
          },
          {
            text: "Die Gewichtung der Schutzziele richtet sich nach dem konkreten System und dem Schutzbedarf der Daten.",
            isCorrect: true,
            feedback: "Genau. Bei Patientendaten steht eine andere Anforderung im Vordergrund als bei einem Onlineshop.",
          },
          {
            text: "Alle Schutzziele sind in jedem System gleich wichtig, eine Gewichtung muss nicht begründet werden.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Die Gewichtung hängt vom konkreten System und vom Schutzbedarf ab und sollte nachvollziehbar sein.",
          },
          {
            text: "Eine Maßnahme für ein Schutzziel kann die anderen Schutzziele nie beeinflussen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Gerade die Wechselwirkungen zwischen den Zielen sind in der Praxis wichtig.",
          },
        ],
      },
      {
        prompt: "Ein Angreifer schaltet sich unbemerkt in die Kommunikation zweier Partner und kann mitlesen oder verändern. Welche Schutzziele sind betroffen?",
        options: [
          {
            text: "Vertraulichkeit und Integrität",
            isCorrect: true,
            feedback: "Genau. Mitlesen berührt die Vertraulichkeit, Verändern die Integrität.",
          },
          {
            text: "Nur die Verfügbarkeit",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Der Angreifer legt hier nichts lahm, er liest mit oder ändert Inhalte.",
          },
          {
            text: "Verfügbarkeit und Integrität",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Beim Mitlesen ist die Vertraulichkeit betroffen. Ein Ausfall steht nicht im Vordergrund.",
          },
          {
            text: "Nur die Vertraulichkeit, weil Verändern nicht möglich ist",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Der Angreifer kann Inhalte auch verändern, damit ist zusätzlich die Integrität betroffen.",
          },
        ],
      },
    ],
  },

  wirkungsketten: {
    intro:
      "Ich sehe jeweils vier nummerierte freie Felder und gemischte Aussagen. Ich ziehe sie in die richtige Reihenfolge, vom Auslöser bis zur Wirkung.",
    tasks: [
      {
        prompt: "Auf einem Dateiserver eines Brevanta-Kunden wird Schadsoftware aktiv. Sortiere den Ablauf des Angriffs.",
        items: [
          "Ein Beschäftigter öffnet einen Mailanhang mit einem Trojaner.",
          "Die Schadsoftware verschlüsselt die Dateien auf dem Dateiserver.",
          "Die Beschäftigten können nicht mehr auf ihre Daten zugreifen.",
          "Das Schutzziel Verfügbarkeit ist verletzt.",
        ],
      },
      {
        prompt: "Tarek bereitet eine Risikoanalyse für den Dateiserver vor. Sortiere die Schritte in der üblichen Reihenfolge.",
        items: [
          "Zu schützende Werte und ihren Schutzbedarf erfassen.",
          "Bedrohungen und Schwachstellen ermitteln.",
          "Eintrittswahrscheinlichkeit und Schadenspotenzial einschätzen.",
          "Die Risiken priorisieren.",
        ],
      },
      {
        prompt: "Ein Angreifer täuscht eine falsche Identität vor. Sortiere den Ablauf des Phishing-Angriffs.",
        items: [
          "Eine gefälschte E-Mail gibt sich als Nachricht des Geschäftsführers aus.",
          "Ein Beschäftigter hält den Absender für echt.",
          "Der Beschäftigte gibt seine Zugangsdaten auf einer gefälschten Seite ein.",
          "Der Angreifer meldet sich mit den Zugangsdaten an.",
        ],
      },
      {
        prompt: "Eine Rechnung der Sonnenhof Apotheken KG wird manipuliert. Sortiere die Folge der Ereignisse.",
        items: [
          "Ein Angreifer schaltet sich unbemerkt in die Kommunikation.",
          "Der Angreifer tauscht die Kontonummer in der Rechnung aus.",
          "Die Empfängerin erhält die veränderte Rechnung ohne Auffälligkeit.",
          "Die Zahlung geht auf das falsche Konto.",
        ],
      },
    ],
  },

  selbsteinschaetzungPrompt:
    'Wie sicher fühlst du dich jetzt im Umgang mit den Schutzzielen der IT-Sicherheit? Wähle einen Wert von 0 bis 10. 0 bedeutet „gar nicht sicher", 5 „teils/teils" und 10 „sehr sicher".',
};
