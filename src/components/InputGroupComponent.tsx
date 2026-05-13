import { type InputProps } from "../types/InputProps"

export const InputGroupComponent = ({ label, placeholder, value, type, onChange, ...props }: InputProps) => {
  return (
    <div>

      <label className="text-sm" htmlFor={label}>{ label}</label>
      <input
        className="block w-full pl-10 pr-4 py-2.5 
                           rounded-xl border border-slate-300 bg-white 
                           placeholder:text-slate-400 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}