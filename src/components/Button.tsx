"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion } from "framer-motion"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  rounded?: "sm" | "md" | "lg" | "full"
}

const Button = ({
  className = "",
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  rounded = "lg",
  ...rest
}: IButton) => {
  const baseStyles =
    "relative overflow-hidden font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white focus:ring-orange-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    outline:
      "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500",
  }

  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  }

  const roundedStyles = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  }

  const widthStyle = fullWidth ? "w-full" : ""

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles[rounded]} ${widthStyle} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default Button

