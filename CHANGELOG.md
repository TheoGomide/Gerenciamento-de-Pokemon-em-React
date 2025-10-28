# Changelog

---

## [Unreleased]

### Planejado

- Reorganização por feature (auth, deck, saves, pc)
- Componentes reutilizáveis (Button, Input, PokemonCard)
- Extração de hooks personalizados
- Testes unitários com Vitest + React Testing Library
- CI com GitHub Actions
- Interface fluente: DeckBuilder

---

## [1.2.0] - 2025-10-29

### Added

- Integração de **CI (Continuous Integration)** com **GitHub Actions** para validação automática de commits e pull requests.
  - Execução automatizada de `lint` e `format` em _pushes_ e _pull requests_.
  - Garantia de padronização do código antes de merge.
- Inclusão de **Husky** e **lint-staged** no fluxo de _pre-commit_.
- Configuração do **ESLint**, **Prettier** e plugins de acessibilidade JSX.
- Scripts automatizados para `lint`, `format` e `pre-commit`.

### Changed

- Ajustes no `package.json` para suportar scripts padronizados de build, lint e CI.
- Normalização das importações e padronização de estilo conforme regras do ESLint + Prettier.
- Simplificação da configuração do `lint-staged` para arrays de comandos válidos.

### Fixed

- Correções nos warnings de acessibilidade (`jsx-a11y`).
- Remoção de tags HTML redundantes e ajustes nas estruturas JSX.
- Correção do erro de redundância no `ul` com `role="list"`.

---

## [1.1.0] - 2025-10-28

### Added

- Arquivo `.eslintrc.cjs` configurado com regras padrão e plugins React/A11y.
- Arquivo `.prettierrc.json` com formatação consistente.
- Configuração de `lint-staged` e `husky` para validação automática em pre-commit.
- Criação do arquivo `src/shared/utils/constants.js` contendo:
  - Rotas globais (`ROUTES`)
  - URL base da API (`API_URL`)
  - Paleta de cores (`COLORS`)
  - Mensagens padrão (`MESSAGES`)

### Changed

- Refatoração de todos os componentes principais (`Login`, `Menu`, `Party`, `Computer`, `Saves`, `Status`) para remover tags HTML desnecessárias e aplicar semântica React adequada.
- Substituição de `onClick` diretos por funções e componentes de interação acessíveis (`button`, `Link`).
- Reestruturação do projeto em pastas padronizadas (`src/shared`, `src/app/Routes`, `legacy/htmls-css`).
- Ajuste de imports relativos para caminhos consistentes.
- Padronização de CSS e classes visuais.

### Fixed

- Correção de warnings de acessibilidade (`jsx-a11y`) e inconsistências de importação.
- Ajuste de estrutura inválida em `Computer.jsx` e `Menu.jsx`.
- Remoção de duplicações e "code smells" básicos detectados pelo ESLint.

### Deprecated

- Pasta `legacy/htmls-css` mantida apenas como referência histórica da versão anterior (HTML estático).
- Adicionada aos arquivos `.eslintignore` e `.prettierignore` para evitar lint automático.

---

## [1.0.0] - 2025-10-25

### Added

- README completo (descrição, execução, problemas detectados e estratégia de refatoração).
- CHANGELOG inicial da entrega 03.

### Changed

- Foco em documentação inicial — sem alterações no código-fonte.

### Fixed

- n/a
