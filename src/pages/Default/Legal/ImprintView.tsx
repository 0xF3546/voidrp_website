import { Mail, MapOutlined, Phone } from "@mui/icons-material"

const ImprintView = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Impressum</h1>
        <div className="bg-gray-800 shadow-lg overflow-hidden sm:rounded-lg shadpw-white">
          <div className="px-6 py-5 sm:px-8 bg-gray-800">
            <h2 className="text-lg leading-6 font-semibold text-gray-100">Angaben gemäß § 5 TMG</h2>
          </div>
          <div className="border-t border-gray-700">
            <dl>
              <div className="bg-gray-800 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                <dt className="text-sm font-medium text-gray-400">Vertreten durch</dt>
                <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">Vorname Nachname</dd>
              </div>
              <div className="bg-gray-700 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                <dt className="text-sm font-medium text-gray-400">Anschrift</dt>
                <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2 flex items-center">
                  <MapOutlined className="h-5 w-5 text-cyan-400 mr-2" />
                  Adresse
                </dd>
              </div>
              <div className="bg-gray-800 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                <dt className="text-sm font-medium text-gray-400">Kontakt</dt>
                <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-cyan-400 mr-2" />
                    Auf Anfrage
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-cyan-400 mr-2" />
                    mail@mail.mail
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-400 text-center">
          <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Vorname Nachname, Adresse</p>
        </div>
      </div>
    </div>
  )
}

export default ImprintView

