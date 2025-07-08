import type { HTMLAttributes, ReactNode } from "react"

interface ILabel extends HTMLAttributes<HTMLLabelElement> {
  className?: string
  children: ReactNode
  required?: boolean
}

const Label = ({ className = "", children, required = false, ...rest }: ILabel) => {
  return (
    <label className={`text-gray-200 font-medium ${className}`} {...rest}>
      {children}
      {required && <span className="text-orange-500 ml-1">*</span>}
    </label>
  )
}

export default Label

