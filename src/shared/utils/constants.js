// Este arquivo define constantes globais e centraliza valores fixos para manter o código mais limpo e evitar valores mágicos.

// Rotas principais da aplicação
export const ROUTES = {
  HOME: '/',
  LOGIN: '/Login',
  MENU: '/Menu',
  PROFILE: '/Profile',
  PARTY: '/Party',
  COMPUTER: '/Computer',
  SAVES: '/Saves',
  STATUS: '/Status',
}

// Endpoints ou URLs externas
export const API_URL = 'https://api-pokemon.onrender.com' // exemplo; altere conforme o seu backend

// Configurações de estilo ou layout
export const COLORS = {
  PRIMARY: '#0f172a',
  SECONDARY: '#1e293b',
  TEXT: '#e2e8f0',
  ACCENT: '#60a5fa',
}

// Textos fixos ou mensagens
export const MESSAGES = {
  WELCOME: 'Bem-vindo ao Gerenciador de Pokémon!',
  LOADING: 'Carregando...',
  ERROR_GENERIC: 'Algo deu errado. Tente novamente.',
}
