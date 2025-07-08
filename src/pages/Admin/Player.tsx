import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

interface PlayerDetails {
  id: number;
  player_name: string;
  uuid: string;
  player_permlevel: number;
  firstjoin: string;
  lastlogin: string;
  bargeld: number;
  bank: number;
  firstname: string;
  lastname: string;
  gender: string;
  birthdate: string;
  visum: string;
  playtime_minutes: number;
  playtime_hours: number;
  faction: string;
  faction_grade: string;
  isLeader: boolean;
  exp: number;
  level: number;
  isDead: boolean;
  houseSlot: number;
  secondaryTeam: string;
  coins: number;
  votes: number;
  crypto: number;
  gwd: number;
  zd: number;
  inventorySize: number;
  loyaltyBonus: number;
  loginStreak: number;
  healthInsurance: boolean;
  discordId: string;
  license?: { license: string; received: string }[];
  inventory?: { item: string; amount: number }[];
  vehicles?: { type: string; id: number }[];
  weapons?: { weapon: string; ammo: number; current_ammo: number }[];
  notes?: { uuid: string; note: string; entryAdded: string }[];
}

const PlayerPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [player, setPlayer] = useState<PlayerDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/admin/players/${uuid}`);
        if (response.status !== 200) {
          throw new Error("Failed to load player details.");
        }
        const data: PlayerDetails = response.data;
        console.log("Player Data:", data); // Debug: Log API response
        setPlayer(data);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
        console.error("Fetch error:", error); // Debug: Log error
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      fetchPlayer();
    } else {
      setErrorMessage("Invalid player UUID.");
      setLoading(false);
    }
  }, [uuid]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-6 font-satoshi">
      <div className="max-w-5xl mx-auto">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-base"
          >
            Lade Spielerinformationen...
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-6 rounded-lg backdrop-blur-sm shadow-lg"
          >
            {errorMessage}
          </motion.div>
        )}

        {player && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-neutral-900/80 p-8 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-xl"
          >
            <h1 className="text-3xl font-bold text-white mb-6">{player.player_name}</h1>

            {/* Basic Info */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Allgemeine Informationen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">UUID</span>
                  <span className="text-sm text-white font-mono">{player.uuid}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Berechtigungsstufe</span>
                  <span className="text-sm text-white">{player.player_permlevel}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Vorname</span>
                  <span className="text-sm text-white">{player.firstname || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Nachname</span>
                  <span className="text-sm text-white">{player.lastname || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Geschlecht</span>
                  <span className="text-sm text-white">{player.gender || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Geburtsdatum</span>
                  <span className="text-sm text-white">{player.birthdate ? formatDate(player.birthdate) : "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Erster Beitritt</span>
                  <span className="text-sm text-white">{formatDate(player.firstjoin)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Zuletzt gesehen</span>
                  <span className="text-sm text-white">{formatDate(player.lastlogin)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Status</span>
                  <span
                    className={`text-sm font-semibold ${player.isDead ? "text-red-400" : "text-green-400"}`}
                  >
                    {player.isDead ? "Tot" : "Lebendig"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Spielzeit</span>
                  <span className="text-sm text-white">{player.playtime_hours} Stunden ({player.playtime_minutes} Minuten)</span>
                </div>
              </div>
            </section>

            {/* Financial Info */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Finanzen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Bargeld</span>
                  <span className="text-sm text-white">{player.bargeld.toLocaleString("de-DE")} €</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Bankguthaben</span>
                  <span className="text-sm text-white">{player.bank.toLocaleString("de-DE")} €</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Krypto</span>
                  <span className="text-sm text-white">{player.crypto.toLocaleString("de-DE")}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Coins</span>
                  <span className="text-sm text-white">{player.coins.toLocaleString("de-DE")}</span>
                </div>
              </div>
            </section>

            {/* Faction Info */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Fraktion</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Fraktion</span>
                  {player.faction ? (
                    <Link
                      to={`/admin/factions/${player.faction}`}
                      className="text-sm text-white hover:text-orange-400 transition-colors"
                    >
                      {player.faction}
                    </Link>
                  ) : (
                    <span className="text-sm text-white">Keine</span>
                  )}
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Rang</span>
                  <span className="text-sm text-white">{player.faction_grade || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Leader</span>
                  <span className="text-sm text-white">{player.isLeader ? "Ja" : "Nein"}</span>
                </div>
              </div>
            </section>

            {/* Licenses */}
            {player.license && player.license.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Lizenzen</h2>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-neutral-300 border-b border-neutral-700/50 pb-2">
                    <span>Lizenz</span>
                    <span>Erhalten</span>
                  </div>
                  {player.license.map((lic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="grid grid-cols-2 gap-4 py-2 text-sm hover:bg-neutral-700/30 transition-colors"
                    >
                      <span className="text-white">{lic.license}</span>
                      <span className="text-white">{formatDate(lic.received)}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Inventory */}
            {player.inventory && player.inventory.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Inventar (Größe: {player.inventorySize})</h2>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-neutral-300 border-b border-neutral-700/50 pb-2">
                    <span>Gegenstand</span>
                    <span>Anzahl</span>
                  </div>
                  {player.inventory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="grid grid-cols-2 gap-4 py-2 text-sm hover:bg-neutral-700/30 transition-colors"
                    >
                      <span className="text-white">{item.item}</span>
                      <span className="text-white">{item.amount}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Vehicles */}
            {player.vehicles && player.vehicles.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Fahrzeuge</h2>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-neutral-300 border-b border-neutral-700/50 pb-2">
                    <span>Fahrzeugtyp</span>
                    <span>ID</span>
                  </div>
                  {player.vehicles.map((vehicle, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="grid grid-cols-2 gap-4 py-2 text-sm hover:bg-neutral-700/30 transition-colors"
                    >
                      <Link
                        to={`/admin/vehicles/${vehicle.id}`}
                        className="text-white hover:text-orange-400 transition-colors"
                      >
                        {vehicle.type}
                      </Link>
                      <span className="text-white">{vehicle.id}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Weapons */}
            {player.weapons && player.weapons.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Waffen</h2>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-neutral-300 border-b border-neutral-700/50 pb-2">
                    <span>Waffe</span>
                    <span>Munition</span>
                    <span>Aktuelle Munition</span>
                  </div>
                  {player.weapons.map((weapon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="grid grid-cols-3 gap-4 py-2 text-sm hover:bg-neutral-700/30 transition-colors"
                    >
                      <span className="text-white">{weapon.weapon}</span>
                      <span className="text-white">{weapon.ammo}</span>
                      <span className="text-white">{weapon.current_ammo}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Notes */}
            {player.notes && player.notes.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Notizen</h2>
                <div className="bg-neutral-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-neutral-300 border-b border-neutral-700/50 pb-2">
                    <span>Notiz</span>
                    <span>Hinzugefügt</span>
                  </div>
                  {player.notes.map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="grid grid-cols-2 gap-4 py-2 text-sm hover:bg-neutral-700/30 transition-colors"
                    >
                      <Link
                        to={`/admin/notes/${note.uuid}`}
                        className="text-white hover:text-orange-400 transition-colors"
                      >
                        {note.note.substring(0, 50)} {note.note.length > 50 ? "..." : ""}
                      </Link>
                      <span className="text-white">{formatDate(note.entryAdded)}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Stats */}
            <section>
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Weitere Statistiken</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Level</span>
                  <span className="text-sm text-white">{player.level} (EXP: {player.exp})</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Login-Streak</span>
                  <span className="text-sm text-white">{player.loginStreak}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Votes</span>
                  <span className="text-sm text-white">{player.votes}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Loyalty Bonus</span>
                  <span className="text-sm text-white">{player.loyaltyBonus}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Haus-Slot</span>
                  <span className="text-sm text-white">{player.houseSlot || "Kein Haus"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Sekundäres Team</span>
                  <span className="text-sm text-white">{player.secondaryTeam || "Kein Team"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Krankenversicherung</span>
                  <span className="text-sm text-white">{player.healthInsurance ? "Ja" : "Nein"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Discord ID</span>
                  <span className="text-sm text-white font-mono">{player.discordId || "N/A"}</span>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;