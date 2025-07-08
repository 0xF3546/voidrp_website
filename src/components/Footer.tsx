"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import GavelIcon from "@mui/icons-material/Gavel"
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"
import ContactPageIcon from "@mui/icons-material/ContactPage"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupIcon from "@mui/icons-material/Group"
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode"
import { motion } from "framer-motion"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-10 w-full border-t border-gray-800">
      {/* Disclaimer / Copyright */}
      <Typography variant="body2" className="text-xs text-center text-gray-400 px-4 mb-8">
        Void Roleplay steht nicht in Verbindung zu Mojang, Minecraft oder Microsoft.
      </Typography>

      {/* Links Section */}
      <Box className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between gap-8 px-6">
        {/* Legal Links */}
        <Box className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <FooterLink to="/imprint" icon={<GavelIcon />} text="Impressum" />
          <FooterLink to="/privacy-policy" icon={<PrivacyTipIcon />} text="Datenschutzerklärung" />
          <FooterLink to="/contact" icon={<ContactPageIcon />} text="Kontakt" />
        </Box>

        {/* External Links */}
        <Box className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <FooterLink to="https://shop.voidroleplay.de" icon={<ShoppingCartIcon />} text="Shop" />
          <FooterLink to="/team" icon={<GroupIcon />} text="Team" />
          <FooterLink to="https://discord.gg/void-roleplay" icon={<InterpreterModeIcon />} text="Discord" />
        </Box>
      </Box>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500">
        <p>© {currentYear} Void Roleplay. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  )
}

const FooterLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to={to} className="text-sm flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors">
      <span className="text-orange-500">{icon}</span> {text}
    </Link>
  </motion.div>
)

export default Footer

