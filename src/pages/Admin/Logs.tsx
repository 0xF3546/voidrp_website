import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

interface Log {
  name: string;
  type: string;
  entries: number;
}

const LogsPage = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/logs");
        if (response.status !== 200) {
          throw new Error("Failed to load logs.");
        }
        const data: Log[] = response.data;
        console.log("Logs Data:", data); // Debug: Log API response
        setLogs(data);
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
        console.error("Fetch error:", error); // Debug: Log error
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-6 font-satoshi">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Log-Übersicht</h1>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-base"
          >
            Lade Logs...
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

        {!loading && logs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-sm"
          >
            Keine Logs gefunden.
          </motion.p>
        )}

        {!loading && logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {logs.map((log, index) => (
              <Link
                key={log.type}
                to={`/admin/logs/${log.type}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-neutral-900/80 p-5 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg hover:bg-neutral-800/80 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">{log.name}</h2>
                    <p className="text-sm font-medium text-orange-400">
                      {log.entries.toLocaleString("de-DE")} Einträge
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LogsPage;