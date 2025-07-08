import { type InputHTMLAttributes, forwardRef } from "react"

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, IInput>(({ className = "", error, label, id, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`
                    bg-gray-800 text-white border transition-all duration-200
                    ${error ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-orange-500"}
                    rounded-md focus:outline-none focus:ring-2 px-4 py-2.5
                    ${className}
                `}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
})

export default Input

