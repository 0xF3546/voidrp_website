"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar } from "@mui/joy"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import ApartmentIcon from "@mui/icons-material/Apartment"
import GroupsIcon from "@mui/icons-material/Groups"
import StarIcon from "@mui/icons-material/Star"
import { CenteredLoader } from "../../../utils/UIUtils"
import { motion } from "framer-motion"
import axios from "axios"

export const FactionView = () => {
  const { faction } = useParams()
  const navigate = useNavigate()
  const [factionData, setFaction] = useState<any>()
  const [isLoading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("members")

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/faction/${faction}`)
        const companyData = response.data

        if (companyData === null) {
          navigate("/factions")
          return
        }

        // Clean up member data to ensure no extra properties
        const sortedMembers = [...companyData.member]
          .sort((a, b) => b.faction_grade - a.faction_grade)
          .map((member) => ({
            uuid: member.uuid,
            player_name: member.player_name,
            faction_grade: member.faction_grade,
            isLeader: member.isLeader,
          }))

        companyData.member = sortedMembers
        setFaction(companyData)
      } catch (error) {
        console.error("Error loading faction data:", error)
        navigate("/factions")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [faction, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <CenteredLoader />
      </div>
    )
  }

  if (!factionData) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
      <div className="mt-20 w-full max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Header */}
        <motion.div
          className="relative overflow-hidden rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-90"></div>
          <div className="relative z-10 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {factionData.faction.image ? (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-700 shadow-lg flex items-center justify-center">
                  <img
                    src={factionData.faction.image || "/placeholder.svg"}
                    alt={`${factionData.faction.fullname} Logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                      e.currentTarget.onerror = null
                    }}
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                  <BusinessCenterIcon className="text-white text-5xl" />
                </div>
              )}

              <div className="grid gap-2 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-white">{factionData.faction.fullname}</h2>
                {factionData.faction.description && factionData.faction.description.trim() !== "" ? (
                  <p className="text-gray-300 mt-2 mb-4 max-w-2xl">{factionData.faction.description}</p>
                ) : (
                  <p className="text-gray-400 italic mt-2 mb-4">Keine Beschreibung verfügbar</p>
                )}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full">
                    <GroupsIcon className="text-orange-400 mr-2" />
                    <span className="text-gray-300">
                      Mitglieder:{" "}
                      <span className="font-bold text-white">{`${factionData.member.length}/${factionData.faction.maxMember}`}</span>
                    </span>
                  </div>
                  {/* Removed ID display */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === "members"
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Mitglieder
          </button>
          {factionData.gangwarZones && factionData.gangwarZones.length >= 1 && (
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "zones"
                  ? "text-orange-400 border-b-2 border-orange-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("zones")}
            >
              Gangwar-Gebiete
            </button>
          )}
        </div>

        {/* Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {activeTab === "members" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {factionData.member?.map((player: any) => (
                <div key={player.uuid} className="flex-1">
                  <Player
                    username={player.player_name}
                    rank={player.faction_grade}
                    uuid={player.uuid}
                    isLeader={player.isLeader === 1}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "zones" && factionData.gangwarZones && factionData.gangwarZones.length >= 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {factionData.gangwarZones.map((zone: any, index: number) => (
                <GangwarZone key={zone.zone} name={zone.zone} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <Link
            to="/factions"
            className="inline-flex items-center px-5 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Zurück zur Übersicht</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

const Player = ({ username, uuid, rank, isLeader = false }: any) => {
  return (
    <motion.div
      className="relative flex gap-4 items-center rounded-2xl bg-gray-800 shadow-lg p-6 transform hover:scale-105 hover:bg-gray-700 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      {isLeader && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full p-1.5 shadow-lg z-10">
          <StarIcon className="text-white text-sm" />
        </div>
      )}

      <Avatar className="w-16 h-16 border-2 border-orange-500 bg-gray-900 rounded-2xl">
        <img src={`https://crafatar.com/avatars/${uuid}`} alt={`Avatar of ${username}`} className="rounded-xl" />
      </Avatar>

      <div>
        <h3 className="font-bold text-xl text-white mb-1">{username}</h3>
        <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-orange-500 text-white whitespace-nowrap">
          Rang {rank}
        </span>
      </div>
    </motion.div>
  )
}

const GangwarZone = ({ name, index = 0 }: any) => {
  return (
    <motion.div
      className="flex gap-4 items-center rounded-2xl bg-gray-800 shadow-lg p-6 transform hover:scale-105 hover:bg-gray-700 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
        <ApartmentIcon className="text-white text-3xl" />
      </div>
      <div className="grid gap-1">
        <h3 className="font-bold text-xl text-white">{name}</h3>
        <p className="text-sm text-gray-400">Gangwar-Gebiet</p>
      </div>
    </motion.div>
  )
}

