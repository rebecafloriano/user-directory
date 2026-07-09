import type { User } from "../types/UserProps"
interface UserCardProps extends User {
    onDelete: () => void
    onUpdate: () => void
}

export const UserCard = ({ name, email, role, avatar, onDelete, onUpdate }: UserCardProps) => {


    return (
        <div className="w-full flex flex-col md:flex-row items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100 hover:scale-[1.01] transition-transform gap-4">

            

            {/* Imagem */}
            <img
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-slate-100 shrink-0"
                src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                alt={`Foto de ${name}`}
            />

            <div className="flex flex-col flex-1 text-center md:text-left min-w-0">

                <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate">{name}</h2>
                <span className="text-xs md:text-sm font-medium text-blue-600 tracking-wide uppercase">
                    {role}
                </span>
            </div>

            <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end shrink-0">
                <p className="text-xs md:text-sm text-slate-500 font-medium px-4 md:px-0 py-2 rounded-full border border-slate-100 md:border-none">
                    {email}
                </p>
            </div>
            <div className="flex gap-2" >
                <button
                    className="uppercase bg-yellow-700 p-1 rounded-lg text-white text-sm font-semibold hover:bg-yellow-800"
                    onClick={onUpdate}
                >
                    Editar
                </button>
                <button
                    className="uppercase bg-red-700 p-2 rounded-lg text-white text-sm font-semibold hover:bg-red-800"
                    onClick={onDelete}
                >
                    excluir
                </button>
                
            </div>
        </div>
    )
}
