import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CenteredLoader } from "../../../utils/UIUtils"
import Button from "../../../components/Button"
import { Users, Building2, Trophy, MessageCircle, ChevronRight, Star, ArrowRight, ExternalLink } from "lucide-react"
import { formatNumber } from "../../../utils/Utils"
import axios from "axios"

const HomeView = () => {
  const [statistics, setStatistics] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [factions, setFactions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [statsResponse, factionsResponse] = await Promise.all([axios.get("/statistics"), axios.get("/faction")])
        setStatistics(statsResponse.data)
        setFactions(factionsResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <CenteredLoader />
        </div>
      ) : (
        <main>
          <HeroSection navigate={navigate} />
          {statistics && <StatisticsSection statistics={statistics} />}
          <FeaturesSection statistics={statistics} />
          <FactionsSection factions={factions} />
          <CommunitySection />
          <AboutUsSection />
          <TestimonialSection />
          <CallToActionSection />
        </main>
      )}
    </div>
  )
}

const HeroSection = ({ navigate }: { navigate: any }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-backgroundhome bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Willkommen auf{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Void Roleplay!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Entdecke ein einzigartiges Reallife & Roleplay Abenteuer in unserer Minecraft-Welt.
          </p>

          <div className="flex justify-center mb-16">
            <Button
              onClick={() => navigate("/play")}
              size="lg"
              className="px-8 py-4 text-lg shadow-xl shadow-orange-600/20 group inline-flex items-center"
            >
              <span>Jetzt spielen</span>
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <motion.div
            className="absolute bottom-12 left-0 right-0 mx-auto w-8 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
            }}
          >
            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center mx-auto">
              <motion.div
                className="w-1.5 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="text-white/50 text-sm mt-2 text-center">Scroll</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatisticsSection = ({ statistics }: { statistics: any }) => (
  <section className="relative py-16 bg-gray-900">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-700/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard
              title="Fraktionen"
              value={statistics.factionCount}
              icon={<Building2 className="h-6 w-6" />}
              description="Aktive Fraktionen"
            />
            <StatCard
              title="Unternehmen"
              value={statistics.companyCount}
              icon={<Building2 className="h-6 w-6" />}
              description="Florierende Unternehmen"
            />
            <StatCard
              title="Spieler"
              value={statistics.playerCount || "1000+"}
              icon={<Users className="h-6 w-6" />}
              description="Registrierte Spieler"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

const StatCard = ({
  title,
  value,
  icon,
  description,
}: { title: string; value: number | string; icon: React.ReactNode; description: string }) => (
  <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center p-4">
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
    <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
      {typeof value === "number" ? formatNumber(value) : value}
    </p>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
)

const FeaturesSection = ({ statistics }: { statistics: any }) => (
  <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Warum Void Roleplay?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Entdecke eine einzigartige Minecraft-Welt mit zahlreichen Möglichkeiten für dein Roleplay-Erlebnis.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Users className="h-6 w-6" />}
          title="Aktive Community"
          description="Schließe dich hunderten von Spielern an und erlebe ein dynamisches und lebendiges Spielerlebnis."
          delay={0}
        />
        <FeatureCard
          icon={<Building2 className="h-6 w-6" />}
          title="Unternehmen"
          description="Gründe und verwalte dein eigenes Unternehmen, kaufe Geschäfte auf, stelle Mitarbeiter an und lass dein Imperium wachsen."
          delay={0.2}
        />
        <FeatureCard
          icon={<Trophy className="h-6 w-6" />}
          title="Fraktionen"
          description={`Tritt einer von ${statistics ? statistics.factionCount : "vielen"} Fraktionen bei und erobere, verteidige oder verbessere die Stadt.`}
          delay={0.4}
        />
      </div>
    </div>
  </section>
)

const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
}: { icon: React.ReactNode; title: string; description: string; delay?: number }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
  >
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl inline-block mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
)

const FactionsSection = ({ factions }: { factions: any[] }) => (
  <section className="py-20 bg-gray-900 relative overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Fraktionen
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Tritt einer Fraktion bei und entfalte dein RP Erlebnis in einer lebendigen Gemeinschaft.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {factions.slice(0, 6).map((faction, index) => (
          <FactionCard
            key={faction.id}
            name={faction.name}
            fullname={faction.fullname}
            description={faction.description}
            image={faction.image}
            index={index}
          />
        ))}
      </div>

      {factions.length > 6 && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/factions"
            className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Alle Fraktionen anzeigen</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      )}
    </div>
  </section>
)

const FactionCard = ({
  name,
  fullname,
  description,
  image,
  index = 0,
}: { name: string; fullname: string; description: string; image: string; index?: number }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl shadow-lg overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div
        className={`w-full h-48 bg-cover bg-center relative ${!image ? "bg-gray-600" : ""}`}
        style={image ? { backgroundImage: `url(${image})` } : {}}
      >
        {!image && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold">
            {name}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">{fullname}</h3>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className={`text-gray-300 mb-6 flex-grow ${!description ? "italic" : ""}`}>
          {description || "Keine Beschreibung verfügbar"}
        </p>

        <button
          onClick={() => navigate("/factions/" + name.toLowerCase())}
          className="mt-auto self-end px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-md flex items-center"
        >
          <span>Details</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

const CommunitySection = () => (
  <section className="py-20 bg-gray-900 relative overflow-hidden">
    {/* Subtle background gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Unsere Community
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Unsere Community ist das Herz von Void Roleplay. Wir bieten eine freundliche, hilfsbereite und aktive
              Gemeinschaft von Spielern, die alle dasselbe Ziel teilen: Spaß haben und epische Abenteuer erleben.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-orange-500/20 p-2 rounded-full mr-4">
                  <Star className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Aktive Spieler</h3>
                  <p className="text-gray-400">Eine lebendige Gemeinschaft, die das Spiel zum Leben erweckt.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500/20 p-2 rounded-full mr-4">
                  <Star className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Hilfsbereites Team</h3>
                  <p className="text-gray-400">Unser engagiertes Team steht dir bei Fragen und Problemen zur Seite.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-500/20 p-2 rounded-full mr-4">
                  <Star className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Regelmäßige Events</h3>
                  <p className="text-gray-400">Spannende Events und Aktivitäten halten das Spielerlebnis frisch.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-700/50"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tritt unserem Discord bei</h3>
              <p className="text-gray-300">
                Verbinde dich mit anderen Spielern, erhalte Support und bleibe über alle Neuigkeiten informiert.
              </p>
            </div>

            <a
              href="https://discord.gg/void-roleplay"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg group"
            >
              <span>Discord beitreten</span>
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
)

const AboutUsSection = () => (
  <section className="py-20 bg-gray-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Über uns
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Erfahre mehr über die Geschichte und Vision von Void Roleplay.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-700/50"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-4">
              Void Roleplay ist ein in 2023 gegründeter Minecraft Reallife- und Roleplay-Server, der es sich zur Aufgabe
              gemacht hat, ein einzigartiges und fesselndes Spielerlebnis zu bieten. Unsere Vision ist es, den Spielern
              ein tiefgründiges und realistisches Abenteuer zu ermöglichen, ohne auf Mods angewiesen zu sein.
            </p>
            <p className="mb-4">
              Wir glauben an die Macht der Kreativität und des freien Rollenspiels und haben daher eine Welt erschaffen,
              in der jeder die Möglichkeit hat, sein eigenes Schicksal zu gestalten.
            </p>
            <p className="mb-4">
              Unser Server konzentriert sich darauf, eine dynamische, offene und lebendige Umgebung zu schaffen, in der
              Spieler in verschiedene Rollen schlüpfen können. Egal, ob du ein Unternehmer, ein Polizist, ein
              Krimineller oder ein einfacher Bürger bist – bei Void Roleplay ist jeder Spieler ein wichtiger Teil des
              Ganzen.
            </p>
            <p>
              Tritt uns bei und werde ein Teil von Void Roleplay – einer Welt, in der du wirklich du selbst sein kannst!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

const TestimonialSection = () => (
  <section className="py-20 bg-gray-900 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.1),transparent_50%)]"></div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Was unsere Spieler sagen
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Erfahrungen und Meinungen unserer Community-Mitglieder.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <TestimonialCard
          name="Salty463"
          text="Das beste Roleplay-Erlebnis, das ich je hatte! Die Community ist unglaublich."
          delay={0}
        />
        <TestimonialCard
          name="TheoStratmann1"
          text="Ich liebe die Vielfalt an Fraktionen und Unternehmen. Hier wird nie langweilig!"
          delay={0.2}
        />
        <TestimonialCard
          name="Ienji"
          text="Die Welt von Void Roleplay ist lebendig und fesselnd. Hier finde ich immer neue Freunde."
          delay={0.4}
        />
      </div>
    </div>
  </section>
)

const TestimonialCard = ({ name, text, delay = 0 }: { name: string; text: string; delay?: number }) => (
  <motion.div
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-700/50"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <div className="bg-orange-500/20 p-2 rounded-full mr-3">
        <Star className="h-5 w-5 text-orange-500" />
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white">{name}</h4>
        <p className="text-gray-400 text-sm">Spieler</p>
      </div>
    </div>
    <p className="text-gray-300 italic">"{text}"</p>
  </motion.div>
)

const CallToActionSection = () => (
  <section className="py-20 bg-gray-900">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500 opacity-10 rounded-full -ml-10 -mb-10"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Bereit für dein Abenteuer?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Tritt noch heute Void Roleplay bei und werde Teil unserer wachsenden Community. Ein einzigartiges
            Minecraft-Erlebnis wartet auf dich!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/play")}
              size="lg"
              className="px-8 py-4 text-lg shadow-xl shadow-orange-600/20"
            >
              Jetzt spielen
            </Button>

            <a
              href="https://discord.gg/void-roleplay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <span>Discord beitreten</span>
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default HomeView

