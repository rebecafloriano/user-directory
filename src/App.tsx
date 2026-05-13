import { useEffect, useState } from "react"
import { UserCard } from "./components/UserCard"
import type { User } from "./types/UserProps"
import { SearchComponent } from "./components/SearchComponent"


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
    <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center p-6
md:p-12">

      <h1 className="text-4xl font-bold pt-6 pb-6">Lista de Funcionários</h1>
      <div className=" gap-6 flex flex-col justify-center">
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

    </main>

  )
}

export default App
