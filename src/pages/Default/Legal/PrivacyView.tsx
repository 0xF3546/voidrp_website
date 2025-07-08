import type React from "react"

const PrivacyPolicyView = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Datenschutzerklärung</h1>

        <div className="text-white space-y-6">
          <p>
            Wir freuen uns über Ihr Interesse an unserem Minecraft Roleplay Server (im Folgenden "Server"). Der Schutz
            Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Im Folgenden informieren wir Sie über die
            Verarbeitung personenbezogener Daten auf unserer Website und unserem Server gemäß der
            Datenschutz-Grundverordnung (DSGVO).
          </p>

          <section>
            <Header>Verantwortlicher</Header>
            <p>Verantwortlich für die Datenverarbeitung ist:</p>
            <p>
              Vorname Nachname
              <br />
              Adresse
              <br />
              mail@mail.mail
            </p>
          </section>

          <section>
            <Header>Erhobene Daten und Verarbeitungszwecke</Header>

            <h3 className="text-lg font-semibold mt-4">a) Website-Besuch</h3>
            <p>
              Bei jedem Aufruf unserer Website werden automatisch folgende Daten erhoben und in den Server-Logfiles
              gespeichert:
            </p>
            <ul className="list-disc pl-6">
              <li>IP-Adresse des anfragenden Endgeräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Abgerufene Seite/Datei</li>
              <li>Verwendeter Browsertyp und -version</li>
              <li>Betriebssystem</li>
            </ul>
            <p>
              Diese Daten werden zur Sicherstellung des reibungslosen Betriebs der Website, zur Verbesserung unseres
              Angebots und zur Sicherstellung der Sicherheit verarbeitet. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse).
            </p>

            <h3 className="text-lg font-semibold mt-4">b) Registrierung und Nutzung des Servers</h3>
            <p>Für die Nutzung unseres Minecraft Roleplay Servers erheben wir folgende Daten:</p>
            <ul className="list-disc pl-6">
              <li>Minecraft-Benutzername</li>
              <li>E-Mail-Adresse (optional, falls erforderlich für Kontaktaufnahme oder Accountverwaltung)</li>
              <li>Server-Logs (einschließlich Chatnachrichten, Verbindungszeiten und Serverereignisse)</li>
            </ul>
            <p>
              Diese Daten werden verwendet, um Ihnen Zugang zum Server zu gewähren, die Spielumgebung zu verwalten und
              Missbrauch zu verhindern. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>

            <h3 className="text-lg font-semibold mt-4">Cookies</h3>
            <p>
              Unsere Website verwendet Cookies, um bestimmte Funktionen bereitzustellen und die Benutzerfreundlichkeit
              zu verbessern. Sie können Cookies in den Einstellungen Ihres Browsers deaktivieren. Die Nutzung unserer
              Website ist auch ohne Cookies möglich, jedoch können bestimmte Funktionen eingeschränkt sein.
            </p>
          </section>

          <section>
            <Header>Weitergabe von Daten</Header>
            <p>
              Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Erfüllung
              vertraglicher oder rechtlicher Verpflichtungen erforderlich. Beispiele:
            </p>
            <ul className="list-disc pl-6">
              <li>Bereitstellung technischer Infrastruktur durch Hosting-Anbieter</li>
              <li>Weitergabe an Strafverfolgungsbehörden bei Verdacht auf rechtswidriges Verhalten</li>
            </ul>
            <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. c DSGVO.</p>
          </section>

          <section>
            <Header>Speicherdauer</Header>
            <p>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie dies für die genannten Zwecke erforderlich
              ist oder gesetzliche Aufbewahrungspflichten bestehen. Server-Logs werden in der Regel nach [Zeitraum, z.
              B. 30 Tage] gelöscht.
            </p>
          </section>

          <section>
            <Header>Ihre Rechte</Header>
            <p>Sie haben das Recht auf:</p>
            <ul className="list-disc pl-6">
              <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte Kontaktadresse.</p>
          </section>

          <section>
            <Header>Beschwerderecht bei einer Aufsichtsbehörde</Header>
            <p>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, haben Sie das
              Recht, Beschwerde bei einer Datenschutzaufsichtsbehörde einzulegen. Zuständig ist die Aufsichtsbehörde
              Ihres Wohnsitzes oder unseres Sitzes.
            </p>
          </section>

          <section>
            <Header>Aktualisierung dieser Datenschutzerklärung</Header>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen unserer Angebote oder rechtlicher Vorgaben
              zu aktualisieren. Die jeweils aktuelle Version finden Sie auf unserer Website.
            </p>
            <p>Stand: 13.12.2024</p>
          </section>
        </div>
      </div>
    </div>
  )
}

const Header = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-semibold mt-6">{children}</h2>
}

export default PrivacyPolicyView

