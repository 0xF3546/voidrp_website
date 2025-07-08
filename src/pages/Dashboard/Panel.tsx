import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuthProvider } from "../../hooks/useAuthProvider";
import { AppRoutes } from "../../AppRouter";

interface Player {
  uuid: string; // Added for Minecraft head
  bargeld: number;
  bank: number;
  discordId: string;
  player_rank: string;
  firstname: string;
  lastname: string;
  visum: string;
  playtime_hours: number;
  level: number;
  exp: number;
  faction: string | null;
  faction_grade: string | null;
  isLeader: boolean;
}

const PanelView = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuthProvider();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/panel");
        if (response.status !== 200) {
          throw new Error("Failed to load player data.");
        }
        const data: Player = response.data;
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

    fetchPlayerData();
  }, []);

  // Assume max exp for next level (adjust based on your game logic)
  const maxExp = player ? player.level * 1000 : 1000;
  const expProgress = player ? (player.exp / maxExp) * 100 : 0;

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-6 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Control-Panel
        </motion.h1>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-base"
          >
            Lade Spielerdaten...
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`https://crafatar.com/avatars/${currentUser?.uuid}?size=64&overlay`}
                  alt="Minecraft Avatar"
                  className="w-16 h-16 border-2 border-orange-400 pixelated"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/64")}
                />
                <div>
                  <h2 className="text-xl font-semibold text-orange-400">
                    Willkommen, {player.firstname} {player.lastname}
                  </h2>
                  <p className="text-sm text-neutral-300">
                    Rang: <span className="text-white">{player.player_rank}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-neutral-300">
                Discord ID: <span className="text-white">{player.discordId}</span>
              </p>
            </motion.div>

            {/* Financial Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Finanzen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Bargeld</span>
                  <span className="text-sm text-white">{player.bargeld.toLocaleString("de-DE")} $</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Bankguthaben</span>
                  <span className="text-sm text-white">{player.bank.toLocaleString("de-DE")} $</span>
                </div>
              </div>
            </motion.div>

            {/* Player Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Spieler-Statistiken</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Level</span>
                  <span className="text-sm text-white">{player.level}</span>
                </div>
                <div className="flex flex-col py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-neutral-300">Erfahrung</span>
                    <span className="text-sm text-white">{player.exp.toLocaleString("de-DE")}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full"
                      style={{ width: `${expProgress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Spielzeit</span>
                  <span className="text-sm text-white">{player.playtime_hours} Stunden</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Visum</span>
                  <span className="text-sm text-white">{player.visum || "Keins"}</span>
                </div>
              </div>
            </motion.div>

            {/* Faction Info */}
            {player.faction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Fraktion</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Fraktion</span>
                    {currentUser?.isAdmin ? (
                      <Link
                        to={`/admin/factions/${player.faction}`}
                        className="text-sm text-orange-400 hover:underline"
                      >
                        {player.faction}
                      </Link>
                    ) : (
                      <span className="text-sm text-white">{player.faction}</span>
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
              </motion.div>
            )}

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-orange-400 mb-4">
                Schnellzugriff {currentUser?.isAdmin ? "(Admin)" : ""}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentUser?.isAdmin ? (
                  <>
                    <Link
                      to={AppRoutes.ADMIN_PLAYERSLIST.path}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center"
                    >
                      Spielerliste
                    </Link>
                    <Link
                      to={AppRoutes.ADMIN_TICKETS.path}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center"
                    >
                      Tickets
                    </Link>
                    <Link
                      to={AppRoutes.ADMIN_LOGS.path}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center"
                    >
                      Logs
                    </Link>
                  </>
                ) : (
                  <Link
                    to={AppRoutes.TICKETS.path}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center"
                  >
                    Tickets
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PanelView;