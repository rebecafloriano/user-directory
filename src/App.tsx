import { useEffect, useState } from "react"
import { UserCard } from "./components/UserCard"
import type { User } from "./types/UserProps"
import { SearchComponent } from "./components/SearchComponent"
import { InputGroupComponent } from "./components/InputGroupComponent"


function App() {

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {

    setLoading(true)
    setError(null)

    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Não foi possível carregar os dados do servidor.")
        }
        return response.json()

      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])



  return (
    <main className="min-h-screen w-full md:flex-row md:justify-center
     bg-slate-200 flex flex-col items-center p-6
md:p-3">
      <div className="flex flex-col md:flex-row md:w-full">
        <div className="md:w-250 lg:w-1/2 py-5 md:mr-7 mb-6 bg-blue-200 rounded-4xl p-2 items-center">
          <h2 className="text-4xl font-semibold md:pt-6 md:pb-6 text-center">Cadastro</h2>
          <form className="flex flex-col gap-2"
            bindsubmit="
          ">
            <InputGroupComponent
              label="Nome"
              placeholder="Digite seu nome"
              value=""
              onChange={""}
            />
            <InputGroupComponent
              label="E-mail"
              type="email"
              placeholder="Digite o seu e-mail"
              value=""
            />

            <InputGroupComponent
              label="Cargo"
              placeholder="Digite a sua função"
              value=""
            />

            <button className=" h-8 self-center w-1/2 border border-green-700 rounded-xl hover:bg-green-700 hover:text-white mt-4">Salvar</button>
          </form>
          
        </div>


        <div className="md:w-2/3 lg:1/2 gap-6 flex flex-col justify-center text-center md:bg-blue-200 md:p-2 rounded-4xl">
          <h2 className="text-4xl font-semibold pt-6">Lista de Funcionários</h2>
          <section>
            <SearchComponent
              search={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </section>
          <article className="flex flex-col gap-3">
            {loading && <p>A carregar...</p>}
            {error && <div className="text-red-500">Erro: {error}</div>}
            {!loading && !error && filteredUsers.map((item) => (
              < UserCard
                key={item.id}
                {...item}
              />

            ))}
          </article>
        </div>
      </div>

    </main >

  )
}

export default App
