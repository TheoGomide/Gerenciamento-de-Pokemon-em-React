# Projeto Intermediário – Clean Code

## Gerenciamento de Pokémon em React

---

### **Descrição Geral**

O projeto **Gerenciamento de Pokémon em React** é uma aplicação web que simula o gerenciamento de equipes de Pokémon, permitindo que o usuário crie, edite e salve seus times.  
Esta aplicação foi originalmente desenvolvida em uma disciplina anterior e, para o projeto de **Clean Code**, foi **refatorada profundamente** com base em princípios de legibilidade, modularização e testabilidade.

---

### **Objetivos da Refatoração**

- Eliminar _code smells_ identificados no código original;
- Aplicar princípios do livro _Clean Code_ (Martin, 2008);
- Organizar o código em camadas e módulos reutilizáveis;
- Implementar uma suíte de testes unitários com cobertura mínima de 50%;
- Implementar navegação protegida e lógica de autenticação;
- Criar uma proposta de **interface fluente** (DeckBuilder); (Em andamento)
- Padronizar o estilo com **ESLint + Prettier + Husky + lint-staged**.

---

### **Principais Melhorias Implementadas**

| Categoria                        | Melhorias Aplicadas                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Arquitetura**                  | Separação por módulos (`authService`, `deckService`, `profileService`, `constants`, `Navbar`) e eliminação de acoplamentos. |
| **Autenticação**                 | Implementado serviço `authService` com persistência no `localStorage`.                                                      |
| **Rotas Protegidas**             | Adicionada verificação condicional com `ProtectedRoute`.                                                                    |
| **Navbar**                       | Refatorada para renderizar links dinâmicos conforme login/logout e manter o design original (fundo preto).                  |
| **Constantes Globais**           | Criado `shared/utils/constants.js` para rotas e chaves de armazenamento.                                                    |
| **Testes Unitários**             | Testes cobrindo `authService`, `Computer`, `Navbar`, `Profile`, `ProtectedRoute`, `storage`, `saveService` e `teamService`. |
| **Documentação e Versionamento** | Atualizados `README.md` e `CHANGELOG.md` com histórico e instruções completas.                                              |

---

### **Principais Funcionalidades**

- **Login/Logout Simulado** com armazenamento local;
- **Menu de Navegação** dinâmico (links desativados quando deslogado);
- **Rotas Protegidas** (`/Menu`, `/Party`, `/Saves`, `/Computer`, `/Profile`);
- **Gerenciamento de Time e PC (Box de Pokémons)**;
- **Edição e Persistência de Perfil** (Região, Pokémon Favorito e Avatar);
- **Sistema de Saves** com múltiplos arquivos e sobrescrita;
- **Persistência de Dados** via `localStorage`;
- **Componentização e Modularização**;
- **Testes Unitários Automatizados** com cobertura equivalente a 70%.

---

### **Arquitetura do Projeto**

```
src/
 ├─ app/
 │   ├─ Routes/
 │   │   ├─ Login.jsx
 │   │   ├─ Menu.jsx
 │   │   ├─ Party.jsx
 │   │   ├─ Saves.jsx
 │   │   ├─ Status.jsx
 │   │   ├─ Computer.jsx
 │   │   ├─ Profile.jsx
 │   │   └─ ProtectedRoute.jsx
 │   ├─ App.jsx
 │   └─ App.css
 ├─ shared/
 │   ├─ components/
 │   │   └─ Navbar.jsx
 │   ├─ data/
 │   │   └─ pokemonCatalog.js
 │   ├─ hooks/
 │   │   └─ useRoster.js
 │   ├─ images/
 │   │   ├─ charizard.jpeg
 │   │   └─ menuBkgnd.jpg
 │   ├─ services/
 │   │   ├─ authService.js
 │   │   ├─ deckService.js
 │   │   ├─ pokemonId.js
 │   │   ├─ profileService.js
 │   │   ├─ saveService.js
 │   │   └─ teamService.js
 │   ├─ sprites/
 │   │   ├─ Abra.png
 │   │   ├─ bubasaur.png
 │   │   ├─ charizard.jpeg
 │   │   ├─ Eevee.png
 │   │   ├─ Gastly.png
 │   │   ├─ Geodude.png
 │   │   ├─ Machop.png
 │   │   ├─ Magikarp.png
 │   │   ├─ meow.png
 │   │   ├─ Oddish.jpeg
 │   │   ├─ pikachu.png
 │   │   ├─ Psyduck.png
 │   │   ├─ Snorlax.png
 │   │   ├─ Squirtle.png
 │   │   ├─ Vulpix.png
 │   │   └─ Zubat.png
 │   ├─ styles/
 │   │   ├─ Computer.css
 │   │   ├─ Login.css
 │   │   ├─ Menu.css
 │   │   ├─ Navbar.css
 │   │   ├─ Party.css
 │   │   ├─ Profile.css
 │   │   ├─ Saves.css
 │   │   └─ Status.css
 │   └─ utils/
 │      ├─ constants.js
 │      ├─ dedupe.js
 │      └─ storage.js
 ├─ __tests__/
 │   ├─ authService.test.js
 │   ├─ Computer.test.jsx
 │   ├─ Navbar.test.jsx
 │   ├─ Profile.test.jsx
 │   ├─ ProtectedRoute.test.jsx
 │   ├─ saveService.test.js
 │   └─ teamService.test.js
 ├─ main.jsx
 └─ setupTests.js
```

---

### **Testes e Cobertura**

**Ferramentas:**  
Vitest + React Testing Library + Happy DOM

**Serviços e componentes testados:**

| Arquivo                        | Descrição                                               |
| ------------------------------ | ------------------------------------------------------- |
| `authService.test.js`          | Login/logout e persistência de usuário                  |
| `Computer.test.jsx`            | Movimentação entre time e PC (Box)                      |
| `Navbar.test.jsx`              | Renderização condicional e logout dinâmico              |
| `Profile.test.jsx`             | Edição de perfil, avatar e logout                       |
| `ProtectedRoute.test.jsx`      | Controle de acesso seguro                               |
| `saveService.test.js`          | Testes de persistência e disparo de eventos             |
| `teamService.test.js`          | Testes de consistência entre time e armazenamento local |
| `authService.errors.test.js`   | Testes de tratamento de erros e autenticação inválida.  |
| `Profile.editing.test.jsx`     | Testes de comportamento do modo de edição de perfil.    |
| `profileService.test.js`       | Validação de persistência e atualização de perfil.      |
| `storage.test.js`              | Testes de fallback e reset do `localStorage`.           |
| `teamService.branches.test.js` | Testes de branches e cenários alternativos de equipe.   |

```bash
# Rodar os testes
npx vitest run --coverage
```

> Cobertura atual: **≈70%** das linhas, funções e branches.

---

### **Instalação e Execução**

```bash
# Instalar dependências
npm ci

# Executar localmente
npm run dev

# Rodar testes
npx vitest run --coverage

# Rodar linter
npm run lint
```

Aplicação acessível em **http://localhost:5173**

---

### **Ferramentas e Tecnologias**

| Categoria          | Ferramentas                          |
| ------------------ | ------------------------------------ |
| Framework          | React + Vite                         |
| Testes             | Vitest + RTL + Happy DOM             |
| Qualidade          | ESLint, Prettier, Husky, lint-staged |
| Documentação       | Markdown + Keep a Changelog          |
| Controle de Versão | Git + GitHub                         |

---

### **Autores**

- **João Victor Miotelli Vitali**
- **Theo Grings Gomide**

---

### **Licença**

Distribuído sob licença **MIT** — uso livre para fins acadêmicos e educacionais.

---
