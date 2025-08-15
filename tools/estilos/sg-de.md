# Styleguide von Segura für technisches Schreiben

Dieser Styleguide wurde entwickelt, um die Erstellung technischer Dokumentationen für **Segura** zu standardisieren und zu optimieren, wobei Klarheit, Konsistenz und Zugänglichkeit gewährleistet werden. Das Dokument behandelt empfohlene Praktiken für das Schreiben auf Portugiesisch und Englisch, Standardisierung der Terminologie, Textformatierung, Verwendung von Fett- und Kursivschrift, Dokumentstrukturierung, Codebeispiele und vieles mehr.

Darüber hinaus definiert dieser Styleguide, wie spezifische Inhalte wie Tutorials, Erklärungen, Referenzen und Anforderungslisten strukturiert werden sollen und bietet detaillierte Anleitungen zur effektiven Kommunikation technischer Informationen. Der Leitfaden enthält auch klare Regeln zu vermeidender Terminologie und priorisiert einen inklusiven und professionellen Ansatz, der an globale Standards für technische Dokumentation angepasst ist.

Dieses Dokument ist für alle Mitarbeiter unerlässlich, die für die Erstellung, Überprüfung und Wartung technischer Dokumentationen in der **Segura**-Umgebung verantwortlich sind.

## Verwendung von Artikeln

Für Portugiesisch verwenden Sie sowohl im Titel als auch bei der Bezugnahme auf das Produkt und/oder die Funktionalität im Text den entsprechenden Artikel.

**Zum Beispiel:**  
"Über Citrix".

## Terminologie für Englisch und Portugiesisch

- Verwenden Sie nicht "dieser Artikel", sondern "dieses Dokument" / "this document".
- Um sich auf die Schritte zu beziehen, die in der nummerierten Liste angegeben werden, verwenden Sie "(...) Schritte unten:"
- IN/ON:
    - "On Segura (...)".
    - "In the (side) menu (...)"
    - Warum? Weil es eine Anweisung ist, eine Option innerhalb des Menüs auszuwählen.
        - Bsp.: In the side menu, select **Credentials \> SSH keys**.

## Dokumenttitel

Verwenden Sie die folgenden Titel als Standard (je nach Dokument):

### Tutorial/How-To

#### **How To/Wie**

**Zum Beispiel:**  
"Wie man eine Anmeldeinformation in Segura registriert"

### Explanation/Erklärung

#### **About/Über**

**Zum Beispiel:**  
"Über den DevOps Secret Manager"

## Document vs. Documentation

### Document

Um sich auf das geschriebene Dokument zu beziehen, verwenden Sie keine Wörter wie Artikel, sondern immer Dokument.  
Ein Dokument ist das Stück Papier oder die Computerdatei, die die Informationen enthält. Es ist zählbar und auch ein Verb.  
**Bsp.:** Die Wissenschaftler dokumentierten die Laborexperimente, um die medizinischen Eigenschaften des Krauts zu beweisen.[^1]

### Documentation

Dokumentation ist die Handlung des Schreibens des Dokuments.  
Die Dokumentation ist der Akt des schriftlichen Festhaltens dieser Information.  
Sie wird häufig verwendet, um die Sammlung und Zusammenstellung von Informationen aus Studien oder Forschungen zu beschreiben. Sie ist NICHT zählbar und ist KEIN Verb.  
**Bsp.:** Dies ist nur ein Bericht, wo ist die Dokumentation für das gesamte Projekt?[^2]

## Callouts/Hinweiskästen

- Der Typ des Callouts (Info, Achtung, Warnung) sollte nicht fett sein.
- **Blauer Kasten:** niedrigste Aufmerksamkeitshierarchie. Prozesse oder Hinweise, die die Funktionsweise des Produkts nicht beeinträchtigen. Bewährte Praktiken, Vorschläge und andere Aktionen.
    - **Titel: Info/Info**  
        **Zum Beispiel:**  
        Info  
        Standardmäßig zeigt der Bericht 30 Einträge pro Bildschirm an. Um zum nächsten Bildschirm zu gelangen, klicken Sie auf die Vorwärts-Schaltfläche am Ende des Berichts.
            
- **Gelber Kasten:** mittlere Aufmerksamkeitshierarchie. Prozesse oder Hinweise, die die Funktionsweise des Produkts beeinträchtigen können, aber bei Nichtbeachtung die Nutzung nicht verhindern.
    - **Titel: Achtung/Attention**  
        **Zum Beispiel:**  
        Achtung  
        Die registrierten auditierten Befehle werden zu Beginn jeder Sitzung geladen. Wenn eine Sitzung bereits aktiv ist und ein neuer Befehl registriert wird, hat dieser keine Auswirkung auf die bereits begonnene Sitzung.

- **Roter Kasten:** höchste Aufmerksamkeitshierarchie. Prozesse oder Hinweise, die die Funktionsweise des Produkts beeinträchtigen, die Nutzung verhindern oder das Produkt blockieren/beschädigen werden.
    - **Titel: Warnung/Alert**  
        **Zum Beispiel:**  
        Warnung  
        Felder mit Sternchen sind Pflichtfelder.

## Fettschrift

Verwenden Sie Fettschrift in folgenden Situationen:

- Produktname.
    - Namen von Segura-Modulen.
    - Verwenden Sie niemals Fettschrift für andere Produkte oder Unternehmen.
        - Zum Beispiel: **Domum, DevOps Secret Manager, PAM Core** vs. Microsoft, Apple oder Apple Intelligence.
- Schaltflächen des Produkts/der Anwendung.
- Fenstertitel.
- Die Schritte des Registrierungs-/Bearbeitungsflusses im neuen Layout (4.0).
    - Verwenden Sie H3 für die Schritte.
    - **Zum Beispiel**: \#\#\# Schritt 1: Registrieren Sie die Anmeldeinformation. (H3)

## Kursivschrift

Verwenden Sie Kursivschrift in folgenden Situationen:

- Fremdwörter, die nicht Teil der Erklärung/des Produkts sind.
- Aufzählung von Optionen.
    - **Zum Beispiel**: die Optionen sind: *Ausstehend, Genehmigt* oder *Abgelehnt*.
        - Beachten Sie, dass wir die Konjunktion der Aufzählung nicht fett setzen sollten.

### Ausnahme

- Wenn es nur zwei Optionen gibt, wie zum Beispiel **Ja** oder **Nein**, verwenden Sie Fettschrift.

## Zahlen erwähnen

- Verwenden Sie immer die numerische Darstellung (0, 1, 2, 3), auch bei Werten unter zehn.

## Code fences

- Setzen Sie reservierte Wörter, Dateierweiterungen, Befehlszeilenparameter und ähnliches zwischen *Code Fences*.
    - **Zum Beispiel:** \`.jpg\`, \`.png\`.
- Quellcode.
    - Wenn es nur eine Zeile (Befehl, *Endpoint* oder anderer Typ) ist, verwenden Sie *Code Fence*; wenn es ein Codeblock ist, verwenden Sie Code Block.
- Befehlsausgaben.
- Verzeichnisidentifikation.
    - **Zum Beispiel**: `C:\Windows\Users\CapivaraSuicida`
- Tasteneingaben.
    - **Zum Beispiel**: Enter oder Delete

### Protokolle und technische Sprachen

Begriffe wie `TCP`, `UDP`, `SQL`, `HTTP` und `HTTPS` sollten zwischen *Code Fences* gesetzt werden, wenn sie verwendet werden als:

- Technischer Wert in Schnittstellenfeldern (z.B. bei der Auswahl eines Protokolltyps, einer Sprache oder eines Formats).
- Argument oder Parameter in Befehlen.
- Auswählbare Option in technischen Anweisungen.

#### Korrekte Beispiele für die Verwendung mit Code Fence:

- Wählen Sie TCP oder UDP im Feld Protokoll.
- Wählen Sie SQL als Skripttyp.
- Führen Sie den Befehl sqlcmd \-Q "SELECT \* FROM users" aus.

Verwenden Sie keine *Code Fence*, wenn die Begriffe nur beschreibend, konzeptionell oder einleitend erwähnt werden.

**Korrekte Beispiele für die Verwendung ohne Code Fence:**

- Das TCP-Protokoll ist verbindungsorientiert.
- Die SQL-Sprache wird zur Manipulation relationaler Daten verwendet.

## Aufzählungen

- Immer einen Punkt am Ende setzen, unabhängig davon, wie viele Wörter oder Verben der Satz enthält.

## Namen der Ordner/Kategorien

Immer im Singular und gemäß der Struktur wie unten:

- **EN**
    - **How-to guides**
    - **Explanation**
    - **Reference**
- **PT**
    - **Guias**
    - **Explicação**
    - **Referência**

## Wörter und Phrasen, die wir auf Portugiesisch und Englisch vermeiden sollten

Vermeiden Sie Jargon, lange Sätze und Wörter mit negativen Konnotationen. Vermeiden Sie Folgendes:

- **Erlauben (Allow)**: deutet darauf hin, dass wir uns in einer Machtposition befinden und Benutzern oder Kunden erlauben, bestimmte Aktivitäten durchzuführen.
- **Die Fähigkeit zu (The ability to)**: Verwenden Sie "Wir können" (We can) anstelle von "Wir haben die Fähigkeit zu" (We have the ability to).
- **Eliminieren (Eliminate).**
- **Ausführen (Execute).**
- **Beenden (Terminate).**
- **Töten (Kill).**
- **Disruptiv (Disruptive).**
- **Explosiv (Explosive).**
- **Potenziert (Leverage).**
- **Endbenutzer** - verwenden Sie einfach **Benutzer**.

## Standardisierung von Begriffen

Besonders im Englischen ist es wichtig, die verwendeten Begriffe zu standardisieren. Verwenden Sie diese Variationen in den technischen Dokumentationen von Segura.

- Email (email) für Englisch und E-Mail (e-mail) für Portugiesisch.
- Online.
- Setup (Substantiv), set up (Verb).
- Backup (Substantiv), back up (Verb).
- Login (Substantiv), log in (Verb).
- Web.
- Website.
- Internet.
- Systems management.
- Virtualization.
- Space-separated, comma-delimited.
- Load balancer.
- Verwenden Sie Großbuchstaben nur als Teil eines Eigennamens.
    - Zum Beispiel *Elastic Load Balancer*.
- Multi-tenant wird sowohl in pt-BR als auch in EN verwendet.
    - In pt-BR ist der Bindestrich grammatikalisch falsch, daher wird der Begriff kursiv gesetzt, um zu betonen, dass es sich um ein Wort/Begriff in EN handelt. Zum Beispiel: *multi-tenant*.
- Homepage.
- Schritt für Schritt.
- Pop-up (Substantiv/Adjektiv) bezieht sich auf Website-Popups, popup (Verb) ist die Aktion, wenn etwas plötzlich erscheint.
- Unterordner.

## Wörter, die übersetzt werden sollten

Wenn es eine direkte und angemessene Übersetzung gibt, wählen Sie immer die portugiesische Version.

| Englisch | Empfohlene Übersetzung |
| ----- | ----- |
| app | Anwendung |
| feature | Funktionalität |
| task | Aufgabe |
| update | Aktualisierung |
| run | ausführen |
| tool | Werkzeug |
| user | Benutzer |

## Verwenden Sie diese Kontraktionen im Englischen nicht

| Kontraktion | Bedeutung | Hinweise |
| :---- | :---- | :---- |
| **ain't** | is not | Zu umgangssprachlich, verwenden Sie isn't. |
| **how'd** | how did / how would |  |
| **how'll** | how will |  |
| **I'd** | I would | Verwenden Sie nicht die erste Person. |
| **'twas** | it was | Altenglisch. |
| **something's** | something is | Kann Verwirrung mit Possessivpronomen verursachen. |
| **mayn't** | may not |  |
| **may've** | may have |  |
| **mightn't** | might not |  |
| **might've** | might have |  |
| **gonna** | going to |  |
| **gotta** | got to |  |

## Verwenden Sie diese Kontraktionen

| Kontraktionen | Bedeutung |
| :---- | :---- |
| **aren't** | are not |
| **can't** | cannot |
| **could've** | could have |
| **couldn't** | could not |
| **didn't** | did not |
| **doesn't** | does not |
| **don't** | do not |
| **hadn't** | had not |
| **hasn't** | has not |
| **haven't** | have not |
| **it's** | it has / it is |
| **isn't** | is not |
| **mustn't** | must not |
| **o'clock** | of the clock |
| **wasn't** | was not |
| **we'll** | we will |
| **we're** | we are |
| **we've** | we have |
| **won't** | will not |
| **would've** | would have |
| **wouldn't** | would not |
| **you'd** | you had /you would |
| **you'll** | you shall /you will |
| **you're** | you are |
| **you've** | you have |

## Codebeispiele innerhalb des Dokuments

Verwenden Sie keine Prompt-Marken (z.B. `$` oder `#`) in Codebeispielen. Diese Marken können Probleme für Benutzer verursachen, die sie manchmal versehentlich eingeben oder die Codeabschnitte kopieren und einfügen möchten.

### Beispiel für die Verwendung:

```
juju deploy wordpress 
juju deploy ntp-master --to 2   #colocates with wordpress
juju add-relation mysql wordpress
```

## Nachrichten

- Immer in Anführungszeichen und fett.

## Dropdown

- Ohne Bindestrich und zusammen mit dem Wort Menü.
    - **Zum Beispiel**: Klicken Sie auf das Dropdown-Menü und wählen Sie **Bearbeiten**.

## That vs. which

- That definiert.
- Which informiert.

## If vs. whether

- Verwenden Sie *Whether* bei Bezug auf eine Wahl oder Alternativen.
    - **Zum Beispiel**: "Tun Sie dies, whether **it works or not**."
- Verwenden Sie *If* beim Festlegen einer Bedingung
    - **Zum Beispiel**: "Klicken Sie hier **if you want to do x**."

## Wie man Zugriffspfade angibt

Aus Gründen der Zugänglichkeit geben wir den Pfad immer mit `>` an. Der gesamte Pfad sollte fett sein. Zum Beispiel: **Einstellungen \> Benachrichtigungen \> E-Mail \> SMTP**.

## Wann man geordnete und ungeordnete Listen verwendet

Wenn es sich um eine Liste handelt, die eine Abfolge von Schritten angibt, die in einer bestimmten Reihenfolge ausgeführt werden müssen, verwenden wir eine geordnete Liste.

Wenn es sich um eine Liste handelt, die keine Hierarchie zu befolgen hat, d.h. bei der die Reihenfolge nicht wichtig ist, verwenden wir ungeordnete Listen.

**Zum Beispiel:**

**Anforderungen**

- Administratorzugriff auf PAM Core haben.
- SSH-Zugriff auf die Maschine haben.

# Dokumentstruktur

## Erklärung

Der Titel der Erklärung sollte immer sein: **Über XX**

- Eine Ausnahme besteht, wenn das Erklärungsdokument in einer Hauptkategorie enthalten ist; in diesem Fall wird der Titel der Name des Moduls sein, der das Produkt widerspiegelt.

Die Struktur der Erklärung sollte mindestens zwei wesentliche Fragen enthalten:

- **Was ist / What is (H1)**
    - Erklärung, was das Modul ist, was es tut und wie es sich verhält.
    - Es ist nicht notwendig, den Titel *"Was ist XX"* zu verwenden, solange der Einführungsabsatz diese Frage beantwortet.
- **Anwendbarkeit (H2)**
    - Features des Moduls.
- **Funktionalität (H2)**
    - Wie das Modul funktioniert.
- **Anwendungsfälle (H2)**
    - Optional. Fügen Sie Anwendungsfälle nur ein, wenn möglich.
- **Fazit (H2)**
    - Wenn das Dokument in einer Größe vorliegt, die eine Zusammenfassung des zuvor Geschriebenen erfordert, verwenden wir ein kurzes Fazit.

## Referenz

Folgt der Struktur des **How-To Guide**, wie der Zugriffspfad anzugeben ist.

## Pflichtfelder

Geben Sie in der Dokumentation immer an, wenn ein Feld als Pflichtfeld markiert ist.

### Beispiel:

1. Klicken Sie in der Segura-Plattform oben links auf **Grid Menu** und wählen Sie **Einstellungen**.
2. Wählen Sie **Systemparameter \> Systemparameter**.
3. Auf der Registerkarte **Remote-Sitzung** im Abschnitt **Allgemein**:
4. Suchen Sie das Feld **Dateiübertragung aktivieren?\*** und wählen Sie die Option **Ja**.
5. Klicken Sie auf **Speichern**.

In diesem Fall ist das Feld **Dateiübertragung aktivieren?\*** ein Pflichtfeld. Im Produkt ist es mit einem Sternchen gekennzeichnet, in der Dokumentation zeigen wir dies visuell an.

Zusätzlich fügen wir einen Hinweis in einem INFO-Callout ein.

**:::(info) (Info)**  
**Die mit Sternchen markierten Felder sind Pflichtfelder.**  
**:::**

## Weitere Empfehlungen

- Vermeiden Sie übermäßige Zeichensetzung in Titeln. Titel sollten nicht mit einem Punkt enden.
- Verwenden Sie keine Links in Titeln.
- Verwenden Sie keine *Code Fences* in Titeln.
- Imperative sollten für Dokumente im Stil "Wie man..." anstelle von Gerundien [im Englischen mit -ing endend] verwendet werden.
    - Bsp.: **Eine Instanz erstellen** anstatt **Eine Instanz erstellen**.
- Überspringen Sie keine Ebenen der Titelhierarchie (z.B. auf h1(#) folgt h3(###)).
- Vermeiden Sie "lose" Titel. Platzieren Sie, wann immer möglich, Inhalte direkt unter Ihrem Titel.

## Nomenklatur und Standardisierung der Segura®-Lösungen

Um Konsistenz, Klarheit und Ausrichtung an der Markenidentität zu gewährleisten, sollten alle Namen der Plattform, Produkte, Module, Add-ons und Funktionalitäten den folgenden Definitionen und Regeln folgen.

### Allgemeine Regeln

- Schreiben Sie Segura® immer mit Großbuchstaben und mit dem Symbol ®.
- Beziehen Sie sich immer auf die Gesamtheit der Lösungen als Segura® Platform.
- Segura® ist eine Marke und eine Plattform, kein Produkt.
- Alle Produkte, Module und Add-ons haben eigene Namen und sollten nicht übersetzt werden.
- Fügen Sie niemals Adjektive oder Hilfswörter zwischen Segura® und den Produktnamen ein.
    Setzen Sie die Namen der Segura®-Produkte und -Module im Text immer fett.
- Setzen Sie niemals Namen von Produkten oder Unternehmen Dritter fett (z.B. Microsoft, Apple).
- Die Namen sollten die offizielle Großschreibung beibehalten (z.B. DevOps Secret Manager, nicht Devops secret manager).
- Verwenden Sie die korrekten bestimmten Artikel, um Klarheit im technischen Portugiesisch zu gewährleisten (siehe Tabelle unten).

### Klassifikationen und Definitionen

#### Plattform

Gesamtheit, die alle Produkte, Module, Add-ons und Funktionalitäten umfasst.

- Korrekter Name: Segura® Platform
- Verwenden Sie nicht nur "Segura®", um sich auf die Gesamtheit zu beziehen.

Beispiel: Die **Segura® Platform** bietet die folgenden Lösungen.

#### Produkt

Ein Softwarestück mit Teilenummer, das separat vermarktet wird.

- Certificate Manager
- Cloud Entitlements (CIEM)
- DevOps Secret Manager
- Domum Remote Access
- EPM Linux / macOS / Windows
- Load Balancer
- MySafe
- PAM Core
- Segura® Appliance
- Provisioning

Beispiel: **PAM Core** ist eines der Produkte der **Segura® Platform**.

#### Produktfamilie

Gruppiert mehr als eine Lösung oder Version eines Produkts.

- Endpoint Privilege Manager:
    - EPM Windows
    - EPM macOS
    - EPM Linux
    - EPM AD Bridge

Beispiel: Die Familie **Endpoint Privilege Manager** umfasst Lösungen für mehrere Betriebssysteme.

#### Modul

Software ohne Teilenummer, die mit einem gekauften Produkt geliefert wird.

- A2A
- Change Audit
- Cloud IAM
- Discovery
- Executions
- Orbit Server Manager
- Protected Information
- Task Manager
- User Behavior

Beispiel: Das Modul **Discovery** ist mit dem Produkt **PAM Core** verfügbar.

#### Add-on

Ergänzende Lösungen, die den Produkten Funktionalitäten hinzufügen (z.B. Erweiterungen, Agenten, Konnektoren).

- Arbitrator
- MySafe Browser Extension
- Network Connector
- Segura® Mobile App
- Segura® Browser
- Segura® Intelligence

Beispiel: Der **Segura® Browser** wurde entwickelt, um die Sicherheit von Web-Sitzungen zu verbessern.

#### Funktionalität

Verfügbare Ressource innerhalb eines Produkts.

Beispiele:

- Passwortänderung in PAM Core
- Proxies (RDP, Terminal, Web, Database Proxy)
- Benachrichtigungen
- Vorlagen für Passwortänderungen
- Integrationen über SAML

### **Bestimmte Artikel (Der / Die / Das)**

Nachfolgend die Liste mit den korrekten Artikeln für jeden registrierten Namen:

| Typ | Name | Korrekter Artikel |
| ----- | ----- | ----- |
| Produkt | Certificate Manager | Der |
| Produkt | Cloud Entitlements (CIEM) | Die |
| Produkt | DevOps Secret Manager | Der |
| Produkt | Domum Remote Access | Der |
| Produkt | EPM Linux / macOS / Windows | Der |
| Produkt | Load Balancer | Der |
| Produkt | MySafe | Der |
| Produkt | PAM Core | Der |
| Produkt | Provisioning | Das |
| Produkt | Segura® Appliance | Die |
| Modul | A2A | Das |
| Modul | Change Audit | Das |
| Modul | Cloud IAM | Das |
| Modul | Discovery | Das |
| Modul | Executions | Die |
| Modul | Orbit Server Manager | Der |
| Modul | Protected Information | Die |
| Modul | Task Manager | Der |
| Modul | User Behavior | Das |
| Add-on | Arbitrator | Der |
| Add-on | MySafe Browser Extension | Die |
| Add-on | Network Connector | Der |
| Add-on | Segura® Mobile App | Die |
| Add-on | Segura® Browser | Der |
| Add-on | Segura® Intelligence | Die |

Obwohl "Intelligence" im Portugiesischen ein weibliches Substantiv ist, wurde für **Segura® Intelligence** der männliche Artikel beibehalten, entsprechend dem Markttrend (z.B. Der ChatGPT, Der Midjourney).

[^1]: Original: A document is the actual piece of paper or computer file that contains the information. It is countable and also a verb. Ex: The scientists documented the lab experiments to prove the herb's medicinal properties.

[^2]: Original: Documentation is the act of writing that information down. It is often used to describe the gathering and compilation of information from studies or research. It is NON-countable and is NOT a verb. Ex: This is just one report, where is the documentation for the whole project.