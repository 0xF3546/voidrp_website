import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

interface FactionMember {
  player_name: string;
  uuid: string;
  isLeader: boolean;
  faction_grade: string;
}

interface Faction {
  name: string;
  fullname: string;
  bank: number;
  maxMember: number;
  hasBlacklist: boolean;
  hasLaboratory: boolean;
  doGangwar: boolean;
  isActive: boolean;
  isBadFrak: boolean;
  motd: string;
  equipPoints: number;
  type: string;
  description: string;
  image: string;
  members: FactionMember[];
}

const FactionPage = () => {
  const { name } = useParams<{ name: string }>();
  const [faction, setFaction] = useState<Faction | null>(null);
  const [formData, setFormData] = useState<Partial<Faction>>({});
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>();
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchFaction = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/admin/factions/${name?.toLowerCase()}`);
        if (response.status !== 200) {
          throw new Error("Failed to load faction details.");
        }
        const data: Faction = response.data;
        console.log("Faction Data:", data); // Debug: Log API response
        setFaction(data);
        setFormData({
          maxMember: data.maxMember,
          hasBlacklist: data.hasBlacklist,
          hasLaboratory: data.hasLaboratory,
          doGangwar: data.doGangwar,
          isActive: data.isActive,
          isBadFrak: data.isBadFrak,
          description: data.description,
          image: data.image,
        });
        setErrorMessage(undefined);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
        console.error("Fetch error:", error); // Debug: Log error
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchFaction();
    } else {
      setErrorMessage("Invalid faction name.");
      setLoading(false);
    }
  }, [name]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : name === "maxMember" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/admin/factions/${name?.toLowerCase()}`, formData);
      if (response.status !== 200) {
        throw new Error("Failed to update faction.");
      }
      setFaction((prev) => (prev ? { ...prev, ...formData } : null));
      setIsEditing(false);
      setUpdateSuccess(true);
      setUpdateError(undefined);
      setTimeout(() => setUpdateSuccess(false), 3000); // Hide success message after 3s
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : "An error occurred.");
      console.error("Update error:", error); // Debug: Log error
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-neutral-900 min-h-screen p-6 font-satoshi">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Fraktion: {faction?.fullname || name}</h1>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-300 text-center text-base"
          >
            Lade Fraktionsdetails...
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

        {faction && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* General Info */}
            <div className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg">
              <h2 className="text-xl font-semibold text-orange-400 mb-4">Allgemeine Informationen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Name</span>
                  <span className="text-sm text-white">{faction.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Vollständiger Name</span>
                  <span className="text-sm text-white">{faction.fullname}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Bankguthaben</span>
                  <span className="text-sm text-white">{faction.bank.toLocaleString("de-DE")} €</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Maximale Mitglieder</span>
                  <span className="text-sm text-white">{faction.maxMember}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Typ</span>
                  <span className="text-sm text-white">{faction.type}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-neutral-300">Ausrüstungspunkte</span>
                  <span className="text-sm text-white">{faction.equipPoints}</span>
                </div>
              </div>
            </div>

            {/* Editable Settings */}
            <div className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-orange-400">Einstellungen</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500/80 rounded-lg hover:bg-orange-600/80 transition-colors"
                >
                  {isEditing ? "Abbrechen" : "Bearbeiten"}
                </motion.button>
              </div>

              {updateSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-green-500/10 border-l-4 border-green-500 text-green-400 p-4 mb-4 rounded-lg"
                >
                  Fraktion erfolgreich aktualisiert.
                </motion.div>
              )}

              {updateError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 mb-4 rounded-lg"
                >
                  {updateError}
                </motion.div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="hasBlacklist"
                        checked={formData.hasBlacklist ?? false}
                        onChange={handleInputChange}
                        className="form-checkbox text-orange-400"
                      />
                      <span className="text-sm text-neutral-300">Blacklist aktiv</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="hasLaboratory"
                        checked={formData.hasLaboratory ?? false}
                        onChange={handleInputChange}
                        className="form-checkbox text-orange-400"
                      />
                      <span className="text-sm text-neutral-300">Labor vorhanden</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="doGangwar"
                        checked={formData.doGangwar ?? false}
                        onChange={handleInputChange}
                        className="form-checkbox text-orange-400"
                      />
                      <span className="text-sm text-neutral-300">Gangkrieg teilnehmen</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive ?? false}
                        onChange={handleInputChange}
                        className="form-checkbox text-orange-400"
                      />
                      <span className="text-sm text-neutral-300">Aktiv</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isBadFrak"
                        checked={formData.isBadFrak ?? false}
                        onChange={handleInputChange}
                        className="form-checkbox text-orange-400"
                      />
                      <span className="text-sm text-neutral-300">Bad Fraktion</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Maximale Mitglieder</label>
                      <input
                        type="number"
                        name="maxMember"
                        value={formData.maxMember || 0}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 text-sm rounded-lg bg-neutral-800/50 border border-neutral-700/50 text-white placeholder-neutral-400 focus:outline-none focus:border-orange-400 transition-colors"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Beschreibung</label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-sm rounded-lg bg-neutral-800/50 border border-neutral-700/50 text-white placeholder-neutral-400 focus:outline-none focus:border-orange-400 transition-colors"
                      rows={5}
                    />
                  </div>
                  <div className="pt-4">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Bild-URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-sm rounded-lg bg-neutral-800/50 border border-neutral-700/50 text-white placeholder-neutral-400 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500/80 rounded-lg hover:bg-orange-600/80 transition-colors"
                  >
                    Speichern
                  </motion.button>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Blacklist</span>
                    <span className="text-sm text-white">{faction.hasBlacklist ? "Ja" : "Nein"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Labor</span>
                    <span className="text-sm text-white">{faction.hasLaboratory ? "Ja" : "Nein"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Gangkrieg</span>
                    <span className="text-sm text-white">{faction.doGangwar ? "Ja" : "Nein"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Aktiv</span>
                    <span className="text-sm text-white">{faction.isActive ? "Ja" : "Nein"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Bad Fraktion</span>
                    <span className="text-sm text-white">{faction.isBadFrak ? "Ja" : "Nein"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-neutral-300">Maximale Mitglieder</span>
                    <span className="text-sm text-white">{faction.maxMember}</span>
                  </div>
                  <div className="flex flex-col py-2">
                    <span className="text-sm font-medium text-neutral-300 mb-2">Beschreibung</span>
                    <span className="text-sm text-white">{faction.description || "Keine"}</span>
                  </div>
                  <div className="flex flex-col py-2">
                    <span className="text-sm font-medium text-neutral-300 mb-2">Bild</span>
                    {faction.image ? (
                      <a
                        href={faction.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-400 hover:underline"
                      >
                        Anzeigen
                      </a>
                    ) : (
                      <span className="text-sm text-white">Kein Bild</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MOTD */}
            <div className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg">
              <h2 className="text-xl font-semibold text-orange-400 mb-4">MOTD</h2>
              <p className="text-sm text-white">{faction.motd || "Keine MOTD gesetzt."}</p>
            </div>

            {/* Members */}
            {faction.members && faction.members.length > 0 && (
              <div className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-700/50 backdrop-blur-sm shadow-lg">
                <h2 className="text-xl font-semibold text-orange-400 mb-4">Mitglieder</h2>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 px-4 py-3 text-sm font-medium text-neutral-300 bg-neutral-800/50 rounded-lg">
                    <span>Name</span>
                    <span>Rang</span>
                    <span>Leader</span>
                  </div>
                  {faction.members.map((member, index) => (
                    <Link
                      key={member.uuid}
                      to={`/panel/admin/players/${member.uuid}`}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="grid grid-cols-3 gap-4 px-4 py-3 text-sm bg-neutral-800/30 rounded-lg hover:bg-neutral-700/30 transition-colors"
                      >
                        <span className="text-white">{member.player_name}</span>
                        <span className="text-white">{member.faction_grade || "N/A"}</span>
                        <span className="text-white">{member.isLeader ? "Ja" : "Nein"}</span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FactionPage;