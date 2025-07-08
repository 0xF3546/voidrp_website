import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

interface Faction {
  fullname: string;
  name: string;
  members: number;
}

const FactionsPage = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [sortField, setSortField] = useState<"fullname" | "members">("fullname");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/factions");
        if (response.status !== 200) {
          throw new Error("Failed to load factions.");
        }
        const data: Faction[] = response.data;
        console.log("Factions Data:", data); // Debug: Log API response
        setFactions(data);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
        console.error("Fetch error:", error); // Debug: Log error
      } finally {
        setLoading(false);
      }
    };

    fetchFactions();
  }, []);

  const handleSort = (field: "fullname" | "members") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedFactions = [...factions].sort((a, b) => {
    if (sortField === "fullname") {
      const nameA = a.fullname.toLowerCase();
      const nameB = b.fullname.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else {
      return sortOrder === "asc" ? a.members - b.members : b.members - a.members;
    }
  });

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-6 font-satoshi">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Fraktionen-Übersicht</h1>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-base"
          >
            Lade Fraktionen...
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

        {!loading && factions.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-sm"
          >
            Keine Fraktionen gefunden.
          </motion.p>
        )}

        {!loading && factions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4 px-4 py-3 text-sm font-medium text-neutral-300 bg-neutral-800/50 rounded-lg">
              <button
                onClick={() => handleSort("fullname")}
                className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
              >
                <span>Name</span>
                {sortField === "fullname" && (
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
              <button
                onClick={() => handleSort("members")}
                className="flex items-center space-x-1 hover:text-orange-400 transition-colors"
              >
                <span>Mitglieder</span>
                {sortField === "members" && (
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
            {sortedFactions.map((faction, index) => (
              <Link
                key={faction.fullname}
                to={`${faction.name.toLowerCase()}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="grid grid-cols-2 gap-4 px-4 py-3 text-sm bg-neutral-900/80 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:bg-neutral-800/80 transition-colors"
                >
                  <span className="text-white font-semibold">{faction.fullname}</span>
                  <span className="text-orange-400 text-right">
                    {faction.members.toLocaleString("de-DE")} Mitglieder
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FactionsPage;