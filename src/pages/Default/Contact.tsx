import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react"
import { CenteredLoader } from "../../utils/UIUtils"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Label from "../../components/Label"
import axios from "axios"

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="h-5 w-5" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
)

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [privacyChecked, setPrivacyChecked] = useState(false)

  const handleContactSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!privacyChecked) {
      setErrorMessage("Bitte stimmen Sie den Datenschutzbedingungen zu.")
      return
    }

    setLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      await axios.post("/sendContact", form)
      setSuccessMessage("Deine Nachricht wurde erfolgreich gesendet!")
      setForm({ name: "", email: "", message: "" })
      setPrivacyChecked(false)
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyChecked(e.target.checked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 pt-16">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500 opacity-10 rounded-full -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4 md:max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  Nimm Kontakt auf
                </h1>
                <p className="text-gray-300 text-lg">
                  Hast du Fragen, Feedback oder Vorschläge? Unser Team freut sich, von dir zu hören und ist bereit, dir
                  zu helfen!
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg inline-block">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-6">Kontaktinformationen</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 bg-opacity-20 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium">Email</h3>
                    <p className="text-white">management@voidroleplay.de</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 bg-opacity-20 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium">Standort</h3>
                    <p className="text-white">Deutschland</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 bg-opacity-20 p-3 rounded-full">
                    <DiscordIcon />
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium">Discord</h3>
                    <a
                      href="https://discord.gg/void-roleplay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      discord.gg/void-roleplay
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Schnelle Antwort</h2>
              <p className="opacity-90 mb-4">
                Wir bemühen uns, alle Anfragen innerhalb von 24-48 Stunden zu beantworten. Für dringende Anliegen
                besuche bitte unseren Discord.
              </p>
              <a
                href="https://discord.gg/void-roleplay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-orange-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Discord beitreten
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 bg-gray-800 rounded-3xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Schreib uns eine Nachricht</h2>

            {errorMessage && (
              <motion.div
                className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Es ist ein Fehler aufgetreten</p>
                  <p className="text-sm opacity-90">{errorMessage}</p>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-xl flex items-start space-x-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Erfolg!</p>
                  <p className="text-sm opacity-90">{successMessage}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleContactSend} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label required>
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                    disabled={isLoading}
                    placeholder="Dein Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                    disabled={isLoading}
                    placeholder="deine.email@beispiel.de"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label required>
                  Nachricht
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  className="w-full h-40 resize-none rounded-xl border border-gray-600 bg-gray-800 bg-opacity-40 py-3 px-4 text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Wie können wir dir helfen?"
                  required
                  disabled={isLoading}
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={privacyChecked}
                  onChange={handlePrivacyChange}
                  disabled={isLoading}
                  className="mr-3 h-5 w-5 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="privacy" className="text-gray-300 text-sm">
                  Ich habe die{" "}
                  <Link to="/privacy-policy" className="text-orange-400 hover:text-orange-300 underline">
                    Datenschutzbedingungen
                  </Link>{" "}
                  gelesen und akzeptiere sie.
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center"
                >
                  {isLoading ? (
                    <CenteredLoader />
                  ) : (
                    <>
                      <span>Nachricht senden</span>
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

