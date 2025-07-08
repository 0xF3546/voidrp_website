"use client"

import { Leaderboard } from "@mui/icons-material"
import { Avatar } from "@mui/joy"
import { useState, useEffect } from "react"
import { CenteredLoader } from "../utils/UIUtils"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"

export const LeaderboardView = () => {
  const [data, setData] = useState<any[]>([])
  const [leaderBoardInfo, setLeaderboardInfo] = useState<any>({})
  const [isLoading, setLoading] = useState(false)
  const { type } = useParams()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [leaderboardResponse, infoResponse] = await Promise.all([
          axios.get(`/leaderboard/${type}`),
          axios.get(`/leaderboard-info/${type}`),
        ])

        setData(leaderboardResponse.data)
        setLeaderboardInfo(infoResponse.data)
      } catch (error) {
        console.error("Error loading leaderboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [type])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <CenteredLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <div className="mt-20 w-full max-w-2xl mx-auto px-4 py-6 space-y-8">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-24 w-24 bg-gradient-to-br from-orange-500 to-orange-600">
            <Leaderboard className="text-3xl" />
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold text-gray-200">Leaderboard - {leaderBoardInfo.display}</h1>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Top 10</h2>
            <div className="space-y-3">
              {data.slice(0, 10).map((player, index) => (
                <Player
                  key={player.uuid}
                  username={player.player_name}
                  rank={index + 1}
                  uuid={player.uuid}
                  level={player.level}
                  type={leaderBoardInfo.type}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Top 50</h2>
            <div className="space-y-3">
              {data.slice(10, 50).map((player, index) => (
                <Player
                  key={player.uuid}
                  username={player.player_name}
                  rank={index + 11}
                  uuid={player.uuid}
                  level={player.level}
                  type={leaderBoardInfo.type}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Top 100</h2>
            <div className="space-y-3">
              {data.slice(50, 100).map((player, index) => (
                <Player
                  key={player.uuid}
                  username={player.player_name}
                  rank={index + 51}
                  uuid={player.uuid}
                  level={player.level}
                  type={leaderBoardInfo.type}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const Player = ({ rank, username, uuid, level, type, index = 0 }: any) => {
  return (
    <motion.div
      className="flex gap-4 items-center rounded-lg bg-gray-800 shadow-md p-4 transform hover:scale-105 transition-transform"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ scale: 1.03 }}
    >
      <Avatar className="w-14 h-14 border hover:scale-110 transition-transform">
        <img src={`https://crafatar.com/avatars/${uuid}`} alt={`Avatar of ${username}`} />
      </Avatar>

      <div className="grid gap-1">
        <h3 className="font-semibold text-gray-200">
          <span
            className={`font-bold ${
              rank === 1
                ? "text-yellow-300"
                : rank === 2
                  ? "text-yellow-500"
                  : rank === 3
                    ? "text-yellow-600"
                    : "text-orange-500"
            }`}
          >
            #{rank}
          </span>
          <span className="ml-2">{username}</span>
          <span className="ml-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            {`${type} ${level}`}
          </span>
        </h3>
      </div>
    </motion.div>
  )
}

