import { useEffect, useState } from "react"
import { UserCard } from "./components/UserCard"
import type { User } from "./types/UserProps"
import { SearchComponent } from "./components/SearchComponent"
import { InputGroupComponent } from "./components/InputGroupComponent"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRef } from 'react'

function App() {

  const API_URL = "https://6a0736e6c83ba8ad9b3ea62e.mockapi.io/api/v1/users"

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [name, setName] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")

  const [editingId, setEditingId] = useState<string | number | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [emailError, setEmailError] = useState(false)



  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error("Não foi possível carregar dados.")
      const data = await response.json()
      setUsers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])


  const handleDelete = async (id: string | number) => {
    if (!confirm("Tem certeza de que deseja excluir este funcionário?")) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        loadUsers()

        toast.success("Funcionário removido com sucesso!")
        if (id === editingId) {
          setEditingId(null)
          setName("")
          setEmail("")
          setRole("")
        }
      }
    } catch (error) {
      toast.error("Erro ao deletar")

    }


  }

  const startEdit = (user: User) => {
    setEditingId(user.id)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setAvatar(user.avatar)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !role.trim()) return toast.warning("Preencha todos os campos!")

    if (!editingId) {
      const userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase())

      if (userExists) {
        toast.error("Este e-mail já está cadastrado!")
        setEmailError(true)
        emailInputRef.current?.focus()
        return
      }
    }
    setEmailError(false)
    const userData: Omit<User, 'id'> = {
      name,
      email,
      role,
      avatar: editingId ? avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    }

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        setName("")
        setEmail("")
        setRole("")

        loadUsers()

        const msg = editingId ? "Cadastro atualizado!" : "Novo funcionário cadastrado!"
        toast.info(msg)
      }
    } catch (error) {
      console.error("Erro ao salvar:", error)
    }
  }



  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )


  return (
    <main className="min-h-screen w-full  md:flex-row md:justify-center
     bg-slate-200 flex flex-col items-center p-6
md:p-6">
      <div className="flex flex-col md:flex-row md:w-full">
        <div className="md:w-250 lg:w-1/2 py-5 md:mr-7 mb-6 bg-blue-200 rounded-4xl p-2 items-center">
          <h2 className="uppercase text-4xl font-semibold md:pt-2 md:pb-1 text-center">Cadastro</h2>
          <form className="flex flex-col gap-2"
            onSubmit={(e) => handleSave(e)}>
            <InputGroupComponent
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChange={(val) => setName(val)}
            />
            <InputGroupComponent
              label="E-mail"
              type="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={(val) => {
                setEmail(val)
                if (emailError) setEmailError(false)
              }}
              inputRef={emailInputRef}
              hasError={emailError}
            />

            <InputGroupComponent
              label="Cargo"
              placeholder="Digite a sua função"
              value={role}
              onChange={(val) => setRole(val)}
            />

            <button
              className="uppercase font-semibold h-9 text-lg self-center w-1/2 bg-green-600 rounded-xl hover:bg-green-700 text-white mt-4"
            >
              {editingId ? "Atualizar" : "Salvar"}
            </button>
            {editingId && (
              <button
                className="text-lg uppercase font-semibold rounded-xl hover:bg-red-800 text-white bg-red-600 w-1/2 self-center h-9 mt-2"
                onClick={() => {
                  setEditingId(null)
                  setName("")
                  setEmail("")
                  setRole("")
                }}
              >
                Cancelar Edição
              </button>
            )}
          </form>

        </div>

        <div className="md:w-2/3 lg:1/2 gap-6 flex flex-col justify-center text-center md:bg-blue-200 md:p-2 rounded-4xl">
          <h2 className="uppercase text-4xl font-semibold pt-6">Lista de Funcionários</h2>
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
                onDelete={() => handleDelete(item.id)}
                onUpdate={() => startEdit(item)}
                {...item}
              />

            ))}
          </article>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
      />
    </main >

  )
}

export default App
