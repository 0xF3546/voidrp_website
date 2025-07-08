"use client"

import type React from "react"

import { useState } from "react"
import Label from "../../../components/Label"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import LoadingBar from "../../../components/LoadingBar"
import { useAuthProvider } from "../../../hooks/useAuthProvider"
import { motion } from "framer-motion"

const LoginView = () => {
  const [form, setForm] = useState({ user: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { login } = useAuthProvider()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setErrorMessage("")
      await login(form)
    } catch (err: any) {
      console.error(err)
      if (err.response) {
        setErrorMessage(err.response.data.error)
      } else {
        setErrorMessage(err.message || "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <LoadingBar active={loading} />

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl border-2 border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Void Roleplay</h2>
          </motion.div>

          {errorMessage && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>{errorMessage}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label required>
                Spielername
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Notch"
                name="user"
                value={form.user}
                onChange={handleChange}
                className="w-full"
                required
                disabled={loading}
                autoComplete="username"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Label required>
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                value={form.password}
                name="password"
                onChange={handleChange}
                className="w-full"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button type="submit" className="w-full mt-6" disabled={loading} fullWidth>
                {loading ? "Wird angemeldet..." : "Login"}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  )
}

export default LoginView

