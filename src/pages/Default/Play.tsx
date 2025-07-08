"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Gamepad2, Server, MessageCircle, ChevronRight, CheckCircle2, ExternalLink } from "lucide-react"

export const PlayView = () => {
  const [copySuccess, setCopySuccess] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Kopiert!")
        setTimeout(() => setCopySuccess(""), 2000)
      },
      () => {
        setCopySuccess("Fehler beim Kopieren")
        setTimeout(() => setCopySuccess(""), 2000)
      },
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 pt-16">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
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
                  So legst du los
                </h1>
                <p className="text-gray-300 text-lg">
                  Folge dieser einfachen Anleitung, um auf Void Roleplay zu spielen und Teil unserer Community zu
                  werden.
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg inline-block">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  1
                </span>
                Minecraft starten
              </h2>
              <p className="text-gray-300 mb-4">
                Öffne Minecraft Java Edition (Version 1.20 oder höher) und wähle "Multiplayer" aus dem Hauptmenü.
              </p>
              <div className="bg-gray-700 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300">
                  <span className="text-orange-400 font-medium">Tipp:</span> Stelle sicher, dass du die neueste Version
                  von Minecraft verwendest, um alle Features genießen zu können.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-700 rounded-xl p-4 flex-1 min-w-[200px]">
                  <h3 className="text-lg font-medium text-white mb-2">Empfohlene Version</h3>
                  <p className="text-gray-300">Minecraft Java Edition 1.20+</p>
                </div>
                <div className="bg-gray-700 rounded-xl p-4 flex-1 min-w-[200px]">
                  <h3 className="text-lg font-medium text-white mb-2">Mods</h3>
                  <p className="text-gray-300">Keine erforderlich</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  2
                </span>
                Server hinzufügen
              </h2>
              <p className="text-gray-300 mb-6">
                Klicke auf "Server hinzufügen" und gib die folgenden Informationen ein:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Servername</h3>
                  <p className="text-gray-300">Void Roleplay</p>
                </div>

                <div className="bg-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-medium text-white mb-2">Serveradresse</h3>
                  <div className="flex items-center">
                    <code className="text-orange-400 bg-gray-800 px-3 py-1.5 rounded-lg mr-2 flex-grow">
                      voidroleplay.de
                    </code>
                    <button
                      onClick={() => copyToClipboard("voidroleplay.de")}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center"
                    >
                      {copySuccess ? (
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                      ) : (
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {copySuccess || "Kopieren"}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-300">Klicke auf "Fertig", um den Server zu deiner Serverliste hinzuzufügen.</p>
            </div>

            <div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  3
                </span>
                Verbinden und Spielen
              </h2>
              <p className="text-gray-300 mb-6">
                Wähle "Void Roleplay" aus deiner Serverliste und klicke auf "Server beitreten". Nach dem Verbinden
                kannst du dich registrieren und mit dem Spielen beginnen.
              </p>

              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mr-2" />
                  Erste Schritte
                </h3>
                <ul className="text-gray-300 space-y-2 list-disc pl-5">
                  <li>Folge den Anweisungen im Spiel, um dich zu registrieren</li>
                  <li>Erkunde die Stadt und lerne andere Spieler kennen</li>
                  <li>Tritt einer Fraktion bei oder gründe dein eigenes Unternehmen</li>
                  <li>Beachte die Serverregeln für ein faires Spielerlebnis</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Server className="h-5 w-5 text-orange-400 mr-2" />
                Serverinformationen
              </h2>

              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Serveradresse</h3>
                  <p className="text-white font-medium">voidroleplay.de</p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Version</h3>
                  <p className="text-white font-medium">Minecraft Java 1.20+</p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Spielmodus</h3>
                  <p className="text-white font-medium">Roleplay / Reallife</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-white font-medium">Online</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-white mr-3" />
                <h2 className="text-xl font-bold text-white">Discord beitreten</h2>
              </div>

              <p className="text-white/90 mb-6">
                Tritt unserem Discord-Server bei, um mit anderen Spielern zu chatten, Support zu erhalten und über
                Events informiert zu werden.
              </p>

              <a
                href="https://discord.gg/void-roleplay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 bg-white text-indigo-700 font-medium rounded-xl transition-all hover:bg-gray-100 group"
              >
                <span>Discord beitreten</span>
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="bg-gray-800 rounded-3xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6">Brauchst du Hilfe?</h2>
              <p className="text-gray-300 mb-6">
                Wenn du Probleme beim Verbinden hast oder Fragen zum Spiel hast, kannst du uns auf Discord kontaktieren
                oder die Serverregeln lesen.
              </p>

              <div className="space-y-3">
                <Link
                  to="/rules"
                  className="flex items-center justify-between w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  <span>Serverregeln</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-between w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  <span>Kontakt</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

