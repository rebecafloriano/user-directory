import { useState } from "react"
import { UserCard } from "./components/UserCard"
import type { User } from "./types/UserProps"
import { SearchComponent } from "./components/SearchComponent"


function App() {
  const mockUsers: User[] = [
    { id: 1, name: "Rebeca Erdman", email: "rebecaoliver09@gmail.com", role: "Frontend Dev", avatar: "" },
    { id: 2, name: "Miguel Erdman", email: "miguelerdman@gmail.com", role: "Backend Dev", avatar: "" },
    { id: 3, name: "Gabriel Erdman", email: "gabrielerdman@gmail.com", role: "Fullstack Dev", avatar: "" },
    { id: 4, name: "João Silva", email: "João Silva@gmail.com", role: "Cozinheiro", avatar: "" },
    { id: 5, name: "Raquel Santos", email: "raquelsantos@gmail.com", role: "manicure", avatar: "" },

  ]
  const [users, setUsers] = useState<User[]>(mockUsers)

  return (
    <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center p-6
md:p-12">

      <h1 className="text-4xl font-bold pt-6 pb-6">Lista de Funcionários</h1>
      <div className=" gap-6 flex flex-col justify-center">
        <section>
          <SearchComponent
            search={""}
          />

        </section>
        <article className="flex flex-col gap-3">
          {users.map((item) => (
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
