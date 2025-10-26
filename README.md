# Projeto – Clean Code  
## Gerenciamento de Pokémon em React

---

### **Descrição do Projeto**
O projeto **Gerenciamento de Pokémon em React** é uma aplicação web desenvolvida para simular o gerenciamento de equipes de Pokémon.  
O usuário pode criar e editar seu **Deck (time ativo)**, salvar o progresso em **Saves**, visualizar Pokémon armazenados no **PC**, e acessar o sistema por meio de uma tela de **Login**.

Essa aplicação foi escolhida para o projeto de *Clean Code* com o objetivo de **refatorar o código original**, mantendo as funcionalidades existentes, mas aplicando **melhores práticas de legibilidade, modularização e testes**.

---

### **Principais Funcionalidades**
- Tela de **Login** com autenticação simulada;  
- Tela de **Deck** para montar e gerenciar equipes (máx. 6 Pokémon);  
- Tela de **Saves** para registrar e listar progressos salvos;  
- Tela de **PC** com listagem de Pokémon armazenados;  
- Persistência local utilizando o `localStorage`.

---

### **Problemas Detectados (Versão Original)**
Durante a análise do código base, foram identificados diversos *code smells* que comprometem a manutenção e a escalabilidade do projeto:

| Tipo de Problema | Descrição | Impacto |
|------------------|------------|----------|
| **Componentes monolíticos** | Componentes grandes com múltiplas responsabilidades. | Dificulta leitura e testes. |
| **Repetição de código (Duplicação)** | Estruturas HTML e CSS repetidas entre telas. | Aumenta o esforço de manutenção. |
| **Magic Numbers e Strings** | Valores fixos e textos espalhados no código. | Reduz clareza e dificulta ajustes. |
| **Falta de separação de responsabilidades** | Lógica de estado, visual e persistência no mesmo arquivo. | Viola o princípio SRP (*Single Responsibility Principle*). |
| **Ausência de testes automatizados** | Nenhum teste implementado. | Diminui confiabilidade ao modificar o código. |
| **Falta de padronização de estilo** | Código sem formatação ou linter ativo. | Dificulta colaboração entre desenvolvedores. |
| **Baixa acessibilidade (a11y)** | Falta de labels e atributos semânticos. | Prejudica a experiência do usuário. |

---

### **Estratégia de Refatoração**
O objetivo é **melhorar a legibilidade, a modularização e a testabilidade** do sistema, **sem reescrever o código do zero**.

#### **Ações Principais**
- **Organização por Feature:** separar o projeto em módulos (`auth`, `deck`, `saves`, `pc`, `shared`);  
- **Componentização:** criar componentes reutilizáveis (`Button`, `Input`, `PokemonCard`);  
- **Criação de Hooks Personalizados:** para lógica de estado e armazenamento (`useLocalStorage`, `useAuth`);  
- **Serviços Isolados:** mover regras de negócio para `services/` (`deckService`, `saveRepository`, `authService`);  
- **Centralização de Constantes:** em `shared/utils/constants.js`;  
- **Aplicação de Linters e Formatação:** ESLint + Prettier + Husky + lint-staged;  
- **Criação de Testes Unitários:** Vitest + React Testing Library, com cobertura mínima de 50 %;  
- **Sugestão de Interface Fluente:** implementação opcional do `DeckBuilder` (API fluente para criar decks).

---

### **Ferramentas Utilizadas**

| Categoria | Ferramenta | Finalidade |
|------------|-------------|-------------|
| **Linter e Formatação** | ESLint + Prettier | Padronização e correção automática de código. |
| **Controle de Qualidade** | Husky + lint-staged | Verificações automáticas antes de cada commit. |
| **Testes Unitários** | Vitest + React Testing Library | Criação de testes de unidade e de interface. |
| **CI/CD** | GitHub Actions | Execução automática de build, lint e testes. |
| **Gerenciamento de Dependências** | npm + Vite | Build rápido e modular. |
| **Documentação** | README.md + CHANGELOG.md | Descrição e histórico de alterações. |

---

### **Como Executar o Projeto**

```bash
# Instalar dependências
npm ci

# Rodar o servidor de desenvolvimento
npm run dev

# Rodar o linter
npm run lint

# Rodar os testes
npm test
```

A aplicação ficará disponível em: **http://localhost:5173**

---

### **Estrutura de Branches**
| Branch | Descrição |
|---------|------------|
| **`original`** | Versão inicial do projeto, antes da refatoração (snapshot v0.9.0-original). |
| **`main`** | Versão refatorada, com melhorias graduais e documentação atualizada. |

---

### **Licença**
Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para estudar, modificar e contribuir.

---

### **Autores**
**João Victor Miotelli Vitali**  
**Theo Grings Gomide**
