import type { User } from "../types/UserProps"


export const UserCard = ({ id, name, email, role, avatar, ...props }: User) => {

    return (
        <div className="w-full flex flex-col md:flex-row items-center bg-white p-3 rounded-3xl shadow-sm border border-slate-100 hover:scale-[1.01] transition-transform gap-3">

            {/* Imagem: Sempre centralizada no mobile, alinhada à esquerda no desktop */}
            <img
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-100"
                src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                alt={`Foto de ${name}`}
            />

            {/* Informações: Centralizadas no mobile, alinhadas à esquerda no desktop */}
            <div className="flex flex-col flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-slate-800">{name}</h2>
                <span className="text-sm font-medium text-blue-600 tracking-wide uppercase">
                    {role}
                </span>
            </div>

            {/* Email: Centralizado embaixo no mobile, posicionado à direita no desktop */}
            <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex justify-center md:justify-end">
                <p className="text-sm text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-full md:bg-transparent md:px-0">
                    {email}
                </p>
            </div>

        </div>
    )
}
