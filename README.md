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
- Criar uma proposta de **interface fluente** (DeckBuilder);
- Padronizar o estilo com **ESLint + Prettier + Husky + lint-staged**.

---

### **Principais Melhorias Implementadas**

| Categoria                        | Melhorias Aplicadas                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Arquitetura**                  | Separação por módulos (`authService`, `deckService`, `constants`, `Navbar`) e eliminação de acoplamentos.                                 |
| **Autenticação**                 | Implementado serviço `authService` com persistência no `localStorage`.                                                                    |
| **Rotas Protegidas**             | Adicionada verificação condicional com `ProtectedRoute`.                                                                                  |
| **Navbar**                       | Refatorada para renderizar links dinâmicos conforme login/logout e manter o design original (fundo preto).                                |
| **Constantes Globais**           | Criado `shared/utils/constants.js` para rotas e chaves de armazenamento.                                                                  |
| **Testes Unitários**             | Implementados testes para `authService`, `Navbar` e `ProtectedRoute` com **Vitest + React Testing Library**, atingindo ~70% de cobertura. |
| **Interface Fluente (proposta)** | Criada classe `DeckBuilder` (API fluente para criar decks Pokémon).                                                                       |
| **Documentação e Versionamento** | Atualizados `README.md` e `CHANGELOG.md` com histórico e instruções finais.                                                               |

---

### **Principais Funcionalidades**

- **Login/Logout Simulado** com armazenamento local;
- **Menu de Navegação** dinâmico (links desativados quando deslogado);
- **Rotas Protegidas** (`/Menu`, `/Party`, `/Saves`, `/Computer`, `/Profile`);
- **Persistência de Dados** via `localStorage`;
- **Componentização e Modularização**;
- **Testes Unitários Automatizados**.

---

### **Arquitetura do Projeto**

```
src/
 ├─ app/
 │   ├─ Routes/
 │   │   ├─ Login.jsx
 │   │   ├─ Menu.jsx
 │   │   ├─ ProtectedRoute.jsx
 │   │   └─ ...
 │   ├─ App.jsx
 │   └─ App.css
 ├─ shared/
 │   ├─ components/
 │   │   └─ Navbar.jsx
 │   ├─ services/
 │   │   ├─ authService.js
 │   │   └─ deckService.js
 │   ├─ utils/
 │   │   └─ constants.js
 │   ├─ styles/
 │   │   ├─ Navbar.css
 │   │   └─ Login.css
 │   └─ fluent/
 │       └─ DeckBuilder.js
 ├─ __tests__/
 │   ├─ authService.test.js
 │   ├─ Navbar.test.jsx
 │   └─ ProtectedRoute.test.jsx
 ├─ main.jsx
 └─ vite.config.js
```

---

### **Testes e Cobertura**

**Ferramentas:**  
Vitest + React Testing Library + Happy DOM

**Serviços e componentes testados:**

- `authService`: login/logout e persistência de usuário
- `ProtectedRoute`: controle de acesso condicional
- `Navbar`: renderização dinâmica e logout

```bash
# Rodar os testes
npx vitest run --coverage
```

> Cobertura atual: **≈70%** das linhas, funções e branches.  
> O relatório completo está disponível em `coverage/index.html`.

---

### **Interface Fluente (Proposta)**

Proposta de implementação de um **builder fluente** para criação de decks Pokémon:

```js
DeckBuilder().withTrainer('Ash').add('Pikachu').add('Charizard').lock().build()
```

> Documentada em `docs/fluent-interface.md`.

---

### **Instalação e Execução**

```bash
# Instalar dependências
npm ci

# Executar localmente
npm run dev

# Rodar testes
npm test
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
