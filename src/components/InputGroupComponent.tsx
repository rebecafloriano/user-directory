import { type InputProps } from "../types/InputProps"

export const InputGroupComponent = ({ label, placeholder, value, hasError, inputRef, onChange}: InputProps) => {
  return (
    <div>

      <label className="text-sm" htmlFor={label}>{ label}</label>
      <input
        /// <reference path="" />
        ref={inputRef}
        className={`block w-full pl-10 pr-4 py-2.5 
                           rounded-xl border  bg-white 
                           placeholder:text-slate-400 focus:outline-none 
                           focus:ring-2 transition-all ${hasError ? "border-red-500 focus:ring-red-500" : "border-slate-300  focus:ring-blue-500"}`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}