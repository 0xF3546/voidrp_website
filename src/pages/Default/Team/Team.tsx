import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Avatar } from "@mui/joy"
import GroupsIcon from "@mui/icons-material/Groups"
import { CenteredLoader } from "../../../utils/UIUtils"
import { motion } from "framer-motion"
import axios from "axios"

export const TeamView = () => {
  const navigate = useNavigate()
  const [team, setTeam] = useState<any>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/team")
        const teamData = response.data

        if (teamData === null) {
          navigate("/")
          return
        }

        setTeam(teamData)
      } catch (error) {
        console.error("Error loading team data:", error)
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <CenteredLoader />
      </div>
    )
  }

  if (!team) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
      <div className="mt-20 w-full max-w-2xl mx-auto px-4 py-6 space-y-8">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="h-24 w-24 bg-gradient-to-br from-orange-500 to-orange-600">
            <GroupsIcon className="text-3xl" />
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-3xl font-bold text-white">Serverteam</h1>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="grid gap-4">
            {team.map((player: any, index: number) => (
              <Player
                key={player.uuid}
                username={player.player_name}
                rank={player.rang}
                uuid={player.uuid}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Player = ({ username, uuid, rank, index = 0 }: any) => {
  return (
    <motion.div
      className="flex gap-4 items-center rounded-lg bg-gray-800 shadow-lg p-6 transform hover:scale-105 hover:bg-gray-700 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ scale: 1.03 }}
    >
      <Avatar className="w-16 h-16 border-2 border-orange-500 bg-gray-900">
        <img src={`https://crafatar.com/avatars/${uuid}`} alt={`Avatar of ${username}`} className="rounded-full" />
      </Avatar>
      <div className="grid gap-1">
        <h3 className="font-bold text-xl text-white">{username}</h3>
        <p className="text-sm text-gray-400">{rank}</p>
      </div>
    </motion.div>
  )
}

