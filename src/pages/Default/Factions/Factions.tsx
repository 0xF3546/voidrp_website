"use client"

import { Avatar } from "@mui/joy"
import { Link, useNavigate } from "react-router-dom"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import { useEffect, useState } from "react"
import { CenteredLoader } from "../../../utils/UIUtils"
import { motion } from "framer-motion"
import axios from "axios"

export const FactionsView = () => {
  const [factions, setFactions] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/faction")
        setFactions(response.data)
      } catch (error) {
        console.error("Error loading factions:", error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [navigate])

  const filteredFactions = factions.filter(
    (faction) =>
      faction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faction.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="mt-20 container mx-auto px-4 md:px-6 py-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white">Fraktionen ({factions.length})</h1>

          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Fraktion suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <CenteredLoader />
          </div>
        ) : filteredFactions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFactions.map((faction, index) => (
              <FactionCard key={faction.id} faction={faction} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Keine Fraktionen gefunden</p>
          </div>
        )}
      </div>
    </div>
  )
}

const FactionCard = ({ faction, index }: { faction: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg overflow-hidden"
    >
      <Link to={`${faction.name.toLowerCase().replace(" ", "-")}`} className="block">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {faction.image ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-700 shadow-lg flex items-center justify-center">
                  <img
                    src={faction.image || "/placeholder.svg"}
                    alt={`${faction.fullname} Logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                      e.currentTarget.onerror = null
                    }}
                  />
                </div>
              ) : (
                <Avatar className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <BusinessCenterIcon className="text-xl" />
                </Avatar>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{faction.fullname}</h3>
              <div className="text-xs text-gray-400">{faction.name}</div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium rounded-full transition-all transform hover:scale-105 shadow-md flex items-center">
              <span>Details</span>
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

