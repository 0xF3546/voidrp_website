import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlayerListPlayer } from "../../types/PlayerListPlayer";
import Pagination from "../../components/Pagination";
import { PlayerListPlayerResponse } from "../../types/PlayerListResponse";
import axios from "axios";

const PlayersListPage = () => {
  const [players, setPlayers] = useState<PlayerListPlayerResponse>({
    items: [],
    total: 0,
    page: 1,
    size: 0,
  });
  const [onlyOnline, setOnlyOnline] = useState(true); // Default to "Nur Online"
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<"playername" | "online">("playername");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [errorMessage, setErrorMessage] = useState<string>();
  const playersPerPage = 100;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `/admin/players?onlyOnline=${onlyOnline}&page=${currentPage}&size=${playersPerPage}&search=${encodeURIComponent(searchTerm)}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to load players. Please try again.");
        }
        const data: PlayerListPlayerResponse = response.data;
        console.log("API Response:", data); // Debug: Log API response
        setPlayers(data);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
        console.error("Fetch error:", error); // Debug: Log error
      }
    };

    fetchPlayers();
  }, [currentPage, onlyOnline, searchTerm]);

  const handleSort = (field: "playername" | "online") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const sortedPlayers = [...players.items].sort((a, b) => {
    if (sortField === "playername") {
      const nameA = a.player_name.toLowerCase();
      const nameB = b.player_name.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
    // Placeholder for online sorting (needs API support)
    return 0;
  });

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  console.log("Current Players:", currentPlayers, "Total:", players.total, "Page:", currentPage); // Debug: Log current players

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-8 font-satoshi">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg text-white bg-neutral-900
              ${
                onlyOnline
                  ? "bg-neutral-800/80 border border-orange-400 shadow-orange-500/50"
                  : "hover:bg-neutral-800/80 hover:text-orange-500"
              }
              transition-all duration-200 backdrop-blur-sm
            `}
            onClick={() => {
              setOnlyOnline(true);
              setCurrentPage(1);
            }}
          >
            Nur Online
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg text-white bg-neutral-900
              ${
                !onlyOnline
                  ? "bg-neutral-800/80 border border-orange-400 shadow-orange-500/50"
                  : "hover:bg-neutral-800/80 hover:text-orange-500"
              }
              transition-all duration-200 backdrop-blur-sm
            `}
            onClick={() => {
              setOnlyOnline(false);
              setCurrentPage(1);
            }}
          >
            Alle Spieler
          </motion.button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Spieler suchen..."
            className="px-4 py-2 text-sm rounded-lg bg-neutral-900 border border-neutral-700/50 text-white placeholder-neutral-400 focus:outline-none focus:border-orange-400 transition-all duration-200"
          />
        </div>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-4 mb-8 rounded-lg backdrop-blur-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 px-4 py-2 text-sm font-medium text-neutral-400 bg-neutral-800/80 rounded-lg">
          <button
            onClick={() => handleSort("playername")}
            className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
          >
            <span>Spielername</span>
            {sortField === "playername" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sortOrder === "asc" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                />
              </svg>
            )}
          </button>
          <span>UUID</span>
          <button
            onClick={() => handleSort("online")}
            className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
          >
            <span>Status</span>
            {sortField === "online" && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sortOrder === "asc" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                />
              </svg>
            )}
          </button>
        </div>
        {currentPlayers.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-400 text-center text-sm"
          >
            Keine Spieler gefunden.
          </motion.p>
        ) : (
          currentPlayers.map((player: PlayerListPlayer, index: number) => (
            <motion.div
              key={player.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="grid grid-cols-3 gap-4 bg-neutral-900 p-4 rounded-lg border border-neutral-700/50 hover:bg-neutral-800/80 transition-all duration-200 backdrop-blur-sm"
            >
              <Link to={player.uuid} className="text-base font-semibold text-white hover:text-orange-400 transition-colors">
                {player.player_name}
              </Link>
              <span className="text-sm text-neutral-400">{player.uuid}</span>
              <span
                className={`text-sm ${
                  onlyOnline ? "text-green-400" : "text-neutral-400"
                }`}
              >
                {onlyOnline ? "Online" : "Unknown"}
              </span>
            </motion.div>
          ))
        )}
      </div>

      <div className="mx-auto mt-6">
        <Pagination
          totalItems={players.total}
          itemsPerPage={playersPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PlayersListPage;