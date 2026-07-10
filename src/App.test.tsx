import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

let mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg"

    }
]

describe('Deve renderizar os componentes corretamente', () => { 

    beforeEach(() => {
        // Resetamos a lista para o estado inicial antes de cada teste
        mockUsers = [
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                role: "Developer",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg"
            }
        ];

        // Tornamos o fetch dinâmico
        vi.stubGlobal('fetch', vi.fn(async ( options) => {
            // Se as opções tiverem método POST ou PUT, simulamos a gravação
            if (options && (options.method === 'POST' || options.method === 'PUT')) {
                const body = JSON.parse(options.body);
                const newUser = { id: Date.now(), ...body };
                mockUsers.push(newUser); // Adiciona o novo usuário à lista!

                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(newUser),
                });
            }

            // Caso contrário (GET padrão), devolve a lista atualizada
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUsers),
            });
        }));
    });
    

    it('Deve renderizar o componente InputGroupComponent', () => {
        render(<App />)

        const inputName = screen.getByPlaceholderText(/Digite seu nome/i)        
        expect(inputName).toBeInTheDocument()

    })

    it('Deve renderizar o componente SearchComponent', () => {
        render(<App />)

        const searchInput = screen.getByPlaceholderText(/Pesquisar funcionário.../i)
        expect(searchInput).toBeInTheDocument()

    })

    it('Deve renderizar o componente UserCard', async () => {
        render(<App />)

        const userCardButton = await screen.findByRole("button", { name: /Editar/i })
        expect(userCardButton).toBeInTheDocument()

    })
 
    it('Deve renderizar o card do funcionario que acaba de ser cadastrado', async () => {
        render(<App />)
        
        const inputName = screen.getByPlaceholderText(/Digite seu nome/i)
        fireEvent.change(inputName, { target: { value: "Rebeca" } })
        const inputEmail = screen.getByPlaceholderText(/Digite o seu e-mail/i)
        fireEvent.change(inputEmail, { target: { value: "rebeca@email.com" } })
        const inputRole = screen.getByPlaceholderText(/Digite a sua função/i)
        fireEvent.change(inputRole, { target: { value: "Front-End Dev" } })
        const saveButton = screen.getByRole("button", { name: /salvar/i })
        fireEvent.click(saveButton)

        //Pegando o userCard
        const email = await screen.findByText(/rebeca@email.com/i)
        expect(email).toBeInTheDocument()

    })

 })