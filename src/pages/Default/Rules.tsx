"use client"

import { useState, useEffect } from "react"
import { CenteredLoader } from "../../utils/UIUtils"
import Search from "@mui/icons-material/Search"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import GavelIcon from "@mui/icons-material/Gavel"
import { motion } from "framer-motion"
import axios from "axios"

export const Rules = () => {
  const [rules, setRules] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)
  const [types, setTypes] = useState<string[]>([])
  const [areas, setAreas] = useState<string[]>([])
  const [expandedAreas, setExpandedAreas] = useState<{ [key: string]: boolean }>({})
  const [expandedTypes, setExpandedTypes] = useState<{ [key: string]: boolean }>({})
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      try {
        const response = await axios.get("/rules")
        const rulesData = response.data

        // Sort the rulesData based on the order field
        rulesData.sort((a: any, b: any) => a.order - b.order)

        const newTypes = rulesData.filter((rule: any) => rule.isType).map((rule: any) => rule.type)
        const newAreas = rulesData.filter((rule: any) => rule.isArea).map((rule: any) => rule.area)

        setRules(rulesData)
        setTypes(newTypes)
        setAreas(newAreas)

        // Set all areas and types to be expanded by default
        const initialExpandedAreas = newAreas.reduce((acc: any, area: any) => ({ ...acc, [area]: true }), {})
        const initialExpandedTypes = newTypes.reduce((acc: any, type: any) => ({ ...acc, [type]: true }), {})

        setExpandedAreas(initialExpandedAreas)
        setExpandedTypes(initialExpandedTypes)
      } catch (e) {
        console.error(e) // Handle any errors here
      }

      setLoading(false)
    }

    load()
  }, [])

  const handleAreaToggle = (area: string) => {
    setExpandedAreas((prevState) => ({ ...prevState, [area]: !prevState[area] }))
  }

  const handleTypeToggle = (type: string) => {
    setExpandedTypes((prevState) => ({ ...prevState, [type]: !prevState[type] }))
  }

  const filteredRules = rules.filter((rule) => rule.rule?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {rules.length > 0 && !isLoading ? (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
          <main className="flex-1 pt-16">
            <section className="w-full py-6">
              <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500 opacity-10 rounded-full -ml-10 -mb-10"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-4 md:max-w-xl">
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                          Regelwerk
                        </h1>
                        <p className="text-gray-300 text-lg">
                          Alle Regeln für ein faires und respektvolles Miteinander auf Void Roleplay
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-lg inline-block">
                          <GavelIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-orange-500 bg-opacity-10 border border-orange-500 border-opacity-20 rounded-xl p-4 text-center">
                    <p className="text-orange-400 font-medium text-sm md:text-base">
                      Das Void Roleplay Team behält sich vor, Spieler vom Projekt auszuschließen.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-full max-w-xl mx-auto">
                    <div className="flex items-center bg-gray-800 rounded-full shadow-md overflow-hidden border border-gray-700 h-12">
                      <div className="flex-grow">
                        <input
                          className="w-full bg-transparent border-none h-full pl-6 pr-3 text-gray-200 placeholder-gray-400 focus:outline-none text-base"
                          placeholder="Regel suchen..."
                          type="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="pr-2">
                        <button
                          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full p-2.5 hover:from-orange-600 hover:to-orange-700 transition-colors flex items-center justify-center"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Search />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="w-full pb-12">
              <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="space-y-5">
                  {areas &&
                    areas.map((area, areaIndex) => (
                      <motion.div
                        key={areaIndex}
                        className="mb-5 bg-gray-800 rounded-3xl shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: areaIndex * 0.1 }}
                      >
                        <div
                          className="flex items-center justify-between cursor-pointer bg-gradient-to-r from-gray-700 to-gray-800 p-4"
                          onClick={() => handleAreaToggle(area)}
                        >
                          <h2 className="text-xl font-bold text-white">{area}</h2>
                          <div className="bg-gray-700 p-1.5 rounded-full">
                            {expandedAreas[area] ? (
                              <ExpandLessIcon className="text-orange-400 text-base" />
                            ) : (
                              <ExpandMoreIcon className="text-orange-400 text-base" />
                            )}
                          </div>
                        </div>

                        {expandedAreas[area] && (
                          <div className="p-4">
                            {types &&
                              types.map(
                                (type, typeIndex) =>
                                  rules.some((rule) => rule.type === type && rule.area === area) && (
                                    <div key={typeIndex} className="mb-4 last:mb-0">
                                      <div
                                        className="flex items-center justify-between cursor-pointer bg-gray-700 bg-opacity-30 p-2.5 rounded-2xl mb-3"
                                        onClick={() => handleTypeToggle(type)}
                                      >
                                        <h3 className="text-base font-medium text-orange-300">{type}</h3>
                                        <div className="bg-gray-700 p-1 rounded-full">
                                          {expandedTypes[type] ? (
                                            <ExpandLessIcon className="text-gray-300 text-sm" />
                                          ) : (
                                            <ExpandMoreIcon className="text-gray-300 text-sm" />
                                          )}
                                        </div>
                                      </div>

                                      {expandedTypes[type] && (
                                        <div className="pl-3 space-y-2.5">
                                          {filteredRules.map(
                                            (rule, ruleIndex) =>
                                              rule.type === type &&
                                              rule.area === area &&
                                              !rule.isType && (
                                                <div
                                                  className="p-2.5 bg-gray-700 bg-opacity-10 rounded-2xl hover:bg-opacity-20 transition-colors"
                                                  key={ruleIndex}
                                                >
                                                  <p className="text-gray-300 text-sm">{rule.rule}</p>
                                                </div>
                                              ),
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ),
                              )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-900">
          <CenteredLoader />
        </div>
      )}
    </>
  )
}

