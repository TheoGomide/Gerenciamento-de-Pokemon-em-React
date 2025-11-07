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

| Categoria                        | Melhorias Aplicadas                                                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Arquitetura**                  | Separação por módulos (`authService`, `deckService`, `profileService`, `constants`, `Navbar`) e eliminação de acoplamentos.                          |
| **Autenticação**                 | Implementado serviço `authService` com persistência no `localStorage`.                                                                               |
| **Rotas Protegidas**             | Adicionada verificação condicional com `ProtectedRoute`.                                                                                             |
| **Navbar**                       | Refatorada para renderizar links dinâmicos conforme login/logout e manter o design original (fundo preto).                                           |
| **Constantes Globais**           | Criado `shared/utils/constants.js` para rotas e chaves de armazenamento.                                                                             |
| **Testes Unitários**             | Testes cobrindo `authService`, `Navbar`, `ProtectedRoute`, `Menu`, `Party`, `Saves`, `Status`, `Profile`, `Computer`, `saveService` e `teamService`. |
| **Interface Fluente (proposta)** | Criada classe `DeckBuilder` (API fluente para criar decks Pokémon de forma encadeada).                                                               |
| **Documentação e Versionamento** | Atualizados `README.md` e `CHANGELOG.md` com histórico e instruções completas.                                                                       |

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
- **Testes Unitários Automatizados** com cobertura superior a 80%.

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
 │   ├─ services/
 │   │   ├─ authService.js
 │   │   ├─ profileService.js
 │   │   ├─ deckService.js
 │   │   ├─ saveService.js
 │   │   └─ teamService.js
 │   ├─ utils/
 │   │   └─ constants.js
 │   ├─ styles/
 │   │   ├─ Navbar.css
 │   │   ├─ Login.css
 │   │   ├─ Menu.css
 │   │   ├─ Party.css
 │   │   ├─ Saves.css
 │   │   ├─ Status.css
 │   │   ├─ Computer.css
 │   │   └─ Profile.css
 │   └─ fluent/
 │       └─ DeckBuilder.js
 ├─ __tests__/
 │   ├─ authService.test.js
 │   ├─ Navbar.test.jsx
 │   ├─ ProtectedRoute.test.jsx
 │   ├─ Menu.test.jsx
 │   ├─ Party.test.jsx
 │   ├─ Saves.test.jsx
 │   ├─ Status.test.jsx
 │   ├─ Profile.test.jsx
 │   ├─ Computer.test.jsx
 │   ├─ saveService.test.js
 │   └─ teamService.test.js
 ├─ main.jsx
 └─ vite.config.js
```

---

### **Testes e Cobertura**

**Ferramentas:**  
Vitest + React Testing Library + Happy DOM

**Serviços e componentes testados:**

| Arquivo / Módulo | Descrição                                               |
| ---------------- | ------------------------------------------------------- |
| `authService`    | Login/logout e persistência de usuário                  |
| `Navbar`         | Renderização condicional e logout dinâmico              |
| `ProtectedRoute` | Controle de acesso seguro                               |
| `Menu`           | Exibição e mensagem de boas-vindas                      |
| `Party`          | Gerenciamento e exibição de time Pokémon                |
| `Saves`          | Criação, sobrescrita, listagem e exclusão de saves      |
| `Status`         | Exibição de atributos detalhados dos Pokémon            |
| `Profile`        | Edição de perfil, avatar e logout                       |
| `Computer`       | Movimentação entre time e PC (Box)                      |
| `saveService`    | Testes de persistência e disparo de eventos             |
| `teamService`    | Testes de consistência entre time e armazenamento local |

```bash
# Rodar os testes
npx vitest run --coverage
```

> Cobertura atual: **≈80%** das linhas, funções e branches.  
> O relatório completo está disponível em `coverage/index.html`.

---

### **Interface Fluente (Proposta)**

Proposta de implementação de um **builder fluente** para criação e configuração de times Pokémon.  
A abordagem fluente permite **encadear métodos de forma natural**, reduzindo repetição e aumentando legibilidade:

```js
DeckBuilder().withTrainer('Ash').add('Pikachu').add('Charizard').toPc('Squirtle').lock().build()
```

**Princípios aplicados:**

- Encadeamento de métodos (_fluent chaining_);
- Retorno contextual do próprio objeto (`return this`);
- Clareza na construção de objetos complexos;
- Facilidade de extensão e teste.

> Documentada em `docs/fluent-interface.md`.

---

### **Instalação e Execução**

```bash
# Instalar dependências
npm ci

# Executar localmente
npm run dev

# Rodar testes unitários
npm test

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
