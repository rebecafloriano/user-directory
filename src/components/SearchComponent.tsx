import type { SearchProps } from "../types/SearchProps";
import { Search } from "lucide-react";

export const SearchComponent = ({ search, ...props }: SearchProps) => {


    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>

            <input
                className="block w-full pl-10 pr-4 py-2.5 
                           rounded-xl border border-slate-300 bg-white 
                           placeholder:text-slate-400 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Pesquisar funcionário..."
                type="text"
                name="search"
                id="search"
                value={search}
                {...props}
            />
        </div>
    )
}
